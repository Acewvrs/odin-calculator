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
    if (b === 0) return "can't divide by 0!";
    return a / b;
}

function operator(num1, num2, op) {
    if (op === '+') return addNum(num1, num2);
    else if (op === '-') return subNum(num1, num2);
    else if (op === '*') return multiplyNum(num1, num2);
    else if (op === '%') return divideNum(num1, num2);
    else return "Not a valid operator!";
}

function evaluate(exp) {
    if (typeof exp !== 'string') return "Invalid input";

    numbers = [];
    ops = [];
    let operators = ['+', '-', 'x', '/'];
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

    // for (let n in numbers) {
    //     console.log(numbers[n]);
    // }

    console.log(numbers);
    console.log(ops);
    
    answer = numbers[0];
    for (let op_idx = 0; op_idx < ops.length; op_idx++) {
        num_idx = op_idx + 1;
        if (ops[op_idx] === '+') {
            // next_num = Number(op_idx) * 2 + 1;
            // console.log(Number(numbers[op_idx]));
            answer = addNum(answer, Number(numbers[num_idx]));
        }
        else if ((ops[op_idx] === '-')) {
            // next_num = Number(op_idx) * 2 + 1;
            // answer += subtractNum(Number(numbers[Number(op_idx)*2]), Number(numbers[next_num]));
            answer = subtractNum(answer, Number(numbers[num_idx]));
        }
    }
    return answer;
    // for (let op in ops) {
    //     // console.log(ops[op]);
    //     if (!first_num_added) {
    //         addNumber(answer, numbers[num_idx]);
    //         num_idx++;
    //         false_num_added = true;
    //     }
    //     if (ops[op] === '+' && first_num_added) {
    //         addNumber(answer, numbers[++num_idx]);
    //         num_idx++;
    //     }
    //     else if (ops[op] === '-' && first_num_added) {
    //         subtractNumber(numbers[num_idx], numbers[++num_idx]);
    //         num_idx++;
    //     }
    //     else if (ops[op] === 'x' && first_num_added) {
    //         multiplyNumber(numbers[num_idx], numbers[++num_idx]);
    //         num_idx++;
    //     }
    //     else if (ops[op] === '%' && first_num_added) {
    //         divideNumber(numbers[num_idx], numbers[++num_idx]);
    //         num_idx++;
    //     }
    // }

    // for (let n in numbers) {
    //     console.log(numbers[n]);
    // }
}

function displayInput(button) {
    let input = button.target.textContent;
    if (input === 'C') {
        display.value = '0';
    }
    else if (input === '←') {
        display.value = display.value.slice(0, -1)
    }
    else if (input === '=') {
        // else  if (input in ['+', '-', 'x', '%']) {
        //     numbers.push(tempNumber);
        //     operators.push()
        // }
        display.value = evaluate(display.value);
    }
    else {
        if (display.value === '0' || isNaN(display.value) || display.value === "ERROR") {
            display.value = button.target.textContent;
        }
        else {
            display.value += button.target.textContent;
        }

    }
}

//list of numbers and operators from left to right
let numbers = [];
let ops = [];
let tempNumber;

let display = document.querySelector("input");
display.value = '0';

let buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach(button => {button.addEventListener("click", displayInput)});