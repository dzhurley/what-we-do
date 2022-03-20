<script lang="ts">
  import type { CMSThing } from '$lib/types';
  import sanity, { things } from '$lib/sanity';
  import Form from '$lib/Form.svelte';
  import Thing from '$lib/Thing.svelte';

  let creating = false;

  const create = async (
    formState: Pick<CMSThing, 'name' | 'details' | 'tags' | 'links'>,
  ) => {
    creating = false;
    await sanity.createThing(formState);
  };
</script>

{#if creating}
  <Form onCancel={() => (creating = false)} onSubmit={create} />
{:else}
  <button on:click={() => (creating = true)}>create</button>
{/if}

<ul>
  {#each $things as thing (thing.name)}
    <li>
      <Thing {thing} />
    </li>
  {/each}
</ul>
