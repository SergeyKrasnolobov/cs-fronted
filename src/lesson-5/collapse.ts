export const collapseRecursive = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};

  function traverse(obj: Record<string, any>, flatKey = "") {
    if (typeof obj !== "object") {
      result[flatKey] = obj;
      return;
    } else {
      for (let key in obj) {
        let newKey = flatKey === "" ? key : flatKey + `.${key}`;
        traverse(obj[key], newKey);
      }
    }
  }
  traverse(obj);
  return result;
};

const obj = {
  a: {
    d: 2,
    d2: { "2": 2 },
    b: [1, 2, 3],
    "": {
      c: 2,
      g: {
        i: 34,
      },
    },
  },
};

export const collapseOnQueue = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};
  const stack: any[] = Object.entries(obj);

  const createKey = (key: string, prefix: string) => (prefix ? `${prefix}.${key}` : key);

  while (stack.length) {
    const [key, value] = stack.pop();
    if (typeof value !== "object") {
      result[key] = value;
    }
    const initialKey = createKey(key, "");
    const entries = Object.entries(value);
    for (const [key, _value] of entries) {
      stack.unshift([createKey(key, initialKey), _value]);
    }
  }
  return result;
};

collapseRecursive(obj);
collapseOnQueue(obj);
