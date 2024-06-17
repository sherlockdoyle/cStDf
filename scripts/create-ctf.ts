import * as fs from 'fs';
import * as path from 'path';

const dirPath = process.argv[2];
if (!dirPath) {
  console.log('Please provide a directory path.');
  process.exit(1);
}

const fullPath = path.join('./src/ctfs', dirPath);
const name = dirPath
  .split('/')
  .pop()!
  .replace(/-/g, ' ')
  .replace(/_/g, ' ')
  .replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());

fs.mkdirSync(fullPath, { recursive: true });
fs.writeFileSync(path.join(fullPath, 'name'), name);
fs.writeFileSync(path.join(fullPath, 'description.md'), '');
fs.writeFileSync(
  path.join(fullPath, 'details.json'),
  `{
  "flagMD5": ""
}
`,
);
fs.writeFileSync(
  path.join(fullPath, 'CTF.vue'),
  `<template>

</template>`,
);
fs.writeFileSync(
  path.join(fullPath, 'Sol.md'),
  `

The flag is: cStDf{}`,
);

console.log(`Created CTF at ${fullPath}.`);
