import stripAnsi from 'strip-ansi'

import { SelectiveBorderStyle, TerminalDocument } from '../../../../../src'
import { rowDocument } from '../../../../__fixtures__/rowDocument'

const COMBINATIONS: {
  index: number
  leftBorderStyle: SelectiveBorderStyle
  rightBorderStyle: SelectiveBorderStyle
  result: string
}[] = [
  {
    index: 0,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 1,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 2,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 3,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 4,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 5,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 6,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 7,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 8,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 9,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 10,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 11,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 12,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 13,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 14,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 15,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 16,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 17,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 18,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 19,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'single-round', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹─────────`
  },
  {
    index: 20,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 21,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 22,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 23,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 24,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 25,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 26,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 27,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 28,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 29,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'thick', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻━━━━━━━━━`
  },
  {
    index: 30,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 31,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 32,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 33,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 34,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 35,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 36,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 37,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 38,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 39,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'double', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻═════════`
  },
  {
    index: 40,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 41,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 42,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 43,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 44,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 45,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 46,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 47,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 48,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 49,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹╌╌╌╌╌╌╌╌╌`
  },
  {
    index: 50,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 51,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 52,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 53,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 54,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 55,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 56,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 57,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 58,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 59,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-2-thick', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻╍╍╍╍╍╍╍╍╍`
  },
  {
    index: 60,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 61,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 62,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 63,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 64,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 65,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 66,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 67,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 68,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 69,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┄┄┄┄┄┄┄┄┄`
  },
  {
    index: 70,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 71,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 72,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 73,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 74,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 75,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 76,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 77,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 78,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 79,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-3-thick', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┅┅┅┅┅┅┅┅┅`
  },
  {
    index: 80,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 81,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 82,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 83,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 84,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 85,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 86,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 87,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 88,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 89,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┹┈┈┈┈┈┈┈┈┈`
  },
  {
    index: 90,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'single'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  },
  {
    index: 91,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'single-round'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  },
  {
    index: 92,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  },
  {
    index: 93,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'double'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  },
  {
    index: 94,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'dash-2'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  },
  {
    index: 95,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'dash-2-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  },
  {
    index: 96,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'dash-3'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  },
  {
    index: 97,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'dash-3-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  },
  {
    index: 98,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'dash-4'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  },
  {
    index: 99,
    leftBorderStyle: [ undefined, 'dash-3-thick','thick', undefined],
    rightBorderStyle: [ undefined, undefined,'dash-4-thick', 'dash-4-thick'],
    result: `
Hello     ┇World    
━━━━━━━━━━┻┉┉┉┉┉┉┉┉┉`
  }
]

const indexTest = undefined
const initialCombinationIndex = indexTest !== undefined ? indexTest : 0
const finalCombinationIndex = indexTest !== undefined ? indexTest + 1 : COMBINATIONS.length

describe(TerminalDocument, (): void => {
  for (let i = initialCombinationIndex; i < finalCombinationIndex; i++) {
    const currentCombination = COMBINATIONS[i]

    it(`renders the join combination [${currentCombination.index}] {${currentCombination.leftBorderStyle}} {${currentCombination.rightBorderStyle}}`, async (): Promise<void> => {
      const terminalDocument = new TerminalDocument(
        rowDocument([
          { border: [ false, true,true, false], borderStyle: currentCombination.leftBorderStyle },
          { border: [ false, false,true, true], borderStyle: currentCombination.rightBorderStyle }
        ])
      )

      terminalDocument.update()

      expect('\n' + stripAnsi(terminalDocument.output)).toBe(currentCombination.result)
    })
  }
})
