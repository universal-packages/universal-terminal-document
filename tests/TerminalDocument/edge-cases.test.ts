import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../src'

describe(TerminalDocument, () => {
  it('renders a free block text as it is into the document and only the free block text in teh row', () => {
    const terminalDocument = new TerminalDocument()

    terminalDocument.describe({
      rows: [
        {
          blocks: [
            { backgroundColor: 'fire-brick', color: 'white', style: 'bold', text: ' tag1 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'deep-pink', color: 'white', style: 'bold', text: ' tag2 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'medium-violet-red', color: 'white', style: 'bold', text: ' tag3 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'orange-red', color: 'white', style: 'bold', text: ' tag4 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'dark-orange', color: 'white', style: 'bold', text: ' tag5 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'rebecca-purple', color: 'white', style: 'bold', text: ' tag6 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'medium-slate-blue', color: 'white', style: 'bold', text: ' tag7 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'purple', color: 'white', style: 'bold', text: ' tag8 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'lime-green', color: 'white', style: 'bold', text: ' tag9 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'orange-red', color: 'white', style: 'bold', text: ' tag10 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'dark-orange', color: 'white', style: 'bold', text: ' tag11 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'rebecca-purple', color: 'white', style: 'bold', text: ' tag12 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'medium-slate-blue', color: 'white', style: 'bold', text: ' tag13 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'purple', color: 'white', style: 'bold', text: ' tag14 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'lime-green', color: 'white', style: 'bold', text: ' tag15 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'sea-green', color: 'white', style: 'bold', text: ' tag16 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'dark-green', color: 'white', style: 'bold', text: ' tag17 ', width: 'fit' },
            { text: ' ' }
          ]
        },
        {
          blocks: [
            { backgroundColor: 'dark-cyan', color: 'white', style: 'bold', text: ' tag18 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'steel-blue', color: 'white', style: 'bold', text: ' tag19 ', width: 'fit' },
            { text: ' ' },
            { backgroundColor: 'dark-blue', color: 'white', style: 'bold', text: ' tag20 ', width: 'fit' },
            { text: ' ' }
          ]
        }
      ],
      width: 160
    })

    expect('\n' + stripAnsi(terminalDocument.result)).toEqual(`
 tag1     tag2     tag3     tag4     tag5     tag6     tag7     tag8     tag9     tag10     tag11     tag12     tag13     tag14     tag15     tag16     tag17   
 tag18                                                 tag19                                                tag20                                               `)
  })
})
