import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('normalize border arrays to not throw if there are inconsistencies', () => {
    const terminalDocument = new TerminalDocument()

    terminalDocument.describe({
      rows: [
        {
          blocks: [
            { text: 'Some multiple\ntext that is\nlonger than\none line', verticalAlign: 'middle' },
            { text: 'Some text', verticalAlign: 'middle' }
          ],
          border: [] as any
        }
      ],
      width: 20
    })

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
Some                
multiple            
text that           
is        Some text 
longer              
than                
one line            `)
  })
})
