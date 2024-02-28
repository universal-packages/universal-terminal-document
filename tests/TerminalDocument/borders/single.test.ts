import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'
import { quadDocument } from '../../__fixtures__/quadDocument'

describe(TerminalDocument, (): void => {
  it('renders single border by default', async (): Promise<void> => {
    let terminalDocument = new TerminalDocument(quadDocument({ border: true }))

    terminalDocument.update()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌─────────┬────────┐
│Hello    │World   │
├─────────┼────────┤
│Hello    │World   │
└─────────┴────────┘`)

    terminalDocument = new TerminalDocument(quadDocument({ border: true, borderStyle: 'single' }))

    terminalDocument.update()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌─────────┬────────┐
│Hello    │World   │
├─────────┼────────┤
│Hello    │World   │
└─────────┴────────┘`)
  })
})
