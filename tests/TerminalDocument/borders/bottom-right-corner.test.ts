import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    borderStyle: [undefined, 'single', 'single', undefined],
    result: `
Hello World        │
───────────────────┘`
  },
  {
    borderStyle: [undefined, 'single-round', 'single', undefined],
    result: `
Hello World        │
───────────────────╯`
  },
  {
    borderStyle: [undefined, 'thick', 'single', undefined],
    result: `
Hello World        ┃
───────────────────┚`
  },
  {
    borderStyle: [undefined, 'double', 'single', undefined],
    result: `
Hello World        ║
───────────────────╜`
  },
  {
    borderStyle: [undefined, 'single', 'single-round', undefined],
    result: `
Hello World        │
───────────────────╯`
  },
  {
    borderStyle: [undefined, 'single-round', 'single-round', undefined],
    result: `
Hello World        │
───────────────────╯`
  },
  {
    borderStyle: [undefined, 'thick', 'single-round', undefined],
    result: `
Hello World        ┃
───────────────────┚`
  },
  {
    borderStyle: [undefined, 'double', 'single-round', undefined],
    result: `
Hello World        ║
───────────────────╜`
  },
  {
    borderStyle: [undefined, 'single', 'thick', undefined],
    result: `
Hello World        │
━━━━━━━━━━━━━━━━━━━┙`
  },
  {
    borderStyle: [undefined, 'single-round', 'thick', undefined],
    result: `
Hello World        │
━━━━━━━━━━━━━━━━━━━╯`
  },
  {
    borderStyle: [undefined, 'thick', 'thick', undefined],
    result: `
Hello World        ┃
━━━━━━━━━━━━━━━━━━━┛`
  },
  {
    borderStyle: [undefined, 'double', 'thick', undefined],
    result: `
Hello World        ║
━━━━━━━━━━━━━━━━━━━╝`
  },
  {
    borderStyle: [undefined, 'single', 'double', undefined],
    result: `
Hello World        │
═══════════════════╛`
  },
  {
    borderStyle: [undefined, 'single-round', 'double', undefined],
    result: `
Hello World        │
═══════════════════╯`
  },
  {
    borderStyle: [undefined, 'thick', 'double', undefined],
    result: `
Hello World        ┃
═══════════════════┛`
  },
  {
    borderStyle: [undefined, 'double', 'double', undefined],
    result: `
Hello World        ║
═══════════════════╝`
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the corner combination [${i}]`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(blockDocument({ border: [false, true, true, false], borderStyle: currentCombination.borderStyle }))

      terminalDocument.render()

      expect('\n' + stripAnsi(terminalDocument.result)).toBe(currentCombination.result)
    })
  }
})
