import { BorderType } from './types'

export const VERTICAL_BORDERS: Record<BorderType, string> = {
  single: '│',
  'single-round': '│',
  thick: '┃',
  double: '║'
}

export const VERTICAL_INFER_MAP: Record<string, BorderType> = {
  '└': 'single',
  '╰': 'single',
  '┕': 'single',
  '╘': 'single',
  '┖': 'thick',
  '┗': 'thick',
  '╙': 'double',
  '╚': 'double',

  '┘': 'single',
  '╯': 'single',
  '┙': 'single',
  '╛': 'single',
  '┚': 'thick',
  '┛': 'thick',
  '╜': 'double',
  '╝': 'double',

  '┴': 'single',
  '┵': 'single',
  '╧': 'single',
  '┶': 'single',
  '┷': 'single',
  '┸': 'thick',
  '┹': 'thick',
  '┺': 'thick',
  '┻': 'thick',
  '╨': 'double',
  '╩': 'double',

  '│': 'single',
  '┃': 'thick',
  '║': 'double'
}

export const HORIZONTAL_BORDERS: Record<BorderType, string> = {
  single: '─',
  'single-round': '─',
  thick: '━',
  double: '═'
}

export const INVERSE_HORIZONTAL_BORDERS: Record<string, BorderType> = {
  '─': 'single',
  '━': 'thick',
  '═': 'double'
}

// [vertical][leftHorizontal][rightHorizontal]
export const TOP_JOIN: Record<BorderType, Record<BorderType, Record<BorderType, string>>> = {
  single: {
    single: {
      single: '┬',
      'single-round': '┬',
      thick: '┭',
      double: '╤'
    },
    'single-round': {
      single: '┬',
      'single-round': '┬',
      thick: '┭',
      double: '╤'
    },
    thick: {
      single: '┭',
      'single-round': '┭',
      thick: '┮',
      double: '┮'
    },
    double: {
      single: '╤',
      'single-round': '╤',
      thick: '┮',
      double: '╤'
    }
  },
  'single-round': {
    single: {
      single: '┬',
      'single-round': '┬',
      thick: '┭',
      double: '╤'
    },
    'single-round': {
      single: '┬',
      'single-round': '┬',
      thick: '┭',
      double: '╤'
    },
    thick: {
      single: '┭',
      'single-round': '┭',
      thick: '┮',
      double: '┮'
    },
    double: {
      single: '╤',
      'single-round': '╤',
      thick: '┮',
      double: '╤'
    }
  },
  thick: {
    single: {
      single: '┭',
      'single-round': '┭',
      thick: '┮',
      double: '┮'
    },
    'single-round': {
      single: '┭',
      'single-round': '┭',
      thick: '┮',
      double: '┮'
    },
    thick: {
      single: '┮',
      'single-round': '┮',
      thick: '┳',
      double: '┯'
    },
    double: {
      single: '╤',
      'single-round': '╤',
      thick: '┯',
      double: '╤'
    }
  },
  double: {
    single: {
      single: '╤',
      'single-round': '╤',
      thick: '┮',
      double: '╤'
    },
    'single-round': {
      single: '╤',
      'single-round': '╤',
      thick: '┮',
      double: '╤'
    },
    thick: {
      single: '┮',
      'single-round': '┮',
      thick: '┯',
      double: '┯'
    },
    double: {
      single: '╤',
      'single-round': '╤',
      thick: '┯',
      double: '╦'
    }
  }
}

// [vertical][horizontal]
export const TOP_LEFT_CORNER: Record<BorderType, Record<BorderType, string>> = {
  single: {
    single: '┌',
    'single-round': '╭',
    thick: '┍',
    double: '╒'
  },
  'single-round': {
    single: '╭',
    'single-round': '╭',
    thick: '┍',
    double: '╒'
  },
  thick: {
    single: '┎',
    'single-round': '┎',
    thick: '┏',
    double: '┏'
  },
  double: {
    single: '╒',
    'single-round': '╒',
    thick: '┏',
    double: '╔'
  }
}

// [vertical][horizontal]
export const TOP_RIGHT_CORNER: Record<BorderType, Record<BorderType, string>> = {
  single: {
    single: '┐',
    'single-round': '╮',
    thick: '┑',
    double: '╕'
  },
  'single-round': {
    single: '╮',
    'single-round': '╮',
    thick: '┑',
    double: '╕'
  },
  thick: {
    single: '┒',
    'single-round': '┒',
    thick: '┓',
    double: '┓'
  },
  double: {
    single: '╕',
    'single-round': '╕',
    thick: '┓',
    double: '╗'
  }
}

