import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'

describe(TerminalDocument, () => {
  it('vertically aligns text to the middle', () => {
    const document = new TerminalDocument({
      rows: [
        {
          blocks: [
            { border: true, text: 'Some multiple\ntext that is\nlonger than\none line', verticalAlign: 'middle' },
            { border: true, text: 'Some text', verticalAlign: 'middle' }
          ]
        }
      ],
      width: 20
    })

    document.update()

    expect('\n' + stripAnsi(document.output)).toEqual(`
┌─────────┬────────┐
│Some     │        │
│multiple │        │
│text that│Some    │
│is       │text    │
│longer   │        │
│than     │        │
│one line │        │
└─────────┴────────┘`)
  })
})
