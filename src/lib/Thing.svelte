<script lang="ts">
  import { Badge, Button, Modal } from 'spaper';

  import type { CMSThing } from '$lib/types';
  import Form from '$lib/Form.svelte';
  import sanity from '$lib/sanity';

  export let thing: CMSThing;
  export let readonly = false;

  let editing = false;
  let showModal = false;

  const remove = async () => {
    await sanity.deleteThing(thing);
    showModal = false;
  };

  const update = async (formState: Partial<CMSThing>) => {
    editing = false;
    await sanity.updateThing(thing, formState);
  };
</script>

<section
  class={`paper container container-xs border-${
    Math.floor(Math.random() * 4) + 1
  }`}
>
  {#if !readonly && editing}
    <Form {thing} onCancel={() => (editing = false)} onSubmit={update} />
  {:else}
    <h3>{thing.name}</h3>

    <p>{thing.details}</p>

    {#if thing.links.length}
      <ul>
        {#each thing.links as href}
          <li>
            <a {href} target="_blank" rel="noopener noreferrer">{href}</a>
          </li>
        {/each}
      </ul>
    {/if}

    {#if thing.tags.length}
      <section class="tags">
        {#each thing.tags as tag}
          <Badge>{tag.label}</Badge>
        {/each}
      </section>
    {/if}

    {#if !readonly}
      <div class="row flex-right">
        <Button type="danger" on:click={() => (showModal = true)}>
          Delete
        </Button>
        <Button type="secondary" on:click={() => (editing = true)}>Edit</Button>
      </div>
    {/if}
  {/if}
</section>

<Modal bind:active={showModal} title="Delete Thing">
  <p>
    You sure you want to delete "{thing.name}"?
  </p>
  <div class="row flex-right">
    <Button on:click={() => (showModal = false)}>Cancel</Button>
    <Button type="danger" on:click={remove}>Delete</Button>
  </div>
</Modal>

<style>
  .container {
    margin-bottom: 2rem;
    padding: 1.5rem 1.5rem 0.75rem;
  }

  h3 {
    margin: 0 0 1.25rem;
  }

  ul {
    padding-left: 1rem;
  }

  li a {
    font-size: 16px;
  }

  .tags {
    margin: 1rem 0;
  }

  .row {
    gap: 1rem;
  }

  @media only screen and (max-width: 520px) {
    :global(.row .paper-btn) {
      margin: 0;
    }
  }

  :global(.badge) {
    margin-right: 10px;
  }

  :global(.modal .modal-text) {
    margin-bottom: 0;
  }

  :global(.modal p) {
    margin-top: 1rem;
  }

  :global(.modal .row) {
    margin-bottom: 0;
  }

  :global(.modal footer) {
    display: none;
  }
</style>
