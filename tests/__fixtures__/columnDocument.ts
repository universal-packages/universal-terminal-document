import { BlockDescriptor, TerminalDocumentOptions } from '../../src'

type BlockDescriptorWithOutText = Omit<BlockDescriptor, 'text'>

export function columnDocument(blockDescriptor?: BlockDescriptorWithOutText, width?: number): TerminalDocumentOptions
export function columnDocument(blockDescriptors: BlockDescriptorWithOutText[], width?: number): TerminalDocumentOptions
export function columnDocument(blockDescriptors?: BlockDescriptorWithOutText | BlockDescriptorWithOutText[], width = 20): TerminalDocumentOptions {
  if (!blockDescriptors) {
    return {
      rows: [{ blocks: [{ text: 'Hello' }] }, { blocks: [{ text: 'World' }] }],
      width
    }
  } else if (Array.isArray(blockDescriptors)) {
    return {
      rows: [{ blocks: [{ ...blockDescriptors[0], text: 'Hello' }] }, { blocks: [{ ...blockDescriptors[1], text: 'World' }] }],
      width
    }
  } else {
    return {
      rows: [{ blocks: [{ ...blockDescriptors, text: 'Hello' }] }, { blocks: [{ ...blockDescriptors, text: 'World' }] }],
      width
    }
  }
}
