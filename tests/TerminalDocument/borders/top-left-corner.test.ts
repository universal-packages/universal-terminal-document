import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    borderStyle: ['single', undefined, undefined, 'single'],
    result: `
┌───────────────────
│Hello World        `
  },
  {
    borderStyle: ['single', undefined, undefined, 'single-round'],
    result: `
╭───────────────────
│Hello World        `
  },
  {
    borderStyle: ['single', undefined, undefined, 'thick'],
    result: `
┎───────────────────
┃Hello World        `
  },
  {
    borderStyle: ['single', undefined, undefined, 'double'],
    result: `
╓───────────────────
║Hello World        `
  },
  {
    borderStyle: ['single-round', undefined, undefined, 'single'],
    result: `
╭───────────────────
│Hello World        `
  },
  {
    borderStyle: ['single-round', undefined, undefined, 'single-round'],
    result: `
╭───────────────────
│Hello World        `
  },
  {
    borderStyle: ['single-round', undefined, undefined, 'thick'],
    result: `
┎───────────────────
┃Hello World        `
  },
  {
    borderStyle: ['single-round', undefined, undefined, 'double'],
    result: `
╓───────────────────
║Hello World        `
  },
  {
    borderStyle: ['thick', undefined, undefined, 'single'],
    result: `
┍━━━━━━━━━━━━━━━━━━━
│Hello World        `
  },
  {
    borderStyle: ['thick', undefined, undefined, 'single-round'],
    result: `
╭━━━━━━━━━━━━━━━━━━━
│Hello World        `
  },
  {
    borderStyle: ['thick', undefined, undefined, 'thick'],
    result: `
┏━━━━━━━━━━━━━━━━━━━
┃Hello World        `
  },
  {
    borderStyle: ['thick', undefined, undefined, 'double'],
    result: `
╔━━━━━━━━━━━━━━━━━━━
║Hello World        `
  },
  {
    borderStyle: ['double', undefined, undefined, 'single'],
    result: `
╒═══════════════════
│Hello World        `
  },
  {
    borderStyle: ['double', undefined, undefined, 'single-round'],
    result: `
╭═══════════════════
│Hello World        `
  },
  {
    borderStyle: ['double', undefined, undefined, 'thick'],
    result: `
┏═══════════════════
┃Hello World        `
  },
  {
    borderStyle: ['double', undefined, undefined, 'double'],
    result: `
╔═══════════════════
║Hello World        `
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the corner combination [${i}]`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(blockDocument({ border: [true, false, false, true], borderStyle: currentCombination.borderStyle }))

      terminalDocument.render()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
