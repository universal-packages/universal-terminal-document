import stripAnsi from 'strip-ansi'

import { SelectiveBorder, SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { border: SelectiveBorder; borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    border: [true, true, false, false],
    borderStyle: ['single', 'single', undefined, undefined],
    result: `
───────────────────┐
Hello World        │`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['single', 'single-round', undefined, undefined],
    result: `
───────────────────╮
Hello World        │`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['single', 'thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┃`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['single', 'double', undefined, undefined],
    result: `
───────────────────╖
Hello World        ║`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['single-round', 'single', undefined, undefined],
    result: `
───────────────────╮
Hello World        │`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['single-round', 'single-round', undefined, undefined],
    result: `
───────────────────╮
Hello World        │`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['single-round', 'thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┃`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['single-round', 'double', undefined, undefined],
    result: `
───────────────────╖
Hello World        ║`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['thick', 'single', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┑
Hello World        │`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['thick', 'single-round', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━╮
Hello World        │`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['thick', 'thick', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┓
Hello World        ┃`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['thick', 'double', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━╗
Hello World        ║`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['double', 'single', undefined, undefined],
    result: `
═══════════════════╕
Hello World        │`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['double', 'single-round', undefined, undefined],
    result: `
═══════════════════╮
Hello World        │`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['double', 'thick', undefined, undefined],
    result: `
═══════════════════┓
Hello World        ┃`
  },
  {
    border: [true, true, false, false],
    borderStyle: ['double', 'double', undefined, undefined],
    result: `
═══════════════════╗
Hello World        ║`
  },

  {
    border: [true, false, false, false],
    borderStyle: ['single', undefined, undefined, undefined],
    result: `
────────────────────
Hello World         `
  },
  {
    border: [true, false, false, false],
    borderStyle: ['single-round', undefined, undefined, undefined],
    result: `
────────────────────
Hello World         `
  },
  {
    border: [true, false, false, false],
    borderStyle: ['thick', undefined, undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━━
Hello World         `
  },
  {
    border: [true, false, false, false],
    borderStyle: ['double', undefined, undefined, undefined],
    result: `
════════════════════
Hello World         `
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
