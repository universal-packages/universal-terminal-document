import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../src'

describe(TerminalDocument, () => {
  it('renders a free block text as it is into the document and only the free block text in teh row', () => {
    const terminalDocument = new TerminalDocument()

    terminalDocument.describe({
      rows: [
        {
          blocks: [
            {
              text: 'Info',
              width: 'fit',
              border: true
            },
            {
              text: 'This is a block that can be measured',
              padding: 1,
              border: true,
              align: 'center'
            }
          ]
        },
        {
          blocks: [
            {
              text: 'Info',
              width: 'fit',
              border: true
            },
            {
              border: true,
              align: 'center',
              text: 'This is a free block text it can be text that was previously formatted and should be rendered as it is.\nThis way we can render a block of text that is not formatted by the terminal document and wrapping will be delegated to the terminal.',
              free: true
            }
          ]
        }
      ],
      width: 30
    })

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌────┬───────────────────────┐
│Info│                       │
│    │ This is a block that  │
│    │    can be measured    │
│    │                       │
└────┴───────────────────────┘
This is a free block text it can be text that was previously formatted and should be rendered as it is.
This way we can render a block of text that is not formatted by the terminal document and wrapping will be delegated to the terminal.
──────────────────────────────`)
  })
})
