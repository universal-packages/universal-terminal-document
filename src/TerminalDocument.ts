import { EventEmitter } from '@universal-packages/event-emitter'
import { VerticalAlign, WrapTextOptions, WrappedLine, synthesizeWrappedLine, wrap } from '@universal-packages/text-wrap'
import ansiScapes from 'ansi-escapes'
import chalk from 'chalk'

import {
  BOTTOM_JOIN,
  BOTTOM_LEFT_CORNER,
  BOTTOM_RIGHT_CORNER,
  HORIZONTAL_BORDERS,
  HORIZONTAL_BORDERS_ANALOGOUS_MAP,
  HORIZONTAL_LEFT_INFER_MAP,
  HORIZONTAL_RIGHT_INFER_MAP,
  JOIN,
  LEFT_JOIN,
  RIGHT_JOIN,
  ROUND_BORDERS_MAP,
  TOP_JOIN,
  TOP_LEFT_CORNER,
  TOP_RIGHT_CORNER,
  VERTICAL_BORDERS,
  VERTICAL_BORDERS_ANALOGOUS_MAP,
  VERTICAL_BORDERS_RECTIFICATION_MAP,
  VERTICAL_BOTTOM_END,
  VERTICAL_INFER_MAP,
  VERTICAL_JOIN,
  VERTICAL_TOP_END
} from './borders'
import { COLORS } from './colors'
import {
  BlockDescriptor,
  Border,
  BorderColor,
  BorderStyle,
  Color,
  SelectiveBorder,
  SelectiveBorderColor,
  SelectiveBorderStyle,
  TerminalDocumentOptions,
  WrappedBlockDescriptor
} from './types'

const DYNAMIC_BLOCK_MIN_WIDTH = 10

export default class TerminalDocument extends EventEmitter {
  public readonly options: TerminalDocumentOptions

  public get output(): string {
    return this.internalOutput || ''
  }

  private template: BlockDescriptor[][] = []
  private internalOutput: string
  private documentWidth: number

  public constructor(options: TerminalDocumentOptions) {
    super()

    this.options = { context: {}, width: 80, ...options }
    this.documentWidth = this.options.width
    this.generateTemplate()
  }

  public update(): void {
    this.render()
  }

  public render(): void {
    this.internalOutput = ''

    if (this.options.table) {
    } else {
      const wrappedBlocks: WrappedBlockDescriptor[][] = this.template.map((rowBlocks) => this.generateWrappedBlocks(rowBlocks))

      for (let i = 0; i < wrappedBlocks.length; i++) {
        const currentWrappedBlocks = wrappedBlocks[i]
        const previousWrappedBlocks = wrappedBlocks[i - 1]
        const topBorderLine = this.generateBorderLine(currentWrappedBlocks, previousWrappedBlocks)

        this.internalOutput += topBorderLine ? topBorderLine + '\n' : ''
        this.internalOutput += this.synthesizeWrappedBlocks(currentWrappedBlocks).join('\n') + (i < wrappedBlocks.length - 1 ? '\n' : '')
      }

      const lastBorderLine = this.generateBorderLine(undefined, wrappedBlocks[wrappedBlocks.length - 1])

      this.internalOutput += lastBorderLine ? '\n' + lastBorderLine : ''
    }
  }

