export const VERTICAL_BORDERS: Record<string, string> = {
  single: '│',
  'single-round': '1',
  thick: '┃',
  double: '║',
  'dash-2': '╎',
  'dash-2-thick': '╏',
  'dash-3': '┆',
  'dash-3-thick': '┇',
  'dash-4': '┊',
  'dash-4-thick': '┋'
}

export const VERTICAL_BORDERS_RECTIFICATION_MAP: Record<string, string> = {
  '│': '│',
  '1': '│',
  '┃': '┃',
  '║': '║',
  '╎': '╎',
  '╏': '╏',
  '┆': '┆',
  '┇': '┇',
  '┊': '┊',
  '┋': '┋'
}

export const VERTICAL_BORDERS_ANALOGOUS_MAP: Record<string, string> = {
  '│': '│',
  '1': '1',
  '┃': '┃',
  '║': '║',
  '╎': '│',
  '╏': '┃',
  '┆': '│',
  '┇': '┃',
  '┊': '│',
  '┋': '┃'
}

export const HORIZONTAL_BORDERS: Record<string, string> = {
  single: '─',
  'single-round': '2',
  thick: '━',
  double: '═',
  'dash-2': '╌',
  'dash-2-thick': '╍',
  'dash-3': '┄',
  'dash-3-thick': '┅',
  'dash-4': '┈',
  'dash-4-thick': '┉'
}

export const HORIZONTAL_BORDERS_ANALOGOUS_MAP: Record<string, string> = {
  '─': '─',
  '2': '2',
  '━': '━',
  '═': '═',
  '╌': '─',
  '╍': '━',
  '┄': '─',
  '┅': '━',
  '┈': '─',
  '┉': '━'
}

export const VERTICAL_INFER_MAP: Record<string, string> = {
  '└': '│',
  '╰': '1',
  '┕': '│',
  '╘': '│',
  '┖': '┃',
  '┗': '┃',
  '╙': '║',
  '╚': '║',

  '┘': '│',
  '╯': '1',
  '┙': '│',
  '╛': '│',
  '┚': '┃',
  '┛': '┃',
  '╜': '║',
  '╝': '║',

  '┴': '│',
  '┵': '│',
  '┶': '│',
  '┷': '│',
  '╧': '│',
  '┸': '┃',
  '┹': '┃',
  '┺': '┃',
  '┻': '┃',
  '╨': '║',
  '╩': '║',

  '│': '│',
  '┃': '┃',
  '║': '║',
  '╎': '│',
  '╏': '┃',
  '┆': '│',
  '┇': '┃',
  '┊': '│',
  '┋': '┃'
}

export const ROUND_BORDERS_MAP: Record<string, string> = {
  '1': '│',
  '2': '─'
}

export const TOP_JOIN: Record<string, string> = {
  '─│─': '┬',
  '─│2': '┬',
  '─│━': '┭',
  '─│═': '╤',
  '─1─': '┬',
  '─12': '┬',
  '─1━': '┭',
  '─1═': '╤',
  '─┃─': '┭',
  '─┃2': '┭',
  '─┃━': '┮',
  '─┃═': '┮',
  '─║─': '╤',
  '─║2': '╤',
  '─║━': '┮',
  '─║═': '╤',

  '2│─': '┬',
  '2│2': '┬',
  '2│━': '┭',
  '2│═': '╤',
  '21─': '┬',
  '212': '┬',
  '21━': '┭',
  '21═': '╤',
  '2┃─': '┭',
  '2┃2': '┭',
  '2┃━': '┮',
  '2┃═': '┮',
  '2║─': '╤',
  '2║2': '╤',
  '2║━': '┮',
  '2║═': '╤',

  '━│─': '┭',
  '━│2': '┭',
  '━│━': '┳',
  '━│═': '╤',
  '━1─': '┭',
  '━12': '┭',
  '━1━': '┯',
  '━1═': '╤',
  '━┃─': '┭',
  '━┃2': '┭',
  '━┃━': '┳',
  '━┃═': '┳',
  '━║─': '╤',
  '━║2': '╤',
  '━║━': '┮',
  '━║═': '╤',

  '═│─': '┭',
  '═│2': '┭',
  '═│━': '┳',
  '═│═': '╤',
  '═1─': '┭',
  '═12': '┭',
  '═1━': '┯',
  '═1═': '╤',
  '═┃─': '┭',
  '═┃2': '┭',
  '═┃━': '┮',
  '═┃═': '┮',
  '═║─': '╤',
  '═║2': '╤',
  '═║━': '┮',
  '═║═': '╦'
}

