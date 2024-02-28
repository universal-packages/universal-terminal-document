import stripAnsi from 'strip-ansi'

import { SelectiveBorder, SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { index: number; border: SelectiveBorder; borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    index: 0,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'single', undefined],
    result: `
Hello World        │
───────────────────┘`
  },
  {
    index: 1,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'single', undefined],
    result: `
Hello World        │
───────────────────╯`
  },
  {
    index: 2,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'single', undefined],
    result: `
Hello World        ┃
───────────────────┚`
  },
  {
    index: 3,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'single', undefined],
    result: `
Hello World        ║
───────────────────╜`
  },
  {
    index: 4,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'single', undefined],
    result: `
Hello World        ╎
───────────────────┘`
  },
  {
    index: 5,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'single', undefined],
    result: `
Hello World        ╏
───────────────────┚`
  },
  {
    index: 6,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'single', undefined],
    result: `
Hello World        ┆
───────────────────┘`
  },
  {
    index: 7,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'single', undefined],
    result: `
Hello World        ┇
───────────────────┚`
  },
  {
    index: 8,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'single', undefined],
    result: `
Hello World        ┊
───────────────────┘`
  },
  {
    index: 9,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'single', undefined],
    result: `
Hello World        ┋
───────────────────┚`
  },
  {
    index: 10,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'single-round', undefined],
    result: `
Hello World        │
───────────────────╯`
  },
  {
    index: 11,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'single-round', undefined],
    result: `
Hello World        │
───────────────────╯`
  },
  {
    index: 12,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'single-round', undefined],
    result: `
Hello World        ┃
───────────────────┚`
  },
  {
    index: 13,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'single-round', undefined],
    result: `
Hello World        ║
───────────────────╜`
  },
  {
    index: 14,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'single-round', undefined],
    result: `
Hello World        ╎
───────────────────╯`
  },
  {
    index: 15,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'single-round', undefined],
    result: `
Hello World        ╏
───────────────────┚`
  },
  {
    index: 16,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'single-round', undefined],
    result: `
Hello World        ┆
───────────────────╯`
  },
  {
    index: 17,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'single-round', undefined],
    result: `
Hello World        ┇
───────────────────┚`
  },
  {
    index: 18,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'single-round', undefined],
    result: `
Hello World        ┊
───────────────────╯`
  },
  {
    index: 19,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'single-round', undefined],
    result: `
Hello World        ┋
───────────────────┚`
  },
  {
    index: 20,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'thick', undefined],
    result: `
Hello World        │
━━━━━━━━━━━━━━━━━━━┙`
  },
  {
    index: 21,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'thick', undefined],
    result: `
Hello World        │
━━━━━━━━━━━━━━━━━━━╯`
  },
  {
    index: 22,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'thick', undefined],
    result: `
Hello World        ┃
━━━━━━━━━━━━━━━━━━━┛`
  },
  {
    index: 23,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'thick', undefined],
    result: `
Hello World        ║
━━━━━━━━━━━━━━━━━━━╝`
  },
  {
    index: 24,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'thick', undefined],
    result: `
Hello World        ╎
━━━━━━━━━━━━━━━━━━━┙`
  },
  {
    index: 25,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'thick', undefined],
    result: `
Hello World        ╏
━━━━━━━━━━━━━━━━━━━┛`
  },
  {
    index: 26,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'thick', undefined],
    result: `
Hello World        ┆
━━━━━━━━━━━━━━━━━━━┙`
  },
  {
    index: 27,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'thick', undefined],
    result: `
Hello World        ┇
━━━━━━━━━━━━━━━━━━━┛`
  },
  {
    index: 28,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'thick', undefined],
    result: `
Hello World        ┊
━━━━━━━━━━━━━━━━━━━┙`
  },
  {
    index: 29,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'thick', undefined],
    result: `
Hello World        ┋
━━━━━━━━━━━━━━━━━━━┛`
  },
  {
    index: 30,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'double', undefined],
    result: `
Hello World        │
═══════════════════╛`
  },
  {
    index: 31,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'double', undefined],
    result: `
Hello World        │
═══════════════════╯`
  },
  {
    index: 32,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'double', undefined],
    result: `
Hello World        ┃
═══════════════════┛`
  },
  {
    index: 33,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'double', undefined],
    result: `
Hello World        ║
═══════════════════╝`
  },
  {
    index: 34,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'double', undefined],
    result: `
Hello World        ╎
═══════════════════╛`
  },
  {
    index: 35,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'double', undefined],
    result: `
Hello World        ╏
═══════════════════┛`
  },
  {
    index: 36,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'double', undefined],
    result: `
Hello World        ┆
═══════════════════╛`
  },
  {
    index: 37,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'double', undefined],
    result: `
Hello World        ┇
═══════════════════┛`
  },
  {
    index: 38,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'double', undefined],
    result: `
Hello World        ┊
═══════════════════╛`
  },
  {
    index: 39,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'double', undefined],
    result: `
Hello World        ┋
═══════════════════┛`
  },
  {
    index: 40,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'dash-2', undefined],
    result: `
Hello World        │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘`
  },
  {
    index: 41,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'dash-2', undefined],
    result: `
Hello World        │
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╯`
  },
  {
    index: 42,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'dash-2', undefined],
    result: `
Hello World        ┃
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┚`
  },
  {
    index: 43,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'dash-2', undefined],
    result: `
Hello World        ║
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╜`
  },
  {
    index: 44,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'dash-2', undefined],
    result: `
Hello World        ╎
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘`
  },
  {
    index: 45,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'dash-2', undefined],
    result: `
Hello World        ╏
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┚`
  },
  {
    index: 46,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'dash-2', undefined],
    result: `
Hello World        ┆
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘`
  },
  {
    index: 47,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'dash-2', undefined],
    result: `
Hello World        ┇
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┚`
  },
  {
    index: 48,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'dash-2', undefined],
    result: `
Hello World        ┊
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘`
  },
  {
    index: 49,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'dash-2', undefined],
    result: `
Hello World        ┋
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┚`
  },
  {
    index: 50,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'dash-2-thick', undefined],
    result: `
Hello World        │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┙`
  },
  {
    index: 51,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'dash-2-thick', undefined],
    result: `
Hello World        │
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╯`
  },
  {
    index: 52,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'dash-2-thick', undefined],
    result: `
Hello World        ┃
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛`
  },
  {
    index: 53,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'dash-2-thick', undefined],
    result: `
Hello World        ║
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╝`
  },
  {
    index: 54,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'dash-2-thick', undefined],
    result: `
Hello World        ╎
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┙`
  },
  {
    index: 55,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'dash-2-thick', undefined],
    result: `
Hello World        ╏
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛`
  },
  {
    index: 56,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'dash-2-thick', undefined],
    result: `
Hello World        ┆
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┙`
  },
  {
    index: 57,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'dash-2-thick', undefined],
    result: `
Hello World        ┇
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛`
  },
  {
    index: 58,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'dash-2-thick', undefined],
    result: `
Hello World        ┊
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┙`
  },
  {
    index: 59,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'dash-2-thick', undefined],
    result: `
Hello World        ┋
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛`
  },
  {
    index: 60,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'dash-3', undefined],
    result: `
Hello World        │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘`
  },
  {
    index: 61,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'dash-3', undefined],
    result: `
Hello World        │
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯`
  },
  {
    index: 62,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'dash-3', undefined],
    result: `
Hello World        ┃
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┚`
  },
  {
    index: 63,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'dash-3', undefined],
    result: `
Hello World        ║
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╜`
  },
  {
    index: 64,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'dash-3', undefined],
    result: `
Hello World        ╎
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘`
  },
  {
    index: 65,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'dash-3', undefined],
    result: `
Hello World        ╏
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┚`
  },
  {
    index: 66,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'dash-3', undefined],
    result: `
Hello World        ┆
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘`
  },
  {
    index: 67,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'dash-3', undefined],
    result: `
Hello World        ┇
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┚`
  },
  {
    index: 68,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'dash-3', undefined],
    result: `
Hello World        ┊
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘`
  },
  {
    index: 69,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'dash-3', undefined],
    result: `
Hello World        ┋
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┚`
  },
  {
    index: 70,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'dash-3-thick', undefined],
    result: `
Hello World        │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┙`
  },
  {
    index: 71,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'dash-3-thick', undefined],
    result: `
Hello World        │
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╯`
  },
  {
    index: 72,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'dash-3-thick', undefined],
    result: `
Hello World        ┃
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┛`
  },
  {
    index: 73,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'dash-3-thick', undefined],
    result: `
Hello World        ║
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╝`
  },
  {
    index: 74,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'dash-3-thick', undefined],
    result: `
Hello World        ╎
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┙`
  },
  {
    index: 75,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'dash-3-thick', undefined],
    result: `
Hello World        ╏
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┛`
  },
  {
    index: 76,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'dash-3-thick', undefined],
    result: `
Hello World        ┆
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┙`
  },
  {
    index: 77,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'dash-3-thick', undefined],
    result: `
Hello World        ┇
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┛`
  },
  {
    index: 78,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'dash-3-thick', undefined],
    result: `
Hello World        ┊
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┙`
  },
  {
    index: 79,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'dash-3-thick', undefined],
    result: `
Hello World        ┋
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┛`
  },
  {
    index: 80,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'dash-4', undefined],
    result: `
Hello World        │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘`
  },
  {
    index: 81,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'dash-4', undefined],
    result: `
Hello World        │
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯`
  },
  {
    index: 82,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'dash-4', undefined],
    result: `
Hello World        ┃
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┚`
  },
  {
    index: 83,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'dash-4', undefined],
    result: `
Hello World        ║
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╜`
  },
  {
    index: 84,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'dash-4', undefined],
    result: `
Hello World        ╎
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘`
  },
  {
    index: 85,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'dash-4', undefined],
    result: `
Hello World        ╏
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┚`
  },
  {
    index: 86,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'dash-4', undefined],
    result: `
Hello World        ┆
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘`
  },
  {
    index: 87,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'dash-4', undefined],
    result: `
Hello World        ┇
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┚`
  },
  {
    index: 88,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'dash-4', undefined],
    result: `
Hello World        ┊
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘`
  },
  {
    index: 89,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'dash-4', undefined],
    result: `
Hello World        ┋
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┚`
  },
  {
    index: 90,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'dash-4-thick', undefined],
    result: `
Hello World        │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┙`
  },
  {
    index: 91,
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'dash-4-thick', undefined],
    result: `
Hello World        │
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉╯`
  },
  {
    index: 92,
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'dash-4-thick', undefined],
    result: `
Hello World        ┃
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┛`
  },
  {
    index: 93,
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'dash-4-thick', undefined],
    result: `
Hello World        ║
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉╝`
  },
  {
    index: 94,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2', 'dash-4-thick', undefined],
    result: `
Hello World        ╎
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┙`
  },
  {
    index: 95,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-2-thick', 'dash-4-thick', undefined],
    result: `
Hello World        ╏
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┛`
  },
  {
    index: 96,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3', 'dash-4-thick', undefined],
    result: `
Hello World        ┆
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┙`
  },
  {
    index: 97,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-3-thick', 'dash-4-thick', undefined],
    result: `
Hello World        ┇
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┛`
  },
  {
    index: 98,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4', 'dash-4-thick', undefined],
    result: `
Hello World        ┊
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┙`
  },
  {
    index: 99,
    border: [false, true, true, false],
    borderStyle: [undefined, 'dash-4-thick', 'dash-4-thick', undefined],
    result: `
Hello World        ┋
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┛`
  },

  {
    index: 100,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'single', undefined],
    result: `
Hello World         
────────────────────`
  },
  {
    index: 101,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'single-round', undefined],
    result: `
Hello World         
────────────────────`
  },
  {
    index: 102,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'thick', undefined],
    result: `
Hello World         
━━━━━━━━━━━━━━━━━━━━`
  },
  {
    index: 103,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'double', undefined],
    result: `
Hello World         
════════════════════`
  },
  {
    index: 104,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'dash-2', undefined],
    result: `
Hello World         
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 105,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'dash-2-thick', undefined],
    result: `
