import { BlockDescriptor, DocumentDescriptor } from '../../src'

type BlockDescriptorWithOutText = Omit<BlockDescriptor, 'text'>

export function rowDocument(blockDescriptor?: BlockDescriptorWithOutText, width?: number): DocumentDescriptor
export function rowDocument(blockDescriptors: BlockDescriptorWithOutText[], width?: number): DocumentDescriptor
export function rowDocument(blockDescriptors?: BlockDescriptorWithOutText | BlockDescriptorWithOutText[], width = 20): DocumentDescriptor {
  if (!blockDescriptors) {
    return {
      rows: [{ blocks: [{ text: 'Hello' }, { text: 'World' }] }],
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
        }
      ],
      width
    }
  }
}
