import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

//Promise all Load multiple things at same time
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('xyz');
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
})

/*
//Promises
new Promise((resolve) => {
  loadProducts(() => {
    resolve('xyz');
  });
}).then((val) => {
  console.log(val);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/


/*
//Callback = inside loadProducts() function we are giving functions to run in future
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/