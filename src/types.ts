import { Padding, TextAlign, VerticalAlign, WrappedLine } from '@universal-packages/text-wrap'

export type BackgroundFill = 'word' | 'text' | 'fill' | 'all'
export type Border = boolean | SelectiveBorder
export type BorderColor = Color | SelectiveBorderColor
export type BorderStyle = BorderType | SelectiveBorderStyle
export type BorderType = 'single' | 'single-round' | 'thick' | 'double' | 'dash-2' | 'dash-2-thick' | 'dash-3' | 'dash-3-thick' | 'dash-4' | 'dash-4-thick'
export type Color = RedColors | PinkColors | OrangeColors | YellowColors | PurpleColors | GreenColors | BlueColors | BrownColors | WhiteColors | GrayColors
export type SelectiveBorder = [boolean, boolean, boolean, boolean]
export type SelectiveBorderColor = [Color, Color, Color, Color]
export type SelectiveBorderStyle = [BorderType, BorderType, BorderType, BorderType]
export type TextStyle = 'bold' | 'italic' | 'underline' | 'inverse' | 'strikethrough'
export type With = number | 'fit'

export interface TerminalDocumentOptions {
  blockBorder?: Border
  blockBorderColor?: BorderColor
  blockBorderStyle?: BorderStyle
  border?: Border
  borderColor?: BorderColor
  borderStyle?: BorderStyle
  context?: Record<string, any>
  rowBorder?: Border
  rowBorderColor?: BorderColor
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
  blockBorderColor?: BorderColor
  blockBorderStyle?: BorderStyle
  blockColor?: Color
  blockHeight?: number
  blockPadding?: Padding
  blockStyle?: TextStyle | TextStyle[]
  blockVerticalAlign?: VerticalAlign
  blocks: BlockDescriptor[]
  border?: Border
  borderColor?: BorderColor
  borderStyle?: BorderStyle
}

