import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../src'
import { rowDocument } from '../../../../__fixtures__/rowDocument'

const COMBINATIONS: {
  index: number
  leftBorderStyle: SelectiveBorderStyle
  rightBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    index: 0,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 1,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 2,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 3,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 4,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 5,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 6,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 7,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 8,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 9,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 10,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 11,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 12,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 13,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 14,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 15,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 16,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 17,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 18,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 19,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┭─────────
Hello     │World    `
  },
  {
    index: 20,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 21,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 22,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 23,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 24,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 25,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 26,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 27,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 28,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 29,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┯━━━━━━━━━
Hello     │World    `
  },
  {
    index: 30,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 31,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 32,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 33,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 34,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 35,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 36,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 37,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 38,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 39,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┭═════════
Hello     │World    `
  },
  {
    index: 40,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 41,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 42,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 43,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 44,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 45,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 46,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 47,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 48,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 49,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┭╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 50,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 51,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 52,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 53,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 54,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 55,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 56,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 57,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 58,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 59,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┯╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 60,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 61,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 62,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 63,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 64,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 65,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 66,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 67,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 68,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 69,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┭┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 70,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 71,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 72,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 73,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 74,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 75,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 76,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 77,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 78,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 79,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┯┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 80,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 81,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 82,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 83,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 84,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 85,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 86,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 87,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 88,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 89,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┭┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 90,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'single'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 91,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'single-round'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 92,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'thick'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 93,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'double'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 94,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-2'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 95,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-2-thick'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 96,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-3'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 97,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-3-thick'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 98,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-4'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 99,
    leftBorderStyle: ['thick', 'single-round', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-4-thick'],
    result: `
━━━━━━━━━━┯┉┉┉┉┉┉┉┉┉
Hello     │World    `
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the join combination [${currentCombination.index}] {${currentCombination.leftBorderStyle}} {${currentCombination.rightBorderStyle}}`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(
        rowDocument([
          { border: [true, true, false, false], borderStyle: currentCombination.leftBorderStyle },
          { border: [true, false, false, true], borderStyle: currentCombination.rightBorderStyle }
        ])
      )

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
