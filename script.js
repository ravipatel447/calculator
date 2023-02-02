const equal = document.querySelector(".equal");
const display = document.getElementById("display");
const bottomPart = document.querySelector(".bottom-part");
const clear = document.querySelector(".clear");
let string = "";
const updateDisplay = (str) => {
  let screen = str
    .toString()
    .replaceAll("**", "^")
    .replaceAll("*", "×")
    .replaceAll("/", "÷");
  display.textContent = str == "" ? "0" : screen;
};
bottomPart.addEventListener("click", function (e) {
  if (e.target.classList.contains("evalAble")) {
    string += e.target.value;
    updateDisplay(string);
  } else if (e.target.closest(".backspace")) {
    string = string.toString().slice(0, -1);
    updateDisplay(string);
  } else if (e.target.classList.contains("pi")) {
    string = Math.PI;
    updateDisplay(string);
  } else if (e.target.classList.contains("EConst")) {
    string === "" ? (string = Math.E) : (string = `(${eval(string) * Math.E})`);
    updateDisplay(string);
  } else if (e.target.classList.contains("invert")) {
    string !== "" ? (string = eval(`-(${string})`)) : "";
    updateDisplay(string);
  } else if (e.target.classList.contains("modulo")) {
    string !== "" ? (string = "(" + eval(`(${string})`) + ")%") : "";
    updateDisplay(string);
  } else if (e.target.closest(".square")) {
    string !== "" ? (string = eval(`(${string})**2`)) : "";
    updateDisplay(string);
  } else if (e.target.classList.contains("squareRoot")) {
    string !== "" ? (string = eval(`Math.sqrt((${string}))`)) : "";
    updateDisplay(string);
  } else if (e.target.closest(".power")) {
    string !== "" ? (string = "(" + eval(`(${string})`) + ")**") : "";
    updateDisplay(string);
  } else if (e.target.closest(".tenPower")) {
    string !== "" ? (string = eval(`10**(${string})`)) : "";
    updateDisplay(string);
  } else if (e.target.classList.contains("log10")) {
    string !== "" ? (string = eval(`Math.log10(${string})`)) : "";
    updateDisplay(string);
  } else if (e.target.classList.contains("log")) {
    string !== "" ? (string = eval(`Math.log(${string})`)) : "";
    updateDisplay(string);
  } else if (e.target.classList.contains("OneUponX")) {
    string !== "" ? (string = eval(`1/(${string})`)) : "";
    updateDisplay(string);
  } else if (e.target.classList.contains("modeX")) {
    string !== "" ? (string = eval(`Math.abs(${string})`)) : "";
    updateDisplay(string);
  }
});

clear.addEventListener("click", function () {
  string = "";
  updateDisplay(string);
});

equal.addEventListener("click", function () {
  try {
    string = eval(string);
    updateDisplay(string);
  } catch (err) {
    updateDisplay("Unexpected Expression");
    setTimeout(() => {
      updateDisplay(string);
    }, 1500);
    console.log(err.message);
  }
});
