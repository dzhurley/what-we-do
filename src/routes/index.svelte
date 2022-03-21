<script lang="ts">
  import { Button } from 'spaper';
  import confetti from 'canvas-confetti';

  import { things } from '$lib/sanity';
  import type { CMSThing } from '$lib/types';

  import Thing from '$lib/Thing.svelte';

  let choice: CMSThing;

  const choose = () => {
    choice = $things[Math.floor(Math.random() * $things.length)];
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };
</script>

<section>
  {#if choice}
    <Thing thing={choice} readonly />
    <Button on:click={choose}>Pick another!</Button>
  {:else}
    <Button size="large" on:click={choose}>Pick one!</Button>
  {/if}
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
  }
</style>
