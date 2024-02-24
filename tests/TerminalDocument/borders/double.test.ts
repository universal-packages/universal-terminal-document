import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'
import { quadDocument } from '../../__fixtures__/quad-document'

describe(TerminalDocument, (): void => {
  it('renders double borders', async (): Promise<void> => {
    const terminalDocument = new TerminalDocument({ rows: quadDocument({ border: true, borderStyle: 'double' }), width: 20 })

    terminalDocument.update()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
╔═════════╦════════╗
║Hello    ║World   ║
╠═════════╬════════╣
║Hello    ║World   ║
╚═════════╩════════╝
`)
  })
})
