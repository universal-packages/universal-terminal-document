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
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
│Hello              
├───────────────────
│World              `
  },
  {
    index: 1,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
│Hello              
├───────────────────
│World              `
  },
  {
    index: 2,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
│Hello              
┟───────────────────
┃World              `
  },
  {
    index: 3,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
│Hello              
╟───────────────────
║World              `
  },
  {
    index: 4,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'dash-2'],
    result: `
│Hello              
├───────────────────
╎World              `
  },
  {
    index: 5,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┟───────────────────
╏World              `
  },
  {
    index: 6,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'dash-3'],
    result: `
│Hello              
├───────────────────
┆World              `
  },
  {
    index: 7,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┟───────────────────
┇World              `
  },
  {
    index: 8,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'dash-4'],
    result: `
│Hello              
├───────────────────
┊World              `
  },
  {
    index: 9,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┟───────────────────
┋World              `
  },
  {
    index: 10,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
│Hello              
├───────────────────
│World              `
  },
  {
    index: 11,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
│Hello              
├───────────────────
│World              `
  },
  {
    index: 12,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
│Hello              
┟───────────────────
┃World              `
  },
  {
    index: 13,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
│Hello              
╟───────────────────
║World              `
  },
  {
    index: 14,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'dash-2'],
    result: `
│Hello              
├───────────────────
╎World              `
  },
  {
    index: 15,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┟───────────────────
╏World              `
  },
  {
    index: 16,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'dash-3'],
    result: `
│Hello              
├───────────────────
┆World              `
  },
  {
    index: 17,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┟───────────────────
┇World              `
  },
  {
    index: 18,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'dash-4'],
    result: `
│Hello              
├───────────────────
┊World              `
  },
  {
    index: 19,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┟───────────────────
┋World              `
  },
  {
    index: 20,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
│Hello              
┝━━━━━━━━━━━━━━━━━━━
│World              `
  },
  {
    index: 21,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
│Hello              
┝━━━━━━━━━━━━━━━━━━━
│World              `
  },
  {
    index: 22,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
│Hello              
┢━━━━━━━━━━━━━━━━━━━
┃World              `
  },
  {
    index: 23,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
│Hello              
╠━━━━━━━━━━━━━━━━━━━
║World              `
  },
  {
    index: 24,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'dash-2'],
    result: `
│Hello              
┝━━━━━━━━━━━━━━━━━━━
╎World              `
  },
  {
    index: 25,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┢━━━━━━━━━━━━━━━━━━━
╏World              `
  },
  {
    index: 26,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'dash-3'],
    result: `
│Hello              
┝━━━━━━━━━━━━━━━━━━━
┆World              `
  },
  {
    index: 27,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┢━━━━━━━━━━━━━━━━━━━
┇World              `
  },
  {
    index: 28,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'dash-4'],
    result: `
│Hello              
┝━━━━━━━━━━━━━━━━━━━
┊World              `
  },
  {
    index: 29,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['thick', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┢━━━━━━━━━━━━━━━━━━━
┋World              `
  },
  {
    index: 30,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
│Hello              
╞═══════════════════
│World              `
  },
  {
    index: 31,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
│Hello              
╞═══════════════════
│World              `
  },
  {
    index: 32,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
│Hello              
┢═══════════════════
┃World              `
  },
  {
    index: 33,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
│Hello              
╠═══════════════════
║World              `
  },
  {
    index: 34,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'dash-2'],
    result: `
│Hello              
╞═══════════════════
╎World              `
  },
  {
    index: 35,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┢═══════════════════
╏World              `
  },
  {
    index: 36,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'dash-3'],
    result: `
│Hello              
╞═══════════════════
┆World              `
  },
  {
    index: 37,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┢═══════════════════
┇World              `
  },
  {
    index: 38,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'dash-4'],
    result: `
│Hello              
╞═══════════════════
┊World              `
  },
  {
    index: 39,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['double', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┢═══════════════════
┋World              `
  },
  {
    index: 40,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'single'],
    result: `
│Hello              
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
│World              `
  },
  {
    index: 41,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'single-round'],
    result: `
│Hello              
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
│World              `
  },
  {
    index: 42,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'thick'],
    result: `
│Hello              
┟╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
┃World              `
  },
  {
    index: 43,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'double'],
    result: `
│Hello              
╟╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
║World              `
  },
  {
    index: 44,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'dash-2'],
    result: `
│Hello              
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
╎World              `
  },
  {
    index: 45,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┟╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
╏World              `
  },
  {
    index: 46,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'dash-3'],
    result: `
│Hello              
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
┆World              `
  },
  {
    index: 47,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┟╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
┇World              `
  },
  {
    index: 48,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'dash-4'],
    result: `
│Hello              
├╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
┊World              `
  },
  {
    index: 49,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┟╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
┋World              `
  },
  {
    index: 50,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'single'],
    result: `
│Hello              
┝╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
│World              `
  },
  {
    index: 51,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'single-round'],
    result: `
│Hello              
┝╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
│World              `
  },
  {
    index: 52,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'thick'],
    result: `
│Hello              
┢╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
┃World              `
  },
  {
    index: 53,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'double'],
    result: `
│Hello              
╠╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
║World              `
  },
  {
    index: 54,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-2'],
    result: `
│Hello              
┝╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
╎World              `
  },
  {
    index: 55,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┢╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
╏World              `
  },
  {
    index: 56,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-3'],
    result: `
│Hello              
┝╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
┆World              `
  },
  {
    index: 57,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┢╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
┇World              `
  },
  {
    index: 58,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-4'],
    result: `
│Hello              
┝╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
┊World              `
  },
  {
    index: 59,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┢╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
┋World              `
  },
  {
    index: 60,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'single'],
    result: `
│Hello              
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
│World              `
  },
  {
    index: 61,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'single-round'],
    result: `
│Hello              
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
│World              `
  },
  {
    index: 62,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'thick'],
    result: `
│Hello              
┟┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
┃World              `
  },
  {
    index: 63,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'double'],
    result: `
│Hello              
╟┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
║World              `
  },
  {
    index: 64,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'dash-2'],
    result: `
│Hello              
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
╎World              `
  },
  {
    index: 65,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┟┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
╏World              `
  },
  {
    index: 66,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'dash-3'],
    result: `
│Hello              
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
┆World              `
  },
  {
    index: 67,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┟┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
┇World              `
  },
  {
    index: 68,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'dash-4'],
    result: `
│Hello              
├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
┊World              `
  },
  {
    index: 69,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┟┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
┋World              `
  },
  {
    index: 70,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'single'],
    result: `
│Hello              
┝┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
│World              `
  },
  {
    index: 71,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'single-round'],
    result: `
│Hello              
┝┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
│World              `
  },
  {
    index: 72,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'thick'],
    result: `
│Hello              
┢┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┃World              `
  },
  {
    index: 73,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'double'],
    result: `
│Hello              
╠┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
║World              `
  },
  {
    index: 74,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-2'],
    result: `
│Hello              
┝┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
╎World              `
  },
  {
    index: 75,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┢┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
╏World              `
  },
  {
    index: 76,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-3'],
    result: `
│Hello              
┝┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┆World              `
  },
  {
    index: 77,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┢┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┇World              `
  },
  {
    index: 78,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-4'],
    result: `
│Hello              
┝┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┊World              `
  },
  {
    index: 79,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┢┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
┋World              `
  },
  {
    index: 80,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'single'],
    result: `
│Hello              
├┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
│World              `
  },
  {
    index: 81,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'single-round'],
    result: `
│Hello              
├┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
│World              `
  },
  {
    index: 82,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'thick'],
    result: `
│Hello              
┟┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃World              `
  },
  {
    index: 83,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'double'],
    result: `
│Hello              
╟┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
║World              `
  },
  {
    index: 84,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'dash-2'],
    result: `
│Hello              
├┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
╎World              `
  },
  {
    index: 85,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┟┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
╏World              `
  },
  {
    index: 86,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'dash-3'],
    result: `
│Hello              
├┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆World              `
  },
  {
    index: 87,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┟┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┇World              `
  },
  {
    index: 88,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'dash-4'],
    result: `
│Hello              
├┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┊World              `
  },
  {
    index: 89,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┟┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┋World              `
  },
  {
    index: 90,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'single'],
    result: `
│Hello              
┝┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
│World              `
  },
  {
    index: 91,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'single-round'],
    result: `
│Hello              
┝┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
│World              `
  },
  {
    index: 92,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'thick'],
    result: `
│Hello              
┢┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
┃World              `
  },
  {
    index: 93,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'double'],
    result: `
│Hello              
╠┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
║World              `
  },
  {
    index: 94,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-2'],
    result: `
│Hello              
┝┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
╎World              `
  },
  {
    index: 95,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-2-thick'],
    result: `
│Hello              
┢┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
╏World              `
  },
  {
    index: 96,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-3'],
    result: `
│Hello              
┝┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
┆World              `
  },
  {
    index: 97,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-3-thick'],
    result: `
│Hello              
┢┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
┇World              `
  },
  {
    index: 98,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-4'],
    result: `
│Hello              
┝┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
┊World              `
  },
  {
    index: 99,
    topBorderStyle: [undefined, undefined, 'double', 'single'],
    bottomBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-4-thick'],
    result: `
│Hello              
┢┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
┋World              `
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
          { border: [false, false, true, true], borderStyle: currentCombination.topBorderStyle },
          { border: [true, false, false, true], borderStyle: currentCombination.bottomBorderStyle }
        ])
      )

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
