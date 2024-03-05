# Terminal Document

[![npm version](https://badge.fury.io/js/@universal-packages%2Fterminal-document.svg)](https://www.npmjs.com/package/@universal-packages/terminal-document)
[![Testing](https://github.com/universal-packages/universal-terminal-document/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-terminal-document/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-terminal-document/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-terminal-document)

Structured document rendering for the terminal.

## Install

```shell
npm install @universal-packages/terminal-document
```

## TerminalDocument

By instantiating a `TerminalDocument` object, you can create a structured document that can be rendered to a string that can be printed to the terminal.

```typescript
import { TerminalDocument } from '@universal-packages/terminal-document'

const document = new TerminalDocument({
  rows: [
    {
      blocks: [{ text: 'Hello World!!' }]
    }
  ]
})

console.log(document.render())

// Hello World!!
```

### Options

- **`blockBorder`** `boolean | [boolean, boolean, boolean, boolean]`
  Whether to render a border around each block in the whole document. An array of 4 booleans can be provided to specify the border for each side of the block, top, right, bottom, left respectively.

- **`blockBorderColor`** `string | [string, string, string, string]`
  If the blockBorder option is set to true, this option can be used to specify the color of the border. An array of 4 strings can be provided to specify the color for each side of the block, top, right, bottom, left respectively. See [Colors](#colors).

- **`blockBorderStyle`** `string | [string, string, string, string]`
  If the blockBorder option is set to true, this option can be used to specify the style of the border. An array of 4 BorderStyle values can be provided to specify the style for each side of the block, top, right, bottom, left respectively. See [BorderStyle](#borderstyle)

- **`blockPadding`** `number | [number, number, number, number]`
  The padding around each block. An array of 4 numbers can be provided to specify the padding for each side of the block, top, right, bottom, left respectively.

- **`align`** `left | center | right | justify` `default: left`
  The alignment of the document.

- **`backgroundColor`** `string`
  The background color of the document. See [Colors](#colors).

- **`backgroundFill`** `word' | text | fill | all`
  The background fill of the document. `word` will fill the background of each word, `text` will fill the background of the whole text in each block, `fill` will fill the background of each block except for the padding, `all` will fill the background of the whole document.

- **`border`** `boolean | [boolean, boolean, boolean, boolean]`
  Whether to render a border around the whole document. An array of 4 booleans can be provided to specify the border for each side of the document, top, right, bottom, left respectively.

- **`borderColor`** `string | [string, string, string, string]`
  If the border option is set to true, this option can be used to specify the color of the border. An array of 4 strings can be provided to specify the color for each side of the document, top, right, bottom, left respectively. See [Colors](#colors).

- **`borderStyle`** `string | [string, string, string, string]`
  If the border option is set to true, this option can be used to specify the style of the border. An array of 4 BorderStyle values can be provided to specify the style for each side of the document, top, right, bottom, left respectively. See [BorderStyle](#borderstyle)

- **`color`** `string`
  The color of all text in the document. See [Colors](#colors).

- **`padding`** `number | [number, number, number, number]`
  The padding around the whole document. An array of 4 numbers can be provided to specify the padding for each side of the document, top, right, bottom, left respectively.

- **`rowBorder`** `boolean | [boolean, boolean, boolean, boolean]`
  Whether to render a border around each row in the whole document. An array of 4 booleans can be provided to specify the border for each side of the row, top, right, bottom, left respectively.

- **`rowBorderColor`** `string | [string, string, string, string]`
  If the rowBorder option is set to true, this option can be used to specify the color of the border. An array of 4 strings can be provided to specify the color for each side of the row, top, right, bottom, left respectively. See [Colors](#colors).

- **`rowBorderStyle`** `string | [string, string, string, string]`
  If the rowBorder option is set to true, this option can be used to specify the style of the border. An array of 4 BorderStyle values can be provided to specify the style for each side of the row, top, right, bottom, left respectively. See [BorderStyle](#borderstyle)
- **`style`** `bold | italic | underline | inverse | strikethrough | (bold | italic | underline | inverse | strikethrough)[]`
  The style of all text in the document or an array of a combination of styles.

- **`verticalAlign`** `top | middle | bottom` `default: top`
  The vertical alignment each block in the document.

- **`width`** `number` `default: 80`
  The width of the document.

- **`rows`** `Object[]`
  An array of object describing the rows of the document.

  - **`align`** `left | center | right | justify`
    The alignment of each block in the row.

  - **`backgroundColor`** `string`
    The background color of the row. See [Colors](#colors).

  - **`backgroundFill`** `word' | text | fill | all`
    The background fill of the row. `word` will fill the background of each word, `text` will fill the background of the whole text in each block, `fill` will fill the background of each block except for the padding, `all` will fill the background of the whole row.

  - **`blockBorder`** `boolean | [boolean, boolean, boolean, boolean]`
    Whether to render a border around each block in the row. An array of 4 booleans can be provided to specify the border for each side of the block, top, right, bottom, left respectively.

  - **`blockBorderColor`** `string | [string, string, string, string]`
    If the blockBorder option is set to true, this option can be used to specify the color of the border. An array of 4 strings can be provided to specify the color for each side of the block, top, right, bottom, left respectively. See [Colors](#colors).

  - **`blockBorderStyle`** `string | [string, string, string, string]`
    If the blockBorder option is set to true, this option can be used to specify the style of the border. An array of 4 BorderStyle values can be provided to specify the style for each side of the block, top, right, bottom, left respectively. See [BorderStyle](#borderstyle)

  - **`blockPadding`** `number | [number, number, number, number]`
    The padding around each block. An array of 4 numbers can be provided to specify the padding for each side of the block, top, right, bottom, left respectively.

  - **`border`** `boolean | [boolean, boolean, boolean, boolean]`
    Whether to render a border around the whole row. An array of 4 booleans can be provided to specify the border for each side of the row, top, right, bottom, left respectively.

  - **`borderColor`** `string | [string, string, string, string]`
    If the border option is set to true, this option can be used to specify the color of the border. An array of 4 strings can be provided to specify the color for each side of the row, top, right, bottom, left respectively. See [Colors](#colors).

  - **`borderStyle`** `string | [string, string, string, string]`
    If the border option is set to true, this option can be used to specify the style of the border. An array of 4 BorderStyle values can be provided to specify the style for each side of the row, top, right, bottom, left respectively. See [BorderStyle](#borderstyle)

  - **`color`** `string`
    The color of all text in the row. See [Colors](#colors).

  - **`padding`** `number | [number, number, number, number]`
    The padding around the whole row. An array of 4 numbers can be provided to specify the padding for each side of the row, top, right, bottom, left respectively.

  - **`style`** `bold | italic | underline | inverse | strikethrough | (bold | italic | underline | inverse | strikethrough)[]`
    The style of all text in the row or an array of a combination of styles.

  - **`verticalAlign`** `top | middle | bottom`
    The vertical alignment each block in the row.

  - **`blocks`** `Object[]`
    An array of object describing the blocks in the row.

    - **`align`** `left | center | right | justify`
      The alignment of the block.

    - **`backgroundColor`** `string`
      The background color of the block. See [Colors](#colors).

    - **`backgroundFill`** `word' | text | fill | all`
      The background fill of the block. `word` will fill the background of each word, `text` will fill the background of the whole text in the block, `fill` will fill the background of the block except for the padding, `all` will fill the background of the whole block.

    - **`border`** `boolean | [boolean, boolean, boolean, boolean]`
      Whether to render a border around the whole block. An array of 4 booleans can be provided to specify the border for each side of the block, top, right, bottom, left respectively.

    - **`borderColor`** `string | [string, string, string, string]`
      If the border option is set to true, this option can be used to specify the color of the border. An array of 4 strings can be provided to specify the color for each side of the block, top, right, bottom, left respectively. See [Colors](#colors).

    - **`borderStyle`** `string | [string, string, string, string]`
      If the border option is set to true, this option can be used to specify the style of the border. An array of 4 BorderStyle values can be provided to specify the style for each side of the block, top, right, bottom, left respectively. See [BorderStyle](#borderstyle)

    - **`color`** `string`
      The color of all text in the block. See [Colors](#colors).

    - **`height`** `number`
      The height of the block.

    - **`id`** `string`
      The id of the block. Used to later update this single block content and style.

    - **`link`** `string`
      The link of the block. Used to later open the link in the terminal.

    - **`padding`** `number | [number, number, number, number]`
      The padding around the whole block. An array of 4 numbers can be provided to specify the padding for each side of the block, top, right, bottom, left respectively.

    - **`style`** `bold | italic | underline | inverse | strikethrough | (bold | italic | underline | inverse | strikethrough)[]`

    - **`text`** `string`
      The text of the block.

    - **`verticalAlign`** `top | middle | bottom`
      The vertical alignment of the block.

    - **`width`** `number | fit`
      The width of the block if not specified the block width will be calculated based on the document width and how many blocks are in the row. If the value is `fit` the block will take exactly the width of the longest line in th text.

### Instance Properties

#### `result` `string`

The rendered document.

### Instance Methods

#### `render()`

Render the document to a string that can be printed to the terminal. The result will be stored in the `result` property.

#### `update(id: string, block: Object)`

Update a single block content and style and re-render the document.

## BorderStyle

Valid string values for border styles are the following:

- `single`

```
┌──────┐
│      │
└──────┘
```

- `single-round`

```
╭──────╮
│      │
╰──────╯
```

- `thick`

```
┏━━━━━━┓
┃      ┃
┗━━━━━━┛
```

- `double`

```
╔══════╗
║      ║
╚══════╝
```

- `dash-2`

```
┌╌╌╌╌╌╌┐
╎      ╎
└╌╌╌╌╌╌┘
```

- `dash-2-thick`

```
┏╍╍╍╍╍╍┓
╏      ╏
┗╍╍╍╍╍╍┛
```

- `dash-3`

```
┌┄┄┄┄┄┄┐
┆      ┆
└┄┄┄┄┄┄┘
```

- `dash-3-thick`

```
┏┅┅┅┅┅┅┓
┇      ┇
┗┅┅┅┅┅┅┛
```

- `dash-4`

```
┌┈┈┈┈┈┈┈┐
┊       ┊
└┈┈┈┈┈┈┈┘
```

## Colors

Valid string values for colors are the following:

### Reds

| Color Name   | Hexadecimal                     |
| ------------ | ------------------------------- |
| indian-red   | $${\color{indianred}██████}$$   |
| light-coral  | $${\color{lightcoral}██████}$$  |
| salmon       | $${\color{salmon}██████}$$      |
| dark-salmon  | $${\color{darksalmon}██████}$$  |
| light-salmon | $${\color{lightsalmon}██████}$$ |
| crimson      | $${\color{crimson}██████}$$     |
| red          | $${\color{red}██████}$$         |
| fire-brick   | $${\color{firebrick}██████}$$   |
| dark-red     | $${\color{darkred}██████}$$     |

### Pinks

| Color Name        | Hexadecimal                         |
| ----------------- | ----------------------------------- |
| pink              | $${\color{pink}██████}$$            |
| light-pink        | $${\color{lightpink}██████}$$       |
| hot-pink          | $${\color{hotpink}██████}$$         |
| deep-pink         | $${\color{deeppink}██████}$$        |
| medium-violet-red | $${\color{mediumvioletred}██████}$$ |
| pale-violet-red   | $${\color{palevioletred}██████}$$   |

### Oranges

| Color Name   | Hexadecimal                     |
| ------------ | ------------------------------- |
| light-salmon | $${\color{lightsalmon}██████}$$ |
| coral        | $${\color{coral}██████}$$       |
| tomato       | $${\color{tomato}██████}$$      |
| orange-red   | $${\color{orangered}██████}$$   |
| dark-orange  | $${\color{darkorange}██████}$$  |
| orange       | $${\color{orange}██████}$$      |

### Yellows

| Color Name             | Hexadecimal                              |
| ---------------------- | ---------------------------------------- |
| gold                   | $${\color{gold}██████}$$                 |
| yellow                 | $${\color{yellow}██████}$$               |
| light-yellow           | $${\color{lightyellow}██████}$$          |
| lemon-chiffon          | $${\color{lemonchiffon}██████}$$         |
| light-goldenrod-yellow | $${\color{lightgoldenrodyellow}██████}$$ |
| papaya-whip            | $${\color{papayawhip}██████}$$           |
| moccasin               | $${\color{moccasin}██████}$$             |
| peach-puff             | $${\color{peachpuff}██████}$$            |
| pale-goldenrod         | $${\color{palegoldenrod}██████}$$        |
| khaki                  | $${\color{khaki}██████}$$                |
| dark-khaki             | $${\color{darkkhaki}██████}$$            |

### Purples

| Color Name        | Hexadecimal                         |
| ----------------- | ----------------------------------- |
| lavender          | $${\color{lavender}██████}$$        |
| thistle           | $${\color{thistle}██████}$$         |
| plum              | $${\color{plum}██████}$$            |
| violet            | $${\color{violet}██████}$$          |
| orchid            | $${\color{orchid}██████}$$          |
| fuchsia           | $${\color{fuchsia}██████}$$         |
| magenta           | $${\color{magenta}██████}$$         |
| medium-orchid     | $${\color{mediumorchid}██████}$$    |
| medium-purple     | $${\color{mediumpurple}██████}$$    |
| rebecca-purple    | $${\color{rebeccapurple}██████}$$   |
| blue-violet       | $${\color{blueviolet}██████}$$      |
| dark-violet       | $${\color{darkviolet}██████}$$      |
| dark-orchid       | $${\color{darkorchid}██████}$$      |
| dark-magenta      | $${\color{darkmagenta}██████}$$     |
| purple            | $${\color{purple}██████}$$          |
| indigo            | $${\color{indigo}██████}$$          |
| slate-blue        | $${\color{slateblue}██████}$$       |
| dark-slate-blue   | $${\color{darkslateblue}██████}$$   |
| medium-slate-blue | $${\color{mediumslateblue}██████}$$ |

### Greens

| Color Name          | Hexadecimal                           |
| ------------------- | ------------------------------------- |
| green-yellow        | $${\color{greenyellow}██████}$$       |
| chartreuse          | $${\color{chartreuse}██████}$$        |
| lawn-green          | $${\color{lawngreen}██████}$$         |
| lime                | $${\color{lime}██████}$$              |
| lime-green          | $${\color{limegreen}██████}$$         |
| pale-green          | $${\color{palegreen}██████}$$         |
| light-green         | $${\color{lightgreen}██████}$$        |
| medium-spring-green | $${\color{mediumspringgreen}██████}$$ |
| spring-green        | $${\color{springgreen}██████}$$       |
| medium-sea-green    | $${\color{mediumseagreen}██████}$$    |
| sea-green           | $${\color{seagreen}██████}$$          |
| forest-green        | $${\color{forestgreen}██████}$$       |
| green               | $${\color{green}██████}$$             |
| dark-green          | $${\color{darkgreen}██████}$$         |
| yellow-green        | $${\color{yellowgreen}██████}$$       |
| olive-drab          | $${\color{olivedrab}██████}$$         |
| olive               | $${\color{olive}██████}$$             |
| dark-olive-green    | $${\color{darkolivegreen}██████}$$    |
| medium-aquamarine   | $${\color{mediumaquamarine}██████}$$  |
| dark-sea-green      | $${\color{darkseagreen}██████}$$      |
| light-sea-green     | $${\color{lightseagreen}██████}$$     |
| dark-cyan           | $${\color{darkcyan}██████}$$          |
| teal                | $${\color{teal}██████}$$              |

### Blues

| Color Name        | Hexadecimal                         |
| ----------------- | ----------------------------------- |
| aqua              | $${\color{aqua}██████}$$            |
| cyan              | $${\color{cyan}██████}$$            |
| light-cyan        | $${\color{lightcyan}██████}$$       |
| pale-turquoise    | $${\color{paleturquoise}██████}$$   |
| aquamarine        | $${\color{aquamarine}██████}$$      |
| turquoise         | $${\color{turquoise}██████}$$       |
| medium-turquoise  | $${\color{mediumturquoise}██████}$$ |
| dark-turquoise    | $${\color{darkturquoise}██████}$$   |
| cadet-blue        | $${\color{cadetblue}██████}$$       |
| steel-blue        | $${\color{steelblue}██████}$$       |
| light-steel-blue  | $${\color{lightsteelblue}██████}$$  |
| powder-blue       | $${\color{powderblue}██████}$$      |
| light-blue        | $${\color{lightblue}██████}$$       |
| sky-blue          | $${\color{skyblue}██████}$$         |
| light-sky-blue    | $${\color{lightskyblue}██████}$$    |
| deep-sky-blue     | $${\color{deepskyblue}██████}$$     |
| dodger-blue       | $${\color{dodgerblue}██████}$$      |
| cornflower-blue   | $${\color{cornflowerblue}██████}$$  |
| medium-slate-blue | $${\color{mediumslateblue}██████}$$ |
| royal-blue        | $${\color{royalblue}██████}$$       |
| blue              | $${\color{blue}██████}$$            |
| medium-blue       | $${\color{mediumblue}██████}$$      |
| dark-blue         | $${\color{darkblue}██████}$$        |
| navy              | $${\color{navy}██████}$$            |
| midnight-blue     | $${\color{midnightblue}██████}$$    |

### Browns

| Color Name      | Hexadecimal                        |
| --------------- | ---------------------------------- |
| cornsilk        | $${\color{cornsilk}██████}$$       |
| blanched-almond | $${\color{blanchedalmond}██████}$$ |
| bisque          | $${\color{bisque}██████}$$         |
| navajo-white    | $${\color{navajowhite}██████}$$    |
| wheat           | $${\color{wheat}██████}$$          |
| burly-wood      | $${\color{burlywood}██████}$$      |
| tan             | $${\color{tan}██████}$$            |
| rosy-brown      | $${\color{rosybrown}██████}$$      |
| sandy-brown     | $${\color{sandybrown}██████}$$     |
| goldenrod       | $${\color{goldenrod}██████}$$      |
| dark-goldenrod  | $${\color{darkgoldenrod}██████}$$  |
| peru            | $${\color{peru}██████}$$           |
| chocolate       | $${\color{chocolate}██████}$$      |
| saddle-brown    | $${\color{saddlebrown}██████}$$    |
| sienna          | $${\color{sienna}██████}$$         |
| brown           | $${\color{brown}██████}$$          |
| maroon          | $${\color{maroon}██████}$$         |

### Whites

| Color Name     | Hexadecimal                       |
| -------------- | --------------------------------- |
| white          | $${\color{white}██████}$$         |
| snow           | $${\color{snow}██████}$$          |
| honeydew       | $${\color{honeydew}██████}$$      |
| mint-cream     | $${\color{mintcream}██████}$$     |
| azure          | $${\color{azure}██████}$$         |
| alice-blue     | $${\color{aliceblue}██████}$$     |
| ghost-white    | $${\color{ghostwhite}██████}$$    |
| white-smoke    | $${\color{whitesmoke}██████}$$    |
| seashell       | $${\color{seashell}██████}$$      |
| beige          | $${\color{beige}██████}$$         |
| old-lace       | $${\color{oldlace}██████}$$       |
| floral-white   | $${\color{floralwhite}██████}$$   |
| ivory          | $${\color{ivory}██████}$$         |
| antique-white  | $${\color{antiquewhite}██████}$$  |
| linen          | $${\color{linen}██████}$$         |
| lavender-blush | $${\color{lavenderblush}██████}$$ |
| misty-rose     | $${\color{mistyrose}██████}$$     |

### Grays

| Color Name       | Hexadecimal                        |
| ---------------- | ---------------------------------- |
| gainsboro        | $${\color{gainsboro}██████}$$      |
| light-gray       | $${\color{lightgray}██████}$$      |
| silver           | $${\color{silver}██████}$$         |
| dark-gray        | $${\color{darkgray}██████}$$       |
| gray             | $${\color{gray}██████}$$           |
| dim-gray         | $${\color{dimgray}██████}$$        |
| light-slate-gray | $${\color{lightslategray}██████}$$ |
| slate-gray       | $${\color{slategray}██████}$$      |
| dark-slate-gray  | $${\color{darkslategray}██████}$$  |
| black            | $${\color{black}██████}$$          |

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).

```

```