// [vertical][leftHorizontal][rightHorizontal]
export const BOTTOM_JOIN: Record<BorderType, Record<BorderType, Record<BorderType, string>>> = {
  single: {
    single: {
      single: '┴',
      'single-round': '┴',
      thick: '┵',
      double: '╧'
    },
    'single-round': {
      single: '┴',
      'single-round': '┴',
      thick: '┵',
      double: '╧'
    },
    thick: {
      single: '┵',
      'single-round': '┵',
      thick: '┶',
      double: '┶'
    },
    double: {
      single: '╧',
      'single-round': '╧',
      thick: '┶',
      double: '╧'
    }
  },
  'single-round': {
    single: {
      single: '┴',
      'single-round': '┴',
      thick: '┵',
      double: '╧'
    },
    'single-round': {
      single: '┴',
      'single-round': '┴',
      thick: '┵',
      double: '╧'
    },
    thick: {
      single: '┵',
      'single-round': '┵',
      thick: '┶',
      double: '┶'
    },
    double: {
      single: '╧',
      'single-round': '╧',
      thick: '┶',
      double: '╧'
    }
  },
  thick: {
    single: {
      single: '┵',
      'single-round': '┵',
      thick: '┶',
      double: '┶'
    },
    'single-round': {
      single: '┵',
      'single-round': '┵',
      thick: '┶',
      double: '┶'
    },
    thick: {
      single: '┶',
      'single-round': '┶',
      thick: '┻',
      double: '┷'
    },
    double: {
      single: '╧',
      'single-round': '╧',
      thick: '┷',
      double: '╧'
    }
  },
  double: {
    single: {
      single: '╧',
      'single-round': '╧',
      thick: '┶',
      double: '╧'
    },
    'single-round': {
      single: '╧',
      'single-round': '╧',
      thick: '┶',
      double: '╧'
    },
    thick: {
      single: '┶',
      'single-round': '┶',
      thick: '┷',
      double: '┷'
    },
    double: {
      single: '╧',
      'single-round': '╧',
      thick: '┷',
      double: '╩'
    }
  }
}

// [vertical][horizontal]
export const BOTTOM_LEFT_CORNER: Record<BorderType, Record<BorderType, string>> = {
  single: {
    single: '└',
    'single-round': '╰',
    thick: '┕',
    double: '╘'
  },
  'single-round': {
    single: '╰',
    'single-round': '╰',
    thick: '┕',
    double: '╘'
  },
  thick: {
    single: '┖',
    'single-round': '┖',
    thick: '┗',
    double: '┗'
  },
  double: {
    single: '╘',
    'single-round': '╘',
    thick: '┗',
    double: '╚'
  }
}

// [vertical][horizontal]
export const BOTTOM_RIGHT_CORNER: Record<BorderType, Record<BorderType, string>> = {
  single: {
    single: '┘',
    'single-round': '╯',
    thick: '┙',
    double: '╛'
  },
  'single-round': {
    single: '╯',
    'single-round': '╯',
    thick: '┙',
    double: '╛'
  },
  thick: {
    single: '┚',
    'single-round': '┚',
    thick: '┛',
    double: '┛'
  },
  double: {
    single: '╛',
    'single-round': '╛',
    thick: '┛',
    double: '╝'
  }
}

// [aboveVertical][belowVertical][horizontal]
export const LEFT_JOIN: Record<BorderType, Record<BorderType, Record<BorderType, string>>> = {
  single: {
    single: {
      single: '├',
      'single-round': '├',
      thick: '┝',
      double: '╞'
    },
    'single-round': {
      single: '├',
      'single-round': '├',
      thick: '┝',
      double: '╞'
    },
    thick: {
      single: '┟',
      'single-round': '┟',
      thick: '┢',
      double: '┢'
    },
    double: {
      single: '╞',
      'single-round': '╞',
      thick: '┢',
      double: '╠'
    }
  },
  'single-round': {
    single: {
      single: '┝',
      'single-round': '┝',
      thick: '┟',
      double: '╞'
    },
    'single-round': {
      single: '┝',
      'single-round': '┝',
      thick: '┟',
      double: '╞'
    },
    thick: {
      single: '┟',
      'single-round': '┟',
      thick: '┠',
      double: '┠'
    },
    double: {
      single: '╞',
      'single-round': '╞',
      thick: '┠',
      double: '╞'
    }
  },
  thick: {
    single: {
      single: '┟',
      'single-round': '┟',
      thick: '┠',
      double: '┠'
    },
    'single-round': {
      single: '┟',
      'single-round': '┟',
      thick: '┠',
      double: '┠'
    },
    thick: {
      single: '┠',
      'single-round': '┠',
      thick: '┣',
      double: '┣'
    },
    double: {
      single: '┠',
      'single-round': '┠',
      thick: '┠',
      double: '┠'
    }
  },
  double: {
    single: {
      single: '╞',
      'single-round': '╞',
      thick: '┠',
      double: '╞'
    },
    'single-round': {
      single: '╞',
      'single-round': '╞',
      thick: '┠',
      double: '╞'
    },
    thick: {
      single: '┠',
      'single-round': '┠',
      thick: '┠',
      double: '┠'
    },
    double: {
      single: '╞',
      'single-round': '╞',
      thick: '┠',
      double: '╠'
    }
  }
}

