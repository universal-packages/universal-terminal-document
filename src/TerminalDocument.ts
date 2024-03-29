import { NumericSides, Padding, VerticalAlign, WrapTextOptions, WrappedLine, normalizeNumericSides, synthesizeWrappedLine, wrap } from '@universal-packages/text-wrap'
import ansiScapes from 'ansi-escapes'
import chalk from 'chalk'
import EventEmitter from 'events'

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
  BlockSize,
  Border,
  BorderColor,
  BorderStyle,
  Color,
  DocumentDescriptor,
  SelectiveBorder,
  SelectiveBorderColor,
  SelectiveBorderStyle,
  TemplateUpdaters,
  Width,
  WrappedBlockDescriptor
} from './types'

const DYNAMIC_BLOCK_MIN_WIDTH = 10

export default class TerminalDocument extends EventEmitter {
  public get result(): string {
    return this.renderedDocument || ''
  }

  private descriptor: DocumentDescriptor

  private template: BlockDescriptor[][] = []
  private templateUpdaters: TemplateUpdaters = {}
  private documentWidth: number

  private wrappedBlocksById: Record<string, WrappedBlockDescriptor> = {}
  private renderedDocument: string

  public describe(descriptor: DocumentDescriptor): string {
    this.descriptor = { width: 80, ...descriptor }
    this.documentWidth = this.descriptor.width

    this.generateTemplate()

    return this.render()
  }

  public getBlockSize(id: string): BlockSize {
    const wrappedBlock = this.wrappedBlocksById[id]

    if (wrappedBlock) {
      const fillBlocks = wrappedBlock.lines.filter((line) => line.leftFill || line.text || line.rightFill)

      return {
        fillHeight: fillBlocks.length,
        fillWidth: fillBlocks[0].leftFill + fillBlocks[0].text.length + fillBlocks[0].rightFill,
        height: wrappedBlock.lines.length,
        width: wrappedBlock.width
      }
    } else {
      this.emit('warning', `Size for a non-existent block with the ID "${id}" was requested`)
    }
  }

  public update(id: string, descriptor: Omit<Partial<BlockDescriptor>, 'id'>): string {
    const updater = this.templateUpdaters[id]

    if (updater) {
      updater(descriptor)
      return this.render()
    } else {
      this.emit('warning', `An update was requested for a non-existent block with the ID "${id}"`)
    }
  }

  public render(): string {
    this.renderedDocument = ''

    const wrappedBlocks: WrappedBlockDescriptor[][] = this.template.map((rowBlocks) => this.generateWrappedBlocks(rowBlocks))

    this.wrappedBlocksById = {}

    for (let i = 0; i < wrappedBlocks.length; i++) {
      const currentWrappedBlocks = wrappedBlocks[i]
      const previousWrappedBlocks = wrappedBlocks[i - 1]
      const topBorderLine = this.generateBorderLine(currentWrappedBlocks, previousWrappedBlocks)

      for (let j = 0; j < currentWrappedBlocks.length; j++) {
        const currentWrappedBlock = currentWrappedBlocks[j]

        if (currentWrappedBlock.block.id) {
          this.wrappedBlocksById[currentWrappedBlock.block.id] = currentWrappedBlock
        }
      }

      this.renderedDocument += topBorderLine ? topBorderLine + '\n' : ''
      this.renderedDocument += this.synthesizeWrappedBlocks(currentWrappedBlocks).join('\n') + (i < wrappedBlocks.length - 1 ? '\n' : '')
    }

    const lastBorderLine = this.generateBorderLine(undefined, wrappedBlocks[wrappedBlocks.length - 1])

    this.renderedDocument += lastBorderLine ? '\n' + lastBorderLine : ''

    return this.renderedDocument
  }

  public resize(width: number): string {
    if (width !== this.documentWidth) {
      this.documentWidth = width
      return this.render()
    }
  }

