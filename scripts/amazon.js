//use array to store products 
//use object to represent each product
//taking array of data from other file by loading it in html file

import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency} from './utils/money.js';

let productsHTML = '';

//loop through product array
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}"> 
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
        Add to Cart
      </button>
    </div>`;
});

//generate HTML using DOM
document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity(productId){
  //calculate total quantity
  const cartQuantity = calculateCartQuantity();

  //update cart quantity at right top of header
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

  if (cartQuantity !== 0) { document.querySelector('.js-cart-quantity') .innerHTML = cartQuantity; }
}

updateCartQuantity();

//by clicking on button actually added to cart
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click', () => {
    //const productId = button.dataset.productId;
    const {productId} = button.dataset;

    addToCart(productId);
    updateCartQuantity(productId);
    
    alert('Added!');
  });
});