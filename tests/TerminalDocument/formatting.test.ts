import { BlueColor, BrownColor, GrayColor, RedColor, TerminalDocument, WhiteColor } from '../../src'

describe(TerminalDocument, () => {
  it('renders the document applying formatting', () => {
    const document = new TerminalDocument({
      rows: [
        {
          blocks: [
            { text: 'Run, run, run, as fast as you can.', color: 'aquamarine' },
            { text: "You can't catch me", color: 'deep-pink', align: 'center' },
            { text: 'I am the gingerbread man!', color: 'gold', align: 'right' }
          ],
          blockPadding: 1
        },
        {
          blocks: [
            {
              text: 'You are a monster!',
              backgroundColor: RedColor.DarkRed,
              backgroundFill: 'all',
              color: WhiteColor.AliceBlue,
              align: 'center',
              style: 'bold',
              padding: 1
            }
          ]
        },
        {
          blocks: [
            {
              align: 'justify',
              text: "I'm not the monster here, you are. You and the rest of that fairy tale trash, poisoning my perfect world",
              width: 40,
              padding: 1,
              color: WhiteColor.AliceBlue,
              backgroundColor: BlueColor.DodgerBlue,
              backgroundFill: 'fill',
              style: ['bold', 'italic']
            },
            {
              text: ''
            },
            {
              align: 'center',
              text: 'Now tell me, where are the others?!',
              verticalAlign: 'bottom',
              border: true,
              borderStyle: 'double'
            }
          ]
        },
        {
          blocks: [
            {
              align: 'center',
              text: 'Eat me!',
              border: true,
              borderStyle: 'dash-2-thick',
              color: RedColor.LightSalmon,
              style: 'underline'
            }
          ]
        },
        {
          blocks: [
            {
              align: 'center',
              text: "Ugh! I've tried to be fair to you creatures.",
              width: 30,
              border: [false, true, false, false]
            },
            {
              text: "Now my patience has reached its end! Tell me or I'll...",
              padding: 1
            }
          ]
        },
        {
          blocks: [
            {
              text: 'No, no, not the buttons. Not my gumdrop buttons!',
              align: 'center',
              padding: 2,
              backgroundColor: RedColor.IndianRed,
              color: GrayColor.Black,
              style: ['bold', 'inverse']
            }
          ]
        },
        {
          blocks: [
            {
              text: ''
            },
            {
              text: "All right then, who's hiding them?",
              align: 'right',
              backgroundColor: BrownColor.SaddleBrown,
              backgroundFill: 'word',
              color: GrayColor.Black,
              style: ['bold', 'inverse']
            }
          ]
        },
        {
          blocks: [
            {
              text: `- I'll tell you. Do you know the muffin man?
- The muffin man?
- The muffin man
- Yes, I know the muffin man. Who lives on Drury Lane?
- Well, she's married to the muffin man.
- The muffin man?
- The muffin man!
- She's married to the muffin man.`,
              padding: [0, 0, 0, 10]
            }
          ]
        }
      ]
    })

    document.update()

    // Check visually the output
    // console.log(document.output)

    expect(document.output.split('\n')).toEqual([
      '                                                                                 ',
      " \u001b[38;2;127;255;212mRun, run, run, as fast as\u001b[39m      \u001b[38;2;255;20;147mYou can't catch me\u001b[39m          \u001b[38;2;255;215;0mI am the gingerbread\u001b[39m ",
      ' \u001b[38;2;127;255;212myou can.\u001b[39m                                                                   \u001b[38;2;255;215;0mman!\u001b[39m ',
      '                                                                                 ',
      '\u001b[48;2;139;0;0m                                        \u001b[49m\u001b[48;2;139;0;0m                                        \u001b[49m',
      '\u001b[48;2;139;0;0m \u001b[49m\u001b[48;2;139;0;0m                              \u001b[49m\u001b[38;2;240;248;255m\u001b[1m\u001b[48;2;139;0;0mYou are a monster!\u001b[49m\u001b[22m\u001b[39m\u001b[48;2;139;0;0m                              \u001b[49m\u001b[48;2;139;0;0m \u001b[49m',
      '\u001b[48;2;139;0;0m                                        \u001b[49m\u001b[48;2;139;0;0m                                        \u001b[49m',
      '                                                           ╔═══════════════════╗',
      '                                                           ║                   ║',
      " \u001b[38;2;240;248;255m\u001b[1m\u001b[3m\u001b[48;2;30;144;255mI'm not the monster here, you are. You\u001b[49m\u001b[23m\u001b[22m\u001b[39m                    ║                   ║",
      ' \u001b[38;2;240;248;255m\u001b[1m\u001b[3m\u001b[48;2;30;144;255mand the rest of that fairy tale trash,\u001b[49m\u001b[23m\u001b[22m\u001b[39m                    ║                   ║',
      ' \u001b[38;2;240;248;255m\u001b[1m\u001b[3m\u001b[48;2;30;144;255mpoisoning     my     perfect     world\u001b[49m\u001b[23m\u001b[22m\u001b[39m                    ║Now tell me, where ║',
      '                                                           ║ are the others?!  ║',
      '┏╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╩╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┫',
      '╏                                   \u001b[38;2;255;160;122m\u001b[4mEat me!\u001b[24m\u001b[39m                                    ╏',
      '┗╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┯╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛',
      "Ugh! I've tried to be fair to │                                                 ",
      '        you creatures.        │ Now my patience has reached its end! Tell me or ',
      "                              │ I'll...                                         ",
      '                              │                                                 ',
      '                                                                                ',
      '                                                                                ',
      '  \u001b[48;2;205;92;92m              \u001b[49m\u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;205;92;92mNo, no, not the buttons. Not my gumdrop buttons!\u001b[49m\u001b[27m\u001b[22m\u001b[39m\u001b[48;2;205;92;92m              \u001b[49m  ',
      '                                                                                ',
      '                                                                                ',
      "                                              \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mAll\u001b[49m\u001b[27m\u001b[22m\u001b[39m \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mright\u001b[49m\u001b[27m\u001b[22m\u001b[39m \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mthen,\u001b[49m\u001b[27m\u001b[22m\u001b[39m \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mwho's\u001b[49m\u001b[27m\u001b[22m\u001b[39m \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mhiding\u001b[49m\u001b[27m\u001b[22m\u001b[39m \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mthem?\u001b[49m\u001b[27m\u001b[22m\u001b[39m",
      "          - I'll tell you. Do you know the muffin man?                          ",
      '          - The muffin man?                                                     ',
      '          - The muffin man                                                      ',
      '          - Yes, I know the muffin man. Who lives on Drury Lane?                ',
      "          - Well, she's married to the muffin man.                              ",
      '          - The muffin man?                                                     ',
      '          - The muffin man!                                                     ',
      "          - She's married to the muffin man.                                    "
    ])
  })
})
