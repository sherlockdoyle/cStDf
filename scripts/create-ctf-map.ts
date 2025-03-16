import fs from 'node:fs';
import path from 'node:path';
import { type Plugin } from 'vite';
import { type CtfType } from '../src/ctfs/ctf-type';

const CTF_PATH = './src/ctfs';

const fileExtToType: Record<string, CtfType> = {
  vue: 'vue',
  png: 'image',
  svg: 'image',
  html: 'html',
  pdf: 'pdf',
  wav: 'audio',
};

function pathToComponentImport(path: string): string {
  return `: defineAsyncComponent({ loader: () => import(${JSON.stringify(path)}), loadingComponent }),`;
}

function createMapFileContent(origFilePath: string): string {
  const originalFileContent = fs.readFileSync(origFilePath, 'utf-8');
  const fileContent = [originalFileContent.split('// END OF TYPES MARKER')[0], 'export default {'];

  fs.globSync(CTF_PATH + '/**/name').forEach(namePath => {
    const dirPath = path.dirname(namePath);
    fileContent.push(`  ${JSON.stringify(path.relative(CTF_PATH, dirPath))}: {`);
    fileContent.push(`    name: ${JSON.stringify(fs.readFileSync(namePath, 'utf-8'))},`);

    fs.readdirSync(dirPath).forEach(fileName => {
      if (fileName === 'name') return;

      const fullPath = path.join(dirPath, fileName).replace('src', '@');
      if (fileName === 'details.json') fileContent.push(`    details: () => import(${JSON.stringify(fullPath)}),`);

      if (fileName === 'description.md') fileContent.push(`    Description${pathToComponentImport(fullPath)}`);

      if (!fileName.startsWith('CTF.')) return;

      const ext = path.extname(fileName).substring(1),
        type = fileExtToType[ext];
      if (!type) throw new Error(`Unknown file extension ${ext}`);

      fileContent.push(`    content: {
      type: '${type}',`);
      if (type === 'vue') fileContent.push(`      component${pathToComponentImport(fullPath)}`);
      else fileContent.push(`      url: () => import(${JSON.stringify(fullPath + '?url')}).then(m => m.default),`);
      fileContent.push(`    },`);
    });

    fileContent.push(`  },`);
  });

  fileContent.push(`} satisfies Record<string, CTF>;`);
  return fileContent.join('\n');
}

export default {
  name: 'create-ctf-map',
  enforce: 'pre',
  apply: 'build',
  load(id) {
    if (id.endsWith('all-ctfs.ts')) return createMapFileContent(id);
  },
} satisfies Plugin;
