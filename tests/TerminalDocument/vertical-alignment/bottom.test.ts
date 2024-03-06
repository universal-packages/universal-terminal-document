import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('vertically aligns text to the bottom', () => {
    const terminalDocument = new TerminalDocument()

    terminalDocument.describe({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some multiple\ntext that is\nlonger than\none line', verticalAlign: 'bottom' },
            { border: true, text: 'Some other text', verticalAlign: 'bottom' }
          ]
        }
      ],
      width: 30
    })

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌──────────────┬─────────────┐
│Some multiple │             │
│text that is  │             │
│longer than   │Some other   │
│one line      │text         │
└──────────────┴─────────────┘`)
  })
})
