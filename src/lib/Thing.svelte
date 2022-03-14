<script lang="ts">
  import type { CMSThing } from '$lib/types';
  import sanity from '$lib/sanity';

  export let thing: CMSThing;

  let editing = false;

  let name = thing.name;

  const update = async () => {
    editing = false;
    await sanity.updateThing(thing, { name });
  };

  const remove = async () => {
    if (window.confirm('you sure?')) {
      await sanity.deleteThing(thing);
    }
  };
</script>

{#if editing}
  <input type="text" bind:value={name} />
  <button on:click={update}>save</button>
{:else}
  <h1>{thing.name}</h1>
  <button on:click={() => (editing = true)}>edit</button>
  <button on:click={remove}>delete</button>
{/if}

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