Hello World         
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 106,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'dash-3', undefined],
    result: `
Hello World         
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 107,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'dash-3-thick', undefined],
    result: `
Hello World         
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 108,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'dash-4', undefined],
    result: `
Hello World         
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 109,
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'dash-4-thick', undefined],
    result: `
Hello World         
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉`
  },

  {
    index: 110,
    border: [false, true, false, false],
    borderStyle: [undefined, 'single', undefined, undefined],
    result: `
Hello World        │`
  },
  {
    index: 111,
    border: [false, true, false, false],
    borderStyle: [undefined, 'single-round', undefined, undefined],
    result: `
Hello World        │`
  },
  {
    index: 112,
    border: [false, true, false, false],
    borderStyle: [undefined, 'thick', undefined, undefined],
    result: `
Hello World        ┃`
  },
  {
    index: 113,
    border: [false, true, false, false],
    borderStyle: [undefined, 'double', undefined, undefined],
    result: `
Hello World        ║`
  },
  {
    index: 114,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-2', undefined, undefined],
    result: `
Hello World        ╎`
  },
  {
    index: 115,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-2-thick', undefined, undefined],
    result: `
Hello World        ╏`
  },
  {
    index: 116,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-3', undefined, undefined],
    result: `
Hello World        ┆`
  },
  {
    index: 117,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-3-thick', undefined, undefined],
    result: `
Hello World        ┇`
  },
  {
    index: 118,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-4', undefined, undefined],
    result: `
Hello World        ┊`
  },
  {
    index: 119,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-4-thick', undefined, undefined],
    result: `
Hello World        ┋`
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the corner combination [${currentCombination.index}] ${currentCombination.borderStyle}`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(blockDocument({ border: currentCombination.border as any, borderStyle: currentCombination.borderStyle as any }))

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
