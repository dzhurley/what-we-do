<script lang="ts">
  import sanity, { things } from '$lib/sanity';
  import Thing from '$lib/Thing.svelte';

  let creating = false;
  let name = '';

  const cancel = () => {
    creating = false;
    name = '';
  };

  const create = async () => {
    creating = false;
    await sanity.createThing({ name, details: '', links: [], tags: [] });
    name = '';
  };
</script>

{#if creating}
  <input type="text" bind:value={name} />
  <button on:click={cancel}>cancel</button>
  <button on:click={create}>create</button>
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
