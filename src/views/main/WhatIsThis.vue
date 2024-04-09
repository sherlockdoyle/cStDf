<script setup lang="ts">
import { ref } from 'vue';

const showDialog = ref(false);
</script>

<template>
  <v-btn color="info" density="compact" size="x-large" icon="mdi-help" @click="showDialog = true" />

  <v-dialog v-model="showDialog" max-width="512">
    <v-card title="What is this?">
      <v-card-text>
        <p>
          Wikipedia describes Capture the Flag, or CTF, as an activity where participants try to locate hidden text
          strings, known as "flags". These flags are concealed within programs or websites that are intentionally made
          vulnerable.
        </p>
        <p>
          Here you've a set of challenges that fall loosely under this category of CTF. These challenges might not fit
          the traditional definition of CTF. In fact, it might be more accurate to describe them as a series of puzzles
          or riddles. The objective of these challenges is to find a hidden string, also referred to as a flag, within
          various files. Alternatively, you might also be tasked with decoding something.
        </p>
        <br />
        <p>
          In essence, <code>cStDf</code> is more akin to a game. It is a collection of various unique ideas that have
          crossed my mind about hiding things. You might need to refer to some of my other projects to solve these
          challenges. But then again, you might not need to.
        </p>
        <p>
          You're also free to use other tools at your disposal. The only rule is to play fair and avoid cheating. After
          all, the real fun lies in solving the puzzles on your own. Enjoy the game! :)
        </p>

        <v-alert icon="$info" color="info" variant="tonal">
          Except the first four tutorials, the puzzles are in no particular order.
        </v-alert>
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
