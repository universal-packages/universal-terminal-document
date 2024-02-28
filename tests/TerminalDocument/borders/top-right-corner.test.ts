import stripAnsi from 'strip-ansi'

import { SelectiveBorder, SelectiveBorderStyle, TerminalDocument } from '../../../src'
import { blockDocument } from '../../__fixtures__/blockDocument'

const COMBINATIONS: { index: number; border: SelectiveBorder; borderStyle: SelectiveBorderStyle; result: string }[] = [
  {
    index: 0,
    border: [true, true, false, false],
    borderStyle: ['single', 'single', undefined, undefined],
    result: `
───────────────────┐
Hello World        │`
  },
  {
    index: 1,
    border: [true, true, false, false],
    borderStyle: ['single', 'single-round', undefined, undefined],
    result: `
───────────────────╮
Hello World        │`
  },
  {
    index: 2,
    border: [true, true, false, false],
    borderStyle: ['single', 'thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┃`
  },
  {
    index: 3,
    border: [true, true, false, false],
    borderStyle: ['single', 'double', undefined, undefined],
    result: `
───────────────────╗
Hello World        ║`
  },
  {
    index: 4,
    border: [true, true, false, false],
    borderStyle: ['single', 'dash-2', undefined, undefined],
    result: `
───────────────────┐
Hello World        ╎`
  },
  {
    index: 5,
    border: [true, true, false, false],
    borderStyle: ['single', 'dash-2-thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ╏`
  },
  {
    index: 6,
    border: [true, true, false, false],
    borderStyle: ['single', 'dash-3', undefined, undefined],
    result: `
───────────────────┐
Hello World        ┆`
  },
  {
    index: 7,
    border: [true, true, false, false],
    borderStyle: ['single', 'dash-3-thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┇`
  },
  {
    index: 8,
    border: [true, true, false, false],
    borderStyle: ['single', 'dash-4', undefined, undefined],
    result: `
───────────────────┐
Hello World        ┊`
  },
  {
    index: 9,
    border: [true, true, false, false],
    borderStyle: ['single', 'dash-4-thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┋`
  },
  {
    index: 10,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'single', undefined, undefined],
    result: `
───────────────────╮
Hello World        │`
  },
  {
    index: 11,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'single-round', undefined, undefined],
    result: `
───────────────────╮
Hello World        │`
  },
  {
    index: 12,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┃`
  },
  {
    index: 13,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'double', undefined, undefined],
    result: `
───────────────────╗
Hello World        ║`
  },
  {
    index: 14,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'dash-2', undefined, undefined],
    result: `
───────────────────╮
Hello World        ╎`
  },
  {
    index: 15,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'dash-2-thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ╏`
  },
  {
    index: 16,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'dash-3', undefined, undefined],
    result: `
───────────────────╮
Hello World        ┆`
  },
  {
    index: 17,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'dash-3-thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┇`
  },
  {
    index: 18,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'dash-4', undefined, undefined],
    result: `
───────────────────╮
Hello World        ┊`
  },
  {
    index: 19,
    border: [true, true, false, false],
    borderStyle: ['single-round', 'dash-4-thick', undefined, undefined],
    result: `
───────────────────┒
Hello World        ┋`
  },
  {
    index: 20,
    border: [true, true, false, false],
    borderStyle: ['thick', 'single', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┑
Hello World        │`
  },
  {
    index: 21,
    border: [true, true, false, false],
    borderStyle: ['thick', 'single-round', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━╮
Hello World        │`
  },
  {
    index: 22,
    border: [true, true, false, false],
    borderStyle: ['thick', 'thick', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┓
Hello World        ┃`
  },
  {
    index: 23,
    border: [true, true, false, false],
    borderStyle: ['thick', 'double', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━╗
Hello World        ║`
  },
  {
    index: 24,
    border: [true, true, false, false],
    borderStyle: ['thick', 'dash-2', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┑
Hello World        ╎`
  },
  {
    index: 25,
    border: [true, true, false, false],
    borderStyle: ['thick', 'dash-2-thick', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┓
Hello World        ╏`
  },
  {
    index: 26,
    border: [true, true, false, false],
    borderStyle: ['thick', 'dash-3', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┑
Hello World        ┆`
  },
  {
    index: 27,
    border: [true, true, false, false],
    borderStyle: ['thick', 'dash-3-thick', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┓
Hello World        ┇`
  },
  {
    index: 28,
    border: [true, true, false, false],
    borderStyle: ['thick', 'dash-4', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┑
Hello World        ┊`
  },
  {
    index: 29,
    border: [true, true, false, false],
    borderStyle: ['thick', 'dash-4-thick', undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━┓
Hello World        ┋`
  },
  {
    index: 30,
    border: [true, true, false, false],
    borderStyle: ['double', 'single', undefined, undefined],
    result: `
═══════════════════╕
Hello World        │`
  },
  {
    index: 31,
    border: [true, true, false, false],
    borderStyle: ['double', 'single-round', undefined, undefined],
    result: `
═══════════════════╮
Hello World        │`
  },
  {
    index: 32,
    border: [true, true, false, false],
    borderStyle: ['double', 'thick', undefined, undefined],
    result: `
═══════════════════┓
Hello World        ┃`
  },
  {
    index: 33,
    border: [true, true, false, false],
    borderStyle: ['double', 'double', undefined, undefined],
    result: `
═══════════════════╗
Hello World        ║`
  },
  {
    index: 34,
    border: [true, true, false, false],
    borderStyle: ['double', 'dash-2', undefined, undefined],
    result: `
═══════════════════╕
Hello World        ╎`
  },
  {
    index: 35,
    border: [true, true, false, false],
    borderStyle: ['double', 'dash-2-thick', undefined, undefined],
    result: `
═══════════════════┓
Hello World        ╏`
  },
  {
    index: 36,
    border: [true, true, false, false],
    borderStyle: ['double', 'dash-3', undefined, undefined],
    result: `
═══════════════════╕
Hello World        ┆`
  },
  {
    index: 37,
    border: [true, true, false, false],
    borderStyle: ['double', 'dash-3-thick', undefined, undefined],
    result: `
═══════════════════┓
Hello World        ┇`
  },
  {
    index: 38,
    border: [true, true, false, false],
    borderStyle: ['double', 'dash-4', undefined, undefined],
    result: `
═══════════════════╕
Hello World        ┊`
  },
  {
    index: 39,
    border: [true, true, false, false],
    borderStyle: ['double', 'dash-4-thick', undefined, undefined],
    result: `
═══════════════════┓
Hello World        ┋`
  },
  {
    index: 40,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'single', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
Hello World        │`
  },
  {
    index: 41,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'single-round', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╮
Hello World        │`
  },
  {
    index: 42,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'thick', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┒
Hello World        ┃`
  },
  {
    index: 43,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'double', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╗
Hello World        ║`
  },
  {
    index: 44,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'dash-2', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
Hello World        ╎`
  },
  {
    index: 45,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'dash-2-thick', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┒
Hello World        ╏`
  },
  {
    index: 46,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'dash-3', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
Hello World        ┆`
  },
  {
    index: 47,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'dash-3-thick', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┒
Hello World        ┇`
  },
  {
    index: 48,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'dash-4', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
Hello World        ┊`
  },
  {
    index: 49,
    border: [true, true, false, false],
    borderStyle: ['dash-2', 'dash-4-thick', undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┒
Hello World        ┋`
  },
  {
    index: 50,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'single', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┑
Hello World        │`
  },
  {
    index: 51,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'single-round', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╮
Hello World        │`
  },
  {
    index: 52,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'thick', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┓
Hello World        ┃`
  },
  {
    index: 53,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'double', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╗
Hello World        ║`
  },
  {
    index: 54,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'dash-2', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┑
Hello World        ╎`
  },
  {
    index: 55,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'dash-2-thick', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┓
Hello World        ╏`
  },
  {
    index: 56,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'dash-3', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┑
Hello World        ┆`
  },
  {
    index: 57,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'dash-3-thick', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┓
Hello World        ┇`
  },
  {
    index: 58,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'dash-4', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┑
Hello World        ┊`
  },
  {
    index: 59,
    border: [true, true, false, false],
    borderStyle: ['dash-2-thick', 'dash-4-thick', undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┓
Hello World        ┋`
  },
  {
    index: 60,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'single', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┐
Hello World        │`
  },
  {
    index: 61,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'single-round', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮
Hello World        │`
  },
  {
    index: 62,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'thick', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┒
Hello World        ┃`
  },
  {
    index: 63,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'double', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╗
Hello World        ║`
  },
  {
    index: 64,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'dash-2', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┐
Hello World        ╎`
  },
  {
    index: 65,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'dash-2-thick', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┒
Hello World        ╏`
  },
  {
    index: 66,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'dash-3', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┐
Hello World        ┆`
  },
  {
    index: 67,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'dash-3-thick', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┒
Hello World        ┇`
  },
  {
    index: 68,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'dash-4', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┐
Hello World        ┊`
  },
  {
    index: 69,
    border: [true, true, false, false],
    borderStyle: ['dash-3', 'dash-4-thick', undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┒
Hello World        ┋`
  },
  {
    index: 70,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'single', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┑
Hello World        │`
  },
  {
    index: 71,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'single-round', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╮
Hello World        │`
  },
  {
    index: 72,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'thick', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┓
Hello World        ┃`
  },
  {
    index: 73,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'double', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╗
Hello World        ║`
  },
  {
    index: 74,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'dash-2', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┑
Hello World        ╎`
  },
  {
    index: 75,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'dash-2-thick', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┓
Hello World        ╏`
  },
  {
    index: 76,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'dash-3', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┑
Hello World        ┆`
  },
  {
    index: 77,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'dash-3-thick', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┓
Hello World        ┇`
  },
  {
    index: 78,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'dash-4', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┑
Hello World        ┊`
  },
  {
    index: 79,
    border: [true, true, false, false],
    borderStyle: ['dash-3-thick', 'dash-4-thick', undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┓
Hello World        ┋`
  },
  {
    index: 80,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'single', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
Hello World        │`
  },
  {
    index: 81,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'single-round', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
Hello World        │`
  },
  {
    index: 82,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'thick', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┒
Hello World        ┃`
  },
  {
    index: 83,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'double', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╗
Hello World        ║`
  },
  {
    index: 84,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'dash-2', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
Hello World        ╎`
  },
  {
    index: 85,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'dash-2-thick', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┒
Hello World        ╏`
  },
  {
    index: 86,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'dash-3', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
Hello World        ┆`
  },
  {
    index: 87,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'dash-3-thick', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┒
Hello World        ┇`
  },
  {
    index: 88,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'dash-4', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┐
Hello World        ┊`
  },
  {
    index: 89,
    border: [true, true, false, false],
    borderStyle: ['dash-4', 'dash-4-thick', undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┒
Hello World        ┋`
  },
  {
    index: 90,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'single', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┑
Hello World        │`
  },
  {
    index: 91,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'single-round', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉╮
Hello World        │`
  },
  {
    index: 92,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'thick', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┓
Hello World        ┃`
  },
  {
    index: 93,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'double', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉╗
Hello World        ║`
  },
  {
    index: 94,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'dash-2', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┑
Hello World        ╎`
  },
  {
    index: 95,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'dash-2-thick', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┓
Hello World        ╏`
  },
  {
    index: 96,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'dash-3', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┑
Hello World        ┆`
  },
  {
    index: 97,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'dash-3-thick', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┓
Hello World        ┇`
  },
  {
    index: 98,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'dash-4', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┑
Hello World        ┊`
  },
  {
    index: 99,
    border: [true, true, false, false],
    borderStyle: ['dash-4-thick', 'dash-4-thick', undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┓
Hello World        ┋`
  },

  {
    index: 100,
    border: [true, false, false, false],
    borderStyle: ['single', undefined, undefined, undefined],
    result: `
────────────────────
Hello World         `
  },
  {
    index: 101,
    border: [true, false, false, false],
    borderStyle: ['single-round', undefined, undefined, undefined],
    result: `
────────────────────
Hello World         `
  },
  {
    index: 102,
    border: [true, false, false, false],
    borderStyle: ['thick', undefined, undefined, undefined],
    result: `
━━━━━━━━━━━━━━━━━━━━
Hello World         `
  },
  {
    index: 103,
    border: [true, false, false, false],
    borderStyle: ['double', undefined, undefined, undefined],
    result: `
════════════════════
Hello World         `
  },
  {
    index: 104,
    border: [true, false, false, false],
    borderStyle: ['dash-2', undefined, undefined, undefined],
    result: `
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
Hello World         `
  },
  {
    index: 105,
    border: [true, false, false, false],
    borderStyle: ['dash-2-thick', undefined, undefined, undefined],
    result: `
╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍
Hello World         `
  },
  {
    index: 106,
    border: [true, false, false, false],
    borderStyle: ['dash-3', undefined, undefined, undefined],
    result: `
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
Hello World         `
  },
  {
    index: 107,
    border: [true, false, false, false],
    borderStyle: ['dash-3-thick', undefined, undefined, undefined],
    result: `
┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
Hello World         `
  },
  {
    index: 108,
    border: [true, false, false, false],
    borderStyle: ['dash-4', undefined, undefined, undefined],
    result: `
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
Hello World         `
  },
  {
    index: 109,
    border: [true, false, false, false],
    borderStyle: ['dash-4-thick', undefined, undefined, undefined],
    result: `
┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉
Hello World         `
  },

  {
    index: 110,
    border: [false, true, false, false],
    borderStyle: [undefined, 'single', undefined, undefined],
    result: `
Hello World        │`
  },
  {
    index: 111,
    border: [false, true, false, false],
    borderStyle: [undefined, 'single-round', undefined, undefined],
    result: `
Hello World        │`
  },
  {
    index: 112,
    border: [false, true, false, false],
    borderStyle: [undefined, 'thick', undefined, undefined],
    result: `
Hello World        ┃`
  },
  {
    index: 113,
    border: [false, true, false, false],
    borderStyle: [undefined, 'double', undefined, undefined],
    result: `
Hello World        ║`
  },
  {
    index: 114,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-2', undefined, undefined],
    result: `
Hello World        ╎`
  },
  {
    index: 115,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-2-thick', undefined, undefined],
    result: `
Hello World        ╏`
  },
  {
    index: 116,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-3', undefined, undefined],
    result: `
Hello World        ┆`
  },
  {
    index: 117,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-3-thick', undefined, undefined],
    result: `
Hello World        ┇`
  },
  {
    index: 118,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-4', undefined, undefined],
    result: `
Hello World        ┊`
  },
  {
    index: 119,
    border: [false, true, false, false],
    borderStyle: [undefined, 'dash-4-thick', undefined, undefined],
    result: `
Hello World        ┋`
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the corner combination [${currentCombination.index}] ${currentCombination.borderStyle}`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(blockDocument({ border: currentCombination.border as any, borderStyle: currentCombination.borderStyle as any }))

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
