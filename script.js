function addNum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') return 'Not a Number!';
    return a + b;
}

function subNum(a, b) {
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

let buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach(function() {})