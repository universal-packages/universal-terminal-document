import { EventEmitter } from '@universal-packages/event-emitter'
import { VerticalAlign, WrapTextOptions, WrappedLine, synthesizeWrappedLine, wrap } from '@universal-packages/text-wrap'
import ansiScapes from 'ansi-escapes'
import chalk from 'chalk'
import terminalSize from 'term-size'

import {
  BOTTOM_JOIN,
  BOTTOM_LEFT_CORNER,
  BOTTOM_RIGHT_CORNER,
  HORIZONTAL_BORDERS,
  HORIZONTAL_BORDERS_ANALOGOUS_MAP,
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
  VERTICAL_INFER_MAP
} from './borders'
import { COLORS } from './colors'
import {
  BlockDescriptor,
  BlockDescriptorBuilderDescriptor,
  Border,
  BorderStyle,
  InternalBlockDescriptorBuilder,
  SelectiveBorder,
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

  private context: Record<string, any>
  private template: (BlockDescriptor | InternalBlockDescriptorBuilder)[][] = []
  private internalOutput: string
  private documentWidth: number

  public constructor(options: TerminalDocumentOptions) {
    super()

    this.options = { context: {}, ...options }
    this.context = this.options.context
    this.documentWidth = this.options.width || terminalSize().columns
    this.generateTemplate()
  }

  public update(context?: Record<string, any>): void {
    if (context) this.context = context

    const evaluatedTemplateBlocks = this.evaluateTemplate()

    this.internalOutput = ''

    if (this.options.table) {
    } else {
      const wrappedBlocks: WrappedBlockDescriptor[][] = evaluatedTemplateBlocks.map((rowBlocks) => this.generateWrappedBlocks(rowBlocks))

      for (let i = 0; i < wrappedBlocks.length; i++) {
        const currentWrappedBlocks = wrappedBlocks[i]
        const previousWrappedBlocks = wrappedBlocks[i - 1]

        this.internalOutput += this.generateBorderLine(currentWrappedBlocks, previousWrappedBlocks)
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
      const previousWrappedBlock = wrappedBlocks[i - 1]

      for (let j = 0; j < currentWrappedBlock.lines.length; j++) {
        const currentWrappedLine = currentWrappedBlock.lines[j]

        if ((i === 0 && currentWrappedBlock.block.border[3]) || previousWrappedBlock?.block.border[1] || currentWrappedBlock.block.border[3]) {
          lines[j] += VERTICAL_BORDERS_RECTIFICATION_MAP[VERTICAL_BORDERS[currentWrappedBlock.block.borderStyle[3]]]
        }

        lines[j] += this.synthesizeWrappedLine(currentWrappedLine, currentWrappedBlock.block)

        if (i === wrappedBlocks.length - 1 && currentWrappedBlock.block.border[1]) {
          lines[j] += VERTICAL_BORDERS_RECTIFICATION_MAP[VERTICAL_BORDERS[currentWrappedBlock.block.borderStyle[1]]]
        }
      }
    }

    return lines
  }

  private generateBorderLine(wrappedBlocks?: WrappedBlockDescriptor[], previousWrappedBlocks?: WrappedBlockDescriptor[]): string {
    const anyBorder = wrappedBlocks?.some((wb) => wb.block.border[0])
    const anyPreviousBorder = previousWrappedBlocks?.some((wb) => wb.block.border[2])

    if (anyBorder || anyPreviousBorder) {
      const border = Array(this.documentWidth).fill(' ')
      let borderIndex = 0

      for (let i = 0; i < previousWrappedBlocks?.length || 0; i++) {
        const leftBlock = previousWrappedBlocks[i]
        const rightBlock = previousWrappedBlocks[i + 1]
        const leftBorder = leftBlock.block.border
        const rightBorder = rightBlock?.block.border

        if (leftBorder?.[1] || rightBorder?.[3]) borderIndex++

        if (leftBorder?.[2]) {
          const bottomBorderStyle = leftBlock.block.borderStyle as SelectiveBorderStyle

          border.splice(borderIndex, leftBlock.width, ...Array(leftBlock.width).fill(HORIZONTAL_BORDERS[bottomBorderStyle[2]]))
        }

        borderIndex += leftBlock.width
      }

      borderIndex = 0

      for (let i = 0; i < wrappedBlocks?.length || 0; i++) {
        const leftBlock = wrappedBlocks[i]
        const rightBlock = wrappedBlocks[i + 1]
        const leftBorder = leftBlock.block.border
        const rightBorder = rightBlock?.block.border

        if (leftBorder?.[1] || rightBorder?.[3]) borderIndex++

        if (leftBorder?.[0]) {
          const topBorderStyle = leftBlock.block.borderStyle as SelectiveBorderStyle

          border.splice(borderIndex, leftBlock.width, ...Array(leftBlock.width).fill(HORIZONTAL_BORDERS[topBorderStyle[0]]))
        }

        borderIndex += leftBlock.width
      }

      borderIndex = 0

      for (let i = -1; i < previousWrappedBlocks?.length || 0; i++) {
        const leftBlock = previousWrappedBlocks?.[i]
        const rightBlock = previousWrappedBlocks?.[i + 1]
        const verticalBorderStyle = rightBlock?.block.borderStyle?.[3] || leftBlock?.block.borderStyle?.[1]
        const verticalBorderChar = VERTICAL_BORDERS[verticalBorderStyle]

        borderIndex += leftBlock?.width || 0

        if (verticalBorderChar) {
          const leftBorderChar = border[borderIndex - 1]?.replace(' ', '')
          const rightBorderChar = border[borderIndex + 1]?.replace(' ', '')

          if (!leftBorderChar && rightBorderChar) {
            border[borderIndex] = BOTTOM_LEFT_CORNER[verticalBorderChar + rightBorderChar]
          } else if (leftBorderChar && !rightBorderChar) {
            border[borderIndex] = BOTTOM_RIGHT_CORNER[leftBorderChar + verticalBorderChar]
          } else if (leftBorderChar && rightBorderChar) {
            border[borderIndex] = BOTTOM_JOIN[leftBorderChar + verticalBorderChar + rightBorderChar]
          } else if (!leftBorderChar && rightBorderChar) {
            border[borderIndex] = verticalBorderChar
          }

          borderIndex++
        }
      }

      borderIndex = 0

      for (let i = -1; i < wrappedBlocks?.length || 0; i++) {
        const leftBlock = wrappedBlocks?.[i]
        const rightBlock = wrappedBlocks?.[i + 1]
        const hasVerticalBorder = rightBlock?.block.border[3] || leftBlock?.block.border[1]

        if (hasVerticalBorder) {
          const verticalBorderStyle = rightBlock?.block.borderStyle?.[3] || leftBlock?.block.borderStyle?.[1]
          const verticalBorderChar = VERTICAL_BORDERS_ANALOGOUS_MAP[VERTICAL_BORDERS[verticalBorderStyle]]

          borderIndex += leftBlock?.width || 0

          if (verticalBorderChar) {
            const leftBorderChar = HORIZONTAL_BORDERS_ANALOGOUS_MAP[border[borderIndex - 1]]
            const rightBorderChar = HORIZONTAL_BORDERS_ANALOGOUS_MAP[border[borderIndex + 1]]
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
              console.log(verticalBorderStyle)
              border[borderIndex] = verticalBorderChar
            }

            borderIndex++
          }
        }
      }

      let renderedBorder = border.join('')
      const roundBorderKeys = Object.keys(ROUND_BORDERS_MAP)

      for (let i = 0; i < roundBorderKeys.length; i++) {
        const roundBorderKey = roundBorderKeys[i]

        renderedBorder = renderedBorder.replace(new RegExp(roundBorderKey, 'g'), ROUND_BORDERS_MAP[roundBorderKey])
      }

      return renderedBorder + '\n'
    }

    return ''
  }

  private evaluateTemplate(): BlockDescriptor[][] {
    const evaluatedTemplate = []

    for (let i = 0; i < this.template.length; i++) {
      const currentRow = this.template[i]
      const evaluatedRow = []

      for (let j = 0; j < currentRow.length; j++) {
        const currentBlock = currentRow[j]

        if (typeof currentBlock === 'function') {
          evaluatedRow.push(currentBlock())
        } else {
          evaluatedRow.push(currentBlock)
        }
      }

      evaluatedTemplate.push(evaluatedRow)
    }

    return evaluatedTemplate
  }

  private generateTemplate(): void {
    const { rows } = this.options

    for (let i = 0; i < rows.length; i++) {
      const currentRow = rows[i]
      const templateBlocks: (BlockDescriptor | InternalBlockDescriptorBuilder)[] = []

      for (let j = 0; j < currentRow.blocks.length; j++) {
        const generableBlock = currentRow.blocks[j] as BlockDescriptorBuilderDescriptor
        const staticBlock = currentRow.blocks[j] as BlockDescriptor

        if (generableBlock.builder) {
          templateBlocks.push((): BlockDescriptor => {
            const value = this.context[generableBlock.id]
            const generatedBlock = generableBlock.builder(value, this.context)

            return {
              align: generatedBlock.align || currentRow.blockAlign,
              backgroundColor: generatedBlock.backgroundColor || currentRow.blockBackgroundColor,
              backgroundFill: generatedBlock.backgroundFill || currentRow.blockBackgroundFill,
              border: this.calculateBlockBorder(i, rows.length, currentRow.border, currentRow.blockBorder, j, currentRow.blocks.length, generatedBlock.border),
              borderStyle: this.calculateBlockBorderStyle(i, rows.length, currentRow.borderStyle, currentRow.borderStyle, j, currentRow.blocks.length, generatedBlock.borderStyle),
              color: generatedBlock.color || currentRow.blockColor,
              height: generatedBlock.height || currentRow.blockHeight,
              link: generatedBlock.link,
              padding: generatedBlock.padding || currentRow.blockPadding,
              style: generatedBlock.style || currentRow.blockStyle,
              text: generatedBlock.text,
              verticalAlign: generatedBlock.verticalAlign || currentRow.blockVerticalAlign,
              width: generatedBlock.width
            }
          })
        } else {
          templateBlocks.push({
            align: staticBlock.align || currentRow.blockAlign,
            backgroundColor: staticBlock.backgroundColor || currentRow.blockBackgroundColor,
            backgroundFill: staticBlock.backgroundFill || currentRow.blockBackgroundFill,
            border: this.calculateBlockBorder(i, rows.length, currentRow.border, currentRow.blockBorder, j, currentRow.blocks.length, staticBlock.border),
            borderStyle: this.calculateBlockBorderStyle(i, rows.length, currentRow.borderStyle, currentRow.borderStyle, j, currentRow.blocks.length, staticBlock.borderStyle),
            color: staticBlock.color || currentRow.blockColor,
            height: staticBlock.height || currentRow.blockHeight,
            link: staticBlock.link,
            padding: staticBlock.padding || currentRow.blockPadding,
            style: staticBlock.style || currentRow.blockStyle,
            text: staticBlock.text,
            verticalAlign: staticBlock.verticalAlign || currentRow.blockVerticalAlign,
            width: staticBlock.width
          })
        }
      }

      this.template.push(templateBlocks)
    }
  }

  private getHorizontalBorderCountNeeded(rowBlocks: BlockDescriptor[]): number {
    let count = 0

    for (let i = 0; i < rowBlocks.length; i++) {
      const currentBlock = rowBlocks[i]
      const previousBlock = rowBlocks[i - 1]

      if (i === 0) {
        if (currentBlock.border[3]) count++
      } else {
        if (previousBlock.border[1] || currentBlock.border[3]) count++
        if (i === rowBlocks.length - 1 && currentBlock.border[1]) count++
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
    const topPaddingTextEdgeIndex = lines.indexOf(lines.find((line) => !!line.leftFill || !!line.text || !!line.rightFill))
    const bottomPaddingTextEdgeIndex = lines.lastIndexOf(lines.find((line) => !!line.leftFill || !!line.text || !!line.rightFill))
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

    lines.splice(topPaddingTextEdgeIndex, 0, ...topPaddingLines)
    lines.splice(bottomPaddingTextEdgeIndex + 2, 0, ...bottomPaddingLines)

    return lines
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
    }

    if (block.link) {
      text = ansiScapes.link(text, block.link)
    }

    return leftMargin + leftPadding + leftFill + text + rightFill + rightPadding + rightMargin
  }
}
