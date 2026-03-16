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

/* Reset and removing function */
function resetCalc() {
  firstTerm = "";
  secondTerm = "";
  operatorSelected = false;
  answer = "";
  selectedOperator = "";
  removeSelectedClassFromOperatorBtns();
}

function removeSelectedClassFromOperatorBtns() {
  for (let operator in calcOperatorBtns) {
    calcOperatorBtns[operator].classList.remove("selected");
  }
}

/* Event function */
function onCalcBtnPress(keyDown) {
  const btn = getCalcBtnPressed(this.textContent);
  const key = getCalcBtnPressed(keyDown.key);
  const btnDetails = {
    isDigit: checkIfCalcDigit(btn) || checkIfCalcDigit(key),
    isOperator: checkIfOperator(btn) || checkIfOperator(key),
    isEquals: checkIfEquals(btn) || checkIfEquals(key),
    isDecimal: checkIfDecimal(btn) || checkIfDecimal(key),
    isBackspace: checkIfBackspace(btn) || checkIfBackspace(key),
    isClear: checkIfClear(btn) || checkIfClear(key),
    content: btn || key,
  }

  /* Digit button behavior */
  if (btnDetails.isDigit && !operatorSelected) {
    firstTerm += btnDetails.content;
    updateDisplay(firstTerm);
  } else if (btnDetails.isDigit && operatorSelected) {
    secondTerm += btnDetails.content;
    removeSelectedClassFromOperatorBtns();
    updateDisplay(secondTerm);
  }

  /* Operator button behavior */
  if (btnDetails.isOperator && operatorSelected && secondTerm.length > 0 && !(secondTerm === ".")) {
    if (selectedOperator === "divide" && secondTerm === "0") {
      updateDisplay(snarkyComment);
      resetCalc();
    } else {
      answer = operate(firstTerm, secondTerm, selectedOperator).toString();
      updateDisplay(answer);
      firstTerm = answer;
      secondTerm = "";
    }
  }

  /* Operator assignment and highlighting */

  if (btnDetails.isOperator &&
     (firstTerm.length > 0 || secondTerm.length > 0) &&
     (!(firstTerm === ".") && !(secondTerm === "."))
    ) {
      operatorSelected = true;
      selectedOperator = btnDetails.content;
      removeSelectedClassFromOperatorBtns();
      calcOperatorBtns[selectedOperator].classList.add("selected");
    }

  /* Equals button behavior */
  if (btnDetails.isEquals && operatorSelected && firstTerm.length > 0 && secondTerm.length > 0 && !(secondTerm === ".")) {
    if (selectedOperator === "divide" && secondTerm === "0") {
      updateDisplay(snarkyComment);
      resetCalc();
    } else {
      answer = operate(firstTerm, secondTerm, selectedOperator);
      updateDisplay(answer);
      resetCalc();
    }
  }

  /* Decimal button behavior */
  if (btnDetails.isDecimal && !operatorSelected && !firstTerm.includes(".")) {
    firstTerm += btnDetails.content;
    updateDisplay(firstTerm);
  } else if (btnDetails.isDecimal && operatorSelected && !secondTerm.includes(".")) {
    secondTerm += btnDetails.content;
    removeSelectedClassFromOperatorBtns();
    updateDisplay(secondTerm);
  }

  /* Backspace button behavior */
  if (btnDetails.isBackspace && !operatorSelected) {
    firstTerm = firstTerm.slice(0, -1);
    updateDisplay(firstTerm);
  } else if (btnDetails.isBackspace && operatorSelected) {
    secondTerm = secondTerm.slice(0, -1);
    updateDisplay(secondTerm);
  }

  /* Clear button behavior */
  if (btnDetails.isClear) {
    resetCalc();
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