export interface BlockDescriptor {
  align?: TextAlign
  backgroundColor?: Color
  backgroundFill?: BackgroundFill
  border?: Border
  borderColor?: BorderColor
  borderStyle?: BorderStyle
  color?: Color
  height?: number
  id?: string
  link?: string
  padding?: Padding
  style?: TextStyle | TextStyle[]
  text: string
  verticalAlign?: VerticalAlign
  width?: With
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

export interface TemplateUpdaters {
  [key: string]: (block: Omit<Partial<BlockDescriptor>, 'id'>) => void
}

export enum RedColor {
  IndianRed = 'indian-red',
  LightCoral = 'light-coral',
  Salmon = 'salmon',
  DarkSalmon = 'dark-salmon',
  LightSalmon = 'light-salmon',
  Crimson = 'crimson',
  Red = 'red',
  FireBrick = 'fire-brick',
  DarkRed = 'dark-red'
}

export enum PinkColor {
  Pink = 'pink',
  LightPink = 'light-pink',
  HotPink = 'hot-pink',
  DeepPink = 'deep-pink',
  MediumVioletRed = 'medium-violet-red',
  PaleVioletRed = 'pale-violet-red'
}

export enum OrangeColor {
  LightSalmon = 'light-salmon',
  Coral = 'coral',
  Tomato = 'tomato',
  OrangeRed = 'orange-red',
  DarkOrange = 'dark-orange',
  Orange = 'orange'
}

export enum YellowColor {
  Gold = 'gold',
  Yellow = 'yellow',
  LightYellow = 'light-yellow',
  LemonChiffon = 'lemon-chiffon',
  LightGoldenrodYellow = 'light-goldenrod-yellow',
  PapayaWhip = 'papaya-whip',
  Moccasin = 'moccasin',
  PeachPuff = 'peach-puff',
  PaleGoldenrod = 'pale-goldenrod',
  Khaki = 'khaki',
  DarkKhaki = 'dark-khaki'
}

export enum PurpleColor {
  Lavender = 'lavender',
  Thistle = 'thistle',
  Plum = 'plum',
  Violet = 'violet',
  Orchid = 'orchid',
  Fuchsia = 'fuchsia',
  Magenta = 'magenta',
  MediumOrchid = 'medium-orchid',
  MediumPurple = 'medium-purple',
  RebeccaPurple = 'rebecca-purple',
  BlueViolet = 'blue-violet',
  DarkViolet = 'dark-violet',
  DarkOrchid = 'dark-orchid',
  DarkMagenta = 'dark-magenta',
  Purple = 'purple',
  Indigo = 'indigo',
  SlateBlue = 'slate-blue',
  DarkSlateBlue = 'dark-slate-blue',
  MediumSlateBlue = 'medium-slate-blue'
}

export enum GreenColor {
  GreenYellow = 'green-yellow',
  Chartreuse = 'chartreuse',
  LawnGreen = 'lawn-green',
  Lime = 'lime',
  LimeGreen = 'lime-green',
  PaleGreen = 'pale-green',
  LightGreen = 'light-green',
  MediumSpringGreen = 'medium-spring-green',
  SpringGreen = 'spring-green',
  MediumSeaGreen = 'medium-sea-green',
  SeaGreen = 'sea-green',
  ForestGreen = 'forest-green',
  Green = 'green',
  DarkGreen = 'dark-green',
  YellowGreen = 'yellow-green',
  OliveDrab = 'olive-drab',
  Olive = 'olive',
  DarkOliveGreen = 'dark-olive-green',
  MediumAquamarine = 'medium-aquamarine',
  DarkSeaGreen = 'dark-sea-green',
  LightSeaGreen = 'light-sea-green',
  DarkCyan = 'dark-cyan',
  Teal = 'teal'
}

export enum BlueColor {
  Aqua = 'aqua',
  Cyan = 'cyan',
  LightCyan = 'light-cyan',
  PaleTurquoise = 'pale-turquoise',
  Aquamarine = 'aquamarine',
  Turquoise = 'turquoise',
  MediumTurquoise = 'medium-turquoise',
  DarkTurquoise = 'dark-turquoise',
  CadetBlue = 'cadet-blue',
  SteelBlue = 'steel-blue',
  LightSteelBlue = 'light-steel-blue',
  PowderBlue = 'powder-blue',
  LightBlue = 'light-blue',
  SkyBlue = 'sky-blue',
  LightSkyBlue = 'light-sky-blue',
  DeepSkyBlue = 'deep-sky-blue',
  DodgerBlue = 'dodger-blue',
  CornflowerBlue = 'cornflower-blue',
  MediumSlateBlue = 'medium-slate-blue',
  RoyalBlue = 'royal-blue',
  Blue = 'blue',
  MediumBlue = 'medium-blue',
  DarkBlue = 'dark-blue',
  Navy = 'navy',
  MidnightBlue = 'midnight-blue'
}

export enum BrownColor {
  Cornsilk = 'cornsilk',
  BlanchedAlmond = 'blanched-almond',
  Bisque = 'bisque',
  NavajoWhite = 'navajo-white',
  Wheat = 'wheat',
  BurlyWood = 'burly-wood',
  Tan = 'tan',
  RosyBrown = 'rosy-brown',
  SandyBrown = 'sandy-brown',
  Goldenrod = 'goldenrod',
  DarkGoldenrod = 'dark-goldenrod',
  Peru = 'peru',
  Chocolate = 'chocolate',
  SaddleBrown = 'saddle-brown',
  Sienna = 'sienna',
  Brown = 'brown',
  Maroon = 'maroon'
}

export enum WhiteColor {
  White = 'white',
  Snow = 'snow',
  Honeydew = 'honeydew',
  MintCream = 'mint-cream',
  Azure = 'azure',
  AliceBlue = 'alice-blue',
  GhostWhite = 'ghost-white',
  WhiteSmoke = 'white-smoke',
  Seashell = 'seashell',
  Beige = 'beige',
  OldLace = 'old-lace',
  FloralWhite = 'floral-white',
  Ivory = 'ivory',
  AntiqueWhite = 'antique-white',
  Linen = 'linen',
  LavenderBlush = 'lavender-blush',
  MistyRose = 'misty-rose'
}

export enum GrayColor {
  Gainsboro = 'gainsboro',
  LightGray = 'light-gray',
  Silver = 'silver',
  DarkGray = 'dark-gray',
  Gray = 'gray',
  DimGray = 'dim-gray',
  LightSlateGray = 'light-slate-gray',
  SlateGray = 'slate-gray',
  DarkSlateGray = 'dark-slate-gray',
  Black = 'black'
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
