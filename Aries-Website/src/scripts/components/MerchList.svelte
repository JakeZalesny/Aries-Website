<script>
    import { getData } from '../externalServices.mjs';
    import MerchSummary from './MerchSummary.svelte';

    let promise = getData("../json/wunderworld_sweatshirts.json");
</script>

{#await promise}
  <p>...waiting</p>
{:then data}
  <ul class="product-list">
    {#each data as item}
      <div class ="product-card">
        <MerchSummary product={item} />
      </div>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
