import { TerminalDocument } from '../../src'

describe(TerminalDocument, () => {
  it('updates a block by id', () => {
    const terminalDocument = new TerminalDocument()

    const listener = jest.fn()
    terminalDocument.on('warning', listener)

    terminalDocument.describe({
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

    expect(listener).toHaveBeenCalledWith('A block with the ID "block1" already exists in the template')

    terminalDocument.update('block2', { text: 'This is a block again' })

    expect(listener).toHaveBeenCalledWith('An update was requested for a non-existent block with the ID "block2"')

    terminalDocument.getBlockSize('block2')

    expect(listener).toHaveBeenCalledWith('Size for a non-existent block with the ID "block2" was requested')
  })
})
