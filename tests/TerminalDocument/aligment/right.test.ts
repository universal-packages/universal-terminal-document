import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('align text to the right', () => {
    const document = new TerminalDocument({
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

    document.update()

    expect('\n' + stripAnsi(document.output)).toEqual(`
┌──────────────┬─────────────┐
│     Some text│   Some other│
│              │         text│
└──────────────┴─────────────┘`)
  })
})
