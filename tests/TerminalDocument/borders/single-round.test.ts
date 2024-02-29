import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'
import { quadDocument } from '../../__fixtures__/quadDocument'

const COMBINATIONS: {
  topTopLeftBorder: boolean
  topTopRightBorder: boolean
  topLeftBorder: boolean
  topCenterBorder: boolean
  topRightBorder: boolean
  middleLeftBorder: boolean
  middleRightBorder: boolean
  bottomLeftBorder: boolean
  bottomCenterBorder: boolean
  bottomRightBorder: boolean
  bottomBottomLeftBorder: boolean
  bottomBottomRightBorder: boolean
  result: string
}[] = [
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: true,
    topCenterBorder: true,
    topRightBorder: true,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: true,
    bottomCenterBorder: true,
    bottomRightBorder: true,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
╭─────────┬────────╮
│Hello    │World   │
├─────────┼────────┤
│Hello    │World   │
╰─────────┴────────╯`
  },
  {
    topTopLeftBorder: false,
    topTopRightBorder: true,
    topLeftBorder: true,
    topCenterBorder: true,
    topRightBorder: false,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: true,
    bottomCenterBorder: true,
    bottomRightBorder: false,
    bottomBottomLeftBorder: false,
    bottomBottomRightBorder: true,
    result: `
╷         ╭─────────
│Hello    │World    
├─────────┼─────────
│Hello    │World    
╵         ╰─────────`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: false,
    topLeftBorder: false,
    topCenterBorder: true,
    topRightBorder: true,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: false,
    bottomCenterBorder: true,
    bottomRightBorder: true,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: false,
    result: `
─────────╮         ╷
Hello    │World    │
─────────┼─────────┤
Hello    │World    │
─────────╯         ╵`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: false,
    topCenterBorder: true,
    topRightBorder: false,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: true,
    bottomCenterBorder: true,
    bottomRightBorder: true,
    bottomBottomLeftBorder: false,
    bottomBottomRightBorder: false,
    result: `
──────────┬─────────
Hello     │World    
╭─────────┼────────╮
│Hello    │World   │`
  },
  {
    topTopLeftBorder: false,
    topTopRightBorder: false,
    topLeftBorder: true,
    topCenterBorder: true,
    topRightBorder: true,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: false,
    bottomCenterBorder: true,
    bottomRightBorder: false,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
│Hello    │World   │
╰─────────┼────────╯
Hello     │World    
──────────┴─────────`
  },
  {
    topTopLeftBorder: false,
    topTopRightBorder: false,
    topLeftBorder: false,
    topCenterBorder: true,
    topRightBorder: false,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: false,
    bottomCenterBorder: true,
    bottomRightBorder: false,
    bottomBottomLeftBorder: false,
    bottomBottomRightBorder: false,
    result: `
Hello     │World    
──────────┼─────────
Hello     │World    `
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: true,
    topCenterBorder: false,
    topRightBorder: true,
    middleLeftBorder: false,
    middleRightBorder: false,
    bottomLeftBorder: true,
    bottomCenterBorder: false,
    bottomRightBorder: true,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
╭──────────────────╮
│Hello    World    │
│Hello    World    │
╰──────────────────╯`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: true,
    topCenterBorder: true,
    topRightBorder: true,
    middleLeftBorder: false,
    middleRightBorder: false,
    bottomLeftBorder: true,
    bottomCenterBorder: true,
    bottomRightBorder: true,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
╭─────────┬────────╮
│Hello    │World   │
│Hello    │World   │
╰─────────┴────────╯`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: true,
    topCenterBorder: false,
    topRightBorder: true,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: true,
    bottomCenterBorder: false,
    bottomRightBorder: true,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
╭──────────────────╮
│Hello    World    │
├──────────────────┤
│Hello    World    │
╰──────────────────╯`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: true,
    topCenterBorder: true,
    topRightBorder: true,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: true,
    bottomCenterBorder: false,
    bottomRightBorder: true,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
╭─────────┬────────╮
│Hello    │World   │
├─────────┴────────┤
│Hello    World    │
╰──────────────────╯`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: true,
    topCenterBorder: false,
    topRightBorder: true,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: true,
    bottomCenterBorder: true,
    bottomRightBorder: true,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
╭──────────────────╮
│Hello    World    │
├─────────┬────────┤
│Hello    │World   │
╰─────────┴────────╯`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: true,
    topCenterBorder: true,
    topRightBorder: true,
    middleLeftBorder: true,
    middleRightBorder: false,
    bottomLeftBorder: true,
    bottomCenterBorder: true,
    bottomRightBorder: true,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
╭─────────┬────────╮
│Hello    │World   │
├─────────┤        │
│Hello    │World   │
╰─────────┴────────╯`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: true,
    topCenterBorder: true,
    topRightBorder: true,
    middleLeftBorder: false,
    middleRightBorder: true,
    bottomLeftBorder: true,
    bottomCenterBorder: true,
    bottomRightBorder: true,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
╭─────────┬────────╮
│Hello    │World   │
│         ├────────┤
│Hello    │World   │
╰─────────┴────────╯`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: false,
    topLeftBorder: true,
    topCenterBorder: true,
    topRightBorder: false,
    middleLeftBorder: true,
    middleRightBorder: false,
    bottomLeftBorder: true,
    bottomCenterBorder: true,
    bottomRightBorder: false,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: false,
    result: `
╭─────────╮         
│Hello    │World    
├─────────┤         
│Hello    │World    
╰─────────╯         `
  },
  {
    topTopLeftBorder: false,
    topTopRightBorder: true,
    topLeftBorder: false,
    topCenterBorder: true,
    topRightBorder: true,
    middleLeftBorder: false,
    middleRightBorder: true,
    bottomLeftBorder: false,
    bottomCenterBorder: true,
    bottomRightBorder: true,
    bottomBottomLeftBorder: false,
    bottomBottomRightBorder: true,
    result: `
         ╭─────────╮
Hello    │World    │
         ├─────────┤
Hello    │World    │
         ╰─────────╯`
  },
  {
    topTopLeftBorder: true,
    topTopRightBorder: true,
    topLeftBorder: false,
    topCenterBorder: false,
    topRightBorder: false,
    middleLeftBorder: true,
    middleRightBorder: true,
    bottomLeftBorder: false,
    bottomCenterBorder: false,
    bottomRightBorder: false,
    bottomBottomLeftBorder: true,
    bottomBottomRightBorder: true,
    result: `
────────────────────
Hello     World     
────────────────────
Hello     World     
────────────────────`
  },
  {
    topTopLeftBorder: false,
    topTopRightBorder: false,
    topLeftBorder: true,
    topCenterBorder: true,
    topRightBorder: true,
    middleLeftBorder: false,
    middleRightBorder: false,
    bottomLeftBorder: true,
    bottomCenterBorder: true,
    bottomRightBorder: true,
    bottomBottomLeftBorder: false,
    bottomBottomRightBorder: false,
    result: `
│Hello    │World   │
│Hello    │World   │`
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the border combination [${i}]`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(
        quadDocument([
          {
            border: [currentCombination.topTopLeftBorder, currentCombination.topCenterBorder, currentCombination.middleLeftBorder, currentCombination.topLeftBorder],
            borderStyle: 'single-round'
          },
          {
            border: [currentCombination.topTopRightBorder, currentCombination.topRightBorder, currentCombination.middleRightBorder, currentCombination.topCenterBorder],
            borderStyle: 'single-round'
          },
          {
            border: [currentCombination.middleLeftBorder, currentCombination.bottomCenterBorder, currentCombination.bottomBottomLeftBorder, currentCombination.bottomLeftBorder],
            borderStyle: 'single-round'
          },
          {
            border: [currentCombination.middleRightBorder, currentCombination.bottomRightBorder, currentCombination.bottomBottomRightBorder, currentCombination.bottomCenterBorder],
            borderStyle: 'single-round'
          }
        ])
      )

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
