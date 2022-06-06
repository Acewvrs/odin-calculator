function addNum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return 'Not a Number!';
    return a + b;
}

function subtractNum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return 'Not a Number!';
    return a - b;
}

function multiplyNum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return 'Not a Number!';
    return a * b;
}

function divideNum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return 'Not a Number!';
    if (b === 0) return "ERROR";
    return a / b;
}

function modulusNum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return 'Not a Number!';
    return a % b;
}

function operate(num1, num2, op) {
    num1 = Number(num1);
    num2 = Number(num2);
    if (op === '+') return addNum(num1, num2);
    else if (op === '-') return subtractNum(num1, num2);
    else if (op === 'x') return multiplyNum(num1, num2);
    else if (op === '/') return divideNum(num1, num2);
    else if (op === '%') return modulusNum(num1, num2);
    else return "ERROR";
}

function evaluate_alt_ver(exp) {
    if (typeof exp !== 'string') return "Invalid input";

    numbers = [];
    ops = [];
    let tempNum = '';
    for (let i = 0; i < exp.length; i++) {
        
        if (operators.includes(exp[i])) {
            if (tempNum === '') {
                return "ERROR";
            }
            numbers.push(Number(tempNum));
            ops.push(exp.charAt(i));
            tempNum = '';
        }
        else {
            tempNum += exp.charAt(i);
        }
        if (i === exp.length - 1) {
            // if (operators.includes(exp[i])) return "ERROR";
            numbers.push(Number(tempNum));
            tempNum = '';
        }
    }
    
    let used_numbers_idx = [];
    let used_op_idx = [];

    let total_numbers = numbers.length;
    let num_idx = 0;
    let answer = 0;
    let first_num_added = false;
    let next_num; 
    for (let op_idx in ops) {
        if (ops[op_idx] === 'x') {
            next_num = Number(op_idx) + 1;
            numbers[next_num] = multiplyNum(Number(numbers[op_idx]), Number(numbers[next_num]));
            used_numbers_idx.push(op_idx);
            used_op_idx.push(op_idx);
            // console.log(Number(numbers[op_idx]));
        }
        if (ops[op_idx] === '/') {
            next_num = Number(op_idx) + 1;
            numbers[next_num] = divideNum(Number(numbers[op_idx]), Number(numbers[next_num]));
            used_numbers_idx.push(op_idx);
            used_op_idx.push(op_idx);
        }
    }

    //remove all used numbers & operators (mult and div)
    let offset = 0;
    for (let idx in used_numbers_idx) {
        numbers.splice(used_numbers_idx[idx] - offset, 1);
        offset++;
    }
    
    offset = 0;
    for (let idx in used_op_idx) {
        ops.splice(used_op_idx[idx] - offset, 1);
        offset++;
    }
    
    answer = numbers[0];
    for (let op_idx = 0; op_idx < ops.length; op_idx++) {
        num_idx = op_idx + 1;
        if (ops[op_idx] === '+') {
            answer = addNum(answer, Number(numbers[num_idx]));
        }
        else if ((ops[op_idx] === '-')) {
            answer = subtractNum(answer, Number(numbers[num_idx]));
        }
    }
    return answer;
}

function displayInput_alt_ver(button) {
    let input = button.target.textContent;
    if (input === 'C') {
        display.value = '0';
    }
    else if (input === '←') {
        display.value = display.value.slice(0, -1)
    }
    else if (input === '=') {
        display.value = evaluate(display.value);
    }
    else {
        if (display.value === '0' || display.value === "NaN" || display.value === "ERROR") {
            display.value = button.target.textContent;
        }
        else {
            display.value += button.target.textContent;
        }
    }
}

function displayInput(button, key=false) {
    let input;
    if (key === false) input = button.target.textContent;
    else {
        input = key;
    }

    if (input === 'C') {
        display.value = '0';
        operator_in_use = '';
        is_input_saved = false;
        take_another_num = false;
        dot_exist = false;
        ans = 0;
    }
    else if (input === '←') {
        display.value = display.value.slice(0, -1)
    }
    else if (input === '=') {
        if (is_input_saved && operator_in_use !== '') {
            ans = operate(ans, display.value, operator_in_use);
            display.value = ans;
            take_another_num = true;
            equal_pressed = true;
        }
    }
    else if (operators.includes(input)) {
        if (equal_pressed) equal_pressed = false;
        if (!is_input_saved) { 
            operator_in_use = input;
            ans = display.value;
            is_input_saved = true;
            take_another_num = true;
        }
        else {
            if (!take_another_num) {
                ans = operate(ans, display.value, operator_in_use);
                display.value = ans;
                take_another_num = true;
            }
            operator_in_use = input;
        }
    }
    else if (input === "+/-") {
        if (display.value.charAt(0) !== '-') {
            display.value = '-' + display.value;
        }
        else {
            display.value = display.value.replace('-', '');
        }
    }
    else if (input === '.') {
        if (!dot_exist) {
            display.value += input;
            dot_exist = true;
        }
    }
    else {
        if (equal_pressed) {
            display.value = input;
            operator_in_use = '';
            is_input_saved = false;
            take_another_num = false;
            dot_exist = false;
            ans = 0;
            equal_pressed = false;
        }
        else if (take_another_num) {
            display.value = input;
            take_another_num = false;
            dot_exist = false;
        }
        else if (display.value === '0' || display.value === "NaN" || display.value === "ERROR") {
            display.value = input;
            operator_in_use = '';
            is_input_saved = false;
            take_another_num = false;
            dot_exist = false;
            ans = 0;
        }
        else {
            display.value += input;
        }
    }
}

function displayKeyboardInput(event) {
    let number_keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (number_keys.includes(event.key)) {
        displayInput(event, event.key)
    }
}

let equal_pressed = false;
let take_another_num = false;
let operator_in_use = '';
let is_input_saved = false;
let dot_exist = false;
let operators = ['+', '-', 'x', '/', '%'];
let ans = 0;

//list of numbers and operators from left to right
let numbers = [];
let ops = [];
let tempNumber;

document.addEventListener("keydown", displayKeyboardInput);

let display = document.querySelector("input");
display.value = '0';
display.disabled = true;

let buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach(button => {button.addEventListener("click", displayInput)});