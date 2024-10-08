import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

//create testSuit
describe('test suit: addToCart', () => {
  //runs below before each test case
  beforeEach(() => {
    //Mock setItem
    spyOn(localStorage, 'setItem');
  });


  /**********test 1***********/
  it('adds an existing product to cart', () => {

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

    //check if setItem received correct values. 1st value is 'cart' and 2nd value is arr(convert it in string)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }])
    );
  });
 
  /************test 2*************/
  it('adds a new product to the cart', () => {

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

    //check if setItem received correct values. 1st value is 'cart' and 2nd value is arr(convert it in string)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    );
  });
});

//create testSuit
describe('test suit: removeFromCart', () => {
  beforeEach(() => {
    //Mock setItem
    spyOn(localStorage, 'setItem');
  });

  /*********test: 1(removes product from cart which lready present)**********/
  it('removes a product from the cart', () => {
    //MOCK getItem() such that it return only one item that has to be deleted(tehn call removeFromCart() method such that cart become empty)
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    //reload localStorage
    loadFromStorage();

    //remove that product from cart
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));  //empty cart
  });

  /*********test: 2(product not present in cart)**********/
  it('does nothing if product is not in the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    removeFromCart('does-not-exist');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });


});

//create testSuit
describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    //Mock setItem
    spyOn(localStorage, 'setItem');

    //Mock getItem such that it return only one product
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
  });

  /***********test: 1(update delivery Option)**********/
  it('updates the delivery option', () => {

    //func call to update delivery option to 3
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('3');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '3'
    }]));
  });

 /***********test: 2(edge case: productId not present)**********/
 it('does nothing if the product is not in the cart', () => {

  //func call for unknown productId and known deliveryOptionId
  updateDeliveryOption('does-not-exist', '3');

  expect(cart.length).toEqual(1);
  expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart[0].quantity).toEqual(1);
  expect(cart[0].deliveryOptionId).toEqual('1');

  //setItem called 0 times as productId not exist in cart
  expect(localStorage.setItem).toHaveBeenCalledTimes(0);
 });

 /***********test: 3(edge case: deliveryOptionId not present)**********/
 it('does nothing if the delivery option does not exist', () => {

  //func call for known productId and unknown deliveryOptionId
  updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');

  expect(cart.length).toEqual(1);
  expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  expect(cart[0].quantity).toEqual(1);
  expect(cart[0].deliveryOptionId).toEqual('1');

  //setItem called 0 times as deliveryOptionId not exist in cart
  expect(localStorage.setItem).toHaveBeenCalledTimes(0);
 });
});