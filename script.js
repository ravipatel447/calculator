const equal = document.querySelector(".equal");
const display = document.getElementById("display");
const bottomPart = document.querySelector(".bottom-part");
const clear = document.querySelector(".clear");
const trignomatry = document.querySelector("#trignomatry");
const functions = document.querySelector("#functions");
const functionDropDown = document.querySelector(".fun");
const trignomatryDropDown = document.querySelector(".trig");
const fun = document.querySelector(".fun");
const trig = document.querySelector(".trig");
const secTrig = document.querySelector(".secondTrig");
const hypTrig = document.querySelector(".hyp");
const ddt = document.querySelectorAll(".drop-down-tringnometry");
const secondPossible = document.querySelectorAll(".second-possible");
const second = document.querySelector('.second');
// const secTrig = document.getElementsByClassName("2ndTrig");
// const secFun = document.querySelector(".2nd-fun");
let string = "";

fun.addEventListener("click", (e) => {
  const target = e.target;
  e.stopPropagation();
});
trig.addEventListener("click", (e) => {
  e.stopPropagation();
  const target = e.target;
  if(target.closest('.drop-down-tringnometry')){
    const t = target.closest('.drop-down-tringnometry');
    if(t.value.includes('sec')){
        const val = t.value.replaceAll('sec','sin');
        string = eval(`1/(Math.${val}(${eval(string)}))`);
    }
    else if(t.value.includes('csc')){
        const val = t.value.replaceAll('csc','cos');
        string = eval(`1/(Math.${val}(${eval(string)}))`);
    }
    else if(t.value.includes('cot')){
        const val = t.value.replaceAll('cot','tan');
        string = eval(`1/(Math.${val}(${eval(string)}))`);
    }
    else{
        string = eval(`Math.${t.value}(${eval(string)})`);
    }
    updateDisplay(string);
  }
});
const updateDisplay = (str) => {
  let screen = str
    .toString()
    .replaceAll("**", "^")
    .replaceAll("*", "×")
    .replaceAll("/", "÷");
  display.textContent = str == "" ? "0" : screen;
};
const factorial = function (number) {
  if (number <= 1) return 1;
  return number * factorial(number - 1);
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
  } else if (e.target.classList.contains("EXP")) {
    updateDisplay(Number(string).toExponential());
  } else if (e.target.classList.contains("fact")) {
    string !== "" ? (string = factorial(eval(`Math.abs(${string})`))) : "";
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
trignomatry.addEventListener("click", (e) => {
  if (
    trignomatryDropDown.classList.contains("active") &&
    e.target.closest("#trignomatry")
  ) {
    trignomatryDropDown.classList.remove("active");
  } else {
    trignomatryDropDown.classList.add("active");
  }
});
functions.addEventListener("click", (e) => {
  if (
    functionDropDown.classList.contains("active") &&
    e.target.closest("#functions")
  ) {
    functionDropDown.classList.remove("active");
  } else {
    functionDropDown.classList.add("active");
  }
});
secTrig.addEventListener("click", () => {
  if (secTrig.classList.contains("active-blue")) {
    secTrig.classList.remove("active-blue");
    ddt.forEach((e)=>{
        if(e.classList.contains('2nd-hyp-version')){
            e.classList.remove('2nd-hyp-version');
            e.classList.add('hyp-version');
            e.innerHTML = e.dataset['hyp'];
            e.value = `${e.dataset['original']}h`
        }
        else{
            e.classList.remove('2nd-version');
            e.innerHTML = e.dataset['original'];
            e.value = `${e.dataset['original']}`
        }
    })
  } else {
    secTrig.classList.add("active-blue");
    ddt.forEach((e) => {
      if (e.classList.contains("hyp-version")) {
        e.classList.remove("hyp-version");
        e.classList.add("2nd-hyp-version");
        e.innerHTML = e.dataset['2ndhyp'];
        e.value = `a${e.dataset['original']}h`
      } else {
        e.classList.add("2nd-version");
        e.innerHTML = e.dataset["2nd"];
        e.value = `a${e.dataset['original']}`
      }
    });
  }
});
hypTrig.addEventListener("click", () => {
  if (hypTrig.classList.contains("active-blue")) {
    hypTrig.classList.remove("active-blue");
    ddt.forEach((e)=>{
        if(e.classList.contains('2nd-hyp-version')){
            e.classList.remove('2nd-hyp-version');
            e.classList.add('2nd-version');
            e.innerHTML = e.dataset['2nd'];
            e.value = `a${e.dataset['original']}`
        }
        else{
            e.classList.remove('hyp-version');
            e.innerHTML = e.dataset['original'];
            e.value = `${e.dataset['original']}`
        }
    })
  } else {
    hypTrig.classList.add("active-blue");
    ddt.forEach((e) => {
        if(e.classList.contains('2nd-version')){
            e.classList.remove('2nd-version')
            e.classList.add("2nd-hyp-version");
            e.innerHTML = e.dataset['2ndhyp'];
            e.value = `a${e.dataset['original']}h`
        }else{
            e.classList.add("hyp-version");
            e.innerHTML = e.dataset["hyp"];
            e.value = `${e.dataset['original']}h`
        }
    });
  }
});
second.addEventListener('click',()=>{
    if(second.classList.contains('active-blue')){
        second.classList.remove('active-blue');
    }else{
        second.classList.add('active-blue');
        secondPossible.forEach((e)=>{

        })
    }
})