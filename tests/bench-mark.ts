import { startMeasurement } from '@universal-packages/time-measurer'

import { TerminalDocument } from '../src'
import { FORMATTED_DOC } from './__fixtures__/formatted-doc'

const terminalDocument = new TerminalDocument(FORMATTED_DOC)

let measurer = startMeasurement()

for (let i = 0; i < 60; i++) {
  terminalDocument.update()
}

console.log('60 Renders: ' + measurer.finish().toString())

measurer = startMeasurement()

for (let i = 0; i < 100; i++) {
  terminalDocument.update()
}

console.log('100 Renders: ' + measurer.finish().toString())

measurer = startMeasurement()

for (let i = 0; i < 1000; i++) {
  terminalDocument.update()
}

console.log('1000 Renders: ' + measurer.finish().toString())

measurer = startMeasurement()

for (let i = 0; i < 10000; i++) {
  terminalDocument.update()
}

console.log('10000 Renders: ' + measurer.finish().toString())