  private generateWrappedBlocks(rowBlocks: BlockDescriptor[]): WrappedBlockDescriptor[] {
    const wrappedBlocks: WrappedBlockDescriptor[] = []

    for (let i = 0; i < rowBlocks.length; i++) {
      const currentBlock = rowBlocks[i]
      const baseWrapOptions: WrapTextOptions = {
        align: currentBlock.align,
        fillBlock: true,
        height: currentBlock.height,
        hyphenate: 'word',
        padding: currentBlock.padding,
        verticalAlign: currentBlock.verticalAlign
      }

      if (currentBlock.width === 'fit') {
        const lines = wrap(currentBlock.text, baseWrapOptions)

        wrappedBlocks.push({ block: currentBlock, lines, width: synthesizeWrappedLine(lines[0]).length })
      } else if (typeof currentBlock.width === 'number') {
        const lines = wrap(currentBlock.text, { ...baseWrapOptions, width: currentBlock.width })

        wrappedBlocks.push({ block: currentBlock, lines, width: synthesizeWrappedLine(lines[0]).length })
      } else {
        wrappedBlocks.push({ block: currentBlock, lines: [], width: 0 })
      }
    }

    const fixedWidthTotal = wrappedBlocks.filter((wp) => typeof wp.block.width === 'number').reduce((acc, wb) => acc + synthesizeWrappedLine(wb.lines[0]).length, 0)
    const fitWidthTotal = wrappedBlocks.filter((wp) => wp.block.width === 'fit').reduce((acc, wb) => acc + synthesizeWrappedLine(wb.lines[0]).length, 0)
    const horizontalBorderWidth = this.getHorizontalBorderCountNeeded(rowBlocks)
    const dynamicWidthBlocksCount = rowBlocks.filter((b) => b.width === undefined).length
    const remainingWidth = Math.max(this.documentWidth - fixedWidthTotal - fitWidthTotal - horizontalBorderWidth, 0) || dynamicWidthBlocksCount * DYNAMIC_BLOCK_MIN_WIDTH
    const dynamicWidth = Math.floor(remainingWidth / dynamicWidthBlocksCount)
    let dynamicWidthToGive = this.documentWidth - fixedWidthTotal - fitWidthTotal - horizontalBorderWidth - dynamicWidthBlocksCount * dynamicWidth

    for (let i = 0; i < wrappedBlocks.length; i++) {
      const currentWrappedBlock = wrappedBlocks[i]
      const baseWrapOptions: WrapTextOptions = {
        align: currentWrappedBlock.block.align,
        height: currentWrappedBlock.block.height,
        fillBlock: true,
        hyphenate: 'word',
        padding: currentWrappedBlock.block.padding,
        verticalAlign: currentWrappedBlock.block.verticalAlign
      }

      if (currentWrappedBlock.block.width === undefined) {
        currentWrappedBlock.lines = wrap(currentWrappedBlock.block.text, { ...baseWrapOptions, width: dynamicWidth + (dynamicWidthToGive ? dynamicWidthToGive-- : 0) })
        currentWrappedBlock.width = synthesizeWrappedLine(currentWrappedBlock.lines[0]).length
      }
    }

    const maxHigh = wrappedBlocks.reduce((acc, wb) => Math.max(acc, wb.lines.length), 0)

    for (let i = 0; i < wrappedBlocks.length; i++) {
      const currentWrappedBlock = wrappedBlocks[i]

      if (currentWrappedBlock.lines.length < maxHigh) {
        this.fillHeight(currentWrappedBlock.lines, maxHigh, currentWrappedBlock.block.verticalAlign)
      }
    }

    return wrappedBlocks
  }

