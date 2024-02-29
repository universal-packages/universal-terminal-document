import stripAnsi from 'strip-ansi'

import { SelectiveBorder, SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { border: SelectiveBorder; borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'single', undefined],
    result: `
Hello World        │
───────────────────┘`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'single', undefined],
    result: `
Hello World        │
───────────────────╯`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'single', undefined],
    result: `
Hello World        ┃
───────────────────┚`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'single', undefined],
    result: `
Hello World        ║
───────────────────╜`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'single-round', undefined],
    result: `
Hello World        │
───────────────────╯`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'single-round', undefined],
    result: `
Hello World        │
───────────────────╯`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'single-round', undefined],
    result: `
Hello World        ┃
───────────────────┚`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'single-round', undefined],
    result: `
Hello World        ║
───────────────────╜`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'thick', undefined],
    result: `
Hello World        │
━━━━━━━━━━━━━━━━━━━┙`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'thick', undefined],
    result: `
Hello World        │
━━━━━━━━━━━━━━━━━━━╯`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'thick', undefined],
    result: `
Hello World        ┃
━━━━━━━━━━━━━━━━━━━┛`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'thick', undefined],
    result: `
Hello World        ║
━━━━━━━━━━━━━━━━━━━╝`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'single', 'double', undefined],
    result: `
Hello World        │
═══════════════════╛`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'single-round', 'double', undefined],
    result: `
Hello World        │
═══════════════════╯`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'thick', 'double', undefined],
    result: `
Hello World        ┃
═══════════════════┛`
  },
  {
    border: [false, true, true, false],
    borderStyle: [undefined, 'double', 'double', undefined],
    result: `
Hello World        ║
═══════════════════╝`
  },

  {
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'single', undefined],
    result: `
Hello World         
────────────────────`
  },
  {
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'single-round', undefined],
    result: `
Hello World         
────────────────────`
  },
  {
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'thick', undefined],
    result: `
Hello World         
━━━━━━━━━━━━━━━━━━━━`
  },
  {
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'double', undefined],
    result: `
Hello World         
════════════════════`
  },

  {
    border: [false, true, false, false],
    borderStyle: [undefined, 'single', undefined, undefined],
    result: `
Hello World        │`
  },
  {
    border: [false, true, false, false],
    borderStyle: [undefined, 'single-round', undefined, undefined],
    result: `
Hello World        │`
  },
  {
    border: [false, true, false, false],
    borderStyle: [undefined, 'thick', undefined, undefined],
    result: `
Hello World        ┃`
  },
  {
    border: [false, true, false, false],
    borderStyle: [undefined, 'double', undefined, undefined],
    result: `
Hello World        ║`
  },
  {
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-2-thick', undefined, undefined],
    result: `
Hello World        ╏`
  },
  {
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-3-thick', undefined, undefined],
    result: `
Hello World        ┇`
  },
  {
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

    it(`renders the corner combination [${i}]`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(blockDocument({ border: currentCombination.border as any, borderStyle: currentCombination.borderStyle as any }))

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
