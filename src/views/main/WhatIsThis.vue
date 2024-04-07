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
          Capture the Flag, or CTF, is a term you might have heard. Wikipedia describes it as an activity where
          participants try to locate hidden text strings, known as "flags". These flags are concealed within programs or
          websites that are intentionally made vulnerable.
        </p>
        <p>
          This is a set of challenges that fall under this category of CTF. However, it's important to note that these
          challenges might not fit the traditional definition of CTF.
        </p>
        <p>
          In fact, it might be more accurate to describe them as a series of puzzles or riddles. The objective of these
          challenges is to find a hidden string, also referred to as a flag, within various files. Alternatively, you
          might be tasked with decoding something.
        </p>
        <p>
          In essence, <code>cStDf</code> is more akin to a game. It is a collection of various unique ideas that have
          crossed my mind about hiding things. It's possible that you might need to refer to some of my other projects
          to solve these challenges. But then again, you might not need to.
        </p>
        <p>
          You're also free to use other tools at your disposal. The only rule is to play fair and avoid cheating. After
          all, the real fun lies in solving the puzzles on your own. Enjoy the game! :)
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
