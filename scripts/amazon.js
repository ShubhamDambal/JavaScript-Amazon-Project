//use array to store products 
//use object to represent each product
//taking array of data from other file by loading it in html file

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
        <select>
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

      <div class="added-to-cart">
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
    const productId = button.dataset.productId;

    let matchingItem;  //To keep track of same products by different brands

    //traverse cart to check item already preset or not
    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;
      }
    });

    //Adding product the cart
    if(matchingItem){
      matchingItem.quantity += 1;
    }
    else{
      cart.push({
        productId: productId,
        quantity: 1
      });
    }

    console.log(cart);
  });
});