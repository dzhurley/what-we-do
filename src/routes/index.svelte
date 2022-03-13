<script context="module">
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
  import auth from '$lib/services/auth';
  import { isAuthenticated, user } from '$lib/stores/auth';

  export let things;
  let auth0Client;

  console.log(things);
  onMount(async () => {
    auth0Client = await auth.getClient();
    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  const login = () => {
    auth.loginWithPopup(auth0Client);
  };

  const logout = () => {
    auth.logout(auth0Client);
  };
</script>

<h1>What We Do</h1>
<p>More to come</p>

{#if auth0Client && $isAuthenticated}
  <h2>Hey {$user.name}!</h2>

  {#if $user.picture}
    <img src={$user.picture} alt={user.name} />
  {:else}
    <img src="https://source.unsplash.com/random/400x300" alt="Random Photo" />
  {/if}
  <button on:click={logout}>Logout</button>

  <ul>
    {#each things as thing (thing.name)}
      <li>{thing.name}</li>
    {/each}
  </ul>
{:else if auth0Client}
  <button on:click={login}>Login</button>
{:else}
  Loading...
{/if}
