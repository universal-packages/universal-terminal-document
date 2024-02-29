import stripAnsi from 'strip-ansi'

import { SelectiveBorder, SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { border: SelectiveBorder; borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'single', 'single'],
    result: `
│Hello World        
└───────────────────`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'single', 'single-round'],
    result: `
│Hello World        
╰───────────────────`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'single', 'thick'],
    result: `
┃Hello World        
┖───────────────────`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'single', 'double'],
    result: `
║Hello World        
╙───────────────────`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'single-round', 'single'],
    result: `
│Hello World        
╰───────────────────`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'single-round', 'single-round'],
    result: `
│Hello World        
╰───────────────────`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'single-round', 'thick'],
    result: `
┃Hello World        
┖───────────────────`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'single-round', 'double'],
    result: `
║Hello World        
╙───────────────────`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'thick', 'single'],
    result: `
│Hello World        
┕━━━━━━━━━━━━━━━━━━━`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'thick', 'single-round'],
    result: `
│Hello World        
╰━━━━━━━━━━━━━━━━━━━`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'thick', 'thick'],
    result: `
┃Hello World        
┗━━━━━━━━━━━━━━━━━━━`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'thick', 'double'],
    result: `
║Hello World        
╚━━━━━━━━━━━━━━━━━━━`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'double', 'single'],
    result: `
│Hello World        
╘═══════════════════`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'double', 'single-round'],
    result: `
│Hello World        
╰═══════════════════`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'double', 'thick'],
    result: `
┃Hello World        
┗═══════════════════`
  },
  {
    border: [false, false, true, true],
    borderStyle: [undefined, undefined, 'double', 'double'],
    result: `
║Hello World        
╚═══════════════════`
  },

  {
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'single', undefined],
    result: `
Hello World         
────────────────────`
  },
  {
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'single-round', undefined],
    result: `
Hello World         
────────────────────`
  },
  {
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'thick', undefined],
    result: `
Hello World         
━━━━━━━━━━━━━━━━━━━━`
  },
  {
    border: [false, false, true, false],
    borderStyle: [undefined, undefined, 'double', undefined],
    result: `
Hello World         
════════════════════`
  },

  {
    border: [false, false, false, true],
    borderStyle: [undefined, undefined, undefined, 'single'],
    result: `
│Hello World        `
  },
  {
    border: [false, false, false, true],
    borderStyle: [undefined, undefined, undefined, 'single-round'],
    result: `
│Hello World        `
  },
  {
    border: [false, false, false, true],
    borderStyle: [undefined, undefined, undefined, 'thick'],
    result: `
┃Hello World        `
  },
  {
    border: [false, false, false, true],
    borderStyle: [undefined, undefined, undefined, 'double'],
    result: `
║Hello World        `
  },
  {
    border: [false, false, false, true],
    borderStyle: [undefined, undefined, undefined, 'dash-2-thick'],
    result: `
╏Hello World        `
  },
  {
    border: [false, false, false, true],
    borderStyle: [undefined, undefined, undefined, 'dash-3-thick'],
    result: `
┇Hello World        `
  },
  {
    border: [false, false, false, true],
    borderStyle: [undefined, undefined, undefined, 'dash-4-thick'],
    result: `
┋Hello World        `
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
