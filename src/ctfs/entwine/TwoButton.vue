<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';

const MIN_NUMS_REQUIRED = 3;

const props = defineProps<{ k: string; o: string; f: string }>();

function localStorageRef(key: string): Ref<string> {
  const seqRef = ref(localStorage.getItem(key) ?? '');
  watch(seqRef, newVal => localStorage.setItem(key, newVal));
  return seqRef;
}

const selfSeq = localStorageRef(props.k),
  otherSeq = localStorageRef(props.o);

onMounted(() => {
  if (selfSeq.value.length >= MIN_NUMS_REQUIRED && otherSeq.value.length >= MIN_NUMS_REQUIRED) {
    if (selfSeq.value === otherSeq.value)
      document.getElementsByClassName('markdown-body')[0].children[0].append(` My flag is not ${props.f}.`);
    else selfSeq.value = otherSeq.value = '';
    return;
  }
  if (selfSeq.value.length < MIN_NUMS_REQUIRED) selfSeq.value = '';
  if (otherSeq.value.length < MIN_NUMS_REQUIRED) otherSeq.value = '';
});
</script>

<template>
  <div class="d-flex flex-column align-center ga-2 text-h3 justify-center">
    <div class="text-h2">{{ Math.max(0, MIN_NUMS_REQUIRED - selfSeq.length) }}</div>
    <div class="d-flex align-center ga-4 pa-6 flex-row justify-center">
      <button @click="selfSeq += '0'">0</button>
      <button @click="selfSeq += '1'">1</button>
    </div>
    <div class="w-100 d-flex text-caption justify-end">
      <button @click="selfSeq = otherSeq = ''">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.pa-6 button {
  transition: all 0.1s ease-in-out;
  border: 2px solid currentColor;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px #fff8;
  }
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    box-shadow: 0 0 0 3px #fff8;
  }

  &:first-child {
    background-color: black;
    color: white;
    &:hover {
      background-color: #111;
    }
    &:active {
      background-color: #222;
    }
  }

  &:last-child {
    background-color: white;
    color: black;
    &:hover {
      background-color: #eee;
    }
    &:active {
      background-color: #ddd;
    }
  }
}
</style>
