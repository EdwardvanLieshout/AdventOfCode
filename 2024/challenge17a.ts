import { readFileSync } from 'fs';

const file = readFileSync('./input17.input', 'utf-8');
const input = file.split(/\r?\n/);
let registerA = +input[0].match(/\d+/)[0];
let registerB = +input[1].match(/\d+/)[0];
let registerC = +input[2].match(/\d+/)[0];
let instructionPointer = 0;
const program = input[4].split(' ')[1].split(',').map((val) => +val)
let output = [];

const getComboOperand = (val: number) => {
    if (val === 4) return registerA;
    if (val === 5) return registerB;
    if (val === 6) return registerC;
    return val;
}

const adv = (operand: number) => {
    const result = Math.floor(registerA/Math.pow(2, getComboOperand(operand)));
    registerA = result;
    instructionPointer += 2;
}

const bxl = (operand: number) => {
    const result = registerB ^ operand;
    registerB = result;
    instructionPointer += 2;
}

const bst = (operand: number) => {
    const result = getComboOperand(operand) % 8;
    registerB = result;
    instructionPointer += 2;
}

const jnz = (operand: number) => {
    if (registerA === 0) {
        instructionPointer += 2;
        return;
    }
    instructionPointer = operand;
}

const bxc = (operand: number) => {
    const result = registerB ^ registerC;
    registerB = result;
    instructionPointer += 2;
}

const out = (operand: number) => {
    const result = getComboOperand(operand) % 8;
    output.push(result);
    instructionPointer += 2;
}

const bdv = (operand: number) => {
    const result = Math.floor(registerA/Math.pow(2, getComboOperand(operand)));
    registerB = result;
    instructionPointer += 2;
}

const cdv = (operand: number) => {
    const result = Math.floor(registerA/Math.pow(2, getComboOperand(operand)));
    registerC = result;
    instructionPointer += 2;
}

const getFn = (opcode: number) => {
    if (opcode === 0) return adv;
    if (opcode === 1) return bxl;
    if (opcode === 2) return bst;
    if (opcode === 3) return jnz;
    if (opcode === 4) return bxc;
    if (opcode === 5) return out;
    if (opcode === 6) return bdv;
    if (opcode === 7) return cdv;
}

while(instructionPointer <= program.length-2) {
    getFn(program[instructionPointer])(program[instructionPointer+1]);
    console.log(registerA);
}

console.log(output.join(','));
console.log(registerA);
console.log(registerB);
console.log(registerC);