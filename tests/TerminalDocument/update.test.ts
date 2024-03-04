import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../src'

describe(TerminalDocument, () => {
  it('gives the block part of the remaining width', () => {
    const terminalDocument = new TerminalDocument({
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

    terminalDocument.update()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
This is a block     `)
  })
})
