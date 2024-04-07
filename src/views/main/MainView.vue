<script setup lang="ts">
import HeadingAction from '@/components/HeadingAction.vue';
import ctfs from '@/ctfs/all-ctfs';
import { getAllSolved } from '@/storage/solved';
import { computed, ref } from 'vue';
import SummaryCard from './SummaryCard.vue';

const solved = getAllSolved();

const deferSolved = ref(true);
const sortedCtfs = computed(() => {
  const ctfEntries = Object.entries(ctfs);
  if (deferSolved.value) ctfEntries.sort((a, b) => Number(solved.has(a[0])) - Number(solved.has(b[0])));
  return ctfEntries;
});
</script>

<template>
  <HeadingAction title="Click, Solve!">
    <v-checkbox v-model="deferSolved" label="Defer Solved" density="compact" hide-details />
  </HeadingAction>

  <div class="grid">
    <SummaryCard
      v-for="[path, { name }] in sortedCtfs"
      :key="path"
      :name="name"
      :visited="true"
      :solved="solved.has(path)"
      :to="`/ctf/${path}`"
    ></SummaryCard>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(272px, 1fr));
  gap: 1rem;
}

.summary {
  color: inherit;
  text-decoration: none;
}
</style>
