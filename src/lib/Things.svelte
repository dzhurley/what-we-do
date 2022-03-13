<script lang="ts">
  import type { Thing } from '$lib/types';

  export let things: Thing[];
</script>

<ul>
  {#each things as thing (thing.name)}
    <li>
      <h1>{thing.name}</h1>
      {#if thing.tags.length}
        <ul>
          {#each thing.tags as tag}
            <li>{tag.label}</li>
          {/each}
        </ul>
      {/if}

      <p>{thing.details}</p>
      {#if thing.links.length}
        <ul>
          {#each thing.links as href}
            <li>
              <a {href}>{href}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ul>
