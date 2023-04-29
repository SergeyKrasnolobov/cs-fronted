const sizesMap = {
  utf16: 16,
  ascii: 8,
  u32: 32,
  u16: 16,
  u8: 8,
  boolean: 1,
};

const normalizeSchema = (schema) => {
  let startBitIndex = 0;
  return schema.reduce((acc, [key, type, size], index) => {
    acc[key] = { type, key, size, typeSize: sizesMap[type], startBitIndex };
    startBitIndex += size ?? 1;
    return acc;
  }, {});
};

const getMaxByteSize = (nSchema) => Math.max(...Object.values(nSchema).map(({ typeSize }) => typeSize));

const Structure = (schema) => {
  const obj = {};
  const normalizedSchema = normalizeSchema(schema);
  const byteSize = getMaxByteSize(normalizedSchema);
  const lengthBuffer = schema.reduce((acc, [key, type, size]) => {
    return (acc += normalizedSchema[key].size ?? 1);
  }, 0);
  const buffer = new globalThis[`Uint${byteSize}Array`](lengthBuffer);

  schema.forEach(([key, type, size]) => {
    let startBitIndex = normalizedSchema[key].startBitIndex;
    Object.defineProperty(obj, key, {
      enumerable: true,
      set(value) {
        if (value.length > size) throw new Error("Value length should be equal schema size " + size);
        if (type === "utf16" || type === "ascii") {
          [...value].forEach((char, i) => {
            if (char.length === 2) {
              buffer[startBitIndex++] |= (char.charCodeAt(0) & createMask(size)) << 0;
            } else {
              buffer[startBitIndex++] |= (char.charCodeAt(0) & createMask(size)) << 0;
            }
          });
        } else {
          buffer[startBitIndex++] |= (value & createMask(size)) << 0;
        }
      },
      get() {
        let value;
        if (type === "utf16" || type === "ascii") {
          value = "";
          for (let i = 0; i < size; i++) {
            const code = (buffer[startBitIndex++] & createMask(size)) >> 0;
            value += code !== 0 ? String.fromCharCode(code) : "";
          }
        } else {
          value = (buffer[startBitIndex++] & createMask(size, 0)) >> 0;
        }
        return value;
      },
    });
  });

  return obj;
};

const schema = [
  ["name", "utf16", 10], // Число - это максимальное количество символов
  ["lastName", "utf16", 10],
  ["age", "u16"], // uint16
];
const pirat = Structure(schema);

pirat.age = 10;
pirat.name = "Jhon";
pirat.lastName = "Malckovich";

pirat.lastName; //Malckovich
