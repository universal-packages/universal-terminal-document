import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('makes sure the block has a percentage of the document width', () => {
    const terminalDocument = new TerminalDocument()

    terminalDocument.describe({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some Text', width: '30%' },
            { border: true, text: 'Other text\nSome other large text', width: '60%' },
            { border: true, text: 'Hello!' }
          ]
        }
      ],
      width: 80
    })

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌────────────────────────┬────────────────────────────────────────────────┬────┐
│Some Text               │Other text                                      │Hel-│
│                        │Some other large text                           │lo! │
└────────────────────────┴────────────────────────────────────────────────┴────┘`)
  })
})
