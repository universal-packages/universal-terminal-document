import stripAnsi from 'strip-ansi'

import { TerminalDocument } from '../../../src'
import { FORMATTED_DOC } from '../../__fixtures__/formatted-doc'

describe(TerminalDocument, () => {
  it('renders the document applying formatting', () => {
    const terminalDocument = new TerminalDocument(FORMATTED_DOC)

    terminalDocument.render()

    // Check visually the output
    // console.log(terminalDocument.output)
    // console.log(JSON.stringify(terminalDocument.output.split('\n')))

    if (process.env.CI) {
      expect(stripAnsi(terminalDocument.output).split('\n')).toEqual([
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
      expect(terminalDocument.output.split('\n')).toEqual([
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
        '╏          \u001b[38;2;0;0;0m\u001b[1m\u001b[48;2;240;248;255m- De acuerdo.. te lo cuento ¿Tú conoces a pin pon?\u001b[49m\u001b[22m\u001b[39m                  ╏',
        '╏                                                                              ╏',
        '╏          \u001b[38;2;0;0;0m\u001b[1m\u001b[48;2;240;248;255m- A pin pon?\u001b[49m\u001b[22m\u001b[39m                                                        ╏',
        '╏                                                                              ╏',
        '╏          \u001b[38;2;0;0;0m\u001b[1m\u001b[48;2;240;248;255m- Si pin pon..\u001b[49m\u001b[22m\u001b[39m                                                      ╏',
        '╏                                                                              ╏',
        '╏          \u001b[38;2;0;0;0m\u001b[1m\u001b[48;2;240;248;255m- Si.. es un muñeco muy guapo y de cartón\u001b[49m\u001b[22m\u001b[39m                           ╏',
        '╏                                                                              ╏',
        '╏          \u001b[38;2;0;0;0m\u001b[1m\u001b[48;2;240;248;255m- Si.. se lava su carita con agua y con jabón\u001b[49m\u001b[22m\u001b[39m                       ╏',
        '╏                                                                              ╏',
        '╏          \u001b[38;2;0;0;0m\u001b[1m\u001b[48;2;240;248;255m- ¿!Con agua y con jabón¡?\u001b[49m\u001b[22m\u001b[39m                                          ╏',
        '╏                                                                              ╏',
        '╏          \u001b[38;2;0;0;0m\u001b[1m\u001b[48;2;240;248;255m- Si se lava la carita!!\u001b[49m\u001b[22m\u001b[39m                                            ╏',
        '╏                                                                              ╏',
        '╏          \u001b[38;2;0;0;0m\u001b[1m\u001b[48;2;240;248;255m- Se lava la carita con agua.. y con jabón..\u001b[49m\u001b[22m\u001b[39m                        ╏',
        '┗╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┛'
      ])
    }
  })
})
