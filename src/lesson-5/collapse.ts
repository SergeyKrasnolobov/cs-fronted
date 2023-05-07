export const collapse = (obj: Record<string, any>) => {
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

collapse(obj);
