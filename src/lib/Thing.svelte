<script lang="ts">
  import type { CMSThing } from '$lib/types';
  import Form from '$lib/Form.svelte';
  import sanity from '$lib/sanity';

  export let thing: CMSThing;

  let editing = false;

  const remove = async () => {
    if (window.confirm('you sure?')) {
      await sanity.deleteThing(thing);
    }
  };

  const update = async (formState: Partial<CMSThing>) => {
    editing = false;
    await sanity.updateThing(thing, formState);
  };
</script>

{#if editing}
  <Form {thing} onCancel={() => (editing = false)} onSubmit={update} />
{:else}
  <h1>{thing.name}</h1>

  {#if thing.tags.length}
    <ul>
      {#each thing.tags as tag}
        <li>{tag.label}</li>
      {/each}
    </ul>
  {/if}

  <p>{thing.details}</p>
  {#if thing.links.length}
    <ul>
      {#each thing.links as href}
        <li>
          <a {href}>{href}</a>
        </li>
      {/each}
    </ul>
  {/if}

  <button on:click={remove}>delete</button>
  <button on:click={() => (editing = true)}>edit</button>
{/if}
