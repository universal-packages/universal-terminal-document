import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../src'
import { rowDocument } from '../../../../__fixtures__/rowDocument'

const COMBINATIONS: {
  leftBorderStyle: SelectiveBorderStyle
  rightBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
══════════┱─────────
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
══════════┱─────────
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
══════════┱─────────
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
══════════┱─────────
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
══════════┱─────────
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
══════════┱─────────
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
══════════┱─────────
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
══════════┱─────────
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
══════════┳━━━━━━━━━
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
══════════┳━━━━━━━━━
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
══════════┳━━━━━━━━━
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
══════════┳━━━━━━━━━
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
══════════┳═════════
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
══════════┳═════════
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
══════════┳═════════
Hello     ┃World    `
  },
  {
    leftBorderStyle: ['double', 'thick', undefined, undefined],
    rightBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
══════════┳═════════
Hello     ┃World    `
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
        rowDocument([
          { border: [true, true, false, false], borderStyle: currentCombination.leftBorderStyle },
          { border: [true, false, false, true], borderStyle: currentCombination.rightBorderStyle }
        ])
      )

      terminalDocument.render()

      expect('\n' + stripAnsi(terminalDocument.result)).toBe(currentCombination.result)
    })
  }
})
