import {formatCurrency} from '../../scripts/utils/money.js';

console.log('test suite: formatCurrency');

console.log('converts cents into dollars:');
if(formatCurrency(2095) === '20.95'){  //passed
  console.log('Passed!');
}
else{
  console.log("Failed!");
}

console.log('works with zero:');
if(formatCurrency(0) === '0.00'){  //passed
  console.log('Passed!');
}
else{
  console.log("Failed!");
}

console.log('rounds up to the nearest cents:');
if(formatCurrency(2000.5) === '20.01'){  //passed
  console.log('Passed!');
}
else{
  console.log("Failed!");
}

if(formatCurrency(2000.4) === '20.00'){  //passed
  console.log('Passed!');
}
else{
  console.log("Failed!");
}