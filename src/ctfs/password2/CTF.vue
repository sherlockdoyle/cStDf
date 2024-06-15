<script setup lang="ts">
import { ref, watch } from 'vue';

const HINTS = ['Enter password...', 'Password is incorrect!', 'Try again.', 'Try again later.....', 'Correct!'];
const step = ref(0),
  password = ref(''),
  timeout = ref<number>(),
  timeCompleted = ref(false);
watch(step, () => (timeCompleted.value = false));
function check() {
  clearTimeout(timeout.value);
  if (step.value > 3) step.value = 0;
  else if (step.value < 3)
    if (
      password.value ===
      HINTS[step.value]
        .split(' ')
        .at(-1)!
        .replace(/[^a-z]+$/, '')
    ) {
      ++step.value;
      if (step.value === 3)
        timeout.value = window.setTimeout(() => (timeCompleted.value = true), 9999 + (Date.now() % 10000));
    } else step.value = 0;
  else if (step.value === 3)
    if (timeCompleted.value && password.value === HINTS[2 + Math.round(Math.random())].slice(4, 9)) ++step.value;
    else step.value = 0;
}
</script>

<template>
  <v-form @submit.prevent="check">
    <v-row no-gutters>
      <v-col class="d-flex flex-column ga-2">
        <span :class="['align-self-center', step === 4 && 'text-success']">{{
          HINTS[step].slice(0, 9999 - 10000 * (timeCompleted as unknown as number))
        }}</span>
        <v-text-field
          v-model="password"
          autocomplete="off"
          variant="outlined"
          prepend-inner-icon="mdi-lock-outline"
          :color="step === 4 ? 'success' : undefined"
        />
      </v-col>
      <v-col cols="auto">
        <v-btn type="submit" icon="mdi-send" variant="text" :color="step === 4 ? 'success' : 'primary'" class="mt-9" />
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>
.v-form {
  width: min(75vw, 384px);
}
</style>
