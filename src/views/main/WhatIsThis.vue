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
          Get ready for a fun puzzle game called <strong>cStDf</strong> where you'll use your brain to hunt for hidden
          treasures. Each puzzle is like a mini-adventure with clues that will lead you to a secret word or phrase. We
          call this the <em>"flag"</em>.
        </p>
        <p>
          Some puzzles might come with files where the flag is hiding. It could be tucked away in a picture, hidden in
          some text, encoded in a website, or even buried in the file itself. You'll need to be clever to find it!
        </p>
        <p>
          I've used lots of cool ideas I've had about hiding things to make these puzzles tricky and fun. And here's a
          hint: some of my other projects might give you tools or tricks to help solve certain puzzles. So keep your
          eyes open and your mind sharp!
        </p>
        <p>
          The only rule here is to play nice and avoid cheating. After all, the real joy is in cracking the puzzles by
          yourself.
        </p>
        <p><strong>Are you ready to start the hunt and find all the flags in cStDf? Let's go!</strong></p>

        <v-alert icon="$info" color="info" variant="tonal">
          Except the first four tutorials, the puzzles are in no particular order.
        </v-alert>

        <p>
          <small>
            cStDf is completely client-side. There's no server, tracking, analytics, or any such things. Your gameplay
            is private and local to your device.
          </small>
        </p>

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
