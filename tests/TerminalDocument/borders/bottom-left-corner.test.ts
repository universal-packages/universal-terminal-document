import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    borderStyle: [undefined, undefined, 'single', 'single'],
    result: `
│Hello World        
└───────────────────`
  },
  {
    borderStyle: [undefined, undefined, 'single', 'single-round'],
    result: `
│Hello World        
╰───────────────────`
  },
  {
    borderStyle: [undefined, undefined, 'single', 'thick'],
    result: `
┃Hello World        
┖───────────────────`
  },
  {
    borderStyle: [undefined, undefined, 'single', 'double'],
    result: `
║Hello World        
╙───────────────────`
  },
  {
    borderStyle: [undefined, undefined, 'single-round', 'single'],
    result: `
│Hello World        
╰───────────────────`
  },
  {
    borderStyle: [undefined, undefined, 'single-round', 'single-round'],
    result: `
│Hello World        
╰───────────────────`
  },
  {
    borderStyle: [undefined, undefined, 'single-round', 'thick'],
    result: `
┃Hello World        
┖───────────────────`
  },
  {
    borderStyle: [undefined, undefined, 'single-round', 'double'],
    result: `
║Hello World        
╙───────────────────`
  },
  {
    borderStyle: [undefined, undefined, 'thick', 'single'],
    result: `
│Hello World        
┕━━━━━━━━━━━━━━━━━━━`
  },
  {
    borderStyle: [undefined, undefined, 'thick', 'single-round'],
    result: `
│Hello World        
╰━━━━━━━━━━━━━━━━━━━`
  },
  {
    borderStyle: [undefined, undefined, 'thick', 'thick'],
    result: `
┃Hello World        
┗━━━━━━━━━━━━━━━━━━━`
  },
  {
    borderStyle: [undefined, undefined, 'thick', 'double'],
    result: `
║Hello World        
╚━━━━━━━━━━━━━━━━━━━`
  },
  {
    borderStyle: [undefined, undefined, 'double', 'single'],
    result: `
│Hello World        
╘═══════════════════`
  },
  {
    borderStyle: [undefined, undefined, 'double', 'single-round'],
    result: `
│Hello World        
╰═══════════════════`
  },
  {
    borderStyle: [undefined, undefined, 'double', 'thick'],
    result: `
┃Hello World        
┗═══════════════════`
  },
  {
    borderStyle: [undefined, undefined, 'double', 'double'],
    result: `
║Hello World        
╚═══════════════════`
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the corner combination [${i}]`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(blockDocument({ border: [false, false, true, true], borderStyle: currentCombination.borderStyle }))

      terminalDocument.render()

      expect('\n' + stripAnsi(terminalDocument.result)).toBe(currentCombination.result)
    })
  }
})
