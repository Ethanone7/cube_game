interface ArrayType {
  [key: number]: boolean[][];
}

export const DEFAULT_ARRAYS: ArrayType = {
  0: [[true]],
  1: [[true], [true]],
  2: [[true], [true], [true]],
  3: [[true], [true], [true], [true]],
  4: [[true], [true], [true], [true], [true]],
  5: [[true, true]],
  6: [[true, true, true]],
  7: [[true, true, true, true]],
  8: [[true, true, true, true, true]],
  9: [
    [true, true],
    [true, false],
  ],
  10: [
    [true, true],
    [false, true],
  ],
  11: [
    [true, false],
    [true, true],
  ],
  12: [
    [false, true],
    [true, true],
  ],
  13: [
    [true, true],
    [true, true],
  ],
  14: [
    [true, false],
    [true, false],
    [true, true],
  ],
  15: [
    [false, true],
    [false, true],
    [true, true],
  ],
  16: [
    [true, true],
    [true, false],
    [true, false],
  ],
  17: [
    [true, true],
    [false, true],
    [false, true],
  ],
  18: [
    [true, false, false],
    [true, true, true],
  ],
  19: [
    [false, false, true],
    [true, true, true],
  ],
  20: [
    [true, true, true],
    [true, false, false],
  ],
  21: [
    [true, true, true],
    [false, false, true],
  ],
  22: [
    [true, false, false],
    [true, false, false],
    [true, true, true],
  ],
  23: [
    [false, false, true],
    [false, false, true],
    [true, true, true],
  ],
  24: [
    [true, true, true],
    [true, false, false],
    [true, false, false],
  ],
  25: [
    [true, true, true],
    [false, false, true],
    [false, false, true],
  ],
  26: [
    [true, false, true],
    [true, true, true],
  ],
  27: [
    [true, true, true],
    [true, false, true],
  ],
  28: [
    [true, false, true],
    [true, true, true],
  ],
  29: [
    [true, true, true],
    [true, false, true],
  ],
  30: [
    [true, false],
    [false, true],
  ],
  31: [
    [false, true],
    [true, false],
  ],
  32: [
    [true, false, false],
    [false, true, false],
    [false, false, true],
  ],
  33: [
    [false, false, true],
    [false, true, false],
    [true, false, false],
  ],
};

export const TOTAL_SIZE = 34;
export const SMALL_CUBE_WIDTH = 30;
export const MID_CUBE_WIDTH = 45;
