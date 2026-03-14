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

function getCalcBtnClicked(btn) {
  switch (btn.textContent) {
    case "+":
      return "add";
    case "-":
      return "subtract";
    case "/":
      return "divide";
    case "*":
      return "multiply";
    case "=":
      return "equals";
    case "⌫":
      return "backspace";
    default:
      return btn.textContent;
  }
}

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

function updateDisplay(what) {
  calcDisplay.textContent = what;
}

function checkIfBackspace(value) {
  return value === "backspace";
}

function checkIfClear(value) {
  return value === "Clear";
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

function calcBtnClicked() {
  const btn = getCalcBtnClicked(this);

  if (checkIfCalcDigit(btn) && !operatorSelected) {
    firstTerm += btn;
    updateDisplay(firstTerm);
  } else if (checkIfCalcDigit(btn) && operatorSelected) {
    secondTerm += btn;
    updateDisplay(secondTerm);
  }

  if (checkIfOperator(btn) && !operatorSelected && firstTerm.length > 0) {
    operatorSelected = true;
  } else if (checkIfOperator(btn) && operatorSelected && secondTerm.length > 0) {
    if (selectedOperator === "divide" && secondTerm === "0") {
      updateDisplay(snarkyComment);
      secondTerm = "";
    } else {
      answer = operate(firstTerm, secondTerm, selectedOperator).toString();
      updateDisplay(answer);
      firstTerm = answer;
      secondTerm = "";
    }
  }

  if (checkIfOperator(btn)) {
    selectedOperator = btn;
  } 

  if (checkIfEquals(btn) && operatorSelected && firstTerm.length > 0 && secondTerm.length > 0) {
    if (selectedOperator === "divide" && secondTerm === "0") {
      updateDisplay(snarkyComment);
      secondTerm = "";
    } else {
      answer = operate(firstTerm, secondTerm, selectedOperator);
      updateDisplay(answer);
      firstTerm = "";
      secondTerm = "";
      operatorSelected = false;
    }
  }

  if (checkIfDecimal(btn) && !operatorSelected && !firstTerm.includes(".")) {
    firstTerm += btn;
    updateDisplay(firstTerm);
  } else if (checkIfDecimal(btn) && operatorSelected && !secondTerm.includes(".")) {
    secondTerm += btn;
    updateDisplay(secondTerm);
  }

  if (checkIfBackspace(btn) && !operatorSelected) {
    firstTerm = firstTerm.slice(0, -1);
    updateDisplay(firstTerm);
  } else if (checkIfBackspace(btn) && operatorSelected) {
    secondTerm = secondTerm.slice(0, -1);
    updateDisplay(secondTerm);;
  }

  if (checkIfClear(btn)) {
    selectedOperator = "";
    operatorSelected = false;
    firstTerm = "";
    secondTerm = "";
    answer = "";
    updateDisplay("");
  }
}

let selectedOperator = "";
let operatorSelected = false;
let firstTerm = "";
let secondTerm = "";
let answer = "";
const snarkyComment = "Dividing by 0? Really?";

const calcBtns = document.querySelectorAll(".calc-buttons-container > button");
const calcDisplay = document.querySelector(".calc-display");

calcBtns.forEach(btn => {
  btn.addEventListener("click", calcBtnClicked);
})