<script lang="ts">
  import type { CMSThing } from '$lib/types';
  import { updateThing } from '$lib/sanity';

  export let thing: CMSThing;

  let editing = false;

  let name = thing.name;

  const submit = async () => {
    editing = false;
    await updateThing(thing._id, { name });
  };
</script>

{#if editing}
  <input type="text" bind:value={name} />
  <button on:click={submit}>save</button>
{:else}
  <h1>{name}</h1>
  <button on:click={() => (editing = true)}>edit</button>
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