  private generateWrappedBlocks(rowBlocks: BlockDescriptor[]): WrappedBlockDescriptor[] {
    const freeBlock = rowBlocks.find((b) => b.free)

    if (freeBlock) {
      return [
        {
          block: { ...freeBlock, border: [freeBlock.border[0], false, freeBlock.border[2], false], padding: [0, 0, 0, 0] },
          lines: [{ leftFill: 0, leftMargin: 0, leftPadding: 0, rightFill: 0, rightMargin: 0, rightPadding: 0, text: freeBlock.text }],
          width: this.documentWidth
        }
      ]
    } else {
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
        } else if (typeof currentBlock.width === 'string') {
          const percentageWidth = Math.round((this.documentWidth / 100) * parseInt(currentBlock.width))
          const lines = wrap(currentBlock.text, { ...baseWrapOptions, width: percentageWidth })

          wrappedBlocks.push({ block: currentBlock, lines, width: synthesizeWrappedLine(lines[0]).length })
        } else {
          wrappedBlocks.push({ block: currentBlock, lines: [], width: 0 })
        }
      }

      const fixedWidthTotal = wrappedBlocks.filter((wp) => typeof wp.block.width === 'number').reduce((acc, wb) => acc + synthesizeWrappedLine(wb.lines[0]).length, 0)
      const fitWidthTotal = wrappedBlocks.filter((wp) => wp.block.width === 'fit').reduce((acc, wb) => acc + synthesizeWrappedLine(wb.lines[0]).length, 0)
      const percentageWidthTotal = wrappedBlocks
        .filter((wp) => typeof wp.block.width === 'string' && wp.block.width !== 'fit')
        .reduce((acc, wb) => acc + Math.round((this.documentWidth / 100) * parseInt(wb.block.width as string)), 0)
      const horizontalBorderWidth = this.getHorizontalBorderCountNeeded(rowBlocks)
      const dynamicWidthBlocksCount = rowBlocks.filter((b) => b.width === undefined).length
      const remainingWidth =
        Math.max(this.documentWidth - fixedWidthTotal - percentageWidthTotal - fitWidthTotal - horizontalBorderWidth, 0) || dynamicWidthBlocksCount * DYNAMIC_BLOCK_MIN_WIDTH

