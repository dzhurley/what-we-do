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
  import type { Thing } from '$lib/types';
  import { onMount } from 'svelte';
  import auth0, { clientInitialized, isAuthenticated, user } from '$lib/auth0';

  export let things: Thing[];

  onMount(async () => {
    await auth0.createClient();
  });

  $: console.log($user);

</script>

<h1>What We Do</h1>
<p>More to come</p>

{#if $clientInitialized && $isAuthenticated}
  <h2>Hey {$user.name}!</h2>

  {#if $user.picture}
    <img src={$user.picture} alt={$user.name} />
  {/if}
  <button on:click={() => auth0.logout()}>Logout</button>

  <ul>
    {#each things as thing (thing.name)}
      <li>{thing.name}</li>
    {/each}
  </ul>
{:else if $clientInitialized}
  <button on:click={() => auth0.loginWithPopup()}>Login</button>
{:else}
  Loading...
{/if}
