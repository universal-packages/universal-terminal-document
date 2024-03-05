import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('gives the block part of the remaining width', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [
            { border: true, text: 'Fit 1', width: 'fit' },
            { border: true, text: 'Rest of' },
            { border: true, text: 'the space' },
            { border: true, text: 'Fit 2', width: 'fit' }
          ]
        }
      ],
      width: 30
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌─────┬────────┬───────┬─────┐
│Fit 1│Rest of │the    │Fit 2│
│     │        │space  │     │
└─────┴────────┴───────┴─────┘`)
  })
})
