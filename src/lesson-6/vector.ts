export type TypedArray = Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array;

export type TypedArrayConstructor =
  | Uint8ArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor;

class Vector {
  #capacity: number;
  #buffer: TypedArray;
  length = 0;

  constructor(TypedArrayConstructor: TypedArrayConstructor, capacity: number = 8) {
    this.#capacity = capacity;
    this.#buffer = new TypedArrayConstructor(capacity);
  }

  push(...values: number[]) {
    if (this.#checkCapacity(this.length + values.length)) {
      this.#resize(this.length + values.length);
    }

    for (let value of values) {
      this.#buffer[this.length++] = value;
    }
    return this;
  }
  #resize(targetCap: number) {
    //we should create new ArrayBuffer with a doubled (capacity * 2)  or more slow growing ((capacity * 3) / 2 + 1)
    let newCap = this.length;
    while (newCap < targetCap) {
      newCap = (newCap * 3) / 2 + 1;
    }

    const newBuffer = new (this.#buffer.constructor as TypedArrayConstructor)(newCap);

    newBuffer.set(this.#buffer, 0);
    this.#capacity = Math.ceil(newCap);
    this.#buffer = newBuffer;
  }
  pop() {
    if (this.length === 0) throw new ReferenceError("Array is empty");
    this.length--;
    const value = this.#buffer[this.length];

    return value;
  }
  shift() {
    if (this.length === 0) throw new ReferenceError("Array is empty");
    const value = this.#buffer[0];
    this.length--;
    for (let i = 0; i <= this.length; i++) {
      this.#buffer[i] = this.#buffer[i + 1];
    }

    return value;
  }
  #checkCapacity(insertionLength: number) {
    return insertionLength > this.#capacity;
  }
  unshift(...values: number[]) {
    if (this.#checkCapacity(this.length + values.length)) {
      this.#resize(this.length + values.length);
    }
    for (let i = this.length - 1; i >= 0; i--) {
      this.#buffer[i + 1] = this.#buffer[i];
    }
    for (let i = 0; i <= values.length - 1; i++) {
      this.#buffer[i] = values[i];
      this.length++;
    }
  }

  showBuffer() {
    console.log(this.#buffer);
  }
}

const vector = new Vector(Uint8Array, 4);
vector.push(1, 2, 3, 4);

vector.push(5);
vector.push(6);
vector.push(7);
vector.push(8);
vector.shift();
vector.shift();
vector.showBuffer();
vector.unshift(10);
vector.unshift(34);
vector.unshift(24);
vector.push(11, 22, 33, 44);
vector.showBuffer();
