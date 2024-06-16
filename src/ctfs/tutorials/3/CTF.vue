<script setup lang="ts">
import SudokuBoard from '@/components/SudokuBoard.vue';
</script>

<template>
  <SudokuBoard board="000000000785340000004287560000718630867005002051900708623000109400091026500623080">
    <template #left><code>body{</code></template>
    <template #right><code>}</code></template>
  </SudokuBoard>
</template>

<style scoped>
code {
  font-size: min(2.3em, 5vw);
}
</style>
