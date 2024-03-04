import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('vertically aligns text to the top by default', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some multiple\ntext that is\nlonger than\none line' },
            { border: true, text: 'Some other text' }
          ]
        }
      ],
      width: 30
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌──────────────┬─────────────┐
│Some multiple │Some other   │
│text that is  │text         │
│longer than   │             │
│one line      │             │
└──────────────┴─────────────┘`)
  })

  it('vertically aligns text to the top', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some multiple\ntext that is\nlonger than\none line', verticalAlign: 'top' },
            { border: true, text: 'Some other text', verticalAlign: 'top' }
          ]
        }
      ],
      width: 30
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌──────────────┬─────────────┐
│Some multiple │Some other   │
│text that is  │text         │
│longer than   │             │
│one line      │             │
└──────────────┴─────────────┘`)
  })
})
