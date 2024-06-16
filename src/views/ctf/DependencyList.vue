<script setup lang="ts">
import ctfs from '@/ctfs/all-ctfs';
import { computed } from 'vue';

const props = defineProps<{ dependencies: string[] }>();

type PathAndName = [string, string];
const restAndLast = computed<[rest: PathAndName[], last: PathAndName | undefined]>(() => {
  const pathAndNames = props.dependencies.map<PathAndName>(d => [`#/ctf/${d}`, ctfs[d].name]);
  if (pathAndNames.length > 1) return [pathAndNames.slice(0, -1), pathAndNames.at(-1)];
  return [pathAndNames, undefined];
});
</script>

<template>
  <b class="pl-1">Note:</b> You should probably solve
  <template v-for="(d, i) in restAndLast[0]" :key="d[0]">
    <template v-if="i > 0">, </template>
    <a :href="d[0]" target="_blank">{{ d[1] }}</a> </template
  ><template v-if="restAndLast[1]">
    and <a :href="restAndLast[1][0]" target="_blank">{{ restAndLast[1][1] }}</a>
  </template>
  first.
</template>
