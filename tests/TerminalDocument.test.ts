import { BlockDescriptor, TerminalDocument } from '../src'

describe(TerminalDocument, (): void => {
  it('Generates a formatted string that can be rendered in a terminal', async (): Promise<void> => {
    const terminalDocument = new TerminalDocument({
      rows: [
        {
          border: true,
          blockBorder: true,
          blocks: [
            {
              align: 'center',
              backgroundColor: 'lavender',
              backgroundFill: 'fill',
              borderStyle: ['single-round', 'single', 'double', 'double'],
              color: 'black',
              style: ['bold'],
              text: 'Hello, World!',
              link: 'https://www.github.com',
              height: 10,
              verticalAlign: 'middle'
            },
            {
              id: 'clock',
              builder: (value: string, context: Record<string, any>): BlockDescriptor => {
                return {
                  backgroundColor: 'orange-red',
                  backgroundFill: 'all',
                  borderStyle: 'double',
                  color: 'black',
                  style: ['bold', 'italic', 'underline'],
                  align: 'center',
                  padding: 1,
                  text: new Date().toLocaleTimeString()
                }
              }
            }
          ]
        },
        {
          border: true,
          blockBorder: true,
          blocks: [
            {
              align: 'center',
              backgroundColor: 'lemon-chiffon',
              backgroundFill: 'fill',
              borderStyle: 'thick',
              color: 'black',
              style: ['bold'],
              text: 'Hello, World!',
              link: 'https://www.github.com',
              verticalAlign: 'middle'
            },
            {
              id: 'clock',
              builder: (value: string, context: Record<string, any>): BlockDescriptor => {
                return {
                  backgroundColor: 'orchid',
                  backgroundFill: 'all',
                  color: 'black',
                  style: ['bold', 'italic', 'underline'],
                  align: 'center',
                  padding: 1,
                  text: new Date().toLocaleTimeString()
                }
              }
            }
          ]
        },
        {
          border: true,
          blockBorder: true,
          blocks: [
            {
              align: 'center',
              backgroundColor: 'lemon-chiffon',
              backgroundFill: 'fill',
              color: 'black',
              style: ['bold'],
              text: 'Hola conche tu madre!',
              link: 'https://www.github.com',
              verticalAlign: 'middle',
              width: 'fit'
            },
            {
              id: 'clock',
              builder: (value: string, context: Record<string, any>): BlockDescriptor => {
                return {
                  backgroundColor: 'orchid',
                  backgroundFill: 'all',
                  color: 'black',
                  style: ['bold', 'italic', 'underline'],
                  align: 'center',
                  padding: 1,
                  text: 'Some othe rtext'
                }
              }
            }
          ]
        },
        {
          border: true,
          blockBorder: true,
          blocks: [
            {
              align: 'center',
              backgroundColor: 'lemon-chiffon',
              backgroundFill: 'fill',
              color: 'black',
              style: ['bold'],
              text: 'Hello, World!',
              link: 'https://www.github.com',
              verticalAlign: 'middle'
            },
            {
              id: 'clock',
              builder: (value: string, context: Record<string, any>): BlockDescriptor => {
                return {
                  backgroundColor: 'orchid',
                  backgroundFill: 'all',
                  borderStyle: 'single-round',
                  color: 'black',
                  style: ['bold', 'italic', 'underline'],
                  align: 'center',
                  padding: 1,
                  text: new Date().toLocaleTimeString(),
                  width: 'fit'
                }
              }
            }
          ]
        }
      ]
    })

    terminalDocument.update()

    process.stdout.write(terminalDocument.output)
    process.stdout.write('\n\n')
  })
})
