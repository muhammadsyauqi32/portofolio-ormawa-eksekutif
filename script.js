const previousDisplay = document.getElementById("previousDisplay");
const currentDisplay = document.getElementById("currentDisplay");
const buttons = document.querySelectorAll("button");

let currentValue = "";
let previousValue = "";
let operator = null;

function updateDisplay() {
  currentDisplay.textContent = currentValue || "0";
  previousDisplay.textContent = operator ? `${previousValue} ${operator}` : "";
}

function appendNumber(number) {
  if (number === "." && currentValue.includes(".")) return;
  currentValue += number;
}

function chooseOperator(op) {
  if (currentValue === "") return;
  if (previousValue !== "") {
    calculate();
  }
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  let result;
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      if (curr === 0) {
        alert("Tidak bisa membagi dengan nol!");
        clearAll();
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  operator = null;
  previousValue = "";
}

function deleteLast() {
  currentValue = currentValue.slice(0, -1);
}

function clearAll() {
  currentValue = "";
  previousValue = "";
  operator = null;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;
    const action = button.dataset.action;
    const op = button.dataset.operator;

    if (number !== undefined) {
      appendNumber(number);
    }

    if (op !== undefined) {
      chooseOperator(op);
    }

    if (action === "equals") {
      calculate();
    }

    if (action === "delete") {
      deleteLast();
    }

    if (action === "clear") {
      clearAll();
    }

    updateDisplay();
  });
});
