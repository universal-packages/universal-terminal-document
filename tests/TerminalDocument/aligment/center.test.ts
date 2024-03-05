import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('aligns text to the center', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some text', align: 'center' },
            { border: true, text: 'Some other text', align: 'center' }
          ]
        }
      ],
      width: 30
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌──────────────┬─────────────┐
│  Some text   │ Some other  │
│              │    text     │
└──────────────┴─────────────┘`)
  })
})
