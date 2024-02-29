import stripAnsi from 'strip-ansi'

import { SelectiveBorder, SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { border: SelectiveBorder; borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    border: [true, false, false, true],
    borderStyle: ['single', undefined, undefined, 'single'],
    result: `
┌───────────────────
│Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
╭───────────────────
│Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['single', undefined, undefined, 'thick'],
    result: `
┎───────────────────
┃Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['single', undefined, undefined, 'double'],
    result: `
╓───────────────────
║Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
╭───────────────────
│Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
╭───────────────────
│Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
┎───────────────────
┃Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
╓───────────────────
║Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['thick', undefined, undefined, 'single'],
    result: `
┍━━━━━━━━━━━━━━━━━━━
│Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
╭━━━━━━━━━━━━━━━━━━━
│Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
┏━━━━━━━━━━━━━━━━━━━
┃Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['thick', undefined, undefined, 'double'],
    result: `
╔━━━━━━━━━━━━━━━━━━━
║Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['double', undefined, undefined, 'single'],
    result: `
╒═══════════════════
│Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
╭═══════════════════
│Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['double', undefined, undefined, 'thick'],
    result: `
┏═══════════════════
┃Hello World        `
  },
  {
    border: [true, false, false, true],
    borderStyle: ['double', undefined, undefined, 'double'],
    result: `
╔═══════════════════
║Hello World        `
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
