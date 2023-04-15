"use strict";
function bitGetter(arr) {
    const get = (byteIndex, bitIndex) => {
        return (arr[byteIndex] & (1 << bitIndex)) !== 0 ? 1 : 0;
    };
    return { get };
}
function bitAccessor(arr) {
    const get = (byteIndex, bitIndex) => {
        return (arr[byteIndex] & (1 << bitIndex)) !== 0 ? 1 : 0;
    };
    const set = (byteIndex, bitIndex, value) => {
        if (value) {
            arr[byteIndex] |= 1 << bitIndex;
        }
        else {
            arr[byteIndex] &= ~(1 << bitIndex);
        }
    };
    return { get, set };
}
function circularShift(Uint8Array) {
    const leftShift = (byteIndex, shiftOffset, base = 8) => {
        if (shiftOffset > base) {
            throw new Error("Offset cant be greater of base");
        }
        const lshiftedByte = (Uint8Array[byteIndex] << shiftOffset) | (Uint8Array[byteIndex] >>> (base - shiftOffset));
        const prev = Uint8Array[byteIndex].toString(2);
        Uint8Array[byteIndex] &= 0;
        Uint8Array[byteIndex] |= lshiftedByte;
        const _new = Uint8Array[byteIndex].toString(2);
        console.log({ prev: base - prev.length });
        return { prev: "".padStart(base - prev.length, "0") + prev, new: "".padStart(base - _new.length, "0") + _new };
    };
    const rightShift = (byteIndex, shiftOffset, base = 8) => {
        if (shiftOffset > base) {
            throw new Error("Offset cant be greater of base");
        }
        const rshiftedByte = (Uint8Array[byteIndex] >> shiftOffset) | (Uint8Array[byteIndex] << (base - shiftOffset));
        return rshiftedByte;
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
