function bitGetter(arr: Uint8Array) {
  const get = (byteIndex: number, bitIndex: number): number => {
    return (arr[byteIndex] & (1 << bitIndex)) !== 0 ? 1 : 0;
  };
  return { get };
}

function bitAccessor(arr: Uint8Array) {
  const get = (byteIndex: number, bitIndex: number): number => {
    return (arr[byteIndex] & (1 << bitIndex)) !== 0 ? 1 : 0;
  };
  const set = (byteIndex: number, bitIndex: number, value: number): void => {
    if (value) {
      arr[byteIndex] |= 1 << bitIndex;
    } else {
      arr[byteIndex] &= ~(1 << bitIndex);
    }
  };
  return { get, set };
}

const _bitGetter = bitGetter(new Uint8Array([0b1110, 0b1101]));

console.log(_bitGetter.get(0, 1));
console.log(_bitGetter.get(1, 1));

const _bitAccessor = bitAccessor(new Uint8Array([0b1110, 0b1101]));

console.log(_bitAccessor.set(0, 1, 0));
console.log(_bitAccessor.get(0, 1));
