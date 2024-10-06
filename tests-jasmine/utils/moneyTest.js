import {formatCurrency} from '../../scripts/utils/money.js';

//Create testSuit
describe('testSuit : formatCurrency', () => {
  //create test case
  it('convert cents into dollers', () => {
    expect(formatCurrency(2095)).toEqual('20.95'); //compare 2 values
  });

  it('works with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cents', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds up to the nearest cents', ()=> {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});