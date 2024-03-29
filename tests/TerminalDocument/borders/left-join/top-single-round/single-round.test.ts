import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../src'
import { columnDocument } from '../../../../__fixtures__/columnDocument'

const COMBINATIONS: {
  topBorderStyle: SelectiveBorderStyle
  bottomBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['single', undefined, undefined, 'single'],
    result: `
│Hello              
├───────────────────
│World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
│Hello              
├───────────────────
│World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['single', undefined, undefined, 'thick'],
    result: `
│Hello              
┟───────────────────
┃World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['single', undefined, undefined, 'double'],
    result: `
│Hello              
╟───────────────────
║World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
│Hello              
├───────────────────
│World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
│Hello              
├───────────────────
│World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
│Hello              
┟───────────────────
┃World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
│Hello              
╟───────────────────
║World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['thick', undefined, undefined, 'single'],
    result: `
│Hello              
┝━━━━━━━━━━━━━━━━━━━
│World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
│Hello              
┝━━━━━━━━━━━━━━━━━━━
│World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
│Hello              
┢━━━━━━━━━━━━━━━━━━━
┃World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['thick', undefined, undefined, 'double'],
    result: `
│Hello              
╠━━━━━━━━━━━━━━━━━━━
║World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['double', undefined, undefined, 'single'],
    result: `
│Hello              
╞═══════════════════
│World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
│Hello              
╞═══════════════════
│World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['double', undefined, undefined, 'thick'],
    result: `
│Hello              
┢═══════════════════
┃World              `
  },
  {
    topBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    bottomBorderStyle: ['double', undefined, undefined, 'double'],
    result: `
│Hello              
╠═══════════════════
║World              `
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the join combination [${i}]`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument()

      terminalDocument.describe(
        columnDocument([
          { border: [false, false, true, true], borderStyle: currentCombination.topBorderStyle },
          { border: [true, false, false, true], borderStyle: currentCombination.bottomBorderStyle }
        ])
      )

      expect('\n' + stripAnsi(terminalDocument.result)).toBe(currentCombination.result)
    })
  }
})
