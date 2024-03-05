import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../src'

describe(TerminalDocument, () => {
  it('resizes the document available width', () => {
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

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
This is a block     `)

    terminalDocument.resize(10)

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
This is a 
block     `)

    terminalDocument.resize(30)

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
This is a block               `)
  })
})
