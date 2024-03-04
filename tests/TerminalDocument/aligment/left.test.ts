import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('align text to the left by default', () => {
    const document = new TerminalDocument({
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

    document.update()

    expect('\n' + stripAnsi(document.output)).toEqual(`
┌──────────────┬─────────────┐
│Some text     │Some other   │
│              │text         │
└──────────────┴─────────────┘`)
  })

  it('align text to the left', () => {
    const document = new TerminalDocument({
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

    document.update()

    expect('\n' + stripAnsi(document.output)).toEqual(`
┌──────────────┬─────────────┐
│Some text     │Some other   │
│              │text         │
└──────────────┴─────────────┘`)
  })
})
