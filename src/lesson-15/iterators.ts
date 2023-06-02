export const random = (min: number, max: number) => {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return { done: false, value: Math.floor(Math.random() * (max - min) + min) };
    },
  };
};

export const take = (iterable: Iterable<any>, count: number) => {
  let cursor = 0;
  const iter = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (cursor >= count) {
        return { done: true, value: undefined };
      }
      cursor++;
      return iter.next();
    },
  };
};

export const takeWithFilter = (iterable: Iterable<any>, filter: (val: any) => boolean, count: number) => {
  let cursor = 0;
  const iter = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      //Делаем работу пока курсор не равен счетчику элементов - count
      if (cursor >= count) {
        return { done: true, value: undefined };
      }
      let found = false;

      while (!found) {
        const { value, done } = iter.next();
        //Если внутренний итератор iterable объекта закончился, то прекращаем работу
        if (done) {
          return { done: true, value: value };
        }
        //Цикл while работает пока предикативная функция не вернет true для текущего элемента
        if (filter(value)) {
          cursor++;
          //Нашли элемент, подходящий под условие, то переключаем флаг и возвращаем значение
          found = true;
          return { done: false, value };
        }
      }
    },
  };
};

export const enumerate = (iterable: Iterable<any>) => {
  const iter = iterable[Symbol.iterator]();
  let cursor = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const { value, done } = iter.next();
      if (done) {
        return { done, value: undefined };
      }
      return { done: false, value: [cursor++, value] };
    },
  };
};

class Range {
  private range;
  private cursor: number;
  from;
  direction: "front" | "back";
  constructor(from: string | number, to: string | number) {
    this.#validateArgs(from, to);
    this.from = from;
    this.direction = "front";
    this.range = this.#createRange(from, to);
    this.cursor = this.range.from;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    switch (this.direction) {
      case "back": {
        if (this.cursor! >= this.range.from!) {
          return { done: false, value: this.#isString(this.from) ? this.#makeLatter(this.cursor--) : this.cursor-- };
        }
        return { done: true, value: undefined };
      }
      default: {
        if (this.cursor! <= this.range.to!) {
          return { done: false, value: this.#isString(this.from) ? this.#makeLatter(this.cursor++) : this.cursor++ };
        }
        return { done: true, value: undefined };
      }
    }
  }
  reverse() {
    this.direction = this.direction === "back" ? "front" : "back";
    this.cursor = this.direction === "back" ? this.range.to : this.range.from;
    return this;
  }

  #createRange(from: string | number, to: string | number) {
    if (this.#isString(from)) {
      return { from: (from as string).codePointAt(0)!, to: (to as string).codePointAt(0)! };
    }
    return { from: from as number, to: to as number };
  }

  #makeLatter(symbol: number) {
    return String.fromCodePoint(symbol);
  }

  #isString(symbol: any) {
    return typeof symbol === "string";
  }
  #isNumber(symbol: any) {
    return typeof symbol === "number";
  }

  #isLetter(symbol: string) {
    if (!(65 <= symbol.codePointAt(0)! && symbol.codePointAt(0)! <= 122)) {
      throw new TypeError("Допустимы только латинские буквы");
    }
  }
  #isSameType(first: string | number, second: string | number) {
    if ((this.#isNumber(first) && !this.#isNumber(second)) || (this.#isString(first) && !this.#isString(second))) {
      throw new TypeError("Значения диапазонов должны быть одного типа");
    }
  }

  #validateArgs(from: string | number, to: string | number) {
    //Проверка равенства типов
    this.#isSameType(from, to);

    //Проверка диапазонов латинских букв 65 - 122
    if (typeof from === "string" && typeof to === "string") {
      const symbols = [from, to];
      while (symbols.length) {
        this.#isLetter(symbols.pop()!);
      }
    }
  }
}

const range = new Range(-5, 10);

export const seq = (...iterable: Iterable<any>[]) => {
  const argsLength = iterable.length;
  let currentIterCursor = 0;
  let currentIter = iterable[currentIterCursor][Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const { value, done } = currentIter.next();

      if (done && currentIterCursor === argsLength - 1) {
        return { done, value: undefined };
      }
      if (done) {
        currentIterCursor++;
        currentIter = iterable[currentIterCursor][Symbol.iterator]();
        //Сразу возвращаем первое значение из следующего итератора
        return currentIter.next();
      }
      return { done: false, value: value };
    },
  };
};

export const zip = (...iterable: Iterable<any>[]) => {
  const iterPool = Array.from(iterable, (iter) => iter[Symbol.iterator]());
  let zippedValues: any[] = [];
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      zippedValues = [];
      for (const iter of iterPool) {
        const { done, value } = iter.next();
        if (done) {
          return { done, value: undefined };
        }
        zippedValues.push(value);
      }
      return { done: false, value: zippedValues };
    },
  };
};

const _zip = zip([1, 2, 4], new Set([3, 4]), "bl4");
