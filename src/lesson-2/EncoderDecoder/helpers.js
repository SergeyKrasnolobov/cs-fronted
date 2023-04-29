export const normalizedSchema = (schema) =>
  schema.reduce((acc, [size, type], index) => {
    if (type === "ascii") {
      if (size % 8 !== 0) throw new Error();
      const viewSize = size / 8;
      for (let i = 0; i < viewSize; i++) {
        acc[Object.keys(acc).length + 1] = { size: 8, type, parial: i !== 0 };
      }
    } else {
      acc[index] = { size, partial: false, type };
    }
    return acc;
  }, {});

export const getMaxViewSize = (nSchema) => {
  const sizes = Object.values(nSchema).map(({ size }) => size);
  return Math.max(...sizes);
};

export const getBitOffsets = (nSchema) => {
  const maxViewSize = getMaxViewSize(nSchema);
  let bitOffset = 0;
  let byteIndex = 0;
  const flattenSchema = Object.values(nSchema);
  flattenSchema.forEach((curr, index) => {
    if (bitOffset + curr.size < maxViewSize) {
      curr["bitOffset"] = bitOffset;
      curr["byteIndex"] = byteIndex;
      bitOffset += curr.size;
    } else {
      bitOffset = 0;
      byteIndex += 1;
      curr["bitOffset"] = bitOffset;
      curr["byteIndex"] = byteIndex;
    }
  });

  return flattenSchema;
};

export const createMask = (size, offset = 0) => {
  return ((2 ** 32 - 1) >>> (32 - size)) << offset;
};

export function* dataIterator(data) {
  for (let el of data) {
    if (typeof el === "string") {
      yield* el;
    } else {
      yield el;
    }
  }
}
