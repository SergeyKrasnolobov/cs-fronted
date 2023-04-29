export { normalizedSchema, getBitOffsets, getMaxViewSize, dataIterator } from "./helpers";

const schema = [
  [3, "number"],
  [2, "number"],
  [1, "boolean"],
  [1, "boolean"],
  [16, "ascii"],
];

const encode = (data, schema) => {
  const nSchema = normalizedSchema(schema);
  const offsets = getBitOffsets(nSchema);

  const size = getMaxViewSize(nSchema);
  const dataIter = dataIterator(data);
  const buffer = new globalThis[`Uint${size}Array`](offsets.at(-1).byteIndex + 1);

  offsets.forEach(({ type, size, bitOffset, byteIndex }) => {
    const { value, done } = dataIter.next();
    if (done) {
      throw new Error();
    }
    const valueData = type === "ascii" ? value.charCodeAt(0) : value;

    buffer[byteIndex] |= (valueData & createMask(size)) << bitOffset;
  });
  return buffer.buffer;
};

const decode = (data, schema) => {
  const nSchema = normalizedSchema(schema);
  const offsets = getBitOffsets(nSchema);

  const size = getMaxViewSize(nSchema);
  const dataIter = dataIterator(data);
  const buffer = new globalThis[`Uint${size}Array`](data);
  const result = [];
  offsets.forEach(({ size, bitOffset, byteIndex }) => {
    result.push((buffer[byteIndex] & createMask(size, bitOffset)) >> bitOffset);
  });
  return result;
};

decode(encode([2, 3, true, false, "ab", "ab"], schema), schema);
