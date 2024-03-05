import stripAnsi from 'strip-ansi'

import { SelectiveBorder, TerminalDocument } from '../../../src'
import { rowDocument } from '../../__fixtures__/rowDocument'

const COMBINATIONS: {
  topBorder: SelectiveBorder
  bottomBorder: SelectiveBorder
  result: string
}[] = [
  {
    topBorder: [true, true, true, true],
    bottomBorder: [true, true, true, true],
    result: `
╔═════════╦━━━━━━━━┓
║Hello    ║World   ┃
╚═════════╩━━━━━━━━┛`
  },
  {
    topBorder: [true, false, true, true],
    bottomBorder: [true, true, true, true],
    result: `
╔═════════┳━━━━━━━━┓
║Hello    ┃World   ┃
╚═════════┻━━━━━━━━┛`
  },
  {
    topBorder: [true, true, true, true],
    bottomBorder: [true, true, true, false],
    result: `
╔═════════╦━━━━━━━━┓
║Hello    ║World   ┃
╚═════════╩━━━━━━━━┛`
  },
  {
    topBorder: [true, false, true, true],
    bottomBorder: [true, true, true, false],
    result: `
╔═════════━━━━━━━━━┓
║Hello    World    ┃
╚═════════━━━━━━━━━┛`
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
          { border: currentCombination.topBorder, borderStyle: 'double' },
          { border: currentCombination.bottomBorder, borderStyle: 'thick' }
        ])
      )

      terminalDocument.render()

      expect('\n' + stripAnsi(terminalDocument.result)).toBe(currentCombination.result)
    })
  }
})
