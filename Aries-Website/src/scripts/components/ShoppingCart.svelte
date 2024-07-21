<script>
    import { getLocalStorage, setLocalStorage } from "../utils.mjs";
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';

    const cart = writable([]);

    onMount(() => {
    const storedCart = getLocalStorage('so-cart');
    cart.set(storedCart);
  });

  function removeProductFromCart(productId) {
    cart.update(currentCart => {
      const newCart = currentCart.filter(item => item.Id !== productId);
      setLocalStorage('so-cart', newCart);
      return newCart;
    });
  }

</script>

<ul class="product-list">
    {#each $cart as item}
      <li class="cart-card divider">
        <a href="product_pages/index.html?products={item.Id}" class="cart-card__image">
          <img src="{item.img}" alt="image of {item.Name}"/>
        </a>
        <a href="../product_pages/index.html?products={item.Id}">
          <h2 class="card__name">{item.name}</h2>
        </a>
        <p class="cart-card__quantity">qty: 1</p>
        <button data-id={item.Id} class="cart-card__remove" type="button" on:click={() => removeProductFromCart(item.Id)}>X</button>
        <p class="cart-card__price">${item.price}</p>
      </li>
    {/each}        
  </ul>
  
  <style>
    .cart-card__remove {
      background: none;
      border: none;
      color: #a0a0a0;
    }
  
    .cart-card__remove:hover {
      cursor: pointer;
      color: red;
    }
  </style>
  