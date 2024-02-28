import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../src'
import { columnDocument } from '../../../../__fixtures__/columnDocument'

const COMBINATIONS: {
  index: number
  topBorderStyle: SelectiveBorderStyle
  bottomBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    index: 0,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'single', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              │`
  },
  {
    index: 1,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'single-round', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              │`
  },
  {
    index: 2,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ┃`
  },
  {
    index: 3,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'double', undefined, undefined],
    result: `
Hello              │
───────────────────╢
World              ║`
  },
  {
    index: 4,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'dash-2', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              ╎`
  },
  {
    index: 5,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ╏`
  },
  {
    index: 6,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'dash-3', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              ┆`
  },
  {
    index: 7,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ┇`
  },
  {
    index: 8,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'dash-4', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              ┊`
  },
  {
    index: 9,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ┋`
  },
  {
    index: 10,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'single', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              │`
  },
  {
    index: 11,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'single-round', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              │`
  },
  {
    index: 12,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ┃`
  },
  {
    index: 13,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'double', undefined, undefined],
    result: `
Hello              │
───────────────────╢
World              ║`
  },
  {
    index: 14,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'dash-2', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              ╎`
  },
  {
    index: 15,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ╏`
  },
  {
    index: 16,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'dash-3', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              ┆`
  },
  {
    index: 17,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ┇`
  },
  {
    index: 18,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'dash-4', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              ┊`
  },
  {
    index: 19,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['single-round', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ┋`
  },
  {
    index: 20,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'single', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┥
World              │`
  },
  {
    index: 21,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'single-round', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┥
World              │`
  },
  {
    index: 22,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'thick', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┪
World              ┃`
  },
  {
    index: 23,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'double', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━╣
World              ║`
  },
  {
    index: 24,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'dash-2', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┥
World              ╎`
  },
  {
    index: 25,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┪
World              ╏`
  },
  {
    index: 26,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'dash-3', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┥
World              ┆`
  },
  {
    index: 27,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┪
World              ┇`
  },
  {
    index: 28,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'dash-4', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┥
World              ┊`
  },
  {
    index: 29,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['thick', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┪
World              ┋`
  },
  {
    index: 30,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'single', undefined, undefined],
    result: `
Hello              │
═══════════════════╡
World              │`
  },
  {
    index: 31,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'single-round', undefined, undefined],
    result: `
Hello              │
═══════════════════╡
World              │`
  },
  {
    index: 32,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'thick', undefined, undefined],
    result: `
Hello              │
═══════════════════┪
World              ┃`
  },
  {
    index: 33,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'double', undefined, undefined],
    result: `
Hello              │
═══════════════════╣
World              ║`
  },
  {
    index: 34,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'dash-2', undefined, undefined],
    result: `
Hello              │
═══════════════════╡
World              ╎`
  },
  {
    index: 35,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
═══════════════════┪
World              ╏`
  },
  {
    index: 36,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'dash-3', undefined, undefined],
    result: `
Hello              │
═══════════════════╡
World              ┆`
  },
  {
    index: 37,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
═══════════════════┪
World              ┇`
  },
  {
    index: 38,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'dash-4', undefined, undefined],
    result: `
Hello              │
═══════════════════╡
World              ┊`
  },
  {
    index: 39,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['double', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
═══════════════════┪
World              ┋`
  },
  {
    index: 40,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'single', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
World              │`
  },
  {
    index: 41,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'single-round', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
World              │`
  },
  {
    index: 42,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'thick', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┧
World              ┃`
  },
  {
    index: 43,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'double', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╢
World              ║`
  },
  {
    index: 44,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'dash-2', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
World              ╎`
  },
  {
    index: 45,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┧
World              ╏`
  },
  {
    index: 46,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'dash-3', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
World              ┆`
  },
  {
    index: 47,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┧
World              ┇`
  },
  {
    index: 48,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'dash-4', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┤
World              ┊`
  },
  {
    index: 49,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┧
World              ┋`
  },
  {
    index: 50,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'single', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┥
World              │`
  },
  {
    index: 51,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'single-round', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┥
World              │`
  },
  {
    index: 52,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'thick', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┪
World              ┃`
  },
  {
    index: 53,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'double', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╣
World              ║`
  },
  {
    index: 54,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'dash-2', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┥
World              ╎`
  },
  {
    index: 55,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┪
World              ╏`
  },
  {
    index: 56,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'dash-3', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┥
World              ┆`
  },
  {
    index: 57,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┪
World              ┇`
  },
  {
    index: 58,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'dash-4', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┥
World              ┊`
  },
  {
    index: 59,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-2-thick', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┪
World              ┋`
  },
  {
    index: 60,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'single', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┤
World              │`
  },
  {
    index: 61,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'single-round', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┤
World              │`
  },
  {
    index: 62,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'thick', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┧
World              ┃`
  },
  {
    index: 63,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'double', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╢
World              ║`
  },
  {
    index: 64,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'dash-2', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┤
World              ╎`
  },
  {
    index: 65,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┧
World              ╏`
  },
  {
    index: 66,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'dash-3', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┤
World              ┆`
  },
  {
    index: 67,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┧
World              ┇`
  },
  {
    index: 68,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'dash-4', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┤
World              ┊`
  },
  {
    index: 69,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┧
World              ┋`
  },
  {
    index: 70,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'single', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┥
World              │`
  },
  {
    index: 71,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'single-round', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┥
World              │`
  },
  {
    index: 72,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'thick', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┪
World              ┃`
  },
  {
    index: 73,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'double', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╣
World              ║`
  },
  {
    index: 74,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'dash-2', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┥
World              ╎`
  },
  {
    index: 75,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┪
World              ╏`
  },
  {
    index: 76,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'dash-3', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┥
World              ┆`
  },
  {
    index: 77,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┪
World              ┇`
  },
  {
    index: 78,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'dash-4', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┥
World              ┊`
  },
  {
    index: 79,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-3-thick', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┪
World              ┋`
  },
  {
    index: 80,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'single', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┤
World              │`
  },
  {
    index: 81,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'single-round', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┤
World              │`
  },
  {
    index: 82,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'thick', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┧
World              ┃`
  },
  {
    index: 83,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'double', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╢
World              ║`
  },
  {
    index: 84,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'dash-2', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┤
World              ╎`
  },
  {
    index: 85,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┧
World              ╏`
  },
  {
    index: 86,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'dash-3', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┤
World              ┆`
  },
  {
    index: 87,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┧
World              ┇`
  },
  {
    index: 88,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'dash-4', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┤
World              ┊`
  },
  {
    index: 89,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┧
World              ┋`
  },
  {
    index: 90,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'single', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┥
World              │`
  },
  {
    index: 91,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'single-round', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┥
World              │`
  },
  {
    index: 92,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'thick', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┪
World              ┃`
  },
  {
    index: 93,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'double', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉╣
World              ║`
  },
  {
    index: 94,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'dash-2', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┥
World              ╎`
  },
  {
    index: 95,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'dash-2-thick', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┪
World              ╏`
  },
  {
    index: 96,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'dash-3', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┥
World              ┆`
  },
  {
    index: 97,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'dash-3-thick', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┪
World              ┇`
  },
  {
    index: 98,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'dash-4', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┥
World              ┊`
  },
  {
    index: 99,
    topBorderStyle: [undefined, 'single-round', 'dash-2', undefined],
    bottomBorderStyle: ['dash-4-thick', 'dash-4-thick', undefined, undefined],
    result: `
Hello              │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┪
World              ┋`
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the join combination [${currentCombination.index}] {${currentCombination.topBorderStyle}} {${currentCombination.bottomBorderStyle}}`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(
        columnDocument([
          { border: [false, true, true, false], borderStyle: currentCombination.topBorderStyle },
          { border: [true, true, false, false], borderStyle: currentCombination.bottomBorderStyle }
        ])
      )

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
