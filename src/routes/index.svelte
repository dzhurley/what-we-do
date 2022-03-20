<script lang="ts">
  import { onMount } from 'svelte';
  import auth0, { clientInitialized, isAuthenticated, user } from '$lib/auth0';
  import sanity from '$lib/sanity';
  import Chooser from '$lib/Chooser.svelte';
  import Things from '$lib/Things.svelte';

  onMount(async () => {
    await auth0.createClient();
  });

  $: {
    if ($clientInitialized && $isAuthenticated) {
      sanity.listenForThings();
    }
  }
</script>

<h1>What We Do</h1>

{#if $clientInitialized && $isAuthenticated}
  <h2>Welcome {$user.name}!</h2>

  <button on:click={() => auth0.logout()}>Logout</button>

  <Chooser />

  <Things />
{:else if $clientInitialized}
  <button on:click={() => auth0.loginWithPopup()}>Login</button>
{:else}
  Loading...
{/if}
