<script lang="ts">
  import Svelecte from 'svelecte';
  import { Button, Input } from 'spaper';

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

<label>
  Name (required)
  <Input bind:value={formState.name} />
</label>

<label>
  Details
  <Input type="textarea" bind:value={formState.details} />
</label>

<label>Tags</label>
<Svelecte
  options={$tags}
  bind:value={formState.tags}
  class="border sv-overrides"
  allowEditing
  clearable
  creatable
  creatablePrefix=""
  placeholder=""
  multiple
  valueAsObject
/>

<label>Links</label>
<section>
  {#if formState.links.length}
    <ul>
      {#each formState.links as link}
        <li>
          <input type="url" pattern="https?://.+" bind:value={link} />
          <Button
            class="margin-left-small"
            type="danger"
            size="small"
            on:click={() => removeLink(link)}
          >
            Remove&nbsp;Link
          </Button>
        </li>
      {/each}
    </ul>
  {/if}
  <Button type="success" size="small" on:click={addLink}>Add&nbsp;Link</Button>
</section>

<div class="row flex-right">
  <Button type="danger" on:click={onCancel}>Cancel</Button>
  <Button
    type="secondary"
    disabled={!formState.name}
    on:click={() => onSubmit(formState)}
  >
    Save
  </Button>
</div>

<style>
  label {
    display: block;
    margin-top: 1.25rem;
  }

  label:first-of-type {
    margin-top: 0;
  }

  ul {
    padding-left: 0;
    margin: 0;
  }

  ul li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  li input {
    width: 100%;
  }

  ul li:before {
    content: '';
  }

  .row {
    gap: 1rem;
  }

  :global(label input, label textarea) {
    width: 100%;
  }

  :global(.sv-overrides) {
    padding: 0 0.4rem;
    min-height: 47px;
  }

  :global(.sv-content .sv-item) {
    display: flex;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    color: white;
    background-color: #41403e;
    border: 2px solid transparent;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    padding: 0.25rem 0.1rem 0.25rem 0.4rem;
    margin: 0.3rem 0.4rem 0.3rem 0;
    text-align: center;
    vertical-align: baseline;
    white-space: nowrap;
    cursor: pointer;
  }

  :global(.sv-content .sv-item-btn path) {
    fill: white;
  }

  :global(.sv-dropdown-scroll:not(.is-empty) + .creatable-row-wrap) {
    border-top: 2px solid #41403e !important;
  }

  :global(.creatable-row-wrap, .indicator) {
    cursor: pointer;
  }

  :global(.creatable-row-wrap:hover) {
    background-color: #eee;
  }

  :global(.creatable-row-wrap .shortcut) {
    display: none !important;
  }

  :global(.sv-dropdown) {
    width: calc(100% - 1rem) !important;
    background-color: white !important;
    border-bottom-left-radius: 15px 255px !important;
    border-bottom-right-radius: 225px 15px !important;
    border-top-left-radius: 255px 15px !important;
    border-top-right-radius: 15px 225px !important;
    border: 2px solid #41403e !important;
    border-top-color: rgb(65, 64, 62) !important;
    border-right-color: rgb(65, 64, 62) !important;
    border-bottom-color: rgb(65, 64, 62) !important;
    border-left-color: rgb(65, 64, 62) !important;
    font-size: 1rem !important;
    outline: none !important;
    padding: 0.5rem !important;
  }

  :global(.sv-dd-item) {
    padding: 0.25rem;
  }

  :global(.sv-dd-item-active) {
    background-color: #eee;
    cursor: pointer;
  }

  :global(.sv-item button) {
    transition: none;
  }

  :global(.sv-item button:hover) {
    transform: unset;
    box-shadow: none;
  }
</style>
