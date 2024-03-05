import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../src'

describe(TerminalDocument, () => {
  it('updates a block by id', () => {
    const listener = jest.fn()
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [
            {
              id: 'block1',
              text: 'This is a block'
            },
            {
              id: 'block1',
              text: 'This is a block again'
            }
          ]
        }
      ],
      width: 20
    })

    terminalDocument.on('warning', listener)

    terminalDocument.render()

    expect(listener).toHaveBeenCalledWith('A block with the ID "block1" already exists in the template')

    terminalDocument.update('block2', { text: 'This is a block again' })

    expect(listener).toHaveBeenCalledWith('An update was requested for a non-existent block with the ID "block2"')
  })
})
