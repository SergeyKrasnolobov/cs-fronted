interface ListNode {
  next: ListNode | null;
  prev: ListNode | null;
  value: number;
}

class ListNode implements ListNode {
  constructor(value: number) {
    this.next = null;
    this.prev = null;
    this.value = value;
  }
}

export class LinkedList {
  first: ListNode | null;
  last: ListNode | null;
  constructor() {
    this.first = null;
    this.last = null;
  }

  setFirst = (value: number) => {
    const node = new ListNode(value);
    if (this.first !== null) {
      node.next = this.first;
      this.first.prev = node;
      this.first = node;
    } else {
      this.first = node;
      this.last = node;
    }
  };
  setLast = (value: number) => {
    const node = new ListNode(value);
    if (this.last !== null) {
      this.last.next = node;
      node.prev = this.last;
      this.last = node;
    } else {
      this.first = node;
      this.last = node;
    }
  };
  getNode = (value: number) => {
    let current = this.first;
    while (current && current.value !== value) {
      current = current.next;
    }
    if (!current) return false;
    else return current;
  };
  deleteNode = (value: number) => {
    let current = this.first;

    while (current && current.value !== value) {
      current = current.next;
    }
    if (!current) return false;
    if (current.value === this.first?.value) {
      const next = this.first?.next;
      next && (next.prev = null);
      this.first = next ? next : null;
    } else if (current.value === this.last?.value) {
      this.last = this.last?.prev!;
      this.last.next = null;
    } else {
      current!.prev!.next = current.next;
      current!.next!.prev = current.prev;
    }
  };
  deleteLast = () => {
    const temp = this.last;
    //If List has only one element
    if (this.first?.next == null) {
      this.first = null;
      this.last = null;
    } else {
      const lastPrevNode = this.last?.prev;
      lastPrevNode && (lastPrevNode.next = null);
      this.last = lastPrevNode!;
    }
    return temp;
  };
  deleteFirst = () => {
    const temp = this.first;
    //If List has only one element
    if (this.last?.next == null) {
      this.first = null;
      this.last = null;
    } else {
      const firstNextNode = this.first?.next;
      firstNextNode && (firstNextNode.prev = null);
      this.first = firstNextNode!;
    }
    return temp;
  };
  setAfter = (afterValue: number, value: number) => {
    const node = new ListNode(value);
    let current = this.first;
    while (current && current.value !== afterValue) {
      current = current.next;
    }
    if (!current) return false;

    if (current?.value === this.last?.value) {
      this.setLast(value);
    } else {
      node.next = current!.next;
      current!.next!.prev = node;
      current!.next = node;
      node.prev = current;
    }
  };

  toPlainObject = () => {
    let current = this.first;
    const plainArray: Record<string, any>[] = [];
    while (current) {
      plainArray.push({
        value: current.value,
        prev: current.prev?.value ?? null,
        next: current.next ? current.next.value : null,
      });
      current = current.next;
    }
    return plainArray;
  };
}

const ll = new LinkedList();

ll.setFirst(2);
ll.setFirst(32);
ll.setLast(78);
ll.setAfter(32, 0);
ll.setAfter(78, 120);

console.log(ll.toPlainObject());

/**
 * 
 * Result
 * 
 * [
  { value: 32, prev: null, next: 0 },
  { value: 0, prev: 32, next: 2 },
  { value: 2, prev: 0, next: 78 },
  { value: 78, prev: 2, next: 120 },
  { value: 120, prev: 78, next: null }
]
 * 
 */

ll.deleteNode(2);

console.log(ll.toPlainObject());

/**
 * 
 * Result after delete Node with value --> 2
 * 
 * [
  { value: 32, prev: null, next: 0 },
  { value: 0, prev: 32, next: 78 },
  { value: 78, prev: 0, next: 120 },
  { value: 120, prev: 78, next: null }
]
 * 
 */
console.log(ll.getNode(2)); //false
