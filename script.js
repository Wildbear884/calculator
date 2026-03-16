/* Math functions */
function add(term1, term2) {
  return Number(term1) + Number(term2);
}

function subtract(term1, term2) {
  return term1 - term2;
}

function multiply(factor1, factor2) {
  return factor1 * factor2;
}

function divide(dividend, divisor) {
  return dividend / divisor;
}

function operate(term1, term2, operator) {
  if (operator === "add") {
    return add(term1, term2);
  } else if (operator === "subtract") {
    return subtract(term1, term2);
  } else if (operator === "multiply") {
    return multiply(term1, term2);
  } else if (operator === "divide") {
    return divide(term1, term2);
  } else {
    return "Something went wrong. No calculations were preformed.";
  }
}

/* "Getting" function */
function getCalcBtnPressed(btn) {
  switch (btn) {
    case "+":
      return "add";
    case "-":
      return "subtract";
    case "/":
      return "divide";
    case "*":
      return "multiply";
    case "=":
    case "Enter":
      return "equals";
    case "⌫":
    case "Backspace":
      return "backspace";
    case "Delete":
    case "Escape":
      return "clear";
    case null:
    case undefined:
      return "";
    default:
      return btn;
  }
}

/* Checking functions */
function checkIfCalcDigit(value) {
  if (value >= 0 && !(value === "")) {
    return true;
  } else {
    return false;
  }
}

function checkIfDecimal(value) {
  return value === ".";
}

function checkIfBackspace(value) {
  return value === "backspace";
}

function checkIfClear(value) {
  return value.toLowerCase() === "clear";
}

function checkIfOperator(value) {
  if (value === "add" ||
    value === "subtract" ||
    value === "multiply" ||
    value === "divide"
  ) {
    return true;
  } else {
    return false;
  }
}

function checkIfEquals(value) {
  return value === "equals";
}

/* Display function */
function updateDisplay(what) {
  calcDisplay.textContent = what;
}

/* Event function */
function onCalcBtnPress(keyDown) {
  const btn = getCalcBtnPressed(this.textContent);
  const key = getCalcBtnPressed(keyDown.key);

  /* Digit button behavior */
  if ((checkIfCalcDigit(btn) || checkIfCalcDigit(key)) && !operatorSelected) {
    firstTerm += btn || key;
    updateDisplay(firstTerm);
  } else if ((checkIfCalcDigit(btn) || checkIfCalcDigit(key)) && operatorSelected) {
    secondTerm += btn || key;
    updateDisplay(secondTerm);
  }

  /* Operator button behavior */
  if ((checkIfOperator(btn) || checkIfOperator(key)) && !operatorSelected && firstTerm.length > 0 && !(firstTerm === ".")) {
    operatorSelected = true;
  } else if ((checkIfOperator(btn) || checkIfOperator(key)) && operatorSelected && secondTerm.length > 0 && !(secondTerm === ".")) {
    if (selectedOperator === "divide" && secondTerm === "0") {
      updateDisplay(snarkyComment);
      firstTerm = "";
      secondTerm = "";
      operatorSelected = false;
    } else {
      answer = operate(firstTerm, secondTerm, selectedOperator).toString();
      updateDisplay(answer);
      firstTerm = answer;
      secondTerm = "";
    }
  }

  /* Operator assignment */
  if (checkIfOperator(btn) || checkIfOperator(key)) {
    selectedOperator = btn || key;
  } 

  /* Equals button behavior */
  if ((checkIfEquals(btn) || checkIfEquals(key)) && operatorSelected && firstTerm.length > 0 && secondTerm.length > 0 && !(secondTerm === ".")) {
    if (selectedOperator === "divide" && secondTerm === "0") {
      updateDisplay(snarkyComment);
      firstTerm = "";
      secondTerm = "";
      operatorSelected = false;
    } else {
      answer = operate(firstTerm, secondTerm, selectedOperator);
      updateDisplay(answer);
      firstTerm = "";
      secondTerm = "";
      operatorSelected = false;
    }
  }

  /* Decimal button behavior */
  if ((checkIfDecimal(btn) || checkIfDecimal(key)) && !operatorSelected && !firstTerm.includes(".")) {
    firstTerm += btn || key;
    updateDisplay(firstTerm);
  } else if ((checkIfDecimal(btn) || checkIfDecimal(key)) && operatorSelected && !secondTerm.includes(".")) {
    secondTerm += btn || key;
    updateDisplay(secondTerm);
  }

  /* Backspace button behavior */
  if ((checkIfBackspace(btn) || checkIfBackspace(key)) && !operatorSelected) {
    firstTerm = firstTerm.slice(0, -1);
    updateDisplay(firstTerm);
  } else if ((checkIfBackspace(btn) || checkIfBackspace(key)) && operatorSelected) {
    secondTerm = secondTerm.slice(0, -1);
    updateDisplay(secondTerm);;
  }

  /* Clear button behavior */
  if (checkIfClear(btn) || checkIfClear(key)) {
    selectedOperator = "";
    operatorSelected = false;
    firstTerm = "";
    secondTerm = "";
    answer = "";
    updateDisplay("");
  }

  /* Other behavior */
  if (keyDown.type === "click") {
    this.blur();
  }
}

/* Global variables */
let selectedOperator = "";
let operatorSelected = false;
let firstTerm = "";
let secondTerm = "";
let answer = "";
const snarkyComment = "Dividing by 0? Really?";

/* Document selectors */
const calcBtns = document.querySelectorAll(".calc-buttons-container > button");
const calcDisplay = document.querySelector(".calc-display");

/* Operator buttons selector */
const calcOperatorBtns = {
  divide: document.querySelector(".calc-btn-divide"),
  multiply: document.querySelector(".calc-btn-multiply"),
  subtract: document.querySelector(".calc-btn-subtract"),
  add: document.querySelector(".calc-btn-add"),
}

/* Events */
calcBtns.forEach(btn => {
  btn.addEventListener("click", onCalcBtnPress);
})

document.addEventListener("keydown", onCalcBtnPress);