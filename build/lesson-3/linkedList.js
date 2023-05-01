"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
class ListNode {
    constructor(value) {
        this.next = null;
        this.prev = null;
        this.value = value;
    }
}
class LinkedList {
    constructor() {
        this.setFirst = (value) => {
            const node = new ListNode(value);
            if (this.first !== null) {
                node.next = this.first;
                this.first.prev = node;
                this.first = node;
            }
            else {
                this.first = node;
                this.last = node;
            }
        };
        this.setLast = (value) => {
            const node = new ListNode(value);
            if (this.last !== null) {
                this.last.next = node;
                node.prev = this.last;
                this.last = node;
            }
            else {
                this.first = node;
                this.last = node;
            }
        };
        this.getNode = (value) => {
            let current = this.first;
            while (current && current.value !== value) {
                current = current.next;
            }
            if (!current)
                return false;
            else
                return current;
        };
        this.deleteNode = (value) => {
            var _a, _b, _c, _d;
            let current = this.first;
            while (current && current.value !== value) {
                current = current.next;
            }
            if (!current)
                return false;
            if (current.value === ((_a = this.first) === null || _a === void 0 ? void 0 : _a.value)) {
                const next = (_b = this.first) === null || _b === void 0 ? void 0 : _b.next;
                next && (next.prev = null);
                this.first = next ? next : null;
            }
            else if (current.value === ((_c = this.last) === null || _c === void 0 ? void 0 : _c.value)) {
                this.last = (_d = this.last) === null || _d === void 0 ? void 0 : _d.prev;
                this.last.next = null;
            }
            else {
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }
        };
        this.isEmpty = () => {
            return !this.first && !this.last;
        };
        this.deleteLast = () => {
            var _a, _b;
            const temp = this.last;
            //If List has only one element
            if (((_a = this.last) === null || _a === void 0 ? void 0 : _a.prev) == null) {
                this.first = null;
                this.last = null;
            }
            else {
                const lastPrevNode = (_b = this.last) === null || _b === void 0 ? void 0 : _b.prev;
                lastPrevNode && (lastPrevNode.next = null);
                this.last = lastPrevNode;
            }
            return temp;
        };
        this.deleteFirst = () => {
            var _a, _b;
            const temp = this.first;
            //If List has only one element
            if (((_a = this.first) === null || _a === void 0 ? void 0 : _a.next) == null) {
                this.first = null;
                this.last = null;
            }
            else {
                const firstNextNode = (_b = this.first) === null || _b === void 0 ? void 0 : _b.next;
                firstNextNode && (firstNextNode.prev = null);
                this.first = firstNextNode;
            }
            return temp;
        };
        this.setAfter = (afterValue, value) => {
            var _a;
            const node = new ListNode(value);
            let current = this.first;
            while (current && current.value !== afterValue) {
                current = current.next;
            }
            if (!current)
                return false;
            if ((current === null || current === void 0 ? void 0 : current.value) === ((_a = this.last) === null || _a === void 0 ? void 0 : _a.value)) {
                this.setLast(value);
            }
            else {
                node.next = current.next;
                current.next.prev = node;
                current.next = node;
                node.prev = current;
            }
        };
        this.toPlainObject = () => {
            var _a, _b;
            let current = this.first;
            const plainArray = [];
            while (current) {
                plainArray.push({
                    value: current.value,
                    prev: (_b = (_a = current.prev) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : null,
                    next: current.next ? current.next.value : null,
                });
                current = current.next;
            }
            return plainArray;
        };
        this.first = null;
        this.last = null;
    }
    //Генератор для итератора чтобы обойти в цикле for of
    *[Symbol.iterator]() {
        let current = this.first;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}
exports.LinkedList = LinkedList;
// const ll = new LinkedList();
// ll.setFirst(2);
// ll.setFirst(32);
// ll.setLast(78);
// ll.setAfter(32, 0);
// ll.setAfter(78, 120);
// console.log(ll.toPlainObject());
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
// ll.deleteNode(2);
// console.log(ll.toPlainObject());
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
// console.log(ll.getNode(2)); //false
