<script setup lang="ts">
import SudokuBoard from '@/components/SudokuBoard.vue';
</script>

<template>
  <div class="f">
    <code>frog{</code>
    <SudokuBoard board="000000000785340000004287560000718630867005002051900708623000109400091026500623080" />
    <code>}</code>
  </div>
</template>

<style scoped>
.f {
  display: flex;
  code {
    font-size: 5vw;
    line-height: 7.5vw;
  }
}
</style>
