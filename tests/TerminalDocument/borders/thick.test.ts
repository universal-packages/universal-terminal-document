import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'
import { quadDocument } from '../../__fixtures__/quadDocument'

describe(TerminalDocument, (): void => {
  it('renders thick borders', async (): Promise<void> => {
    const terminalDocument = new TerminalDocument(quadDocument({ border: true, borderStyle: 'thick' }))

    terminalDocument.update()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┏━━━━━━━━━┳━━━━━━━━┓
┃Hello    ┃World   ┃
┣━━━━━━━━━╋━━━━━━━━┫
┃Hello    ┃World   ┃
┗━━━━━━━━━┻━━━━━━━━┛
`)
  })
})
