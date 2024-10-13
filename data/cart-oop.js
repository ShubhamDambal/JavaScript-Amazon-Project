import {validDeliveryOption} from './deliveryOptions.js';

//function to generate objects.
//when we run the function it returns object
function Cart(localStorageKey){
  const cart = {
    cartItems: undefined,
  
    //function inside object = method
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      
      //use "this.cartItems" instead of "cart.cartItems" to avoid error when changing object name
      if(!this.cartItems){
        this.cartItems = [{
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
    },
    
    saveToStorage(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
  
    addToCart(productId){
      let matchingItem;  //To keep track of same products
  
      //traverse cart to check item already preset or not
      this.cartItems.forEach((cartItem) => { 
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      }); 
  
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`); 
  
      //converting into Number() bcz DOM gives string by default
      const quantity = Number(quantitySelector.value);
  
      //Adding product to the cart
      if(matchingItem){
        //matchingItem.quantity += 1;
        matchingItem.quantity += quantity;
      }
      else{
        this.cartItems.push({
          // productId: productId,
          // quantity: quantity
          productId,
          quantity,
          //quantity:1,
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    },
  
    removeFromCart(productId){
      //steps: 1)Create new arr
             //2)Traverse the cart(products which are added to cart)
             //3)Add prodt to new arr iff product id not matches
    
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart; //put newCart on webpage
    
      this.saveToStorage();
    },
  
    updateDeliveryOption(productId, deliveryOptionId){
      let matchingProduct;
    
      //step 1: find product
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingProduct = cartItem;
        }
      });
    
      //if productId is not present in cart then do nothing
      if(!matchingProduct){
        return;
      }
    
      //if deliveryOptionId is not present in cart then do nothing
      if (!validDeliveryOption(deliveryOptionId)) {
        return;
      }
    
      //step 2: Update deliveryOptionId
      matchingProduct.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    },
  
    calculateCartQuantity(){
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    },
  
    updateQuantity(productId, newQuantity){
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){ //find required product
          matchingItem = cartItem;
        }
      });
    
      matchingItem.quantity = newQuantity;
    
      this.saveToStorage();
    }
  };

  return cart;
}

//used function to generate objects instead of copy-pasting the code
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();  

businessCart.loadFromStorage();  

console.log(cart);
console.log(businessCart);
