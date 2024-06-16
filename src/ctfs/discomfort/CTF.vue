<script setup lang="ts">
import SudokuBoard from '@/components/SudokuBoard.vue';
</script>

<template>
  <SudokuBoard board="800000000090000000001020000000200000075000980000004000000010500000040060000000007">
    <template #left><code>{</code></template>
    <template #right>
      <div class="a">0<v-icon icon="mdi-arrow-bottom-left" /></div>
      <code>}</code>
    </template>
  </SudokuBoard>
</template>

<style scoped>
div:not(.a) {
  position: relative;
  margin-top: 3rem;
  margin-right: 2rem;
}
.a,
code {
  font-size: min(2.3em, 5vw);
}
.a {
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  .v-icon {
    position: absolute;
    bottom: -0.25rem;
    left: -0.25rem;
    font-size: 1em;
  }
}
code {
  position: relative;
  top: 34%;
}
</style>
