export type TypedArray = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array;

export type TypedArrayConstructor =
  | Uint8ArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor;

export class Stack {
  size: number;
  stack: TypedArray;
  #stackPointer: number = 0;
  constructor(TypedArrayConstructor: TypedArrayConstructor, size: number) {
    this.stack = new TypedArrayConstructor(size);
    this.size = size;
  }

  push(value: number) {
    if (this.#stackPointer >= this.size) {
      throw new Error("Stack overflowed");
    }
    this.stack[this.#stackPointer] = value;
    this.#stackPointer++;
  }
  pop() {
    if (this.#stackPointer === 0) {
      throw new Error("Stack is empty");
    }
    this.#stackPointer--;
    const value = this.stack[this.#stackPointer];
    this.stack[this.#stackPointer] &= 0;

    return value;
  }

  get head() {
    return this.stack[this.#stackPointer - 1];
  }
}

const stack = new Stack(Uint8Array, 3);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head); // 12
console.log(stack.pop()); // 12
console.log(stack.head); // 11
