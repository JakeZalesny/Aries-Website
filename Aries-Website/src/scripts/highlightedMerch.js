import { getData } from "./externalServices.mjs";

export async function getHighlightedMerch() {
    const data = await getData("../json/wunderworld_sweatshirts.json");
    return data;
}

const data = await getHighlightedMerch();
const highlightedMerch= document.getElementById("highlighted-merch");

data.slice(0, 3).forEach((product) => {
    const card = document.createElement("div");
  card.innerHTML = ` <a href="../product_pages/index.html?type=${product.id}">
        <img src="${product.img}" alt="image of ${product.name}" id="card__image"/></a>
        <h4 class="card__name">${product.name}</h4>
        <p class="product-card__price">$ ${product.price}</p>
        <a href="../cart/cart.html"><button class="add-to-cart">Add to Cart</button></a>
    `
                

  highlightedMerch.appendChild(card);
})