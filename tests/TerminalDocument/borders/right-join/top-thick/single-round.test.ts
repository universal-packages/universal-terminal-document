import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../src'
import { columnDocument } from '../../../../__fixtures__/columnDocument'

const COMBINATIONS: {
  topBorderStyle: SelectiveBorderStyle
  bottomBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['single', 'single', undefined, undefined],
    result: `
Hello              ┃
───────────────────┦
World              │`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['single', 'single-round', undefined, undefined],
    result: `
Hello              ┃
───────────────────┦
World              │`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['single', 'thick', undefined, undefined],
    result: `
Hello              ┃
───────────────────┨
World              ┃`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['single', 'double', undefined, undefined],
    result: `
Hello              ┃
───────────────────╢
World              ║`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['single-round', 'single', undefined, undefined],
    result: `
Hello              ┃
───────────────────┦
World              │`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['single-round', 'single-round', undefined, undefined],
    result: `
Hello              ┃
───────────────────┦
World              │`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['single-round', 'thick', undefined, undefined],
    result: `
Hello              ┃
───────────────────┨
World              ┃`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['single-round', 'double', undefined, undefined],
    result: `
Hello              ┃
───────────────────╢
World              ║`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['thick', 'single', undefined, undefined],
    result: `
Hello              ┃
━━━━━━━━━━━━━━━━━━━┩
World              │`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['thick', 'single-round', undefined, undefined],
    result: `
Hello              ┃
━━━━━━━━━━━━━━━━━━━┩
World              │`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['thick', 'thick', undefined, undefined],
    result: `
Hello              ┃
━━━━━━━━━━━━━━━━━━━┫
World              ┃`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['thick', 'double', undefined, undefined],
    result: `
Hello              ┃
━━━━━━━━━━━━━━━━━━━╣
World              ║`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['double', 'single', undefined, undefined],
    result: `
Hello              ┃
═══════════════════┦
World              │`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['double', 'single-round', undefined, undefined],
    result: `
Hello              ┃
═══════════════════┦
World              │`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['double', 'thick', undefined, undefined],
    result: `
Hello              ┃
═══════════════════┫
World              ┃`
  },
  {
    topBorderStyle: [undefined, 'thick', 'single-round', undefined],
    bottomBorderStyle: ['double', 'double', undefined, undefined],
    result: `
Hello              ┃
═══════════════════╣
World              ║`
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
        columnDocument([
          { border: [false, true, true, false], borderStyle: currentCombination.topBorderStyle },
          { border: [true, true, false, false], borderStyle: currentCombination.bottomBorderStyle }
        ])
      )

      terminalDocument.render()

      expect('\n' + stripAnsi(terminalDocument.result)).toBe(currentCombination.result)
    })
  }
})
