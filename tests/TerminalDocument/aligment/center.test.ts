import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('aligns text to the center', () => {
    const document = new TerminalDocument({
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

    document.update()

    expect('\n' + stripAnsi(document.output)).toEqual(`
┌──────────────┬─────────────┐
│  Some text   │ Some other  │
│              │    text     │
└──────────────┴─────────────┘`)
  })
})
