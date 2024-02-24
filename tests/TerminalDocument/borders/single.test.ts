import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'
import { quadDocument } from '../../__fixtures__/quad-document'

describe(TerminalDocument, (): void => {
  it('renders single border by default', async (): Promise<void> => {
    let terminalDocument = new TerminalDocument({ rows: quadDocument({ border: true }), width: 20 })

    terminalDocument.update()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌─────────┬────────┐
│Hello    │World   │
├─────────┼────────┤
│Hello    │World   │
└─────────┴────────┘
`)

    terminalDocument = new TerminalDocument({ rows: quadDocument({ border: true, borderStyle: 'single' }), width: 20 })

    terminalDocument.update()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌─────────┬────────┐
│Hello    │World   │
├─────────┼────────┤
│Hello    │World   │
└─────────┴────────┘
`)
  })
})
