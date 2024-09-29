export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;  //To keep track of same products

    //traverse cart to check item already preset or not
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
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
        quantity,
        deliveryOptionId: '1'
      });
    }

    saveToStorage();
}

export function removeFromCart(productId){
  //steps: 1)Create new arr
         //2)Traverse the cart(products which are added to cart)
         //3)Add prodt to new arr iff product id not mathces

  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart; //put newCart on webpage

  saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){ //find required product
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  console.log(matchingItem.quantity);

  saveToStorage();
}