// [aboveVertical][belowVertical][horizontal]
export const RIGHT_JOIN: Record<BorderType, Record<BorderType, Record<BorderType, string>>> = {
  single: {
    single: {
      single: '┤',
      'single-round': '┤',
      thick: '┥',
      double: '╡'
    },
    'single-round': {
      single: '┤',
      'single-round': '┤',
      thick: '┥',
      double: '╡'
    },
    thick: {
      single: '┥',
      'single-round': '┥',
      thick: '┪',
      double: '┪'
    },
    double: {
      single: '╡',
      'single-round': '╡',
      thick: '┪',
      double: '╣'
    }
  },
  'single-round': {
    single: {
      single: '┥',
      'single-round': '┥',
      thick: '┥',
      double: '╡'
    },
    'single-round': {
      single: '┥',
      'single-round': '┥',
      thick: '┥',
      double: '╡'
    },
    thick: {
      single: '┥',
      'single-round': '┥',
      thick: '┩',
      double: '┩'
    },
    double: {
      single: '╡',
      'single-round': '╡',
      thick: '┩',
      double: '╡'
    }
  },
  thick: {
    single: {
      single: '┥',
      'single-round': '┥',
      thick: '┩',
      double: '┩'
    },
    'single-round': {
      single: '┥',
      'single-round': '┥',
      thick: '┩',
      double: '┩'
    },
    thick: {
      single: '┩',
      'single-round': '┩',
      thick: '┫',
      double: '┫'
    },
    double: {
      single: '┩',
      'single-round': '┩',
      thick: '┩',
      double: '┩'
    }
  },
  double: {
    single: {
      single: '╡',
      'single-round': '╡',
      thick: '┩',
      double: '╡'
    },
    'single-round': {
      single: '╡',
      'single-round': '╡',
      thick: '┩',
      double: '╡'
    },
    thick: {
      single: '┩',
      'single-round': '┩',
      thick: '┩',
      double: '┩'
    },
    double: {
      single: '╡',
      'single-round': '╡',
      thick: '┩',
      double: '╣'
    }
  }
}

// [aboveVertical][belowVertical][leftHorizontal][rightHorizontal]
export const JOIN: Record<BorderType, Record<BorderType, Record<BorderType, Record<BorderType, string>>>> = {
  single: {
    single: {
      single: {
        single: '┼',
        'single-round': '┼',
        thick: '┾',
        double: '╬'
      },
      'single-round': {
        single: '┼',
        'single-round': '┼',
        thick: '┾',
        double: '╬'
      },
      thick: {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    'single-round': {
      single: {
        single: '┼',
        'single-round': '┼',
        thick: '┾',
        double: '╬'
      },
      'single-round': {
        single: '┼',
        'single-round': '┼',
        thick: '┾',
        double: '╬'
      },
      thick: {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    thick: {
      single: {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      'single-round': {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    double: {
      single: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      'single-round': {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    }
  },
  'single-round': {
    single: {
      single: {
        single: '┼',
        'single-round': '┼',
        thick: '┾',
        double: '╬'
      },
      'single-round': {
        single: '┼',
        'single-round': '┼',
        thick: '┾',
        double: '╬'
      },
      thick: {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    'single-round': {
      single: {
        single: '┼',
        'single-round': '┼',
        thick: '┾',
        double: '╬'
      },
      'single-round': {
        single: '┼',
        'single-round': '┼',
        thick: '┾',
        double: '╬'
      },
      thick: {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    thick: {
      single: {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      'single-round': {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    double: {
      single: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      'single-round': {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    }
  },
  thick: {
    single: {
      single: {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      'single-round': {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    'single-round': {
      single: {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      'single-round': {
        single: '┾',
        'single-round': '┾',
        thick: '┿',
        double: '┿'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    thick: {
      single: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      'single-round': {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    double: {
      single: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      'single-round': {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    }
  },
  double: {
    single: {
      single: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      'single-round': {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    'single-round': {
      single: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      'single-round': {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    thick: {
      single: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      'single-round': {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    },
    double: {
      single: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      'single-round': {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      },
      thick: {
        single: '┿',
        'single-round': '┿',
        thick: '┿',
        double: '┿'
      },
      double: {
        single: '╬',
        'single-round': '╬',
        thick: '┿',
        double: '╬'
      }
    }
  }
}
