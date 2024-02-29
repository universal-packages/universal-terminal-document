import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    borderStyle: ['single', 'single', undefined, undefined],
    result: `
───────────────────┐
Hello World        │`
  },
  {
    borderStyle: ['single', 'single-round', undefined, undefined],
    result: `
───────────────────╮
Hello World        │`
  },
  {
    borderStyle: ['single', 'thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┃`
  },
  {
    borderStyle: ['single', 'double', undefined, undefined],
    result: `
───────────────────╖
Hello World        ║`
  },
  {
    borderStyle: ['single-round', 'single', undefined, undefined],
    result: `
───────────────────╮
Hello World        │`
  },
  {
    borderStyle: ['single-round', 'single-round', undefined, undefined],
    result: `
───────────────────╮
Hello World        │`
  },
  {
    borderStyle: ['single-round', 'thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┃`
  },
  {
    borderStyle: ['single-round', 'double', undefined, undefined],
    result: `
───────────────────╖
Hello World        ║`
  },
  {
    borderStyle: ['thick', 'single', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┑
Hello World        │`
  },
  {
    borderStyle: ['thick', 'single-round', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━╮
Hello World        │`
  },
  {
    borderStyle: ['thick', 'thick', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┓
Hello World        ┃`
  },
  {
    borderStyle: ['thick', 'double', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━╗
Hello World        ║`
  },
  {
    borderStyle: ['double', 'single', undefined, undefined],
    result: `
═══════════════════╕
Hello World        │`
  },
  {
    borderStyle: ['double', 'single-round', undefined, undefined],
    result: `
═══════════════════╮
Hello World        │`
  },
  {
    borderStyle: ['double', 'thick', undefined, undefined],
    result: `
═══════════════════┓
Hello World        ┃`
  },
  {
    borderStyle: ['double', 'double', undefined, undefined],
    result: `
═══════════════════╗
Hello World        ║`
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the corner combination [${i}]`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(blockDocument({ border: [true, true, false, false], borderStyle: currentCombination.borderStyle }))

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
