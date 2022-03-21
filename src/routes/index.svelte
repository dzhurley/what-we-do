<script lang="ts">
  import { Button, Checkbox } from 'spaper';
  import confetti from 'canvas-confetti';

  import { tags, things } from '$lib/sanity';
  import type { CMSThing } from '$lib/types';

  import Thing from '$lib/Thing.svelte';

  let choice: CMSThing;

  let filters = [];

  const choose = () => {
    const filtered = $things.filter(thing => {
      if (!filters.length) {
        return true;
      }
      return filters.every(f => thing.tags.find(t => t.value === f));
    });
    const newChoice = filtered[Math.floor(Math.random() * filtered.length)];

    choice = newChoice || null;

    if (choice) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };
</script>

<section>
  {#if choice}
    <Thing thing={choice} readonly />
    <Button on:click={choose}>Pick another!</Button>
  {:else if choice === null}
    <h2>All choices filtered out!</h2>
    <Button on:click={choose}>Pick another!</Button>
  {:else}
    <Button size="large" on:click={choose}>Pick one!</Button>
  {/if}

  <label
    >Filters
    <fieldset class="form-group">
      {#each $tags as tag}
        <Checkbox label={tag.label} value={tag.value} bind:group={filters} />
      {/each}
    </fieldset>
  </label>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 110px;
    height: calc(100vh - 110px);
  }

  h2 {
    text-align: center;
  }

  fieldset {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  label {
    margin: 2rem auto;
    padding: 0 2rem;
  }

  :global(.form-group .paper-check) {
    margin-bottom: -0.5rem;
  }
</style>
