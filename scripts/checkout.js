import {calculateCartQuantity, cart, removeFromCart, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency} from './utils/money.js';

let cartSummary = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct; //to save product of (id = productId)

  //loop through products arr to search product having (id = productId)
  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product;  //once the product found we have all details of product i.e image, name, rating etc
    }
  });

//used (cartItem.quantity) bcz quantity is not in products.js. it is in cart.js 
  cartSummary += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}"> 
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span> 
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
              Update
            </span>

            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
            </span>

            <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummary;

//use querySelectorAll not only querySelector bcz we are applying forEach loop so needs multiple things
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    
    //get the product to delete
    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.remove(); //remove it from web page

    updateCartQuantity();  //update inside checkout(__) after delete
  })
});

//Updating total cart quantity in Checkout(__)
function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}

updateCartQuantity();

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    // Here's an example of a feature we can add: validation.
    // Note: we need to move the quantity-related code up
    // because if the new quantity is not valid, we should
    // return early and NOT run the rest of the code. This
    // technique is called an "early return".

    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }

    updateQuantity(productId, newQuantity);
    //till now we have updated quantity inside cart. Now need to update in HTML

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');

    const quantityLable = document.querySelector(`.js-quantity-label-${productId}`);

    quantityLable.innerHTML = newQuantity;  //to update inside product (Quantity: 2 Update Delete)

    updateCartQuantity();  //To update quantity inside checkout(...)
  });
});