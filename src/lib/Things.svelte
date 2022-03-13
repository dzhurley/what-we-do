<script lang="ts">
  import { things } from '$lib/sanity';
  import Thing from '$lib/Thing.svelte';
</script>

<ul>
  {#each $things as thing (thing.name)}
    <li>
      <Thing {thing} />
    </li>
  {/each}
</ul>
