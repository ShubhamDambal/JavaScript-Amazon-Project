import {calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';


export function renderOrderSummary(){
 
  let cartSummary = ''; 

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    //to save product of (id = productId)
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    //to save delivery option
    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

  //used (cartItem.quantity) bcz quantity is not in products.js. it is in cart.js 
    cartSummary += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}"> 
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name} 
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
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

                <span class="delete-quantity-link link-primary js-delete-link 
                js-delete-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  }); 

  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
    
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option 
                    js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" 
          data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input
                  js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummary;

  //use querySelectorAll not only querySelector bcz we are applying forEach loop so needs multiple things
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      //1.(By manually updation)
      // //get the product to delete
      // const container = document.querySelector(`.js-cart-item-container-${productId}`);

      // container.remove(); //remove it from web page

      // updateCartQuantity();  //update inside checkout(__) after delete

      renderCheckoutHeader();
      renderOrderSummary();   //2.(using MVC)
      renderPaymentSummary();
    })
  });

  //Updating total cart quantity in Checkout(__)
  function updateCartQuantity(){
    const cartQuantity = calculateCartQuantity();

    renderCheckoutHeader();
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

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
      // const container = document.querySelector(
      //   `.js-cart-item-container-${productId}`
      // );
      // container.classList.remove('is-editing-quantity');

      // const quantityLable = document.querySelector(`.js-quantity-label-${productId}`);

      // quantityLable.innerHTML = newQuantity;  //to update inside product (Quantity: 2 Update Delete)

      // updateCartQuantity();  //To update quantity inside checkout(...)
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      //const productId = element.dataset.productId;
      //const deliveryOptionId = element.dataset.deliveryOptionId;
      const {productId, deliveryOptionId} = element.dataset;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  });
}
