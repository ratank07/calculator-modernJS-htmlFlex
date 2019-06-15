
class Calculator {
    constructor(previousOperadTextElement, currentOperadTextElement){
        this.previousOperadTextElement = previousOperadTextElement;
        this.currentOperadTextElement = currentOperadTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;

    }
    delete(){
this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() +  number.toString();
        console.log('inside appendnumber'+this.currentOperand);
        
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }
    compute(){
         let computation;
         const prev = parseFloat(this.previousOperand);
         const current = parseFloat(this.currentOperand);
         if(isNaN(prev) || isNaN(current)) return

         switch(this.operation){
             case '+' : 
             computation = prev + current;
             break;
             case '/' : 
             computation = prev / current;
             break;
             case '*' : 
             computation = prev * current;
             break;
             case '-' : 
             computation = prev - current;
             break;
             default: 
             return;

         }
         this.currentOperand = computation;
         this.operation = undefined;
         this.previousOperand = '';
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        const floatNumber = parseFloat(number);
        if(isNaN(integerDigits)) {
          var  integerDisplay = ''
        } else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits:0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay;
        }
        
       // return number;
    }
    updateDisplay(){
        this.currentOperadTextElement.innerText = this.getDisplayNumber(this.currentOperand);
       
        console.log('inside display'+currentOperadTextElement.innerText);
        document.querySelector('.current-operand').innerText = this.getDisplayNumber(this.currentOperand);
        document.querySelector('.previous-operand').innerText = this.previousOperand;
       //this.previousOperadTextElement.innerText = this.previousOperand;
       if(this.operation != null){
        document.querySelector('.previous-operand').innerText = `${this.previousOperand} ${this.operation}`;
           
       }
        
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('.equalsbtn');
const deleteButtons = document.querySelector('.delBtn');
const allclearButtons = document.querySelector('.allClearBtn');
const Buttons = document.querySelectorAll('[data-number]');

const previousOperadTextElement = document.querySelectorAll('[data-previous-operand]');
const currentOperadTextElement = document.querySelectorAll('[data-current-operand]');

const calculator = new Calculator(previousOperadTextElement, currentOperadTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        console.log('btn clicked'+button.innerText);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
console.log('equalButton cliedk');
    calculator.compute();
    calculator.updateDisplay();
})

deleteButtons.addEventListener('click',()=>{
console.log('delete cliedk');
    
    calculator.delete();
    calculator.updateDisplay();
})
allclearButtons.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})