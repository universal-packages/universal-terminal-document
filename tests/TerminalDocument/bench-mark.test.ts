import { TerminalDocument } from '../../src'
import { FORMATTED_DOC } from '../__fixtures__/formatted-doc'

describe(TerminalDocument, () => {
  it('should be able to render a simple doc 240 times in less than a sec', () => {
    const terminalDocument = new TerminalDocument()

    terminalDocument.describe(FORMATTED_DOC)

    const start = Date.now()

    for (let i = 0; i < 240; i++) {}

    const end = Date.now()

    expect(end - start).toBeLessThan(1000)
  })
})
