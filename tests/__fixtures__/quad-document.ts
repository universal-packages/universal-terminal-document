import { BlockDescriptor, RowDescriptor } from '../../src'

export function quadDocument(description?: Omit<BlockDescriptor, 'text'>): RowDescriptor[] {
  return [
    {
      blocks: [
        { ...description, text: 'Hello' },
        { ...description, text: 'World' }
      ]
    },
    {
      blocks: [
        { ...description, text: 'Hello' },
        { ...description, text: 'World' }
      ]
    }
  ]
}
