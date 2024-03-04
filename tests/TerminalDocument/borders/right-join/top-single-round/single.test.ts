import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../src'
import { columnDocument } from '../../../../__fixtures__/columnDocument'

const COMBINATIONS: {
  topBorderStyle: SelectiveBorderStyle
  bottomBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['single', 'single', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              │`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['single', 'single-round', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              │`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['single', 'thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ┃`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['single', 'double', undefined, undefined],
    result: `
Hello              │
───────────────────╢
World              ║`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['single-round', 'single', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              │`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['single-round', 'single-round', undefined, undefined],
    result: `
Hello              │
───────────────────┤
World              │`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['single-round', 'thick', undefined, undefined],
    result: `
Hello              │
───────────────────┧
World              ┃`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['single-round', 'double', undefined, undefined],
    result: `
Hello              │
───────────────────╢
World              ║`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['thick', 'single', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┥
World              │`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['thick', 'single-round', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┥
World              │`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['thick', 'thick', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━┪
World              ┃`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['thick', 'double', undefined, undefined],
    result: `
Hello              │
━━━━━━━━━━━━━━━━━━━╣
World              ║`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['double', 'single', undefined, undefined],
    result: `
Hello              │
═══════════════════╡
World              │`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['double', 'single-round', undefined, undefined],
    result: `
Hello              │
═══════════════════╡
World              │`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['double', 'thick', undefined, undefined],
    result: `
Hello              │
═══════════════════┪
World              ┃`
  },
  {
    topBorderStyle: [undefined, 'single-round', 'single', undefined],
    bottomBorderStyle: ['double', 'double', undefined, undefined],
    result: `
Hello              │
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

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
