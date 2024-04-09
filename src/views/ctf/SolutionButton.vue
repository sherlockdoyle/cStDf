<script setup lang="ts">
import { ref } from 'vue';
import useMessage, { type Message } from './message';

const props = defineProps<{ path: string }>();

const showDialog = ref(false);
const message = ref<Message>(['', '', '']);
const showSolution = ref(false);
function openDialog() {
  showSolution.value = false;
  message.value = useMessage();
  showDialog.value = true;
}
function closeDialog() {
  showSolution.value = false;
  showDialog.value = false;
}
function askAgain() {
  message.value = useMessage();
  showSolution.value = Math.random() < 0.25;
}
</script>

<template>
  <v-btn text="See solution" variant="plain" @click="openDialog" />

  <v-dialog v-model="showDialog" max-width="512">
    <v-card title="Confirm" :text="message[0]">
      <v-card-actions>
        <v-btn :text="message[1]" @click="closeDialog" color="error" variant="flat" />
        <v-btn
          v-if="showSolution"
          :text="message[2]"
          :href="`https://github.com/sherlockdoyle/cStDf/blob/main/src/ctfs/${props.path}/solution.md`"
          target="_blank"
          @click="closeDialog"
          color="success"
          variant="flat"
        />
        <v-btn v-else :text="message[2]" @click="askAgain" @long-click="closeDialog" color="success" variant="flat" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card-actions {
  flex-wrap: wrap;
  justify-content: end;
  gap: 0.5rem;

  .v-btn {
    margin-inline-start: 0 !important;
  }
}
</style>
<style>
.v-card-actions .v-btn .v-btn__content {
  text-align: center;
  white-space: unset;
}
</style>