export const TOP_LEFT_CORNER: Record<string, string> = {
  '│─': '┌',
  '1─': '╭',
  '┃─': '┎',
  '║─': '╔',

  '│2': '╭',
  '12': '╭',
  '┃2': '┎',
  '║2': '╔',

  '│━': '┍',
  '1━': '╭',
  '┃━': '┏',
  '║━': '╔',

  '│═': '╒',
  '1═': '╭',
  '┃═': '┏',
  '║═': '╔'
}

export const TOP_RIGHT_CORNER: Record<string, string> = {
  '─│': '┐',
  '─1': '╮',
  '─┃': '┒',
  '─║': '╗',

  '2│': '╮',
  '21': '╮',
  '2┃': '┒',
  '2║': '╗',

  '━│': '┑',
  '━1': '╮',
  '━┃': '┓',
  '━║': '╗',

  '═│': '╕',
  '═1': '╮',
  '═┃': '┓',
  '═║': '╗'
}

export const BOTTOM_JOIN: Record<string, string> = {
  '─│─': '┴',
  '─│2': '┴',
  '─│━': '┵',
  '─│═': '╧',
  '─1─': '┴',
  '─12': '┴',
  '─1━': '┵',
  '─1═': '╧',
  '─┃─': '┵',
  '─┃2': '┵',
  '─┃━': '┶',
  '─┃═': '┶',
  '─║─': '╧',
  '─║2': '╧',
  '─║━': '┶',
  '─║═': '╧',

  '2│─': '┴',
  '2│2': '┴',
  '2│━': '┵',
  '2│═': '╧',
  '21─': '┴',
  '212': '┴',
  '21━': '┵',
  '21═': '╧',
  '2┃─': '┵',
  '2┃2': '┵',
  '2┃━': '┶',
  '2┃═': '┶',
  '2║─': '╧',
  '2║2': '╧',
  '2║━': '┶',
  '2║═': '╧',

  '━│─': '┵',
  '━│2': '┵',
  '━│━': '┷',
  '━│═': '╨',
  '━1─': '┵',
  '━12': '┵',
  '━1━': '┷',
  '━1═': '╨',
  '━┃─': '┵',
  '━┃2': '┵',
  '━┃━': '┻',
  '━┃═': '┻',
  '━║─': '╨',
  '━║2': '╨',
  '━║━': '┺',
  '━║═': '╨',

  '═│─': '┵',
  '═│2': '┵',
  '═│━': '┷',
  '═│═': '╨',
  '═1─': '┵',
  '═12': '┵',
  '═1━': '┷',
  '═1═': '╨',
  '═┃─': '┵',
  '═┃2': '┵',
  '═┃━': '┺',
  '═┃═': '┺',
  '═║─': '╨',
  '═║2': '╨',
  '═║━': '┺',
  '═║═': '╩'
}

export const BOTTOM_LEFT_CORNER: Record<string, string> = {
  '│─': '└',
  '1─': '╰',
  '┃─': '┖',
  '║─': '╚',

  '│2': '╰',
  '12': '╰',
  '┃2': '┖',
  '║2': '╚',

  '│━': '┕',
  '1━': '╰',
  '┃━': '┗',
  '║━': '╚',

  '│═': '╘',
  '1═': '╰',
  '┃═': '┗',
  '║═': '╚'
}

