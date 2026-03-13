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
  if (Number(divisor) === 0) {
    return "Can't divide by 0";
  }
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
  let btnDetails = {
    isDigit: false,
    isOperator: false,
    isBackspace: false,
    isClear: false,
    isEquals: false,
    content: "",
  };
  
  switch (btn) {
    case calcBtns[0]:
      btnDetails.isDigit = true;
      btnDetails.content = "7";
      break;
    case calcBtns[1]:
      btnDetails.isDigit = true;
      btnDetails.content = "8";
      break;
    case calcBtns[2]:
      btnDetails.isDigit = true;
      btnDetails.content = "9";
      break;
    case calcBtns[3]:
      btnDetails.isOperator = true;
      btnDetails.content = "divide";
      break;
    case calcBtns[4]:
      btnDetails.isDigit = true;
      btnDetails.content = "4";
      break;
    case calcBtns[5]:
      btnDetails.isDigit = true;
      btnDetails.content = "5";
      break;
    case calcBtns[6]:
      btnDetails.isDigit = true;
      btnDetails.content = "6";
      break;
    case calcBtns[7]:
      btnDetails.isOperator = true;
      btnDetails.content = "multiply";
      break;
    case calcBtns[8]:
      btnDetails.isDigit = true;
      btnDetails.content = "1";
      break;
    case calcBtns[9]:
      btnDetails.isDigit = true;
      btnDetails.content = "2";
      break;
    case calcBtns[10]:
      btnDetails.isDigit = true;
      btnDetails.content = "3";
      break;
    case calcBtns[11]:
      btnDetails.isOperator = true;
      btnDetails.content = "subtract";
      break;
    case calcBtns[12]:
      btnDetails.isDigit = true;
      btnDetails.content = ".";
      break;
    case calcBtns[13]:
      btnDetails.isDigit = true;
      btnDetails.content = "0";
      break;
    case calcBtns[14]:
      btnDetails.isBackspace = true;
      btnDetails.content = "backspace";
      break;
    case calcBtns[15]:
      btnDetails.isOperator = true;
      btnDetails.content = "add";
      break;
    case calcBtns[16]:
      btnDetails.isClear = true;
      btnDetails.content = "clear";
      break;
    case calcBtns[17]:
      btnDetails.isEquals = true;
      btnDetails.content = "equals";
      break;
    default:
      return "Unknown button";
  }
  return btnDetails;
}

function calcBtnClicked() {
  const btn = getCalcBtnClicked(this);
  
  if (btn.isDigit && !operatorSelected) {
    firstTerm += btn.content;
    calcDisplay.textContent = firstTerm;
  } else if (btn.isDigit && operatorSelected) {
    secondTerm += btn.content;
    calcDisplay.textContent = secondTerm;
  }
  
  if (btn.isOperator && !operatorSelected && firstTerm.length > 0) {
    operatorSelected = true;
  } else if (btn.isOperator && operatorSelected && secondTerm.length > 0) {
    answer = operate(firstTerm, secondTerm, selectedOperator).toString();
    calcDisplay.textContent = answer;
    firstTerm = answer;
    secondTerm = "";
  }

  if (btn.isOperator) {
    selectedOperator = btn.content;
  } 
  
  if (btn.isEquals && operatorSelected && firstTerm.length > 0 && secondTerm.length > 0) {
    answer = operate(firstTerm, secondTerm, selectedOperator);
    calcDisplay.textContent = answer;
    firstTerm = "";
    secondTerm = "";
    operatorSelected = false;
  }

  if (btn.isClear) {
    selectedOperator = "";
    operatorSelected = false;
    firstTerm = "";
    secondTerm = "";
    answer = "";
    calcDisplay.textContent = "";
  }
}

let selectedOperator = "";
let operatorSelected = false;
let firstTerm = "";
let secondTerm = "";
let answer = "";

const calcBtns = document.querySelectorAll(".calc-buttons-container > button");
const calcDisplay = document.querySelector(".calc-display");

calcBtns.forEach(btn => {
  btn.addEventListener("click", calcBtnClicked);
})