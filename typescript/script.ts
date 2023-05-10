const equal = document.querySelector(".equal") as HTMLElement;
const display = document.getElementById("display")as HTMLElement;
const bottomPart = document.querySelector(".bottom-part") as HTMLElement;
const topPart = document.querySelector(".top-part") as HTMLElement;
const clear = document.querySelector(".clear")  as HTMLElement;
const trignomatry = document.querySelector("#trignomatry") as HTMLElement;
const functions = document.querySelector("#functions") as HTMLElement;
const functionDropDown = document.querySelector(".fun") as HTMLElement;
const trignomatryDropDown = document.querySelector(".trig") as HTMLElement;
const fun = document.querySelector(".fun") as HTMLElement;
const trig = document.querySelector(".trig") as HTMLElement;
const secTrig = document.querySelector(".secondTrig") as HTMLButtonElement;
const hypTrig = document.querySelector(".hyp") as HTMLElement;
const ddt = document.querySelectorAll(".drop-down-tringnometry") as NodeListOf<HTMLButtonElement>;
const secondPossible = document.querySelectorAll(".second-possible") as NodeListOf<HTMLElement>;
const second = document.querySelector(".second") as HTMLElement;
const mc = document.querySelector(".mc") as HTMLButtonElement;
const mr = document.querySelector(".mr") as HTMLButtonElement ;
const angle = document.querySelector('.angle') as HTMLElement;
let string = "";
let memory = 0;
function ConvertDDToDMS(dd:number) {
    var deg = dd | 0;
    var frac = Math.abs(dd - deg);
    var min = (frac * 60) | 0;
    var sec = (frac * 3600 - min * 60) | 0;
    return deg + "°" + min + "'" + sec + '"';
}
function ConvertDMSToDD(degrees:number, minutes:number, seconds:number):string {
    var dd = degrees + minutes / 60 + seconds / (60 * 60);
    return dd.toString();
}
function mEnable() {
    if (mc.disabled) {
        mc.disabled = false;
        mr.disabled = false;
    }
}
function Equal() {
    try {
        string = eval(string);
        ((document.querySelector('.fe')as HTMLButtonElement).classList.contains('fActive')) ? (updateDisplay(Number(string).toExponential()))
            : updateDisplay(string);
    } catch (err:any) {
        updateDisplay("Unexpected Expression");
        setTimeout(() => {
            updateDisplay(string);
        }, 1500);
        console.log(err.message);
    }
}
const factorial = function (number:number):number {
    if (number <= 1) return 1;
    return number * factorial(number - 1);
};
const updateDisplay = (str:string):void => {
    let screen = str
        .toString()
        .replaceAll("Math.log10", "log")
        .replaceAll("**", "^")
        .replaceAll("*", "×")
        .replaceAll("/", "÷");
    display.textContent = str == "" ? "0" : screen;
};
clear.addEventListener("click", function () {
    string = "";
    updateDisplay(string);
});
equal.addEventListener("click", Equal);
topPart.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    if (target.classList.contains("mc")) {
        memory = 0;
        mc.disabled = true;
        mr.disabled = true;
    } else if (target.classList.contains("mr")) {
        string = memory.toString();
        updateDisplay(string);
    } else if (target.classList.contains("mPlus")) {
        if (string !== "") {
            mEnable();
            memory = Number(memory) + Number(eval(string));
        }
    } else if (target.classList.contains("mMinus")) {
        if (string !== "") {
            mEnable();
            memory = Number(memory) - Number(eval(string));
        }
    } else if (target.classList.contains("ms")) {
        if (string !== "") {
            mEnable();
            memory = Number(eval(string));
        }
    } else if (target.classList.contains('fe')) {
        if (target.classList.contains('fActive')) {
            target.classList.remove('fActive');
            updateDisplay(string);
        }
        else {
            target.classList.add('fActive');
            if (string !== "") Equal();
        }
    }
    else if (target.classList.contains('angle')) {
        if (target.classList.contains('rad')) {
            target.classList.remove('rad');
            target.classList.add('deg');
            target.textContent = "DEG";
        }
        else {
            target.classList.add('rad');
            target.classList.remove('deg');
            target.textContent = "RAD";
        }
    }
});
fun.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    e.stopPropagation();
    if (target.classList.contains("rand")) {
        string = Math.random().toString();
    } else if (target.classList.contains("mode")) {
        string !== "" ? (string = Math.abs(eval(string)).toString()) : "";
    } else if (target.classList.contains("floor")) {
        string !== "" ? (string = Math.floor(eval(string)).toString()) : "";
    } else if (target.classList.contains("ceil")) {
        string !== "" ? (string = Math.ceil(eval(string)).toString()) : "";
    } else if (target.classList.contains("dms")) {
        string !== "" ? (string = ConvertDDToDMS(eval(string))) : "";
    } else if (target.classList.contains("deg")) {
        if (string !== "") {
            var parts = string.split(/[^\d\w]+/);
            string = ConvertDMSToDD(
                Number(parts[0]),
                Number(parts[1]),
                Number(parts[2])
            );
        }
    }
    updateDisplay(string);
});
trig.addEventListener("click", (e) => {
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;
    if (target.closest(".drop-down-tringnometry")) {
        const t = target.closest(".drop-down-tringnometry") as HTMLButtonElement;
        if (t.value.includes("sec")) {
            const val = t.value.replaceAll("sec", "sin");
            string = eval(`1/(Math.${val}(${eval(string) * (angle.classList.contains('deg') ? (Math.PI / 180) : 1)}))`);
        } else if (t.value.includes("csc")) {
            const val = t.value.replaceAll("csc", "cos");
            string = eval(`1/(Math.${val}(${eval(string) * (angle.classList.contains('deg') ? (Math.PI / 180) : 1)}))`);
        } else if (t.value.includes("cot")) {
            const val = t.value.replaceAll("cot", "tan");
            string = eval(`1/(Math.${val}(${eval(string) * (angle.classList.contains('deg') ? (Math.PI / 180) : 1)}))`);
        } else {
            string = eval(`Math.${t.value}(${eval(string) * (angle.classList.contains('deg') ? (Math.PI / 180) : 1)})`);
        }
        updateDisplay(string);
    }
});
bottomPart.addEventListener("click", function (e) {
    const target = e.target as HTMLButtonElement;
    if (target.classList.contains("evalAble")) {
        string += target.value;
        updateDisplay(string);
    }
    else if (target.classList.contains('operator')) {
        if (['/', '*', '+', '-'].includes(string.toString().slice(-1))) {
            string = string.toString().slice(0, -1) + target.value;
        }
        else {
            string += target.value;
        }
        updateDisplay(string);
    }
    else if (target.closest(".backspace")) {
        string = string.toString().slice(0, -1);
        updateDisplay(string);
    } else if (target.classList.contains("pi")) {
        string = Math.PI.toString();
        updateDisplay(string);
    } else if (target.classList.contains("EConst")) {
        string === "" ? (string = Math.E.toString()) : (string = `(${eval(string) * Math.E})`);
        updateDisplay(string);
    } else if (target.classList.contains("invert")) {
        string !== "" ? (string = eval(`-(${string})`)) : "";
        updateDisplay(string);
    } else if (target.classList.contains("modulo")) {
        string !== "" ? (string = "(" + eval(`(${string})`) + ")%") : "";
        updateDisplay(string);
    } else if (target.closest(".square")) {
        if ((target.closest(".square") as HTMLElement).classList.contains("2nd-version")) {
            string !== "" ? (string = eval(`(${string})**3`)) : "";
        } else {
            string !== "" ? (string = eval(`(${string})**2`)) : "";
        }
        updateDisplay(string);
    } else if (target.closest(".squareRoot")) {
        if ((target.closest(".squareRoot") as HTMLElement).classList.contains("2nd-version")) {
            string !== "" ? (string = eval(`(${string})**(1/3)`)) : "";
        } else {
            string !== "" ? (string = eval(`Math.sqrt((${string}))`)) : "";
        }
        updateDisplay(string);
    } else if (target.closest(".power")) {
        if ((target.closest(".power") as HTMLElement).classList.contains("2nd-version")) {
            string !== "" ? (string = "(" + eval(`(${string})`) + ")**(1/") : "";
        } else {
            string !== "" ? (string = "(" + eval(`(${string})`) + ")**") : "";
        }
        updateDisplay(string);
    } else if (target.closest(".tenPower")) {
        if ((target.closest(".tenPower") as HTMLElement).classList.contains("2nd-version")) {
            string !== "" ? (string = eval(`2**(${string})`)) : "";
        } else {
            string !== "" ? (string = eval(`10**(${string})`)) : "";
        }
        updateDisplay(string);
    } else if (target.closest(".log10")) {
        if ((target.closest(".log10") as HTMLElement).classList.contains("2nd-version")) {
            string !== "" ? (string = `Math.log10(${string})/Math.log10(`) : "";
        } else {
            string !== "" ? (string = eval(`Math.log10(${string})`)) : "";
        }
        updateDisplay(string);
    } else if (target.closest(".log")) {
        if ((target.closest(".log") as HTMLElement).classList.contains("2nd-version")) {
            string !== "" ? (string = eval(`(Math.E)**(${string})`)) : "";
        } else {
            string !== "" ? (string = eval(`Math.log(${string})`)) : "";
        }
        updateDisplay(string);
    } else if (target.classList.contains("OneUponX")) {
        string !== "" ? (string = eval(`1/(${string})`)) : "";
        updateDisplay(string);
    } else if (target.classList.contains("modeX")) {
        string !== "" ? (string = eval(`Math.abs(${string})`)) : "";
        updateDisplay(string);
    } else if (target.classList.contains("EXP")) {
        updateDisplay(Number(string).toExponential());
    } else if (target.classList.contains("fact")) {
        string !== "" ? (string = factorial(eval(`Math.abs(${string})`)).toString()) : "";
        updateDisplay(string);
    }
});
trignomatry.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    if (
        trignomatryDropDown.classList.contains("active") &&
        target.closest("#trignomatry")
    ) {
        trignomatryDropDown.classList.remove("active");
    } else {
        trignomatryDropDown.classList.add("active");
    }
});
functions.addEventListener("click", (e) => {
    const target = e.target as HTMLButtonElement;
    if (
        functionDropDown.classList.contains("active") &&
        target.closest("#functions")
    ) {
        functionDropDown.classList.remove("active");
    } else {
        functionDropDown.classList.add("active");
    }
});
secTrig.addEventListener("click", () => {
    if (secTrig.classList.contains("active-blue")) {
        secTrig.classList.remove("active-blue");
        ddt.forEach((e) => {
            if (e.classList.contains("2nd-hyp-version")) {
                e.classList.remove("2nd-hyp-version");
                e.classList.add("hyp-version");
                e.innerHTML = e.dataset["hyp"] as string;
                e.value = `${e.dataset["original"]}h`;
            } else {
                e.classList.remove("2nd-version");
                e.innerHTML = e.dataset["original"]as string;
                e.value = `${e.dataset["original"]}`;
            }
        });
    } else {
        secTrig.classList.add("active-blue");
        ddt.forEach((e) => {
            if (e.classList.contains("hyp-version")) {
                e.classList.remove("hyp-version");
                e.classList.add("2nd-hyp-version");
                e.innerHTML = e.dataset["2ndhyp"]as string;
                e.value = `a${e.dataset["original"]}h`;
            } else {
                e.classList.add("2nd-version");
                e.innerHTML = e.dataset["2nd"]as string;
                e.value = `a${e.dataset["original"]}`;
            }
        });
    }
});
hypTrig.addEventListener("click", () => {
    if (hypTrig.classList.contains("active-blue")) {
        hypTrig.classList.remove("active-blue");
        ddt.forEach((e) => {
            if (e.classList.contains("2nd-hyp-version")) {
                e.classList.remove("2nd-hyp-version");
                e.classList.add("2nd-version");
                e.innerHTML = e.dataset["2nd"]as string;
                e.value = `a${e.dataset["original"]}`;
            } else {
                e.classList.remove("hyp-version");
                e.innerHTML = e.dataset["original"]as string;
                e.value = `${e.dataset["original"]}`;
            }
        });
    } else {
        hypTrig.classList.add("active-blue");
        ddt.forEach((e) => {
            if (e.classList.contains("2nd-version")) {
                e.classList.remove("2nd-version");
                e.classList.add("2nd-hyp-version");
                e.innerHTML = e.dataset["2ndhyp"]as string;
                e.value = `a${e.dataset["original"]}h`;
            } else {
                e.classList.add("hyp-version");
                e.innerHTML = e.dataset["hyp"]as string;
                e.value = `${e.dataset["original"]}h`;
            }
        });
    }
});
second.addEventListener("click", () => {
    if (second.classList.contains("active-blue")) {
        second.classList.remove("active-blue");
        secondPossible.forEach((e) => {
            e.classList.remove("2nd-version");
            e.innerHTML = e.dataset["original"]as string;
        });
    } else {
        second.classList.add("active-blue");
        secondPossible.forEach((e) => {
            e.classList.add("2nd-version");
            e.innerHTML = e.dataset["2ndversion"]as string;
        });
    }
});
addEventListener('keydown',(e)=>{
    if(!isNaN(parseInt(e.key))||e.key==="."||e.key==="("||e.key===")"){
        string += e.key;
        updateDisplay(string);
    }
    else if(['*','/','-','+'].includes(e.key)){
        if (['/', '*', '+', '-'].includes(string.toString().slice(-1))) {
            string = string.toString().slice(0, -1) + e.key;
        }
        else {
            string += e.key;
        }
        updateDisplay(string);
    }
    else if(e.key==="=" || e.key==="Enter") Equal();
    else if(e.key==="Backspace"){
        string = string.slice(0,-1);
        updateDisplay(string);
    }
    else if(e.key==="^"){
        string = string+"**";
        updateDisplay(string)
    }

})