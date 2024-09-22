export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];

export function addToCart(productId){
  let matchingItem;  //To keep track of same products by different brands

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
        quantity
      });
    }
}