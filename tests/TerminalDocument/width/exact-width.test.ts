import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('gives the block an exact width', () => {
    const document = new TerminalDocument({
      rows: [
        {
          blocks: [{ border: true, text: 'Give this 10 exactly width', width: 10 }]
        }
      ],
      width: 30
    })

    document.update()

    expect('\n' + stripAnsi(document.output)).toEqual(`
┌──────────┐                  
│Give this │                  
│10 exactly│                  
│width     │                  
└──────────┘                  `)
  })
})
