import opentype from 'opentype.js';
import fs from 'fs';
import path from 'path';

const fontPath = path.resolve('public/assets/fonts/laren-modern-demo.regular.otf');
const fontBuffer = fs.readFileSync(fontPath);
const arrayBuffer = fontBuffer.buffer.slice(fontBuffer.byteOffset, fontBuffer.byteOffset + fontBuffer.byteLength);
const font = opentype.parse(arrayBuffer);

console.log('Font family:', font.names.fontFamily);

const pathSanu = font.getPath('Sanu', 0, 24, 22);
console.log('--- SANU_PATH ---');
console.log(pathSanu.toPathData(2));

const widthSanu = font.getAdvanceWidth('Sanu', 22);
console.log('Width Sanu:', widthSanu);

const pathKhan = font.getPath('Khan', widthSanu + 4, 24, 22);
console.log('--- KHAN_PATH ---');
console.log(pathKhan.toPathData(2));

const widthKhan = font.getAdvanceWidth('Khan', 22);
console.log('Width Khan:', widthKhan);

const pathDev = font.getPath('.dev', widthSanu + 4 + widthKhan + 3, 24, 17);
console.log('--- DEV_PATH ---');
console.log(pathDev.toPathData(2));

const pathFull = font.getPath('SanuKhan.dev', 0, 24, 22);
console.log('--- FULL_PATH ---');
console.log(pathFull.toPathData(2));

console.log('Full advance width:', font.getAdvanceWidth('SanuKhan.dev', 22));
