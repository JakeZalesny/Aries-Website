<script>
    export let product = {};
</script>

 <a href="../product_pages/index.html?type={product.id}">
        <img src="{product.img}" alt="image of {product.name}" id="card__image"/>
        <h4 class="card__name">{product.name}</h4>
        <p class="product-card__price">${product.price}</p>
        <a href="../cart/cart.html"><button class="add-to-cart">Add to Cart</button></a>
    </a>

 <style>
    a {
        text-decoration: none;
    }
 </style>