// const zero = document.querySelector('.zero');
// const one = document.querySelector('.one');
// const two = document.querySelector('.two');
// const three = document.querySelector('.three');
// const four = document.querySelector('.four');
// const five = document.querySelector('.five');
// const six = document.querySelector('.six');
// const seven = document.querySelector('.seven');
// const eight = document.querySelector('.eight');
// const nine = document.querySelector('.nine');
// const division = document.querySelector('.division');
// const multi = document.querySelector('.multi');
// const sum = document.querySelector('.sum');
// const sub = document.querySelector('.sub');
// const parenLeft = document.querySelector('.parenLeft');
// const parenRight = document.querySelector('.parenRight');
const equal = document.querySelector('.equal');
const display = document.getElementById('display');
const bottomPart = document.querySelector('.bottom-part');
const clear = document.querySelector('.clear');
let string  = '';
const updateDisplay = (str)=>{
    // let screen = str.replaceAll('*','×').replaceAll('/','÷');
    display.textContent = str==''? '0': str;
}
bottomPart.addEventListener('click',function(e){
    if(e.target.classList.contains('evalAble')){
        string += e.target.value;
        updateDisplay(string);
    }
})

clear.addEventListener('click',function(){
    string = '';
    updateDisplay(string);
})

equal.addEventListener('click',function(){
    try{
        string = eval(string);
        updateDisplay(string);
    }
    catch(err){
        // updateDisplay("Unexpected Expression")
        console.log(err.message)
    }
})
