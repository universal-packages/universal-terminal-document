import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../src'
import { rowDocument } from '../../../../__fixtures__/rowDocument'

const COMBINATIONS: {
  leftBorderStyle: SelectiveBorderStyle
  rightBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'single', 'single'],
    result: `
Hello     ║World    
──────────╨─────────`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'single', 'single-round'],
    result: `
Hello     ║World    
──────────╨─────────`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'single', 'thick'],
    result: `
Hello     ║World    
──────────╨─────────`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'single', 'double'],
    result: `
Hello     ║World    
──────────╨─────────`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'single-round', 'single'],
    result: `
Hello     ║World    
──────────╨─────────`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'single-round', 'single-round'],
    result: `
Hello     ║World    
──────────╨─────────`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'single-round', 'thick'],
    result: `
Hello     ║World    
──────────╨─────────`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'single-round', 'double'],
    result: `
Hello     ║World    
──────────╨─────────`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'thick', 'single'],
    result: `
Hello     ║World    
──────────╩━━━━━━━━━`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'thick', 'single-round'],
    result: `
Hello     ║World    
──────────╩━━━━━━━━━`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'thick', 'thick'],
    result: `
Hello     ║World    
──────────╩━━━━━━━━━`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'thick', 'double'],
    result: `
Hello     ║World    
──────────╩━━━━━━━━━`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'double', 'single'],
    result: `
Hello     ║World    
──────────╩═════════`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'double', 'single-round'],
    result: `
Hello     ║World    
──────────╩═════════`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'double', 'thick'],
    result: `
Hello     ║World    
──────────╩═════════`
  },
  {
    leftBorderStyle: [undefined, 'double', 'single', undefined],
    rightBorderStyle: [undefined, undefined, 'double', 'double'],
    result: `
Hello     ║World    
──────────╩═════════`
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
          { border: [false, true, true, false], borderStyle: currentCombination.leftBorderStyle },
          { border: [false, false, true, true], borderStyle: currentCombination.rightBorderStyle }
        ])
      )

      terminalDocument.render()

      expect('\n' + stripAnsi(terminalDocument.result)).toBe(currentCombination.result)
    })
  }
})
