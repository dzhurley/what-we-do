<script lang="ts">
  import 'papercss/dist/paper.min.css';

  import { onMount } from 'svelte';
  import { Navbar } from 'spaper';

  import auth0, { clientInitialized, isAuthenticated, user } from '$lib/auth0';
  import sanity from '$lib/sanity';

  onMount(async () => {
    await auth0.createClient();
  });

  $: {
    if ($clientInitialized && $isAuthenticated) {
      sanity.listenForThings();
    }
  }
</script>

<svelte:head>
  <title>What We Do!?</title>
</svelte:head>

<Navbar fixed>
  <h3 slot="brand">
    <a href="/">What We Do!?</a>
  </h3>
  <ul class="inline">
    <li><a href="/things">Things</a></li>
    <li>
      {#if $isAuthenticated}
        <button on:click={() => auth0.logout()}>Log&nbsp;out</button>
      {:else}
        <button
          on:click={() => auth0.loginWithPopup()}
          disabled={!$clientInitialized}
        >
          Log&nbsp;in
        </button>
      {/if}
    </li>
  </ul>
</Navbar>

{#if $clientInitialized}
  {#if $isAuthenticated}
    <slot />
  {:else}
    <section>
      <h1>Ya gotta log in first!</h1>
      <button on:click={() => auth0.loginWithPopup()}>Log&nbsp;in</button>
    </section>
  {/if}
{:else}
  <p>Loading all the things...</p>
{/if}

<style>
  section,
  p {
    text-align: center;
  }

  h1 {
    margin: 10rem 2rem 2rem;
  }
</style>
