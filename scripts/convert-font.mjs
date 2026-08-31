import fs from 'fs';
import path from 'path';

const fontPath = path.resolve('public/assets/fonts/laren-modern-demo.regular.otf');
console.log('Font exists:', fs.existsSync(fontPath));
