import { LinkedList } from "../lesson-3/linkedList";

export class DQueue {
  list: any[] | LinkedList;
  constructor(list: any[] | LinkedList = new Array()) {
    this.list = list;
  }

  push(value: number) {
    if (this.list.constructor.name === "Array") {
      (this.list as any[]).push(value);
    } else {
      (this.list as LinkedList).setLast(value);
    }
  }
  unshift(value: number) {
    if (this.list.constructor.name === "Array") {
      (this.list as any[]).unshift(value);
    } else {
      (this.list as LinkedList).setFirst(value);
    }
  }
  #isEmpty() {
    if (this.list.constructor.name === "Array") {
      const list = this.list as any[];
      return !list.length;
    }
    return (this.list as LinkedList).isEmpty();
  }

  pop() {
    if (this.#isEmpty()) throw new Error("Queue is empty");
    if (this.list.constructor.name === "Array") {
      const list = this.list as any[];
      return list.pop();
    }
    return (this.list as LinkedList).deleteLast()?.value;
  }
  shift() {
    if (this.#isEmpty()) throw new Error("Queue is empty");
    if (this.list.constructor.name === "Array") {
      const list = this.list as any[];
      return list.shift();
    }
    return (this.list as LinkedList).deleteFirst()?.value;
  }
  get head() {
    if (this.list.constructor.name === "Array") {
      const list = this.list as any[];
      return list[list.length - 1];
    }
    return (this.list as LinkedList).last?.value;
  }
}

const deque = new DQueue(new LinkedList());

deque.push(10);
deque.unshift(11); //[11,10]
deque.push(12); //[11,10,12]

console.log(deque.pop()); // 12
console.log(deque.shift()); // 11
console.log(deque.pop()); // 10
console.log(deque.pop()); // Exception
