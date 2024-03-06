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
              id: 'block1',
              text: 'This is a block'
            }
          ]
        }
      ],
      width: 20
    })

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
This is a block     `)

    terminalDocument.describe({
      blockBorder: true,
      rows: [
        {
          blocks: [
            {
              id: 'block1',
              text: 'This is an updated block'
            },
            {
              id: 'block2',
              text: 'This is a new block'
            }
          ]
        },
        {
          blocks: [
            {
              id: 'block3',
              text: 'This is another block'
            }
          ]
        }
      ],
      width: 30
    })

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
┌──────────────┬─────────────┐
│This is an    │This is a new│
│updated block │block        │
├──────────────┴─────────────┤
│This is another block       │
└────────────────────────────┘`)
  })
})
