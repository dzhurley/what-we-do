<script lang="ts">
  import { Button } from 'spaper';

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

<section>
  {#if creating}
    <section
      class={`paper container container-xs border-${
        Math.floor(Math.random() * 4) + 1
      }`}
    >
      <Form onCancel={() => (creating = false)} onSubmit={create} />
    </section>
  {:else}
    <button
      class="btn-block btn-success margin-bottom-large"
      on:click={() => (creating = true)}
    >
      Add Thing
    </button>
  {/if}

  {#each $things as thing (thing.name)}
    <Thing {thing} />
  {/each}
</section>

<style>
  section {
    margin: 110px 1rem 1rem;
  }

  .container {
    margin: 2rem auto;
    padding: 1.5rem 1.5rem 0.75rem;
  }

  .btn-success {
    max-width: 400px;
    margin: 2rem auto;
  }
</style>
