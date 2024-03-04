import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('makes sure the block has the same width as the text', () => {
    const document = new TerminalDocument({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some Text', width: 'fit' },
            { border: true, text: 'Other text\nSome other large text', width: 'fit' }
          ]
        }
      ],
      width: 30
    })

    document.update()

    expect('\n' + stripAnsi(document.output)).toEqual(`
┌─────────┬─────────────────────┐
│Some Text│Other text           │
│         │Some other large text│
└─────────┴─────────────────────┘`)
  })
})
