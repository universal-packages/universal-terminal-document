import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../src'

describe(TerminalDocument, () => {
  it('updates a block by id', () => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          blocks: [
            {
              id: 'block1',
              text: 'This is a block'
            }
          ]
        }
      ],
      width: 20
    })

    terminalDocument.render()

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
This is a block     `)

    terminalDocument.update('block1', { text: 'This is an updated block' })

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
This is an updated  
block               `)

    terminalDocument.update('block1', { padding: 1, border: true })

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌──────────────────┐
│                  │
│ This is an       │
│ updated block    │
│                  │
└──────────────────┘`)

    terminalDocument.update('block1', { align: 'center' })

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┌──────────────────┐
│                  │
│    This is an    │
│  updated block   │
│                  │
└──────────────────┘`)

    terminalDocument.update('block1', { borderStyle: 'dash-2-thick' })

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┏╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┓
╏                  ╏
╏    This is an    ╏
╏  updated block   ╏
╏                  ╏
┗╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛`)

    terminalDocument.update('block1', { borderColor: 'red', borderStyle: 'double' })

    // Check visually
    // console.log(terminalDocument.output)

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
╔══════════════════╗
║                  ║
║    This is an    ║
║  updated block   ║
║                  ║
╚══════════════════╝`)

    terminalDocument.update('block1', { borderColor: 'green' })

    // Check visually
    // console.log(terminalDocument.output)

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
╔══════════════════╗
║                  ║
║    This is an    ║
║  updated block   ║
║                  ║
╚══════════════════╝`)

    terminalDocument.update('block1', { borderColor: null })

    // Check visually
    // console.log(terminalDocument.output)

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
╔══════════════════╗
║                  ║
║    This is an    ║
║  updated block   ║
║                  ║
╚══════════════════╝`)

    terminalDocument.update('block1', { borderStyle: ['dash-2-thick', 'double', 'dash-2', 'single'] })

    expect('\n' + stripAnsi(terminalDocument.output)).toEqual(`
┍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╗
│                  ║
│    This is an    ║
│  updated block   ║
│                  ║
└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╜`)
  })
})
