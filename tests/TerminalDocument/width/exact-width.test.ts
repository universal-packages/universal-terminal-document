import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('gives the block an exact width', () => {
    const terminalDocument = new TerminalDocument()

    terminalDocument.describe({
      rows: [
        {
          blocks: [{ border: true, text: 'Give this 10 exactly width', width: 10 }]
        }
      ],
      width: 30
    })

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌──────────┐                  
│Give this │                  
│10 exactly│                  
│width     │                  
└──────────┘                  `)
  })
})
