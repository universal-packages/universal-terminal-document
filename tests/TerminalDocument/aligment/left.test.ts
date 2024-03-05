import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('aligns text to the left by default', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some text' },
            { border: true, text: 'Some other text' }
          ]
        }
      ],
      width: 30
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌──────────────┬─────────────┐
│Some text     │Some other   │
│              │text         │
└──────────────┴─────────────┘`)
  })

  it('align text to the left', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some text', align: 'left' },
            { border: true, text: 'Some other text', align: 'left' }
          ]
        }
      ],
      width: 30
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌──────────────┬─────────────┐
│Some text     │Some other   │
│              │text         │
└──────────────┴─────────────┘`)
  })
})
