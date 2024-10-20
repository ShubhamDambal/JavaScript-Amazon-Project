import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

//type4 of loading from backend
//Async Await (ShortCut for promises)
//returns promise
async function loadPage() {
  try{
    //throw 'xyz';

    await loadProductsFetch();  //wait for promise to finish

    const value = await new Promise((resolve, reject) => {
      //throw 'abc';

      loadCart(() => {
        //reject('uvw');
        resolve('value3');
      });
    });
  }
  catch(error){
    console.log('Unexpected error. Please try again later.');
  }
  
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();

/*//type3 of loading from backend
//Promise all Load multiple things at same time
Promise.all([
  // new Promise((resolve) => {   //using loadProducts()
  //   loadProducts(() => {
  //     resolve('xyz');
  //   });
  // }),

  loadProductsFetch(),   //as this function returns promise can write directly like this
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
*/

/*//type2 of loading from backend
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


/*//type1 of loading from backend
//Callback = inside loadProducts() function we are giving functions to run in future
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/