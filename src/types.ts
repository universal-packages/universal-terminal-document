import { Padding, TextAlign, VerticalAlign, WrappedLine } from '@universal-packages/text-wrap'

export type BackgroundFill = 'word' | 'text' | 'fill' | 'all'
export type BlockDescriptorBuilder<V = any> = (value: V, context: Record<string, any>) => BlockDescriptor
export type Border = boolean | SelectiveBorder
export type BorderStyle = BorderType | SelectiveBorderStyle
export type BorderType = 'single' | 'single-round' | 'thick' | 'double'
export type Color = RedColors | PinkColors | OrangeColors | YellowColors | PurpleColors | GreenColors | BlueColors | BrownColors | WhiteColors | GrayColors
export type InternalBlockDescriptorBuilder = () => BlockDescriptor
export type SelectiveBorder = [boolean, boolean, boolean, boolean]
export type SelectiveBorderStyle = [BorderType, BorderType, BorderType, BorderType]
export type TextStyle = 'bold' | 'italic' | 'underline' | 'inverse' | 'strikethrough'
export type With = number | 'fit'

export interface TerminalDocumentOptions {
  blockBorder?: Border
  blockBorderStyle?: BorderStyle
  border?: Border
  borderStyle?: BorderStyle
  context?: Record<string, any>
  rowBorder?: Border
  rowBorderStyle?: BorderStyle
  rows: RowDescriptor[]
  table?: boolean
  width?: number
}

export interface RowDescriptor {
  blockAlign?: TextAlign
  blockBackgroundColor?: Color
  blockBackgroundFill?: BackgroundFill
  blockBorder?: Border
  blockBorderStyle?: BorderStyle
  blockColor?: Color
  blockHeight?: number
  blockPadding?: Padding
  blockStyle?: TextStyle | TextStyle[]
  blockVerticalAlign?: VerticalAlign
  blocks: (BlockDescriptor | BlockDescriptorBuilderDescriptor)[]
  border?: Border
  borderStyle?: BorderStyle
}

export interface BlockDescriptor {
  align?: TextAlign
  backgroundColor?: Color
  backgroundFill?: BackgroundFill
  border?: Border
  borderStyle?: BorderStyle
  color?: Color
  height?: number
  link?: string
  padding?: Padding
  style?: TextStyle | TextStyle[]
  text: string
  verticalAlign?: VerticalAlign
  width?: With
}

export interface BlockDescriptorBuilderDescriptor {
  id: string
  builder: BlockDescriptorBuilder
}

export interface WrappedBlockDescriptor {
  block: BlockDescriptor
  lines: WrappedLine[]
  width: number
}

export interface BorderDescriptor {
  bottomJoin: string
  bottomLeft: string
  bottomRight: string
  horizontal: string
  join: string
  leftJoin: string
  rightJoin: string
  topJoin: string
  topLeft: string
  topRight: string
  vertical: string
}

export type RedColors = 'indian-red' | 'light-coral' | 'salmon' | 'dark-salmon' | 'light-salmon' | 'crimson' | 'red' | 'fire-brick' | 'dark-red'
export type PinkColors = 'pink' | 'light-pink' | 'hot-pink' | 'deep-pink' | 'medium-violet-red' | 'pale-violet-red'
export type OrangeColors = 'light-salmon' | 'coral' | 'tomato' | 'orange-red' | 'dark-orange' | 'orange'
export type YellowColors =
  | 'gold'
  | 'yellow'
  | 'light-yellow'
  | 'lemon-chiffon'
  | 'light-goldenrod-yellow'
  | 'papaya-whip'
  | 'moccasin'
  | 'peach-puff'
  | 'pale-goldenrod'
  | 'khaki'
  | 'dark-khaki'
export type PurpleColors =
  | 'lavender'
  | 'thistle'
  | 'plum'
  | 'violet'
  | 'orchid'
  | 'fuchsia'
  | 'magenta'
  | 'medium-orchid'
  | 'medium-purple'
  | 'rebecca-purple'
  | 'blue-violet'
  | 'dark-violet'
  | 'dark-orchid'
  | 'dark-magenta'
  | 'purple'
  | 'indigo'
  | 'slate-blue'
  | 'dark-slate-blue'
  | 'medium-slate-blue'
export type GreenColors =
  | 'green-yellow'
  | 'chartreuse'
  | 'lawn-green'
  | 'lime'
  | 'lime-green'
  | 'pale-green'
  | 'light-green'
  | 'medium-spring-green'
  | 'spring-green'
  | 'medium-sea-green'
  | 'sea-green'
  | 'forest-green'
  | 'green'
  | 'dark-green'
  | 'yellow-green'
  | 'olive-drab'
  | 'olive'
  | 'dark-olive-green'
  | 'medium-aquamarine'
  | 'dark-sea-green'
  | 'light-sea-green'
  | 'dark-cyan'
  | 'teal'
export type BlueColors =
  | 'aqua'
  | 'cyan'
  | 'light-cyan'
  | 'pale-turquoise'
  | 'aquamarine'
  | 'turquoise'
  | 'medium-turquoise'
  | 'dark-turquoise'
  | 'cadet-blue'
  | 'steel-blue'
  | 'light-steel-blue'
  | 'powder-blue'
  | 'light-blue'
  | 'sky-blue'
  | 'light-sky-blue'
  | 'deep-sky-blue'
  | 'dodger-blue'
  | 'cornflower-blue'
  | 'medium-slate-blue'
  | 'royal-blue'
  | 'blue'
  | 'medium-blue'
  | 'dark-blue'
  | 'navy'
  | 'midnight-blue'
export type BrownColors =
  | 'cornsilk'
  | 'blanched-almond'
  | 'bisque'
  | 'navajo-white'
  | 'wheat'
  | 'burly-wood'
  | 'tan'
  | 'rosy-brown'
  | 'sandy-brown'
  | 'goldenrod'
  | 'dark-goldenrod'
  | 'peru'
  | 'chocolate'
  | 'saddle-brown'
  | 'sienna'
  | 'brown'
  | 'maroon'
export type WhiteColors =
  | 'white'
  | 'snow'
  | 'honeydew'
  | 'mint-cream'
  | 'azure'
  | 'alice-blue'
  | 'ghost-white'
  | 'white-smoke'
  | 'seashell'
  | 'beige'
  | 'old-lace'
  | 'floral-white'
  | 'ivory'
  | 'antique-white'
  | 'linen'
  | 'lavender-blush'
  | 'misty-rose'
export type GrayColors = 'gainsboro' | 'light-gray' | 'silver' | 'dark-gray' | 'gray' | 'dim-gray' | 'light-slate-gray' | 'slate-gray' | 'dark-slate-gray' | 'black'
