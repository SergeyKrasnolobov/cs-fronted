import { LinkedList } from "../lesson-3/linkedList";

export class Queue {
  list: any[] | LinkedList;
  constructor(list: any[] | LinkedList = new Array()) {
    this.list = list;
  }

  push(value: number) {
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
  get head() {
    if (this.list.constructor.name === "Array") {
      const list = this.list as any[];
      return list[list.length - 1];
    }
    return (this.list as LinkedList).last?.value;
  }
}

const queue = new Queue(new LinkedList());

queue.push(10);
queue.push(11);
queue.push(12);

console.log(queue.head); // 10

console.log(queue.pop()); // 10

console.log(queue.head); // 11

console.log(queue.pop()); // 11
console.log(queue.pop()); // 12
console.log(queue.pop()); // Exception
