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
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 1,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 2,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 3,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 4,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 5,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 6,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 7,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 8,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 9,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 10,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 11,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 12,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 13,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 14,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 15,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 16,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 17,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 18,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 19,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬─────────
Hello     ┊World    `
  },
  {
    index: 20,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 21,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 22,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 23,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 24,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 25,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 26,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 27,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 28,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 29,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮━━━━━━━━━
Hello     ┊World    `
  },
  {
    index: 30,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 31,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 32,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 33,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 34,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 35,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 36,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 37,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 38,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 39,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬═════════
Hello     ┊World    `
  },
  {
    index: 40,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 41,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 42,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 43,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 44,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 45,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 46,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 47,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 48,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 49,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬╌╌╌╌╌╌╌╌╌
Hello     ┊World    `
  },
  {
    index: 50,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 51,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 52,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 53,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 54,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 55,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 56,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 57,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 58,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 59,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮╍╍╍╍╍╍╍╍╍
Hello     ┊World    `
  },
  {
    index: 60,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 61,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 62,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 63,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 64,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 65,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 66,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 67,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 68,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 69,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┄┄┄┄┄┄┄┄┄
Hello     ┊World    `
  },
  {
    index: 70,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 71,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 72,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 73,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 74,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 75,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 76,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 77,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 78,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 79,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┅┅┅┅┅┅┅┅┅
Hello     ┊World    `
  },
  {
    index: 80,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 81,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 82,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 83,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 84,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 85,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 86,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 87,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 88,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 89,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┬┈┈┈┈┈┈┈┈┈
Hello     ┊World    `
  },
  {
    index: 90,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'single'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
  },
  {
    index: 91,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'single-round'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
  },
  {
    index: 92,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
  },
  {
    index: 93,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'double'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
  },
  {
    index: 94,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-2'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
  },
  {
    index: 95,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-2-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
  },
  {
    index: 96,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-3'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
  },
  {
    index: 97,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-3-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
  },
  {
    index: 98,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-4'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
  },
  {
    index: 99,
    leftBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    rightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-4-thick'],
    result: `
┈┈┈┈┈┈┈┈┈┈┮┉┉┉┉┉┉┉┉┉
Hello     ┊World    `
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
