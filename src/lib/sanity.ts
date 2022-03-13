import sanityClient from '@sanity/client';
import { writable } from 'svelte/store';

import type { CMSThing } from '$lib/types';

export const things = writable<CMSThing[]>([]);

const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  token: import.meta.env.VITE_SANITY_TOKEN,
  apiVersion: '2022-03-11',
});

export const getThings = async () => {
  const data = await client.fetch(`{
    "cmsThings": *[_type == "thing"]
  }`);
  things.set(data.cmsThings);
  return data;
};

export const updateThing = async (id: string, patch: Partial<CMSThing>) => {
  await client.patch(id).set(patch).commit();
  await getThings();
};

const sanity = {
  getThings,
};

export default sanity;
