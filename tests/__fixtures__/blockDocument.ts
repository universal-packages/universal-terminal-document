import { BlockDescriptor, DocumentDescriptor } from '../../src'

type BlockDescriptorWithOutText = Omit<BlockDescriptor, 'text'>

export function blockDocument(blockDescriptor?: BlockDescriptorWithOutText, width = 20): DocumentDescriptor {
  if (!blockDescriptor) {
    return {
      rows: [{ blocks: [{ text: 'Hello World' }] }],
      width
    }
  } else {
    return {
      rows: [{ blocks: [{ ...blockDescriptor, text: 'Hello World' }] }],
      width
    }
  }
}