export const BOTTOM_RIGHT_CORNER: Record<string, string> = {
  '─│': '┘',
  '─1': '╯',
  '─┃': '┙',
  '─║': '╛',

  '2│': '╯',
  '21': '╯',
  '2┃': '╯',
  '2║': '╛',

  '━│': '┙',
  '━1': '┙',
  '━┃': '┛',
  '━║': '┛',

  '═│': '╛',
  '═1': '╛',
  '═┃': '┚',
  '═║': '╝'
}

export const LEFT_JOIN: Record<string, string> = {
  '││─': '├',
  '││2': '├',
  '││━': '├',
  '││═': '├',
  '│1─': '├',
  '│12': '├',
  '│1━': '├',
  '│1═': '├',
  '│┃─': '├',
  '│┃2': '├',
  '│┃━': '├',
  '│┃═': '├',
  '│║─': '├',
  '│║2': '├',
  '│║━': '├',
  '│║═': '├',

  '1│─': '├',
  '1│2': '├',
  '1│━': '├',
  '1│═': '├',
  '11─': '├',
  '112': '├',
  '11━': '├',
  '11═': '├',
  '1┃─': '├',
  '1┃2': '├',
  '1┃━': '├',
  '1┃═': '├',
  '1║─': '├',
  '1║2': '├',
  '1║━': '├',
  '1║═': '├',

  '┃│─': '├',
  '┃│2': '├',
  '┃│━': '├',
  '┃│═': '├',
  '┃1─': '├',
  '┃12': '├',
  '┃1━': '├',
  '┃1═': '├',
  '┃┃─': '├',
  '┃┃2': '├',
  '┃┃━': '┣',
  '┃┃═': '┣',
  '┃║─': '├',
  '┃║2': '├',
  '┃║━': '├',
  '┃║═': '├',

  '║│─': '├',
  '║│2': '├',
  '║│━': '├',
  '║│═': '├',
  '║1─': '├',
  '║12': '├',
  '║1━': '├',
  '║1═': '├',
  '║┃─': '├',
  '║┃2': '├',
  '║┃━': '├',
  '║┃═': '├',
  '║║─': '├',
  '║║2': '├',
  '║║━': '├',
  '║║═': '╠'
}

export const RIGHT_JOIN: Record<string, string> = {
  '─││': '┤',
  '─│1': '┤',
  '─│┃': '┤',
  '─│║': '┤',
  '─1│': '┤',
  '─11': '┤',
  '─1┃': '┤',
  '─1║': '┤',
  '─┃│': '┤',
  '─┃1': '┤',
  '─┃┃': '┤',
  '─┃║': '┤',
  '─║│': '┤',
  '─║1': '┤',
  '─║┃': '┤',
  '─║║': '┤',

  '2││': '┤',
  '2│1': '┤',
  '2│┃': '┤',
  '2│║': '┤',
  '21│': '┤',
  '211': '┤',
  '21┃': '┤',
  '21║': '┤',
  '2┃│': '┤',
  '2┃1': '┤',
  '2┃┃': '┤',
  '2┃║': '┤',
  '2║│': '┤',
  '2║1': '┤',
  '2║┃': '┤',
  '2║║': '┤',

  '━││': '┤',
  '━│1': '┤',
  '━│┃': '┤',
  '━│║': '┤',
  '━1│': '┤',
  '━11': '┤',
  '━1┃': '┤',
  '━1║': '┤',
  '━┃│': '┤',
  '━┃1': '┤',
  '━┃┃': '┫',
  '━┃║': '┤',
  '━║│': '┤',
  '━║1': '┤',
  '━║┃': '┤',
  '━║║': '┤',

  '═││': '┤',
  '═│1': '┤',
  '═│┃': '┤',
  '═│║': '┤',
  '═1│': '┤',
  '═11': '┤',
  '═1┃': '┤',
  '═1║': '┤',
  '═┃│': '┤',
  '═┃1': '┤',
  '═┃┃': '┤',
  '═┃║': '┤',
  '═║│': '┤',
  '═║1': '┤',
  '═║┃': '┤',
  '═║║': '╣'
}

