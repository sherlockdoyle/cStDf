import { promises as fs } from 'fs';
import glob from 'glob';

function rot(str: string, n: number): string {
  return str.replace(/[a-zA-Z]/g, (chr: string) => {
    const start = chr <= 'Z' ? 65 : 97;
    return String.fromCharCode(start + ((chr.charCodeAt(0) - start + n) % 26));
  });
}

function rewrite(content: string) {
  const lines = content.split('\n\n').map(line => line.trim());
  let numLines = lines.length;
  if (lines[numLines - 1].startsWith('The flag is: ')) {
    lines[numLines - 1] = btoa(lines[numLines - 1]);
    --numLines;
  }
  const shifts = Array.from({ length: 25 }, (_, i) => i + 1)
    .filter(n => n !== 13)
    .sort(() => Math.random() - 0.5);
  shifts.unshift(13);
  for (let i = 1; i < numLines; ++i) {
    lines[i] = rot(lines[i], shifts[i - 1]);
  }
  return lines.join('\n\n').split('').reverse().join('');
}

glob('src/ctfs/**/Sol.md', async (err, files) => {
  if (err) {
    console.error('Error while finding files:', err);
    return;
  }

  for (const file of files) {
    try {
      console.log(`Processing file ${file}...`);
      const content = await fs.readFile(file, 'utf-8');
      await fs.writeFile(file.replace('Sol.md', 'solution.md'), rewrite(content), 'utf-8');
    } catch (err) {
      console.error(`Error processing file ${file}:`, err);
    }
  }
});