      const dynamicWidth = Math.floor(remainingWidth / dynamicWidthBlocksCount)
      let dynamicWidthToGive = Math.max(
        this.documentWidth - fixedWidthTotal - percentageWidthTotal - fitWidthTotal - horizontalBorderWidth - dynamicWidthBlocksCount * dynamicWidth,
        0
      )

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
          currentWrappedBlock.lines = wrap(currentWrappedBlock.block.text, { ...baseWrapOptions, width: dynamicWidth + (dynamicWidthToGive-- > 0 ? 1 : 0) })
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
  }

  private synthesizeWrappedBlocks(wrappedBlocks: WrappedBlockDescriptor[]): string[] {
    const lines = Array(wrappedBlocks[0].lines.length).fill('')
    const byBlocksWidth = wrappedBlocks.reduce((acc, wb) => acc + wb.width, 0)
    const verticalBorderSpots = Array(wrappedBlocks[0].lines.length).fill(0)

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
          verticalBorderSpots[j]++
        }

        lines[j] += this.synthesizeWrappedLine(currentWrappedLine, currentWrappedBlock.block)

        if (currentWrappedBlock.block.border[1]) {
          lines[j] += this.applyBorderColor(
            VERTICAL_BORDERS_RECTIFICATION_MAP[VERTICAL_BORDERS[currentWrappedBlock.block.borderStyle[1]]],
            currentWrappedBlock.block.borderColor?.[1] as Color
          )
          verticalBorderSpots[j]++
        } else if (nextWrappedBlock?.block.border[3]) {
          lines[j] += this.applyBorderColor(
            VERTICAL_BORDERS_RECTIFICATION_MAP[VERTICAL_BORDERS[nextWrappedBlock.block.borderStyle[3]]],
            nextWrappedBlock.block.borderColor?.[3] as Color
          )
          verticalBorderSpots[j]++
        }
      }
    }

    if (byBlocksWidth < this.documentWidth) {
      for (let i = 0; i < lines.length; i++) {
        lines[i] += ' '.repeat(this.documentWidth - byBlocksWidth - verticalBorderSpots[i])
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
    this.template = []
    this.templateUpdaters = {}

    const { rows } = this.descriptor

    for (let i = 0; i < rows.length; i++) {
      const currentRow = rows[i]
      const templateBlocks: BlockDescriptor[] = []

      for (let j = 0; j < currentRow.blocks.length; j++) {
        const currentBlock = currentRow.blocks[j]
        const fullBlock: BlockDescriptor = {
          align: currentBlock.align || currentRow.align,
          backgroundColor: currentBlock.backgroundColor || currentRow.backgroundColor || this.descriptor.backgroundColor,
          backgroundFill: currentBlock.backgroundFill || currentRow.backgroundFill || this.descriptor.backgroundFill,
          border: this.calculateBlockBorder(i, rows.length, currentRow.border, currentRow.blockBorder, j, currentRow.blocks.length, currentBlock.border),
          borderColor: this.calculateBlockBorderColor(i, rows.length, currentRow.borderColor, currentRow.blockBorderColor, j, currentRow.blocks.length, currentBlock.borderColor),
          borderStyle: this.calculateBlockBorderStyle(i, rows.length, currentRow.borderStyle, currentRow.borderStyle, j, currentRow.blocks.length, currentBlock.borderStyle),
          color: currentBlock.color || currentRow.color || this.descriptor.color,
          free: currentBlock.free,
          height: currentBlock.height || currentRow.height,
          id: currentBlock.id,
          link: currentBlock.link,
          padding: this.calculateBlockPadding(i, rows.length, currentRow.padding, currentRow.blockPadding, j, currentRow.blocks.length, currentBlock.padding),
          style: currentBlock.style || currentRow.style || this.descriptor.style,
          text: currentBlock.text,
          verticalAlign: currentBlock.verticalAlign || currentRow.verticalAlign || this.descriptor.verticalAlign,
          width: this.normalizeWidth(currentBlock.width)
        }

        if (fullBlock.id) {
          if (this.templateUpdaters[fullBlock.id]) {
            this.emit('warning', `A block with the ID "${fullBlock.id}" already exists in the template`)
          } else {
            this.templateUpdaters[fullBlock.id] = (newBlock) => {
              fullBlock.align = newBlock.align === null ? null : newBlock.align || fullBlock.align
              fullBlock.backgroundColor = newBlock.backgroundColor === null ? null : newBlock.backgroundColor || fullBlock.backgroundColor
              fullBlock.backgroundFill = newBlock.backgroundFill === null ? null : newBlock.backgroundFill || fullBlock.backgroundFill
              fullBlock.border = this.calculateBlockBorder(
                i,
                rows.length,
                currentRow.border,
                currentRow.blockBorder,
                j,
                currentRow.blocks.length,
                newBlock.border === null ? null : newBlock.border || fullBlock.border
              )
              fullBlock.borderColor = this.calculateBlockBorderColor(
                i,
                rows.length,
                currentRow.borderColor,
                currentRow.blockBorderColor,
                j,
                currentRow.blocks.length,
                newBlock.borderColor === null ? null : newBlock.borderColor || fullBlock.borderColor
              )
              fullBlock.borderStyle = this.calculateBlockBorderStyle(
                i,
                rows.length,
                currentRow.borderStyle,
                currentRow.borderStyle,
                j,
                currentRow.blocks.length,
                newBlock.borderStyle === null ? null : newBlock.borderStyle || fullBlock.borderStyle
              )
              fullBlock.color = newBlock.color === null ? null : newBlock.color || fullBlock.color
              fullBlock.free = newBlock.free === null ? null : newBlock.free || fullBlock.free
              fullBlock.height = newBlock.height === null ? null : newBlock.height || fullBlock.height
              fullBlock.link = newBlock.link === null ? null : newBlock.link || fullBlock.link
              fullBlock.padding = this.calculateBlockPadding(
                i,
                rows.length,
                currentRow.padding,
                currentRow.blockPadding,
                j,
                currentRow.blocks.length,
                newBlock.padding === null ? null : newBlock.padding || fullBlock.padding
              )
              fullBlock.style = newBlock.style === null ? null : newBlock.style || fullBlock.style
              fullBlock.text = newBlock.text || fullBlock.text
              fullBlock.verticalAlign = newBlock.verticalAlign === null ? null : newBlock.verticalAlign || fullBlock.verticalAlign
              fullBlock.width = newBlock.width === null ? null : this.normalizeWidth(newBlock.width) || fullBlock.width
            }
          }
        }

        templateBlocks.push(fullBlock)
      }

      this.template.push(templateBlocks)
    }
  }

  private normalizeWidth(width: Width): Width {
    if (width === 'fit') return width
    if (typeof width === 'number') return width
    if (typeof width === 'string') {
      const percentageMatch = width.match(/^(\d+)%$/)
      const percentage = percentageMatch ? percentageMatch[1] : undefined

      return percentage
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
    const documentBorder = this.normalizeBorder(this.descriptor.border)
    const documentRowBorder = this.normalizeBorder(this.descriptor.rowBorder)
    const documentBlockBorder = this.normalizeBorder(this.descriptor.blockBorder)
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
    const documentBorderStyle = this.normalizeBorderStyle(this.descriptor.borderStyle)
    const documentRowBorderStyle = this.normalizeBorderStyle(this.descriptor.rowBorderStyle)
    const documentBlockBorderStyle = this.normalizeBorderStyle(this.descriptor.blockBorderStyle)
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

  private calculateBlockBorderColor(
    rowIndex: number,
    rowCount: number,
    rowBorderColor: BorderColor,
    rowBlockBorderColor: BorderColor,
    blockIndex: number,
    blockCount: number,
    blockBorderColor: BorderColor
  ): SelectiveBorderColor {
    const documentBorderColor = this.normalizeBorderColor(this.descriptor.borderColor)
    const documentRowBorderColor = this.normalizeBorderColor(this.descriptor.rowBorderColor)
    const documentBlockBorderColor = this.normalizeBorderColor(this.descriptor.blockBorderColor)
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

  private calculateBlockPadding(
    rowIndex: number,
    rowCount: number,
    rowPadding: Padding,
    rowBlockPadding: Padding,
    blockIndex: number,
    blockCount: number,
    blockPadding: Padding
  ): NumericSides {
    const documentPadding = this.normalizePadding(this.descriptor.padding)
    const documentRowPadding = this.normalizePadding(this.descriptor.rowPadding)
    const documentBlockPadding = this.normalizePadding(this.descriptor.blockPadding)
    const rowPaddingNormalized = this.normalizePadding(rowPadding)
    const rowBlockPaddingNormalized = this.normalizePadding(rowBlockPadding)
    const blockPaddingNormalized = this.normalizePadding(blockPadding)

    const topPaddingFromExplicitBlockPadding = blockPaddingNormalized[0] || rowBlockPaddingNormalized[0] || documentBlockPadding[0]
    const topPaddingFromRowPadding = rowPaddingNormalized[0] || documentRowPadding[0]
    const topPaddingFromDocumentPadding = rowIndex === 0 ? documentPadding[0] : 0
    const topPadding = topPaddingFromExplicitBlockPadding || topPaddingFromRowPadding || topPaddingFromDocumentPadding

    const rightPaddingFromExplicitBlockPadding = blockPaddingNormalized[1] || rowBlockPaddingNormalized[1] || documentBlockPadding[1]
    const rightPaddingFromRowPadding = blockIndex === blockCount - 1 ? rowPaddingNormalized[1] || documentRowPadding[1] : 0
    const rightPaddingFromDocumentPadding = blockIndex === blockCount - 1 ? documentPadding[1] : 0
    const rightPadding = rightPaddingFromExplicitBlockPadding || rightPaddingFromRowPadding || rightPaddingFromDocumentPadding

    const bottomPaddingFromExplicitBlockPadding = blockPaddingNormalized[2] || rowBlockPaddingNormalized[2] || documentBlockPadding[2]
    const bottomPaddingFromRowPadding = rowPaddingNormalized[2] || documentRowPadding[2]
    const bottomPaddingFromDocumentPadding = rowIndex === rowCount - 1 ? documentPadding[2] : 0
    const bottomPadding = bottomPaddingFromExplicitBlockPadding || bottomPaddingFromRowPadding || bottomPaddingFromDocumentPadding

    const leftPaddingFromExplicitBlockPadding = blockPaddingNormalized[3] || rowBlockPaddingNormalized[3] || documentBlockPadding[3]
    const leftPaddingFromRowPadding = blockIndex === 0 ? rowPaddingNormalized[3] || documentRowPadding[3] : 0
    const leftPaddingFromDocumentPadding = blockIndex === 0 ? documentPadding[3] : 0
    const leftPadding = leftPaddingFromExplicitBlockPadding || leftPaddingFromRowPadding || leftPaddingFromDocumentPadding

    return [topPadding, rightPadding, bottomPadding, leftPadding]
  }

  private normalizePadding(padding?: Padding): NumericSides {
    if (padding) {
      return normalizeNumericSides(padding)
    } else {
      return [0, 0, 0, 0]
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