  private synthesizeWrappedBlocks(wrappedBlocks: WrappedBlockDescriptor[]): string[] {
    const lines = Array(wrappedBlocks[0].lines.length).fill('')

    for (let i = 0; i < wrappedBlocks.length; i++) {
      const currentWrappedBlock = wrappedBlocks[i]
      const nextWrappedBlock = wrappedBlocks[i + 1]

      for (let j = 0; j < currentWrappedBlock.lines.length; j++) {
        const currentWrappedLine = currentWrappedBlock.lines[j]

        if (i === 0 && currentWrappedBlock.block.border[3]) {
          lines[j] += this.applyBorderColor(
            VERTICAL_BORDERS_RECTIFICATION_MAP[VERTICAL_BORDERS[currentWrappedBlock.block.borderStyle[3]]],
            currentWrappedBlock.block.borderColor?.[3] as Color
          )
        }

        lines[j] += this.synthesizeWrappedLine(currentWrappedLine, currentWrappedBlock.block)

        if (currentWrappedBlock.block.border[1]) {
          lines[j] += this.applyBorderColor(
            VERTICAL_BORDERS_RECTIFICATION_MAP[VERTICAL_BORDERS[currentWrappedBlock.block.borderStyle[1]]],
            currentWrappedBlock.block.borderColor?.[1] as Color
          )
        } else if (nextWrappedBlock?.block.border[3]) {
          lines[j] += this.applyBorderColor(
            VERTICAL_BORDERS_RECTIFICATION_MAP[VERTICAL_BORDERS[nextWrappedBlock.block.borderStyle[3]]],
            nextWrappedBlock.block.borderColor?.[3] as Color
          )
        }
      }
    }

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].length < this.documentWidth) {
        lines[i] += ' '.repeat(this.documentWidth - lines[i].length)
      }
    }

    return lines
  }

  private generateBorderLine(wrappedBlocks?: WrappedBlockDescriptor[], previousWrappedBlocks?: WrappedBlockDescriptor[]): string {
    const anyBorder = wrappedBlocks?.some((wb) => wb.block.border[0])
    const anyPreviousBorder = previousWrappedBlocks?.some((wb) => wb.block.border[2])

    if (anyBorder || anyPreviousBorder) {
      const border = Array(this.documentWidth).fill(' ')
      const borderColors = Array(this.documentWidth).fill(undefined)
      let borderIndex = 0

      for (let i = -1; i < previousWrappedBlocks?.length || 0; i++) {
        const leftBlock = previousWrappedBlocks[i]
        const rightBlock = previousWrappedBlocks[i + 1]
        const leftBorder = leftBlock?.block.border
        const rightBorder = rightBlock?.block.border

        if (!leftBorder && rightBorder) {
          if (rightBorder?.[3]) borderIndex++
        } else if (leftBorder && !rightBorder) {
          if (leftBorder[1]) borderIndex++
        } else if (leftBorder && rightBorder) {
          if (leftBorder[1] || rightBorder[3]) borderIndex++
        }

        if (rightBorder?.[2]) {
          const rightBorderStyle = rightBlock.block.borderStyle as SelectiveBorderStyle

          border.splice(borderIndex, rightBlock.width, ...Array(rightBlock.width).fill(HORIZONTAL_BORDERS[rightBorderStyle[2]]))
          borderColors.splice(borderIndex, rightBlock.width, ...Array(rightBlock.width).fill(rightBlock.block.borderColor?.[2]))
        }

        borderIndex += rightBlock?.width || 0
      }

      borderIndex = 0

      for (let i = -1; i < wrappedBlocks?.length || 0; i++) {
        const leftBlock = wrappedBlocks[i]
        const rightBlock = wrappedBlocks[i + 1]
        const leftBorder = leftBlock?.block.border
        const rightBorder = rightBlock?.block.border

        if (!leftBorder && rightBorder) {
          if (rightBorder?.[3]) borderIndex++
        } else if (leftBorder && !rightBorder) {
          if (leftBorder[1]) borderIndex++
        } else if (leftBorder && rightBorder) {
          if (leftBorder[1] || rightBorder[3]) borderIndex++
        }

        if (rightBorder?.[0]) {
          const rightBorderStyle = rightBlock.block.borderStyle as SelectiveBorderStyle

          border.splice(borderIndex, rightBlock.width, ...Array(rightBlock.width).fill(HORIZONTAL_BORDERS[rightBorderStyle[0]]))
          borderColors.splice(borderIndex, rightBlock.width, ...Array(rightBlock.width).fill(rightBlock.block.borderColor?.[0]))
        }

        borderIndex += rightBlock?.width || 0
      }

      borderIndex = 0

      for (let i = -1; i < previousWrappedBlocks?.length || 0; i++) {
        const leftBlock = previousWrappedBlocks?.[i]
        const rightBlock = previousWrappedBlocks?.[i + 1]
        const hasVerticalBorder = leftBlock?.block.border[1] || rightBlock?.block.border[3]

        borderIndex += leftBlock?.width || 0

        if (hasVerticalBorder) {
          const verticalBorderStyle = leftBlock?.block.border[1] ? leftBlock?.block.borderStyle?.[1] : rightBlock?.block.borderStyle?.[3]
          const verticalBorderColor = leftBlock?.block.border[1] ? leftBlock?.block.borderColor?.[1] : rightBlock?.block.borderColor?.[3]
          const verticalBorderChar = VERTICAL_BORDERS_ANALOGOUS_MAP[VERTICAL_BORDERS[verticalBorderStyle]]

          const leftBorderChar = HORIZONTAL_BORDERS_ANALOGOUS_MAP[border[borderIndex - 1]?.replace(' ', '')]
          const rightBorderChar = HORIZONTAL_BORDERS_ANALOGOUS_MAP[border[borderIndex + 1]?.replace(' ', '')]

          if (!leftBorderChar && rightBorderChar) {
            border[borderIndex] = BOTTOM_LEFT_CORNER[verticalBorderChar + rightBorderChar]
          } else if (leftBorderChar && !rightBorderChar) {
            border[borderIndex] = BOTTOM_RIGHT_CORNER[leftBorderChar + verticalBorderChar]
          } else if (leftBorderChar && rightBorderChar) {
            border[borderIndex] = BOTTOM_JOIN[leftBorderChar + verticalBorderChar + rightBorderChar]
          } else if (!leftBorderChar && !rightBorderChar) {
            border[borderIndex] = VERTICAL_BOTTOM_END[verticalBorderChar]
          }

          borderColors[borderIndex] = verticalBorderColor

          borderIndex++
        }
      }

      borderIndex = 0

      for (let i = -1; i < wrappedBlocks?.length || 0; i++) {
        const leftBlock = wrappedBlocks?.[i]
        const rightBlock = wrappedBlocks?.[i + 1]
        const hasVerticalBorder = rightBlock?.block.border[3] || leftBlock?.block.border[1]

        borderIndex += leftBlock?.width || 0

        if (hasVerticalBorder) {
          const verticalBorderStyle = leftBlock?.block.border[1] ? leftBlock?.block.borderStyle?.[1] : rightBlock?.block.borderStyle?.[3]
          const verticalBorderColor = leftBlock?.block.border[1] ? leftBlock?.block.borderColor?.[1] : rightBlock?.block.borderColor?.[3]
          const verticalBorderChar = VERTICAL_BORDERS_ANALOGOUS_MAP[VERTICAL_BORDERS[verticalBorderStyle]]

          const leftBorderChar = HORIZONTAL_BORDERS_ANALOGOUS_MAP[border[borderIndex - 1]] || HORIZONTAL_LEFT_INFER_MAP[border[borderIndex - 1]]
          const rightBorderChar = HORIZONTAL_BORDERS_ANALOGOUS_MAP[border[borderIndex + 1]] || HORIZONTAL_RIGHT_INFER_MAP[border[borderIndex + 1]]
          const aboveVerticalBorderChar = VERTICAL_INFER_MAP[border[borderIndex]]

          if (!leftBorderChar && rightBorderChar) {
            if (aboveVerticalBorderChar) {
              border[borderIndex] = LEFT_JOIN[aboveVerticalBorderChar + verticalBorderChar + rightBorderChar]
            } else {
              border[borderIndex] = TOP_LEFT_CORNER[verticalBorderChar + rightBorderChar]
            }
          } else if (leftBorderChar && !rightBorderChar) {
            if (aboveVerticalBorderChar) {
              border[borderIndex] = RIGHT_JOIN[leftBorderChar + aboveVerticalBorderChar + verticalBorderChar]
            } else {
              border[borderIndex] = TOP_RIGHT_CORNER[leftBorderChar + verticalBorderChar]
            }
          } else if (leftBorderChar && rightBorderChar) {
            if (aboveVerticalBorderChar) {
              border[borderIndex] = JOIN[leftBorderChar + aboveVerticalBorderChar + verticalBorderChar + rightBorderChar]
            } else {
              border[borderIndex] = TOP_JOIN[leftBorderChar + verticalBorderChar + rightBorderChar]
            }
          } else if (!leftBorderChar && !rightBorderChar) {
            if (aboveVerticalBorderChar) {
              border[borderIndex] = VERTICAL_JOIN[aboveVerticalBorderChar + verticalBorderChar]
            } else {
              border[borderIndex] = VERTICAL_TOP_END[verticalBorderChar]
            }
          }

          borderColors[borderIndex] = verticalBorderColor

          borderIndex++
        }
      }

      for (let i = 0; i < border.length; i++) {
        if (Object.keys(ROUND_BORDERS_MAP).includes(border[i])) border[i] = ROUND_BORDERS_MAP[border[i]]
        if (borderColors[i]) border[i] = this.applyBorderColor(border[i], borderColors[i])
      }

      return border.join('')
    }

    return ''
  }

  private generateTemplate(): void {
    const { rows } = this.options

    for (let i = 0; i < rows.length; i++) {
      const currentRow = rows[i]
      const templateBlocks: BlockDescriptor[] = []

      for (let j = 0; j < currentRow.blocks.length; j++) {
        const currentBlock = currentRow.blocks[j]

        templateBlocks.push({
          align: currentBlock.align || currentRow.blockAlign,
          backgroundColor: currentBlock.backgroundColor || currentRow.blockBackgroundColor,
          backgroundFill: currentBlock.backgroundFill || currentRow.blockBackgroundFill,
          border: this.calculateBlockBorder(i, rows.length, currentRow.border, currentRow.blockBorder, j, currentRow.blocks.length, currentBlock.border),
          borderColor: this.calculateBlockBorderColor(i, rows.length, currentRow.borderColor, currentRow.blockBorderColor, j, currentRow.blocks.length, currentBlock.borderColor),
          borderStyle: this.calculateBlockBorderStyle(i, rows.length, currentRow.borderStyle, currentRow.borderStyle, j, currentRow.blocks.length, currentBlock.borderStyle),
          color: currentBlock.color || currentRow.blockColor,
          height: currentBlock.height || currentRow.blockHeight,
          link: currentBlock.link,
          padding: currentBlock.padding || currentRow.blockPadding,
          style: currentBlock.style || currentRow.blockStyle,
          text: currentBlock.text,
          verticalAlign: currentBlock.verticalAlign || currentRow.blockVerticalAlign,
          width: currentBlock.width
        })
      }

      this.template.push(templateBlocks)
    }
  }

  private getHorizontalBorderCountNeeded(rowBlocks: BlockDescriptor[]): number {
    let count = 0

    for (let i = -1; i < rowBlocks?.length || 0; i++) {
      const leftBlock = rowBlocks[i]
      const rightBlock = rowBlocks[i + 1]
      const leftBorder = leftBlock?.border
      const rightBorder = rightBlock?.border

      if (!leftBorder && rightBorder) {
        if (rightBorder?.[3]) count++
      } else if (leftBorder && !rightBorder) {
        if (leftBorder[1]) count++
      } else if (leftBorder && rightBorder) {
        if (leftBorder[1] || rightBorder[3]) count++
      }
    }
    return count
  }

  private calculateBlockBorder(
    rowIndex: number,
    rowCount: number,
    rowBorder: Border,
    rowBlockBorder: Border,
    blockIndex: number,
    blockCount: number,
    blockBorder: Border
  ): SelectiveBorder {
    const documentBorder = this.normalizeBorder(this.options.border)
    const documentRowBorder = this.normalizeBorder(this.options.rowBorder)
    const documentBlockBorder = this.normalizeBorder(this.options.blockBorder)
    const rowBorderNormalized = this.normalizeBorder(rowBorder)
    const rowBlockBorderNormalized = this.normalizeBorder(rowBlockBorder)
    const blockBorderNormalized = this.normalizeBorder(blockBorder)

    const topBorderFromExplicitBlockBorder = blockBorderNormalized[0] || rowBlockBorderNormalized[0] || documentBlockBorder[0]
    const topBorderFromRowBorder = rowBorderNormalized[0] || documentRowBorder[0]
    const topBorderFromDocumentBorder = documentBorder[0] && rowIndex === 0
    const topBorder = topBorderFromExplicitBlockBorder || topBorderFromRowBorder || topBorderFromDocumentBorder

    const rightBorderFromExplicitBlockBorder = blockBorderNormalized[1] || rowBlockBorderNormalized[1] || documentBlockBorder[1]
    const rightBorderFromRowBorder = (rowBorderNormalized[1] || documentRowBorder[1]) && blockIndex === blockCount - 1
    const rightBorderFromDocumentBorder = documentBorder[1] && blockIndex === blockCount - 1
    const rightBorder = rightBorderFromExplicitBlockBorder || rightBorderFromRowBorder || rightBorderFromDocumentBorder

    const bottomBorderFromExplicitBlockBorder = blockBorderNormalized[2] || rowBlockBorderNormalized[2] || documentBlockBorder[2]
    const bottomBorderFromRowBorder = rowBorderNormalized[2] || documentRowBorder[2]
    const bottomBorderFromDocumentBorder = documentBorder[2] && rowIndex === rowCount - 1
    const bottomBorder = bottomBorderFromExplicitBlockBorder || bottomBorderFromRowBorder || bottomBorderFromDocumentBorder

    const leftBorderFromExplicitBlockBorder = blockBorderNormalized[3] || rowBlockBorderNormalized[3] || documentBlockBorder[3]
    const leftBorderFromRowBorder = (rowBorderNormalized[3] || documentRowBorder[3]) && blockIndex === 0
    const leftBorderFromDocumentBorder = documentBorder[3] && blockIndex === 0
    const leftBorder = leftBorderFromExplicitBlockBorder || leftBorderFromRowBorder || leftBorderFromDocumentBorder

    return [topBorder, rightBorder, bottomBorder, leftBorder]
  }

  private normalizeBorder(border?: Border): SelectiveBorder {
    if (border) {
      if (typeof border === 'boolean') {
        return [border, border, border, border]
      } else {
        return [border[0] ?? false, border[1] ?? false, border[2] ?? false, border[3] ?? false]
      }
    } else {
      return [false, false, false, false]
    }
  }

  private calculateBlockBorderStyle(
    rowIndex: number,
    rowCount: number,
    rowBorderStyle: BorderStyle,
    rowBlockBorderStyle: BorderStyle,
    blockIndex: number,
    blockCount: number,
    blockBorderStyle: BorderStyle
  ): SelectiveBorderStyle {
    const documentBorderStyle = this.normalizeBorderStyle(this.options.borderStyle)
    const documentRowBorderStyle = this.normalizeBorderStyle(this.options.rowBorderStyle)
    const documentBlockBorderStyle = this.normalizeBorderStyle(this.options.blockBorderStyle)
    const rowBorderStyleNormalized = this.normalizeBorderStyle(rowBorderStyle)
    const rowBlockBorderStyleNormalized = this.normalizeBorderStyle(rowBlockBorderStyle)
    const blockBorderStyleNormalized = this.normalizeBorderStyle(blockBorderStyle)

    const topBorderFromExplicitBlockBorderStyle = blockBorderStyleNormalized[0] || rowBlockBorderStyleNormalized[0] || documentBlockBorderStyle[0]
    const topBorderFromRowBorderStyle = rowBorderStyleNormalized[0] || documentRowBorderStyle[0]
    const topBorderFromDocumentBorderStyle = rowIndex === 0 ? documentBorderStyle[0] : undefined
    const topBorderStyle = topBorderFromExplicitBlockBorderStyle || topBorderFromRowBorderStyle || topBorderFromDocumentBorderStyle

    const rightBorderFromExplicitBlockBorderStyle = blockBorderStyleNormalized[1] || rowBlockBorderStyleNormalized[1] || documentBlockBorderStyle[1]
    const rightBorderFromRowBorderStyle = blockIndex === blockCount - 1 ? rowBorderStyleNormalized[1] || documentRowBorderStyle[1] : undefined
    const rightBorderFromDocumentBorderStyle = blockIndex === blockCount - 1 ? documentBorderStyle[1] : undefined
    const rightBorderStyle = rightBorderFromExplicitBlockBorderStyle || rightBorderFromRowBorderStyle || rightBorderFromDocumentBorderStyle

    const bottomBorderFromExplicitBlockBorderStyle = blockBorderStyleNormalized[2] || rowBlockBorderStyleNormalized[2] || documentBlockBorderStyle[2]
    const bottomBorderFromRowBorderStyle = rowBorderStyleNormalized[2] || documentRowBorderStyle[2]
    const bottomBorderFromDocumentBorderStyle = rowIndex === rowCount - 1 ? documentBorderStyle[2] : undefined
    const bottomBorderStyle = bottomBorderFromExplicitBlockBorderStyle || bottomBorderFromRowBorderStyle || bottomBorderFromDocumentBorderStyle

    const leftBorderFromExplicitBlockBorderStyle = blockBorderStyleNormalized[3] || rowBlockBorderStyleNormalized[3] || documentBlockBorderStyle[3]
    const leftBorderFromRowBorderStyle = blockIndex === 0 ? rowBorderStyleNormalized[3] || documentRowBorderStyle[3] : undefined
    const leftBorderFromDocumentBorderStyle = blockIndex === 0 ? documentBorderStyle[3] : undefined
    const leftBorderStyle = leftBorderFromExplicitBlockBorderStyle || leftBorderFromRowBorderStyle || leftBorderFromDocumentBorderStyle

    return [topBorderStyle || 'single', rightBorderStyle || 'single', bottomBorderStyle || 'single', leftBorderStyle || 'single']
  }

  private calculateBlockBorderColor(
    rowIndex: number,
    rowCount: number,
    rowBorderColor: BorderColor,
    rowBlockBorderColor: BorderColor,
    blockIndex: number,
    blockCount: number,
    blockBorderColor: BorderColor
  ): SelectiveBorderColor {
    const documentBorderColor = this.normalizeBorderColor(this.options.borderColor)
    const documentRowBorderColor = this.normalizeBorderColor(this.options.rowBorderColor)
    const documentBlockBorderColor = this.normalizeBorderColor(this.options.blockBorderColor)
    const rowBorderColorNormalized = this.normalizeBorderColor(rowBorderColor)
    const rowBlockBorderColorNormalized = this.normalizeBorderColor(rowBlockBorderColor)
    const blockBorderColorNormalized = this.normalizeBorderColor(blockBorderColor)

    const topBorderFromExplicitBlockBorderColor = blockBorderColorNormalized[0] || rowBlockBorderColorNormalized[0] || documentBlockBorderColor[0]
    const topBorderFromRowBorderColor = rowBorderColorNormalized[0] || documentRowBorderColor[0]
    const topBorderFromDocumentBorderColor = rowIndex === 0 ? documentBorderColor[0] : undefined
    const topBorderColor = topBorderFromExplicitBlockBorderColor || topBorderFromRowBorderColor || topBorderFromDocumentBorderColor

    const rightBorderFromExplicitBlockBorderColor = blockBorderColorNormalized[1] || rowBlockBorderColorNormalized[1] || documentBlockBorderColor[1]
    const rightBorderFromRowBorderColor = blockIndex === blockCount - 1 ? rowBorderColorNormalized[1] || documentRowBorderColor[1] : undefined
    const rightBorderFromDocumentBorderColor = blockIndex === blockCount - 1 ? documentBorderColor[1] : undefined
    const rightBorderColor = rightBorderFromExplicitBlockBorderColor || rightBorderFromRowBorderColor || rightBorderFromDocumentBorderColor

    const bottomBorderFromExplicitBlockBorderColor = blockBorderColorNormalized[2] || rowBlockBorderColorNormalized[2] || documentBlockBorderColor[2]
    const bottomBorderFromRowBorderColor = rowBorderColorNormalized[2] || documentRowBorderColor[2]
    const bottomBorderFromDocumentBorderColor = rowIndex === rowCount - 1 ? documentBorderColor[2] : undefined
    const bottomBorderColor = bottomBorderFromExplicitBlockBorderColor || bottomBorderFromRowBorderColor || bottomBorderFromDocumentBorderColor

    const leftBorderFromExplicitBlockBorderColor = blockBorderColorNormalized[3] || rowBlockBorderColorNormalized[3] || documentBlockBorderColor[3]
    const leftBorderFromRowBorderColor = blockIndex === 0 ? rowBorderColorNormalized[3] || documentRowBorderColor[3] : undefined
    const leftBorderFromDocumentBorderColor = blockIndex === 0 ? documentBorderColor[3] : undefined
    const leftBorderColor = leftBorderFromExplicitBlockBorderColor || leftBorderFromRowBorderColor || leftBorderFromDocumentBorderColor

    return [topBorderColor, rightBorderColor, bottomBorderColor, leftBorderColor]
  }

  private normalizeBorderStyle(borderStyle?: BorderStyle): SelectiveBorderStyle {
    if (borderStyle) {
      if (typeof borderStyle === 'string') {
        return [borderStyle, borderStyle, borderStyle, borderStyle]
      } else {
        return [borderStyle[0], borderStyle[1], borderStyle[2], borderStyle[3]]
      }
    } else {
      return [undefined, undefined, undefined, undefined]
    }
  }

  private normalizeBorderColor(borderColor?: BorderColor): SelectiveBorderColor {
    if (borderColor) {
      if (typeof borderColor === 'string') {
        return [borderColor, borderColor, borderColor, borderColor]
      } else {
        return [borderColor[0], borderColor[1], borderColor[2], borderColor[3]]
      }
    } else {
      return [undefined, undefined, undefined, undefined]
    }
  }

  private calculateVerticalAlignmentExtraFill(rowHight: number, blockHight: number, verticalAlignment?: VerticalAlign): [number, number] {
    if (verticalAlignment === 'bottom') {
      return [rowHight - blockHight, 0]
    } else if (verticalAlignment === 'middle') {
      return [Math.floor((rowHight - blockHight) / 2), Math.ceil((rowHight - blockHight) / 2)]
    } else {
      return [0, rowHight - blockHight]
    }
  }

  private fillHeight(lines: WrappedLine[], height: number, verticalAlign: VerticalAlign): WrappedLine[] {
    const [topPadding, bottomPadding] = this.calculateVerticalAlignmentExtraFill(height, lines.length, verticalAlign)
    const topPaddingTextEdgeIndex = lines.indexOf(lines.find((line) => line.leftFill || line.text || line.rightFill))
    const bottomPaddingTextEdgeIndex = lines.lastIndexOf(lines.findLast((line) => line.leftFill || line.text || line.rightFill))

    const topPaddingTextEdgeLine = lines[topPaddingTextEdgeIndex]
    const lineFill = topPaddingTextEdgeLine.leftFill + topPaddingTextEdgeLine.text.length + topPaddingTextEdgeLine.rightFill
    const leftLineFill = Math.floor(lineFill / 2)
    const rightLineFill = lineFill - leftLineFill

    const topPaddingLines: WrappedLine[] = Array(topPadding).fill({
      leftFill: leftLineFill,
      leftMargin: topPaddingTextEdgeLine.leftMargin,
      leftPadding: topPaddingTextEdgeLine.leftPadding,
      rightFill: rightLineFill,
      rightMargin: topPaddingTextEdgeLine.rightMargin,
      rightPadding: topPaddingTextEdgeLine.rightPadding,
      text: ''
    })
    const bottomPaddingLines: WrappedLine[] = Array(bottomPadding).fill({
      leftFill: leftLineFill,
      leftMargin: topPaddingTextEdgeLine.leftMargin,
      leftPadding: topPaddingTextEdgeLine.leftPadding,
      rightFill: rightLineFill,
      rightMargin: topPaddingTextEdgeLine.rightMargin,
      rightPadding: topPaddingTextEdgeLine.rightPadding,
      text: ''
    })

    lines.splice(bottomPaddingTextEdgeIndex + 1, 0, ...bottomPaddingLines)
    lines.splice(topPaddingTextEdgeIndex, 0, ...topPaddingLines)

    return lines
  }

  private applyBorderColor(borderFragment: string, color: Color): string {
    if (color) return chalk.hex(COLORS[color])(borderFragment)

    return borderFragment
  }

  private synthesizeWrappedLine(wrappedLine: WrappedLine, block: BlockDescriptor): string {
    let leftMargin = ' '.repeat(wrappedLine.leftMargin)
    let leftPadding = ' '.repeat(wrappedLine.leftPadding)
    let leftFill = ' '.repeat(wrappedLine.leftFill)
    let text = wrappedLine.text
    let rightFill = ' '.repeat(wrappedLine.rightFill)
    let rightPadding = ' '.repeat(wrappedLine.rightPadding)
    let rightMargin = ' '.repeat(wrappedLine.rightMargin)
    let style: chalk.Chalk = chalk

    if (block.color) {
      style = style.hex(COLORS[block.color])
    }

    if (block.style) {
      if (typeof block.style === 'string') {
        style = style[block.style]
      } else if (Array.isArray(block.style)) {
        style = block.style.reduce((acc, s) => acc[s], style)
      }
    }

    if (block.backgroundColor) {
      const backgroundStyle = chalk.bgHex(COLORS[block.backgroundColor])
      style = style.bgHex(COLORS[block.backgroundColor])

      switch (block.backgroundFill) {
        case 'word':
          const words = wrappedLine.text.split(' ')

          text = words.map((word) => style(word)).join(' ')
          break
        case 'text':
          text = style(wrappedLine.text)
          break
        case 'all':
          leftMargin = backgroundStyle(leftMargin)
          leftPadding = backgroundStyle(leftPadding)
          leftFill = backgroundStyle(leftFill)
          text = style(wrappedLine.text)
          rightFill = backgroundStyle(rightFill)
          rightPadding = backgroundStyle(rightPadding)
          rightMargin = backgroundStyle(rightMargin)
          break
        default:
          leftFill = backgroundStyle(leftFill)
          text = style(wrappedLine.text)
          rightFill = backgroundStyle(rightFill)
      }
    } else {
      text = style(wrappedLine.text)
    }

    if (block.link) {
      text = ansiScapes.link(text, block.link)
    }

    return leftMargin + leftPadding + leftFill + text + rightFill + rightPadding + rightMargin
  }
}
