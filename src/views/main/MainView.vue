<script setup lang="ts">
import HeadingAction from '@/components/HeadingAction.vue';
import ctfs from '@/ctfs/all-ctfs';
import { getAllSolved } from '@/storage/solved';
import { computed, ref } from 'vue';
import SummaryCard from './SummaryCard.vue';

const arrangedCtfEntries = computed(() => {
  const ctfEntries = Object.entries(ctfs);
  type Entry = (typeof ctfEntries)[number];
  const tutorials = Array<Entry>(),
    rest = Array<Entry>();
  for (const entry of ctfEntries) {
    if (entry[0].startsWith('tutorials/')) tutorials.push(entry);
    else rest.push(entry);
  }
  return tutorials.sort((a, b) => a[0].localeCompare(b[0])).concat(rest);
});
const solved = getAllSolved();

const deferSolved = ref(true);
const sortedCtfs = computed(() => {
  if (deferSolved.value)
    return [...arrangedCtfEntries.value].sort((a, b) => Number(solved.has(a[0])) - Number(solved.has(b[0])));
  return arrangedCtfEntries.value;
});
</script>

<template>
  <HeadingAction title="Click, Solve!">
    <v-checkbox v-model="deferSolved" label="Defer Solved" density="compact" hide-details />
  </HeadingAction>

  <v-alert
    v-if="arrangedCtfEntries.length === solved.size"
    color="info"
    variant="outlined"
    max-width="512"
    class="mx-auto mb-4"
  >
    Please keep checking. I plan to add more puzzles.
  </v-alert>
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
