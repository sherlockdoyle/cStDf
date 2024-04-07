<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ path: string }>();

const messages: [message: string, negative: string, positive: string][] = [
  ['Are you sure you want to see the solution?', 'No', 'Yes'],
  [
    "Are you sure you want to see the solution? You won't get a cookie for it!",
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
function getMessage() {
  if (i >= messages.length) {
    messages.sort(() => Math.random() - 0.5);
    i = 0;
  }
  return messages[i++];
}

const showDialog = ref(false);
const message = ref(messages[0]);
const showSolution = ref(false);
function openDialog() {
  showSolution.value = false;
  message.value = getMessage();
  showDialog.value = true;
}
function closeDialog() {
  showSolution.value = false;
  showDialog.value = false;
}
function askAgain() {
  message.value = getMessage();
  showSolution.value = Math.random() < 0.25;
}
</script>

<template>
  <v-btn text="See solution" variant="plain" @click="openDialog" />

  <v-dialog v-model="showDialog" max-width="512">
    <v-card title="Confirm" :text="message[0]">
      <v-card-actions>
        <v-btn :text="message[1]" @click="closeDialog" color="error" variant="flat" />
        <v-btn
          v-if="showSolution"
          :text="message[2]"
          :href="`https://github.com/sherlockdoyle/cStDf/blob/main/src/ctfs/${props.path}/solution.md`"
          target="_blank"
          @click="closeDialog"
          color="success"
          variant="flat"
        />
        <v-btn v-else :text="message[2]" @click="askAgain" @long-click="closeDialog" color="success" variant="flat" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card-actions {
  flex-wrap: wrap;
  justify-content: end;
  gap: 0.5rem;

  .v-btn {
    margin-inline-start: 0 !important;
  }
}
</style>
<style>
.v-card-actions .v-btn .v-btn__content {
  text-align: center;
  white-space: unset;
}
</style>
