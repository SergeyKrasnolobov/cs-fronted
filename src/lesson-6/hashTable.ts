class ListNode<K extends number | string | object, V> {
  next: ListNode<K, V> | null = null;
  key: K;
  value: V;
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

type CalculateHash = (key: number | string | object) => number;

/**
 *
 * Для взятия хеша у объекта рсширяем протоитип объекта 2 функциями
 *
 * getHashCode(){} создает хеш код и записвает его в свойства объекта
 * hashCode: геттер вернет хеш код
 */

Object.defineProperty(Object.prototype, "getHashCode", {
  configurable: true,
  value: function () {
    if (!this["hashCode"]) {
      Object.defineProperty(Object.prototype, "hashCode", {
        value: getRandomInt(0, 2 ** 32),
      });
    }
    return this["hashCode"];

    function getRandomInt(from: number, to: number) {
      return Math.floor(Math.random() * (to - from)) + from;
    }
  },
});

class Hasher {
  #getHashNumber(key: number) {
    return key;
  }
  #getHashString(key: string) {
    return [...String(key)].reduce((acc, char, index) => {
      return (acc += (char.charCodeAt(0) + index) >> 1);
    }, 0);
  }
  #getHashObject(key: Record<any, any> | null) {
    if (key === null) throw new Error("Cant set null as key");
    return key["getHashCode"]();
  }

  getHash(value: any) {
    switch (typeof value) {
      case "number":
        return this.#getHashNumber(value);
      case "string":
        return this.#getHashString(value);
      case "object":
        return this.#getHashObject(value);
    }
  }
}

class HashTable<K extends number | string | object, V> {
  #buffer: ListNode<K, V>[];
  #size = 0;
  hasher: Hasher;
  capacity: number;
  #loadIndex = 0.75;
  constructor(hasher: Hasher, capacity: number = 13) {
    this.hasher = hasher;
    this.capacity = capacity;
    this.#buffer = new Array(capacity);
  }

  #getIndex(hash: number) {
    return hash % this.capacity;
  }

  set(key: string | number | object, value: any) {
    const node = new ListNode(key, value) as ListNode<K, V>;
    const index = this.#getIndex(this.hasher.getHash(key));

    if (!this.#buffer[index]) {
      this.#buffer[index] = node;
    } else {
      let currentNode = this.#buffer[index];
      //пока нода не равна null
      while (currentNode) {
        //если у текущей ноды ключ равен вставляемому ключу, то просто меняем значение и выходим из функции
        if (currentNode.key === key) {
          currentNode.value = value;
          return;
        } else {
          //если у текущей ноды нет next Node, то присваем ей в next новую ноду, и выходим из цикла
          if (!currentNode.next) {
            currentNode.next = node;
            break;
          }
          currentNode = currentNode.next;
        }
      }
    }
    this.#size++;
  }

  log() {
    console.log(this.#buffer, { loadIndex: this.#size / this.#buffer.length });
  }
}

const hasher = new Hasher();
const hashMap = new HashTable(hasher);

// hashMap.set("foo", 23);
hashMap.set("oof", 232); //potential collision
// hashMap.set("bar", 24);
// hashMap.set("cat", 25);
// hashMap.set("fat", 25);
// hashMap.set("jhon", 25);
// hashMap.set("malkovich", 25);
// hashMap.set("r", 25);
hashMap.set({}, 25);
hashMap.set({}, 25);
hashMap.set({}, 25);

// hashMap.set("fat", 255);
// hashMap.set(0, 255);

hashMap.log();
