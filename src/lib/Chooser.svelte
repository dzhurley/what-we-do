<script lang="ts">
  import { things } from '$lib/sanity';
  import type { CMSThing } from '$lib/types';

  let choice: CMSThing;

  const choose = () => {
    choice = $things[Math.floor(Math.random() * $things.length)];
  };
</script>

{#if choice}
  <h1>Chosen!: {choice.name}</h1>
  <button on:click={choose}>Another!</button>
{:else}
  <button on:click={choose}>Choose!</button>
{/if}
