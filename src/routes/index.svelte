<script lang="ts">
  import { onMount } from 'svelte';
  import auth0, { clientInitialized, isAuthenticated, user } from '$lib/auth0';
  import sanity from '$lib/sanity';
  import Things from '$lib/Things.svelte';

  onMount(async () => {
    await auth0.createClient();
    if ($clientInitialized && $isAuthenticated) {
      await sanity.listenForThings();
    }
  });
</script>

<h1>What We Do</h1>
<p>More to come</p>

{#if $clientInitialized && $isAuthenticated}
  <h2>Welcome {$user.name}!</h2>

  <button on:click={() => auth0.logout()}>Logout</button>

  <Things />
{:else if $clientInitialized}
  <button on:click={() => auth0.loginWithPopup()}>Login</button>
{:else}
  Loading...
{/if}
