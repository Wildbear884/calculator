function add(term1, term2) {
  return term1 + term2;
}

function subtract(term1, term2) {
  return term1 - term2;
}

function multiply(factor1, factor2) {
  return factor1 * factor2;
}

function divide(dividend, divisor) {
  if (divisor === 0) {
    return "Can't divide by 0";
  }
  return dividend / divisor;
}