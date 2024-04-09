export type Message = [message: string, negative: string, positive: string];

const messages: Message[] = [
  ['Are you sure you want to see the solution?', 'No', 'Yes'],
  [
    "Are you really sure you want to see the solution? You won't get a cookie for it!",
    "Wait, there's a cookie?",
    "I don't need a cookie, show me the solution!",
  ],
  ['Ready to peek?', 'Not yet!', 'Absolutely!'],
  ['Ready to unveil the mystery?', 'Let me ponder a bit more.', 'Unveil away!'],
  ['Are you ready to see the solution?', 'No', 'Yes'],
  [
    'Do you really want to see the solution, or are you just clicking buttons for fun?',
    'Oops, my finger slipped!',
    'Just show me the solution already!',
  ],
  ['Unveil the answer?', 'No, thanks!', 'Yes, please!'],
  ['Eager to discover the truth?', "A little suspense won't hurt.", "Can't wait, show me!"],
  ['Are you absolutely sure you want to see the solution?', 'No', 'Yes'],
  [
    'Are you sure you want to see the solution? It might be too awesome to handle!',
    "Hmm, maybe I'm not that awesome...",
    'I was born ready, bring it on!',
  ],
  ['Reveal the secret?', 'Hold on!', 'Go ahead!'],
  ['Want to decode the enigma?', 'I enjoy the thrill of the unknown.', 'Yes, decode it now!'],
  ["Don't you want to try yourself once again?", 'Yes, let me try', 'Nope, just show me the solution'],
  [
    'Do you want to see the solution, or do you want to keep the mystery alive?',
    "I love a good mystery, I'll pass!",
    'Mystery, schmystery! Show me the solution!',
  ],
  ['Show the magic?', 'Wait a bit!', 'Sure thing!'],
  ['Excited to reveal the secret?', 'I love a good secret.', 'Absolutely, reveal it!'],
  ['Think again before seeing the soluton?', 'Let me think', "Can't think any more"],
  [
    "Are you sure you want to see the solution? There's no turning back!",
    'Danger? Where?! Maybe later...',
    'I laugh in the face of danger! Show me!',
  ],
  ['Discover the truth?', 'Maybe later!', 'Right now!'],
  ['Keen to solve the puzzle?', "I'm enjoying the challenge.", 'Yes, solve it now!'],
];
let i = 0;
export default function useMessage() {
  if (i >= messages.length) {
    messages.sort(() => Math.random() - 0.5);
    i = 0;
  }
  return messages[i++];
}
