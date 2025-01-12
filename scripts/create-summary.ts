import { SummarizerManager } from 'node-summarizer';
import fs from 'node:fs';

function stripFormatting(text: string): string {
  text = text.replace(/<[^>]*?>/g, ''); // remove HTML tags
  text = text.replace(/[*_`~]/g, ''); // remove markdown formatting
  text = text.replace(/^\s*>\s*/gm, ''); // remove blockquotes
  text = text.replace('...', ''); // remove ellipsis
  text = text.replace(/(.*?[^.!?\s])\s*\n{2,}(?=[^a-z])/gm, '$1.\n'); // add periods to end of sentences
  return text;
}

function createSummary(text: string): string {
  const summarizer = new SummarizerManager(stripFormatting(text), 1);
  return summarizer.getSummaryByFrequency().summary.replace(/\s+/g, ' ');
}

fs.glob('src/ctfs/**/description.md', (err, paths) => {
  if (err) {
    console.error('Error while finding files:', err);
    process.exit(1);
  }

  for (const path of paths) {
    const detailsPath = path.replace('description.md', 'details.json');
    const details = JSON.parse(fs.readFileSync(detailsPath, 'utf-8')) as { summary?: string };
    if (!('summary' in details) || fs.lstatSync(path).mtimeMs > fs.lstatSync(detailsPath).mtimeMs) {
      console.log(`Processing file ${path}...`);
      details.summary = createSummary(fs.readFileSync(path, 'utf-8'));
      fs.writeFileSync(detailsPath, JSON.stringify(details, null, 2), 'utf-8');
    } else console.log(`Skipped file ${path}.`);
  }
});
