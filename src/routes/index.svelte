<script lang="ts" context="module">
  export async function load({ fetch }) {
    try {
      const res = await fetch('/things.json');
      const props = await res.json();
      return { props };
    } catch (err) {
      console.log('500:', err);
    }
    return {};
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  import type { Thing } from '$lib/types';

  import auth0, { clientInitialized, isAuthenticated, user } from '$lib/auth0';
  import Things from '$lib/Things.svelte';

  export let things: Thing[];

  onMount(async () => {
    await auth0.createClient();
  });
</script>

<h1>What We Do</h1>
<p>More to come</p>

{#if $clientInitialized && $isAuthenticated}
  <h2>Welcome {$user.name}!</h2>

  <button on:click={() => auth0.logout()}>Logout</button>

  <Things {things} />
{:else if $clientInitialized}
  <button on:click={() => auth0.loginWithPopup()}>Login</button>
{:else}
  Loading...
{/if}
