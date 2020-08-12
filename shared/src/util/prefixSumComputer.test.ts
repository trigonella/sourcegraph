import {
  PrefixSumComputer,
  PrefixSumIndexOfResult,
  toUint32
} from "./prefixSumComputer";

// Adapted from
// https://github.com/Microsoft/vscode/blob/7a07992127a6ff176f0ed073d0698d81d09fc4bb/src/vs/editor/test/common/viewModel/prefixSumComputer.test.ts.
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT License.

describe("PrefixSumComputer", () => {
  test("PrefixSumComputer", () => {
    let indexOfResult: PrefixSumIndexOfResult;

    const psc = new PrefixSumComputer(toUint32Array([1, 1, 2, 1, 3]));
    expect(psc.getTotalValue()).toBe(8);
    expect(psc.getAccumulatedValue(-1)).toBe(0);
    expect(psc.getAccumulatedValue(0)).toBe(1);
    expect(psc.getAccumulatedValue(1)).toBe(2);
    expect(psc.getAccumulatedValue(2)).toBe(4);
    expect(psc.getAccumulatedValue(3)).toBe(5);
    expect(psc.getAccumulatedValue(4)).toBe(8);
    indexOfResult = psc.getIndexOf(0);
    expect(indexOfResult.index).toBe(0);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(1);
    expect(indexOfResult.index).toBe(1);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(2);
    expect(indexOfResult.index).toBe(2);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(3);
    expect(indexOfResult.index).toBe(2);
    expect(indexOfResult.remainder).toBe(1);
    indexOfResult = psc.getIndexOf(4);
    expect(indexOfResult.index).toBe(3);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(5);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(6);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(1);
    indexOfResult = psc.getIndexOf(7);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(2);
    indexOfResult = psc.getIndexOf(8);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(3);

    // [1, 2, 2, 1, 3]
    psc.changeValue(1, 2);
    expect(psc.getTotalValue()).toBe(9);
    expect(psc.getAccumulatedValue(0)).toBe(1);
    expect(psc.getAccumulatedValue(1)).toBe(3);
    expect(psc.getAccumulatedValue(2)).toBe(5);
    expect(psc.getAccumulatedValue(3)).toBe(6);
    expect(psc.getAccumulatedValue(4)).toBe(9);

    // [1, 0, 2, 1, 3]
    psc.changeValue(1, 0);
    expect(psc.getTotalValue()).toBe(7);
    expect(psc.getAccumulatedValue(0)).toBe(1);
    expect(psc.getAccumulatedValue(1)).toBe(1);
    expect(psc.getAccumulatedValue(2)).toBe(3);
    expect(psc.getAccumulatedValue(3)).toBe(4);
    expect(psc.getAccumulatedValue(4)).toBe(7);
    indexOfResult = psc.getIndexOf(0);
    expect(indexOfResult.index).toBe(0);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(1);
    expect(indexOfResult.index).toBe(2);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(2);
    expect(indexOfResult.index).toBe(2);
    expect(indexOfResult.remainder).toBe(1);
    indexOfResult = psc.getIndexOf(3);
    expect(indexOfResult.index).toBe(3);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(4);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(5);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(1);
    indexOfResult = psc.getIndexOf(6);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(2);
    indexOfResult = psc.getIndexOf(7);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(3);

    // [1, 0, 0, 1, 3]
    psc.changeValue(2, 0);
    expect(psc.getTotalValue()).toBe(5);
    expect(psc.getAccumulatedValue(0)).toBe(1);
    expect(psc.getAccumulatedValue(1)).toBe(1);
    expect(psc.getAccumulatedValue(2)).toBe(1);
    expect(psc.getAccumulatedValue(3)).toBe(2);
    expect(psc.getAccumulatedValue(4)).toBe(5);
    indexOfResult = psc.getIndexOf(0);
    expect(indexOfResult.index).toBe(0);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(1);
    expect(indexOfResult.index).toBe(3);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(2);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(3);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(1);
    indexOfResult = psc.getIndexOf(4);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(2);
    indexOfResult = psc.getIndexOf(5);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(3);

    // [1, 0, 0, 0, 3]
    psc.changeValue(3, 0);
    expect(psc.getTotalValue()).toBe(4);
    expect(psc.getAccumulatedValue(0)).toBe(1);
    expect(psc.getAccumulatedValue(1)).toBe(1);
    expect(psc.getAccumulatedValue(2)).toBe(1);
    expect(psc.getAccumulatedValue(3)).toBe(1);
    expect(psc.getAccumulatedValue(4)).toBe(4);
    indexOfResult = psc.getIndexOf(0);
    expect(indexOfResult.index).toBe(0);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(1);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(2);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(1);
    indexOfResult = psc.getIndexOf(3);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(2);
    indexOfResult = psc.getIndexOf(4);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(3);

    // [1, 1, 0, 1, 1]
    psc.changeValue(1, 1);
    psc.changeValue(3, 1);
    psc.changeValue(4, 1);
    expect(psc.getTotalValue()).toBe(4);
    expect(psc.getAccumulatedValue(0)).toBe(1);
    expect(psc.getAccumulatedValue(1)).toBe(2);
    expect(psc.getAccumulatedValue(2)).toBe(2);
    expect(psc.getAccumulatedValue(3)).toBe(3);
    expect(psc.getAccumulatedValue(4)).toBe(4);
    indexOfResult = psc.getIndexOf(0);
    expect(indexOfResult.index).toBe(0);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(1);
    expect(indexOfResult.index).toBe(1);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(2);
    expect(indexOfResult.index).toBe(3);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(3);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(0);
    indexOfResult = psc.getIndexOf(4);
    expect(indexOfResult.index).toBe(4);
    expect(indexOfResult.remainder).toBe(1);
  });
});

function toUint32Array(array: number[]): Uint32Array {
  const length = array.length;
  const uint32Array = new Uint32Array(length);
  for (let index = 0; index < length; index++) {
    uint32Array[index] = toUint32(array[index]);
  }
  return uint32Array;
}
