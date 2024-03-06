import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../src'

describe(TerminalDocument, () => {
  it('updates a block by id', () => {
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
              id: 'block1',
              text: 'This is a block that can be measured',
              padding: 1,
              border: true,
              align: 'center'
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
└────┴───────────────────────┘`)

    expect(terminalDocument.getBlockSize('block1')).toEqual({ fillHeight: 2, fillWidth: 21, height: 4, width: 23 })
  })
})
