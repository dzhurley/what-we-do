import sanityClient from '@sanity/client';
import { writable } from 'svelte/store';

import type { CMSThing } from '$lib/types';

export const things = writable<CMSThing[]>([]);

const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  token: import.meta.env.VITE_SANITY_TOKEN,
  apiVersion: '2022-03-11',
  useCdn: false,
});

const query = `{
  "things": *[_type == "thing"] | order(_createdAt desc)
}`;

const listenForThings = async () => {
  // initial get
  const data = await client.fetch(query);
  things.set(data.things);

  client.listen<CMSThing>(query).subscribe(update => {
    if (update.identity !== '<system>') {
      // create or update
      if (update.result) {
        things.update(oldThings => {
          // local creates will have a missing _id, so match on name
          const match = oldThings.findIndex(thing => {
            return thing._id
              ? thing._id === update.result._id
              : thing.name === update.result.name;
          });

          // remote creates need to be inserted, local creates are merged
          return match !== -1
            ? oldThings.map((thing, index) =>
                index === match ? { ...thing, ...update.result } : thing,
              )
            : [update.result, ...oldThings];
        });
      }

      const [mutation] = update.mutations;
      if ('delete' in mutation) {
        things.update(oldThings =>
          // for remote deletes
          oldThings.filter(thing =>
            'id' in mutation.delete ? thing._id !== mutation.delete.id : false,
          ),
        );
      }
    }
  });
};

const createThing = async (attrs: Omit<CMSThing, '_type'>) => {
  const newThing: CMSThing = { _type: 'thing', ...attrs };
  things.update(oldThings => [newThing, ...oldThings]);
  await client.create(newThing);
};

const updateThing = async (existing: CMSThing, patch: Partial<CMSThing>) => {
  things.update(oldThings =>
    oldThings.map(thing =>
      thing._id === existing._id ? { ...thing, ...patch } : thing,
    ),
  );
  await client.patch(existing._id).set(patch).commit();
};

const deleteThing = async (existing: CMSThing) => {
  things.update(oldThings =>
    oldThings.filter(thing => thing._id !== existing._id),
  );
  await client.delete(existing._id);
};

const sanity = {
  listenForThings,
  createThing,
  updateThing,
  deleteThing,
};

export default sanity;
