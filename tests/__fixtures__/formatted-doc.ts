import { BlueColor, BrownColor, DocumentDescriptor, GrayColor, RedColor, WhiteColor } from '../../src'

export const FORMATTED_DOC: DocumentDescriptor = {
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
          style: 'bold',
          backgroundFill: 'text',
          backgroundColor: WhiteColor.AliceBlue,
          color: GrayColor.Black
        }
      ]
    }
  ],
  border: true,
  borderStyle: 'dash-2-thick'
}