export const JOIN: Record<string, string> = {
  '─││─': '┼',
  '─││2': '┼',
  '─││━': '┾',
  '─││═': '┼',

  '─│1─': '┼',
  '─│12': '┼',
  '─│1━': '┾',
  '─│1═': '┼',

  '─│┃─': '╀',
  '─│┃2': '╀',
  '─│┃━': '╄',
  '─│┃═': '╀',

  '─│║─': '┼',
  '─│║2': '┼',
  '─│║━': '┾',
  '─│║═': '┼',

  '─1│─': '┼',
  '─1│2': '┼',
  '─1│━': '┾',
  '─1│═': '┼',

  '─12─': '┼',
  '─121': '┼',
  '─12━': '┾',
  '─12═': '┼',

  '─1┃─': '╀',
  '─1┃2': '╀',
  '─1┃━': '╄',
  '─1┃═': '╀',

  '─1║─': '┼',
  '─1║2': '┼',
  '─1║━': '┾',
  '─1║═': '┼',

  '─┃│─': '╀',
  '─┃│2': '╀',
  '─┃│━': '╄',
  '─┃│═': '╀',

  '─┃1─': '╀',
  '─┃12': '╀',
  '─┃1━': '╄',
  '─┃1═': '╀',

  '─┃┃─': '╀',
  '─┃┃2': '╀',
  '─┃┃━': '╄',
  '─┃┃═': '╀',

  '─┃║─': '╀',
  '─┃║2': '╀',
  '─┃║━': '╄',
  '─┃║═': '╀',

  '─║│─': '┼',
  '─║│2': '┼',
  '─║│━': '┾',
  '─║│═': '┼',

  '─║1─': '┼',
  '─║12': '┼',
  '─║1━': '┾',
  '─║1═': '┼',

  '─║┃─': '╀',
  '─║┃2': '╀',
  '─║┃━': '╄',
  '─║┃═': '╀',

  '─║║─': '┼',
  '─║║2': '┼',
  '─║║━': '┾',
  '─║║═': '┼',

  '2││─': '┼',
  '2││2': '┼',
  '2││━': '┾',
  '2││═': '┼',

  '2│1─': '┼',
  '2│12': '┼',
  '2│1━': '┾',
  '2│1═': '┼',

  '2│┃─': '╀',
  '2│┃2': '╀',
  '2│┃━': '╄',
  '2│┃═': '╀',

  '2│║─': '┼',
  '2│║2': '┼',
  '2│║━': '┾',
  '2│║═': '┼',

  '21│─': '┼',
  '21│2': '┼',
  '21│━': '┾',
  '21│═': '┼',

  '212─': '┼',
  '2121': '┼',
  '212━': '┾',
  '212═': '┼',

  '21┃─': '╀',
  '21┃2': '╀',
  '21┃━': '╄',
  '21┃═': '╀',

  '21║─': '┼',
  '21║2': '┼',
  '21║━': '┾',
  '21║═': '┼',

  '2┃│─': '╀',
  '2┃│2': '╀',
  '2┃│━': '╄',
  '2┃│═': '╀',

  '2┃1─': '╀',
  '2┃12': '╀',
  '2┃1━': '╄',
  '2┃1═': '╀',

  '2┃┃─': '╀',
  '2┃┃2': '╀',
  '2┃┃━': '╄',
  '2┃┃═': '╀',

  '2┃║─': '╀',
  '2┃║2': '╀',
  '2┃║━': '╄',
  '2┃║═': '╀',

  '2║│─': '┼',
  '2║│2': '┼',
  '2║│━': '┾',
  '2║│═': '┼',

  '2║1─': '┼',
  '2║12': '┼',
  '2║1━': '┾',
  '2║1═': '┼',

  '2║┃─': '╀',
  '2║┃2': '╀',
  '2║┃━': '╄',
  '2║┃═': '╀',

  '2║║─': '┼',
  '2║║2': '┼',
  '2║║━': '┾',
  '2║║═': '┼',

  '━││─': '┾',
  '━││2': '┾',
  '━││━': '━',
  '━││═': '┾',

  '━│1─': '┾',
  '━│12': '┾',
  '━│1━': '━',
  '━│1═': '┾',

  '━│┃─': '╄',
  '━│┃2': '╄',
  '━│┃━': '╄',
  '━│┃═': '╄',

  '━│║─': '┾',
  '━│║2': '┾',
  '━│║━': '━',
  '━│║═': '┾',

  '━1│─': '┾',
  '━1│2': '┾',
  '━1│━': '━',
  '━1│═': '┾',

  '━12─': '┾',
  '━121': '┾',
  '━12━': '━',
  '━12═': '┾',

  '━1┃─': '╄',
  '━1┃2': '╄',
  '━1┃━': '╄',
  '━1┃═': '╄',

  '━1║─': '┾',
  '━1║2': '┾',
  '━1║━': '━',
  '━1║═': '┾',

  '━┃│─': '╄',
  '━┃│2': '╄',
  '━┃│━': '╄',
  '━┃│═': '╄',

  '━┃1─': '╄',
  '━┃12': '╄',
  '━┃1━': '╄',
  '━┃1═': '╄',

  '━┃┃─': '╄',
  '━┃┃2': '╄',
  '━┃┃━': '╋',
  '━┃┃═': '╄',

  '━┃║─': '╄',
  '━┃║2': '╄',
  '━┃║━': '╄',
  '━┃║═': '╄',

  '━║│─': '┾',
  '━║│2': '┾',
  '━║│━': '━',
  '━║│═': '┾',

  '━║1─': '┾',
  '━║12': '┾',
  '━║1━': '━',
  '━║1═': '┾',

  '━║┃─': '╄',
  '━║┃2': '╄',
  '━║┃━': '╄',
  '━║┃═': '╄',

  '━║║─': '┾',
  '━║║2': '┾',
  '━║║━': '━',
  '━║║═': '┾',

  '═││─': '┾',
  '═││2': '┾',
  '═││━': '┾',
  '═││═': '═',

  '═│1─': '┾',
  '═│12': '┾',
  '═│1━': '┾',
  '═│1═': '═',

  '═│┃─': '╄',
  '═│┃2': '╄',
  '═│┃━': '╄',
  '═│┃═': '╄',

  '═│║─': '┾',
  '═│║2': '┾',
  '═│║━': '┾',
  '═│║═': '═',

  '═1│─': '┾',
  '═1│2': '┾',
  '═1│━': '┾',
  '═1│═': '═',

  '═12─': '┾',
  '═121': '┾',
  '═12━': '┾',
  '═12═': '═',

  '═1┃─': '╄',
  '═1┃2': '╄',
  '═1┃━': '╄',
  '═1┃═': '╄',

  '═1║─': '┾',
  '═1║2': '┾',
  '═1║━': '┾',
  '═1║═': '═',

  '═┃│─': '╄',
  '═┃│2': '╄',
  '═┃│━': '╄',
  '═┃│═': '╄',

  '═┃1─': '╄',
  '═┃12': '╄',
  '═┃1━': '╄',
  '═┃1═': '╄',

  '═┃┃─': '╄',
  '═┃┃2': '╄',
  '═┃┃━': '╄',
  '═┃┃═': '╄',

  '═┃║─': '╄',
  '═┃║2': '╄',
  '═┃║━': '╄',
  '═┃║═': '╄',

  '═║│─': '┾',
  '═║│2': '┾',
  '═║│━': '┾',
  '═║│═': '═',

  '═║1─': '┾',
  '═║12': '┾',
  '═║1━': '┾',
  '═║1═': '═',

  '═║┃─': '╄',
  '═║┃2': '╄',
  '═║┃━': '╄',
  '═║┃═': '╄',

  '═║║─': '┾',
  '═║║2': '┾',
  '═║║━': '┾',
  '═║║═': '╬'
}
