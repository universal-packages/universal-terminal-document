import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('vertically aligns text to the middle', () => {
    const terminalDocument = new TerminalDocument()

    terminalDocument.describe({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some multiple\ntext that is\nlonger than\none line', verticalAlign: 'middle' },
            { border: true, text: 'Some text', verticalAlign: 'middle' }
          ]
        }
      ],
      width: 20
    })

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌─────────┬────────┐
│Some     │        │
│multiple │        │
│text that│Some    │
│is       │text    │
│longer   │        │
│than     │        │
│one line │        │
└─────────┴────────┘`)
  })
})
