import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('wraps rows in borders without dividing blocks', () => {
    const document = new TerminalDocument({
      rows: [
        {
          blocks: [{ text: 'This is a row' }, { text: 'That has a border' }],
          border: true
        },
        {
          blocks: [{ text: 'This is another row' }, { text: 'That also has a border' }],
          border: true
        }
      ],
      width: 20
    })

    document.update()

    expect('\n' + stripAnsi(document.output)).toEqual(`
┌──────────────────┐
│This is aThat has │
│row      a border │
├──────────────────┤
│This is  That also│
│another  has a    │
│row      border   │
└──────────────────┘`)
  })
})
