import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

//create testSuit
describe('test suit: addToCart', () => {
  /**********test 1***********/
  it('adds an existing product to cart', () => {
    //Mock setItem
    spyOn(localStorage, 'setItem');

    //Mock getItem
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    //reload cart
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);  //as new product added cart length should 1 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); //check product = given product
    expect(cart[0].quantity).toEqual(2);  //check quantity = 1
  });
 
  /************test 2*************/
  it('adds a new product to the cart', () => {
    //Mock setItem
    spyOn(localStorage, 'setItem');

    //Mock getItem
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    //reload cart
    loadFromStorage();

    //below code of addToCart gives error bcz of addToCart function in cart.js.(querySelector accesses value NULL).
    //to solve this and test the code for addToCart() remove quantity var and update (matchingItem.quantity += 1 also cart.push(quantity:1))
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);  //as new product added cart length should 1 
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); //check product = given product
    expect(cart[0].quantity).toEqual(1);  //check quantity = 1
  });
});