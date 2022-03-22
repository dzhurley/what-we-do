<script lang="ts">
  import Masonry from 'svelte-bricks';

  import type { CMSThing } from '$lib/types';
  import sanity, { things } from '$lib/sanity';
  import Form from '$lib/Form.svelte';
  import Thing from '$lib/Thing.svelte';

  let creating = false;

  $: items = $things.map(t => t.name);

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

  <Masonry {items} minColWidth={400} let:item>
    <Thing thing={$things.find(t => t.name === item)} />
  </Masonry>
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
