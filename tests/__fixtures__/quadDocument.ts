import { BlockDescriptor, TerminalDocumentOptions } from '../../src'

type BlockDescriptorWithOutText = Omit<BlockDescriptor, 'text'>

export function quadDocument(blockDescriptor?: BlockDescriptorWithOutText, width?: number): TerminalDocumentOptions
export function quadDocument(blockDescriptors: BlockDescriptorWithOutText[], width?: number): TerminalDocumentOptions
export function quadDocument(blockDescriptors?: BlockDescriptorWithOutText | BlockDescriptorWithOutText[], width = 20): TerminalDocumentOptions {
  if (!blockDescriptors) {
    return {
      rows: [{ blocks: [{ text: 'Hello' }, { text: 'World' }] }, { blocks: [{ text: 'Hello' }, { text: 'World' }] }],
      width
    }
  } else if (Array.isArray(blockDescriptors)) {
    return {
      rows: [
        {
          blocks: [
            { ...blockDescriptors[0], text: 'Hello' },
            { ...blockDescriptors[1], text: 'World' }
          ]
        },
        {
          blocks: [
            { ...blockDescriptors[2], text: 'Hello' },
            { ...blockDescriptors[3], text: 'World' }
          ]
        }
      ],
      width
    }
  } else {
    return {
      rows: [
        {
          blocks: [
            { ...blockDescriptors, text: 'Hello' },
            { ...blockDescriptors, text: 'World' }
          ]
        },
        {
          blocks: [
            { ...blockDescriptors, text: 'Hello' },
            { ...blockDescriptors, text: 'World' }
          ]
        }
      ],
      width
    }
  }
}
