import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('gives the block an exact width', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [{ border: true, text: 'Give this 10 exactly width', width: 10 }]
        }
      ],
      width: 30
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌──────────┐                  
│Give this │                  
│10 exactly│                  
│width     │                  
└──────────┘                  `)
  })
})
