import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../../../../../src'
import { quadDocument } from '../../../../../../../../__fixtures__/quadDocument'

const COMBINATIONS: {
  index: number
  topLeftBorderStyle: SelectiveBorderStyle
  topRightBorderStyle: SelectiveBorderStyle
  bottomLeftBorderStyle: SelectiveBorderStyle
  bottomRightBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    index: 0,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 1,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 2,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 3,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 4,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 5,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 6,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 7,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 8,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 9,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 10,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 11,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 12,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 13,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 14,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 15,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 16,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 17,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 18,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 19,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽─────────
Hello     │World    `
  },
  {
    index: 20,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 21,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 22,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 23,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 24,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 25,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 26,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 27,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 28,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 29,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿━━━━━━━━━
Hello     │World    `
  },
  {
    index: 30,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 31,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 32,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 33,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 34,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 35,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 36,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 37,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 38,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 39,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽═════════
Hello     │World    `
  },
  {
    index: 40,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 41,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 42,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 43,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 44,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 45,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 46,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 47,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 48,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 49,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽╌╌╌╌╌╌╌╌╌
Hello     │World    `
  },
  {
    index: 50,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 51,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 52,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 53,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 54,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 55,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 56,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 57,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 58,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 59,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-2-thick', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿╍╍╍╍╍╍╍╍╍
Hello     │World    `
  },
  {
    index: 60,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 51,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 62,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 63,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 64,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 65,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 66,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 67,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 68,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 69,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┄┄┄┄┄┄┄┄┄
Hello     │World    `
  },
  {
    index: 70,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 61,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 72,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 73,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 74,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 75,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 76,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 77,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 78,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 79,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-3-thick', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┅┅┅┅┅┅┅┅┅
Hello     │World    `
  },
  {
    index: 80,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 81,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 82,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 83,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 84,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 85,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 86,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 87,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 88,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 89,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┽┈┈┈┈┈┈┈┈┈
Hello     │World    `
  },
  {
    index: 90,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'single'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 91,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'single-round'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 92,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 93,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'double'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 94,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-2'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 95,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-2-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 96,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-3'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 97,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-3-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 98,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-4'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  },
  {
    index: 99,
    topLeftBorderStyle: [undefined, 'single', 'single', undefined],
    topRightBorderStyle: [undefined, undefined, 'single', 'double'],
    bottomLeftBorderStyle: ['dash-4-thick',  'single', undefined, undefined],
    bottomRightBorderStyle: ['dash-4-thick', undefined, undefined, 'dash-4-thick'],
    result: `
Hello     │World    
┉┉┉┉┉┉┉┉┉┉┿┉┉┉┉┉┉┉┉┉
Hello     │World    `
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the join combination [${currentCombination.index}]`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(
        quadDocument([
          { border: [false, true, true, false], borderStyle: currentCombination.topLeftBorderStyle },
          { border: [false, false, true, true], borderStyle: currentCombination.topRightBorderStyle },
          { border: [true, true, false, false], borderStyle: currentCombination.bottomLeftBorderStyle },
          { border: [true, false, false, true], borderStyle: currentCombination.bottomRightBorderStyle }
        ])
      )

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
