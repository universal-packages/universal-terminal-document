import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('wraps the document in borders without dividing blocks nor rows', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [{ text: 'This is a row' }, { text: 'Just a row' }]
        },
        {
          blocks: [{ text: 'This is another row' }, { text: 'as well a row' }]
        }
      ],
      border: true,
      width: 20
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌──────────────────┐
│This is aJust a   │
│row      row      │
│This is  as well a│
│another  row      │
│row               │
└──────────────────┘`)
  })
})
