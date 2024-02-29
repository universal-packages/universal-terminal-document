import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../../../src'
import { quadDocument } from '../../../../../../__fixtures__/quadDocument'

const COMBINATIONS: {
  topLeftBorderStyle: SelectiveBorderStyle
  topRightBorderStyle: SelectiveBorderStyle
  bottomLeftBorderStyle: SelectiveBorderStyle
  bottomRightBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╊━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╊━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╊━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╊━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╊═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╊═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╊═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╊═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╂─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╊━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╊━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╊━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╊━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╊═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╊═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╊═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╊═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╫─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
──────────╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
──────────╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
──────────╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['single-round', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
──────────╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╇━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╇━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╇━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╇━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╇━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╇━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╇━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╇━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╃═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╋━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╋━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╋━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╋━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╋═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╋═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╋═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╋═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['thick', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
━━━━━━━━━━╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╀─────────
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╄━━━━━━━━━
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'single-round', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╀═════════
Hello     │World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╉─────────
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╋━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╋━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╋━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╋━━━━━━━━━
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╋═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╋═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╋═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'thick', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╋═════════
Hello     ┃World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╬─────────
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╬━━━━━━━━━
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
Hello     ┃World    
══════════╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
Hello     ┃World    
══════════╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
Hello     ┃World    
══════════╬═════════
Hello     ║World    `
  },
  {
    topLeftBorderStyle: [undefined, 'thick', 'thick', undefined],
    topRightBorderStyle: [undefined, undefined, 'double', 'thick'],
    bottomLeftBorderStyle: ['double', 'double', undefined, undefined],
    bottomRightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
Hello     ┃World    
══════════╬═════════
Hello     ║World    `
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the join combination [${i}]`, async (): Promise<void> => {
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
