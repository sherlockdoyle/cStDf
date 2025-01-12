declare module 'node-summarizer' {
  export class SummarizerManager {
    constructor(text: string, maxSentences: number);
    getSummaryByFrequency(): { summary: string };
  }
}
