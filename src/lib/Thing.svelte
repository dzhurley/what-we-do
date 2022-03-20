<script lang="ts">
  import Svelecte from 'svelecte';
  import type { CMSThing } from '$lib/types';
  import sanity, { tags } from '$lib/sanity';

  export let thing: CMSThing;

  const blankFormState = {
    name: '',
    details: '',
    tags: [],
    links: [],
  };

  let formState: Partial<CMSThing> = { ...blankFormState };

  let editing = false;

  const cancel = () => {
    editing = false;
    formState = { ...blankFormState };
  };

  const edit = () => {
    editing = true;
    formState = {
      name: thing.name,
      details: thing.details,
      tags: [...thing.tags],
      links: [...thing.links],
    };
  };

  const remove = async () => {
    if (window.confirm('you sure?')) {
      await sanity.deleteThing(thing);
    }
  };

  const update = async () => {
    editing = false;
    console.log('update', thing.tags);
    await sanity.updateThing(thing, formState);
    formState = { ...blankFormState };
  };
</script>

{#if editing}
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

  <button on:click={cancel}>cancel</button>
  <button on:click={update}>save</button>
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
  <button on:click={edit}>edit</button>
{/if}
