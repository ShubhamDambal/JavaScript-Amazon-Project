//use array to store products 
//use object to represent each product
//taking array of data from other file by loading it in html file

import {cart} from '../data/cart.js';

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
          src="images/ratings/rating-${product.rating.stars * 10}.png"> 
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.priceCents / 100}
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

//by clicking on button actually added to cart
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click', () => {
    //const productId = button.dataset.productId;
    const {productId} = button.dataset;

    let matchingItem;  //To keep track of same products by different brands

    //traverse cart to check item already preset or not
    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;
      }
    });

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

    //converting into Number() bcz DOM gives string by default
    const quantity = Number(quantitySelector.value);

    //Adding product to the cart
    if(matchingItem){
      matchingItem.quantity += quantity;
    }
    else{
      cart.push({
        // productId: productId,
        // quantity: quantity
        productId,
        quantity
      });
    }

    //calculate total quantity
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    //update cart quantity at right top of header
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    //display added messg when click on add-to-cart button
    const addedMessg = document.querySelector(`.js-added-to-cart-${productId}`);

    //add class to messg element which has opacity 1
    addedMessg.classList.add("added-to-cart2");

    // We're going to use an object to save the timeout ids.
    // The reason we use an object is because each product
    // will have its own timeoutId. So an object lets us
    // save multiple timeout ids for different products.
    // For example:
    // {
    //   'product-id1': 2,
    //   'product-id2': 5,
    //   ...
    // }
    // (2 and 5 are ids that are returned when we call setTimeout).
    const addedMessageTimeouts = {};

    //to remove added messg after 2 sec
    setTimeout(() => {
      // Check if there's a previous timeout for this product. If there is, we should stop it.

      const previousTimeoutId = addedMessageTimeouts[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        addedMessg.classList.remove("added-to-cart2");
        }, 2000);

        // Save the timeoutId for this product
        // so we can stop it later if we need to.
        addedMessageTimeouts[productId] = timeoutId;
    });
      
  });
});