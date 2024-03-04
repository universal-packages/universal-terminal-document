import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('aligns text to the right', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some text', align: 'right' },
            { border: true, text: 'Some other text', align: 'right' }
          ]
        }
      ],
      width: 30
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌──────────────┬─────────────┐
│     Some text│   Some other│
│              │         text│
└──────────────┴─────────────┘`)
  })
})
