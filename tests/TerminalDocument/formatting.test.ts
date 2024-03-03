import stripAnsi from 'strip-ansi'

import { BlueColor, BrownColor, GrayColor, RedColor, TerminalDocument, WhiteColor } from '../../src'

describe(TerminalDocument, () => {
  it('renders the document applying formatting', () => {
    const document = new TerminalDocument({
      rows: [
        {
          blocks: [
            { text: 'Mjjm! Corre corre corre.. que nadie te pueda alcanzar', color: 'aquamarine' },
            { text: 'No me podras atrapar', color: 'deep-pink', align: 'center' },
            { text: 'SOY EL HOMBRE DE JENGIBRE!', color: 'gold', align: 'right' }
          ],
          blockPadding: 1
        },
        {
          blocks: [
            {
              text: 'Eres un monstruo!',
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
              text: 'El único monstruo aquí eres tu! Tu! y esos personajes de cuentos de hadas que arruinan mi mundo perfecto..',
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
              text: 'ahora dime .. DONDE ESTAN LOS OTROS?!',
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
              text: 'Cerdo!',
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
              text: 'He tratado de ser paciente con ustedes',
              width: 30,
              border: [false, true, false, false]
            },
            {
              text: 'pero mi paciencia a llegado a su limite, DIME! o te arrancare..',
              padding: 1
            }
          ]
        },
        {
          blocks: [
            {
              text: 'No! mis botones no! no mis botones de.. gomita',
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
              text: 'Entonces cuentame! Quién los oculta?!',
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
              text: `- De acuerdo.. te lo cuento ¿Tú conoces a pin pon?

- A pin pon?

- Si pin pon..

- Si.. es un muñeco muy guapo y de cartón

- Si.. se lava su carita con agua y con jabón

- ¿!Con agua y con jabón¡?

- Si se lava la carita!!

- Se lava la carita con agua.. y con jabón..`,
              padding: [1, 0, 0, 10],
              style: ['bold', 'inverse']
            }
          ]
        }
      ],
      border: true,
      borderStyle: 'dash-2-thick'
    })

    document.update()

    // Check visually the output
    // console.log(document.output)

    if (process.env.CI) {
      expect(stripAnsi(document.output).split('\n')).toEqual([
        '┏╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┓',
        '╏                                                                              ╏',
        '╏ Mjjm! Corre corre           No me podras atrapar            SOY EL HOMBRE DE ╏',
        '╏ corre.. que nadie te                                               JENGIBRE! ╏',
        '╏ pueda alcanzar                                                               ╏',
        '╏                                                                              ╏',
        '╏                                                                              ╏',
        '╏                              Eres un monstruo!                               ╏',
        '╏                                                                              ╏',
        '┃                                                           ╔══════════════════╣',
        '╏                                                           ║                  ║',
        '╏ El  único monstruo aquí eres tu! Tu! y                    ║                  ║',
        '╏ esos  personajes  de  cuentos de hadas                    ║  ahora dime ..   ║',
        '╏ que   arruinan   mi  mundo  perfecto..                    ║ DONDE ESTAN LOS  ║',
        '╏                                                           ║     OTROS?!      ║',
        '┣╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╩╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┫',
        '╏                                    Cerdo!                                    ╏',
        '┣╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┯╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┫',
        '╏He tratado de ser paciente con│                                               ╏',
        '╏           ustedes            │ pero mi paciencia a llegado a su limite,      ╏',
        '╏                              │ DIME! o te arrancare..                        ╏',
        '╏                              │                                               ╏',
        '╏                                                                              ╏',
        '╏                                                                              ╏',
        '╏                No! mis botones no! no mis botones de.. gomita                ╏',
        '╏                                                                              ╏',
        '╏                                                                              ╏',
        '╏                                         Entonces cuentame! Quién los oculta?!╏',
        '╏                                                                              ╏',
        '╏          - De acuerdo.. te lo cuento ¿Tú conoces a pin pon?                  ╏',
        '╏                                                                              ╏',
        '╏          - A pin pon?                                                        ╏',
        '╏                                                                              ╏',
        '╏          - Si pin pon..                                                      ╏',
        '╏                                                                              ╏',
        '╏          - Si.. es un muñeco muy guapo y de cartón                           ╏',
        '╏                                                                              ╏',
        '╏          - Si.. se lava su carita con agua y con jabón                       ╏',
        '╏                                                                              ╏',
        '╏          - ¿!Con agua y con jabón¡?                                          ╏',
        '╏                                                                              ╏',
        '╏          - Si se lava la carita!!                                            ╏',
        '╏                                                                              ╏',
        '╏          - Se lava la carita con agua.. y con jabón..                        ╏',
        '┗╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛'
      ])
    } else {
      expect(document.output.split('\n')).toEqual([
        '┏╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┓',
        '╏                                                                              ╏',
        '╏ \u001b[38;2;127;255;212mMjjm! Corre corre\u001b[39m           \u001b[38;2;255;20;147mNo me podras atrapar\u001b[39m            \u001b[38;2;255;215;0mSOY EL HOMBRE DE\u001b[39m ╏',
        '╏ \u001b[38;2;127;255;212mcorre.. que nadie te\u001b[39m                                               \u001b[38;2;255;215;0mJENGIBRE!\u001b[39m ╏',
        '╏ \u001b[38;2;127;255;212mpueda alcanzar\u001b[39m                                                               ╏',
        '╏                                                                              ╏',
        '╏\u001b[48;2;139;0;0m                                       \u001b[49m\u001b[48;2;139;0;0m                                       \u001b[49m╏',
        '╏\u001b[48;2;139;0;0m \u001b[49m\u001b[48;2;139;0;0m                             \u001b[49m\u001b[38;2;240;248;255m\u001b[1m\u001b[48;2;139;0;0mEres un monstruo!\u001b[49m\u001b[22m\u001b[39m\u001b[48;2;139;0;0m                              \u001b[49m\u001b[48;2;139;0;0m \u001b[49m╏',
        '╏\u001b[48;2;139;0;0m                                       \u001b[49m\u001b[48;2;139;0;0m                                       \u001b[49m╏',
        '┃                                                           ╔══════════════════╣',
        '╏                                                           ║                  ║',
        '╏ \u001b[38;2;240;248;255m\u001b[1m\u001b[3m\u001b[48;2;30;144;255mEl  único monstruo aquí eres tu! Tu! y\u001b[49m\u001b[23m\u001b[22m\u001b[39m                    ║                  ║',
        '╏ \u001b[38;2;240;248;255m\u001b[1m\u001b[3m\u001b[48;2;30;144;255mesos  personajes  de  cuentos de hadas\u001b[49m\u001b[23m\u001b[22m\u001b[39m                    ║  ahora dime ..   ║',
        '╏ \u001b[38;2;240;248;255m\u001b[1m\u001b[3m\u001b[48;2;30;144;255mque   arruinan   mi  mundo  perfecto..\u001b[49m\u001b[23m\u001b[22m\u001b[39m                    ║ DONDE ESTAN LOS  ║',
        '╏                                                           ║     OTROS?!      ║',
        '┣╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╩╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┫',
        '╏                                    \u001b[38;2;255;160;122m\u001b[4mCerdo!\u001b[24m\u001b[39m                                    ╏',
        '┣╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┯╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┫',
        '╏He tratado de ser paciente con│                                               ╏',
        '╏           ustedes            │ pero mi paciencia a llegado a su limite,      ╏',
        '╏                              │ DIME! o te arrancare..                        ╏',
        '╏                              │                                               ╏',
        '╏                                                                              ╏',
        '╏                                                                              ╏',
        '╏  \u001b[48;2;205;92;92m              \u001b[49m\u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;205;92;92mNo! mis botones no! no mis botones de.. gomita\u001b[49m\u001b[27m\u001b[22m\u001b[39m\u001b[48;2;205;92;92m              \u001b[49m  ╏',
        '╏                                                                              ╏',
        '╏                                                                              ╏',
        '╏                                         \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mEntonces\u001b[49m\u001b[27m\u001b[22m\u001b[39m \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mcuentame!\u001b[49m\u001b[27m\u001b[22m\u001b[39m \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mQuién\u001b[49m\u001b[27m\u001b[22m\u001b[39m \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19mlos\u001b[49m\u001b[27m\u001b[22m\u001b[39m \u001b[38;2;0;0;0m\u001b[1m\u001b[7m\u001b[48;2;139;69;19moculta?!\u001b[49m\u001b[27m\u001b[22m\u001b[39m╏',
        '╏                                                                              ╏',
        '╏          \u001b[1m\u001b[7m- De acuerdo.. te lo cuento ¿Tú conoces a pin pon?\u001b[27m\u001b[22m                  ╏',
        '╏                                                                              ╏',
        '╏          \u001b[1m\u001b[7m- A pin pon?\u001b[27m\u001b[22m                                                        ╏',
        '╏                                                                              ╏',
        '╏          \u001b[1m\u001b[7m- Si pin pon..\u001b[27m\u001b[22m                                                      ╏',
        '╏                                                                              ╏',
        '╏          \u001b[1m\u001b[7m- Si.. es un muñeco muy guapo y de cartón\u001b[27m\u001b[22m                           ╏',
        '╏                                                                              ╏',
        '╏          \u001b[1m\u001b[7m- Si.. se lava su carita con agua y con jabón\u001b[27m\u001b[22m                       ╏',
        '╏                                                                              ╏',
        '╏          \u001b[1m\u001b[7m- ¿!Con agua y con jabón¡?\u001b[27m\u001b[22m                                          ╏',
        '╏                                                                              ╏',
        '╏          \u001b[1m\u001b[7m- Si se lava la carita!!\u001b[27m\u001b[22m                                            ╏',
        '╏                                                                              ╏',
        '╏          \u001b[1m\u001b[7m- Se lava la carita con agua.. y con jabón..\u001b[27m\u001b[22m                        ╏',
        '┗╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛'
      ])
    }
  })
})
