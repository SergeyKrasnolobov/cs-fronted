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
function circularShift(Uint8Array: Uint8Array) {
  const leftShift = (byteIndex: number, shiftOffset: number, base: 8 | 16 | 32 = 8) => {
    if (shiftOffset > base) {
      throw new Error("Offset cant be greater of base");
    }
    const lshiftedByte = (Uint8Array[byteIndex] << shiftOffset) | (Uint8Array[byteIndex] >>> (base - shiftOffset));
    const prev = Uint8Array[byteIndex].toString(2);
    Uint8Array[byteIndex] &= 0;
    Uint8Array[byteIndex] |= lshiftedByte;
    const _new = Uint8Array[byteIndex].toString(2);
    return { prev: "".padStart(base - prev.length, "0") + prev, new: "".padStart(base - _new.length, "0") + _new };
  };
  const rightShift = (byteIndex: number, shiftOffset: number, base: 8 | 16 | 32 = 8) => {
    if (shiftOffset > base) {
      throw new Error("Offset cant be greater of base");
    }
    const rshiftedByte = (Uint8Array[byteIndex] >> shiftOffset) | (Uint8Array[byteIndex] << (base - shiftOffset));

    const prev = Uint8Array[byteIndex].toString(2);
    Uint8Array[byteIndex] &= 0;
    Uint8Array[byteIndex] |= rshiftedByte;
    const _new = Uint8Array[byteIndex].toString(2);
    return { prev: "".padStart(base - prev.length, "0") + prev, new: "".padStart(base - _new.length, "0") + _new };
  };
  return { leftShift, rightShift };
}

const _bitGetter = bitGetter(new Uint8Array([0b1110, 0b1101]));

console.log(_bitGetter.get(0, 1));
console.log(_bitGetter.get(1, 1));

const _bitAccessor = bitAccessor(new Uint8Array([0b1110, 0b1101]));

console.log(_bitAccessor.set(0, 1, 0));
console.log(_bitAccessor.get(0, 1));

const shift = circularShift(new Uint8Array([0b1110, 0b1101]));
console.log(shift.leftShift(0, 7));
