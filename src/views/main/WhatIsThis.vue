<script setup lang="ts">
import { ref } from 'vue';

const showDialog = ref(false);
const showHint = ref(false);
</script>

<template>
  <v-btn
    color="info"
    density="compact"
    size="x-large"
    icon="mdi-help"
    title="What is this?"
    @click="
      showDialog = true;
      showHint = false;
    "
  />

  <v-dialog v-model="showDialog" max-width="512">
    <v-card title="What is this?">
      <template v-slot:append>
        <v-btn rounded size="small" @click="showHint = !showHint" />
      </template>

      <v-card-text>
        <p>
          Welcome to the world of <code>cStDf</code>! It's a treasure trove of puzzles, much like a Capture The Flag
          (CTF) game. Your mission, should you choose to accept it, is to hunt for a hidden string, known as a flag.
          This flag could be tucked away in a website, a puzzle, a file, or hidden in a code waiting to be deciphered.
        </p>
        <p>
          Think of this as a game, a playground of random ideas that I've had on how to hide things. It's all in your
          browser! No need to worry about storage or servers. Some of my other projects might give you a leg up in
          solving these challenges, but then again, they might not. Feel free to use any tools you have, but remember,
          there's no need to use the devtools/inspect element unless it's mentioned.
        </p>
        <p>
          The only rule here is to play nice and avoid cheating. After all, the real joy is in cracking the puzzles by
          yourself. So, dive in and have fun!
        </p>

        <v-alert icon="$info" color="info" variant="tonal">
          Except the first four tutorials, the puzzles are in no particular order.
        </v-alert>

        <p v-if="showHint">
          Usually, the name or description of the puzzle will drop a hint or two.
          <br />
          Some online tools for solving substitution ciphers might show the answer in the wrong letter case (upper vs
          lower). The correct case will be given in the description.
        </p>
      </v-card-text>

      <v-card-actions>
        <v-btn text="CLose" @click="showDialog = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card-text p {
  margin: revert;
  padding: revert;
}
.v-card-actions {
  justify-content: end;
}
</style>
