import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

//create a test suite
describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  //run code before all test cases
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
  });

  //Hooks
  beforeEach(() => {
    //Mock setItem
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header"></div>
    `;

    //Mock getItem
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, 
      { 
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    //reload cart
    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => {
    //after test performed delete checked html
    document.querySelector('.js-test-container').innerHTML = '';
  });

  /**********test 1(Page Looks)**********/
  it('displays the cart', () => {
    expect(
      //gives array of products
      document.querySelectorAll('js-cart-item-container').length
    ).toEqual(0); //2        

    //to check text inside product ex, quantity, update,save for 2 products
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    //check product name
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');

    //check product price
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual('$10.90');
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');
  });

  /**********test 2(Page behaves)**********/
  it('removes a product', () => {
    //check delete button
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      //gives array of products
      document.querySelectorAll('js-cart-item-container').length
    ).toEqual(0); //1

    //check deleted product not present on web page and other product present
    expect(
      document.querySelector(`js-cart-item-container-${productId1}`)
    ).toEqual(null);

    // expect(
    //   document.querySelector(`js-cart-item-container-${productId2}`)
    // ).not.toEqual(null); 

    //to check updated arr(cart) after delete
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    //check product name
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual('Intermediate Size Basketball');

    //check product price
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual('$20.95');
  });

  /**********test 3(delivery option)**********/
  it('updates the delivery option', () => {
    //get 3rd delivery option for 1st product and click it
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');

    //check payment after 3rd delivery option checked
    expect(
      document.querySelector('.js-payment-summary-shipping').innerText
    ).toEqual('$14.98');
    expect(
      document.querySelector('.js-payment-summary-total').innerText
    ).toEqual('$63.50');
  });
});