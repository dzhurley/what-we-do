<script lang="ts">
  import Svelecte from 'svelecte';
  import type { CMSThing } from '$lib/types';
  import { tags } from '$lib/sanity';

  export let thing: CMSThing = null;

  export let onSubmit: (formState: Partial<CMSThing>) => void;
  export let onCancel: () => void;

  let formState: Partial<CMSThing> = thing
    ? {
        name: thing.name,
        details: thing.details,
        tags: [...thing.tags],
        links: [...thing.links],
      }
    : { name: '', details: '', tags: [], links: [] };

  const addLink = () => {
    formState.links = formState.links.concat('');
  };
  const removeLink = (link: string) => {
    formState.links = formState.links.filter(l => l !== link);
  };
</script>

<input type="text" bind:value={formState.name} />

<textarea bind:value={formState.details} />

<Svelecte
  options={$tags}
  bind:value={formState.tags}
  allowEditing
  clearable
  creatable
  creatablePrefix=""
  multiple
  valueAsObject
/>

<section>
  {#if formState.links.length}
    <ul>
      {#each formState.links as link}
        <li>
          <input type="url" bind:value={link} />
          <button on:click={() => removeLink(link)}>remove link</button>
        </li>
      {/each}
    </ul>
  {/if}
  <button on:click={addLink}>add link</button>
</section>

<button on:click={onCancel}>cancel</button>
<button on:click={() => onSubmit(formState)}>save</button>
