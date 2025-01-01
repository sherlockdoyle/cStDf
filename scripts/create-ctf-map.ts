import glob from 'glob';
import fs from 'node:fs';
import path from 'node:path';
import { Plugin } from 'vite';

const CTF_PATH = './src/ctfs';

type CtfLazyFields = 'details' | 'Description' | 'CtfComponent' | 'htmlUrl' | 'imageUrl' | 'pdfUrl' | 'audioUrl';
const fileExtToField: Record<string, CtfLazyFields> = {
  vue: 'CtfComponent',
  html: 'htmlUrl',
  png: 'imageUrl',
  svg: 'imageUrl',
  pdf: 'pdfUrl',
  wav: 'audioUrl',
};

function createMapFileContent(): string {
  const fileContent = [
    `import loadingComponent from '@/components/LoadingComponent.vue';
import { defineAsyncComponent, type Component } from 'vue';

export interface Details {
  flagMD5: string;
  dependencies?: string[];
}
interface CTF {
  name: string;
  details: () => Promise<Details>;
  Description: Component;
  CtfComponent?: Component;
  htmlUrl?: () => Promise<string>;
  imageUrl?: () => Promise<string>;
  pdfUrl?: () => Promise<string>;
  audioUrl?: () => Promise<string>;
}

export default {`,
  ];

  glob.sync(CTF_PATH + '/**/name').forEach(namePath => {
    const dirPath = path.dirname(namePath);
    fileContent.push(`  ${JSON.stringify(path.relative(CTF_PATH, dirPath))}: {`);
    fileContent.push(`    name: ${JSON.stringify(fs.readFileSync(namePath, 'utf-8'))},`);

    fs.readdirSync(dirPath).forEach(fileName => {
      let field: CtfLazyFields,
        url = false;
      if (fileName === 'details.json') field = 'details';
      else if (fileName === 'description.md') field = 'Description';
      else if (fileName.startsWith('CTF.')) {
        const ext = path.extname(fileName).substring(1);
        field = fileExtToField[ext];
        url = ext !== 'vue';
      } else return;

      let fullPath = path.join(dirPath, fileName).replace('src', '@');
      if (url) fullPath += '?url';
      let importStatement = `() => import(${JSON.stringify(fullPath)})`;
      if (url) importStatement += '.then(m => m.default)';
      if (field === 'Description' || field === 'CtfComponent')
        importStatement = `defineAsyncComponent({ loader: ${importStatement}, loadingComponent })`;

      fileContent.push(`    ${field}: ${importStatement},`);
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
    if (id.endsWith('all-ctfs.ts')) return createMapFileContent();
  },
} satisfies Plugin;
