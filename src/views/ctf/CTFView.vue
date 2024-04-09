<script setup lang="ts">
import HeadingAction from '@/components/HeadingAction.vue';
import ctfs from '@/ctfs/all-ctfs';
import { addSolved } from '@/storage/solved';
import SparkMD5 from 'spark-md5';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import SolutionButton from './SolutionButton.vue';
import SolvedAnimationOverlay from './SolvedAnimationOverlay.vue';
import useAsyncLoader from './async-loader';

const path = useRoute().params.path as string;
const ctf = ctfs[path];

const details = useAsyncLoader(ctf.details, path);
const { Description, CtfComponent } = ctf;

const flagInput = ref(''),
  isValid = ref(false),
  solveStatus = ref('primary'),
  showSolved = ref(false);
const flagInputRules = [
  (v: string) => !!v || 'Flag is required!',
  (v: string) => /cStDf\{[a-zA-Z0-9_]+\}/.test(v) || 'Format of flag is incorrect.',
];
function checkFlag() {
  if (isValid.value) {
    const inputHash = SparkMD5.hash(flagInput.value);
    console.log(inputHash, flagInput.value);
    if (inputHash === details.value.data?.flagMD5) {
      solveStatus.value = 'success';
      addSolved(path);
      showSolved.value = true;
      setTimeout(() => (showSolved.value = false), 4000);
    } else {
      solveStatus.value = 'error';
    }
  }
}
</script>

<template>
  <v-layout v-if="details.loading" class="justify-center">
    <v-progress-circular indeterminate />
  </v-layout>

  <v-alert v-else-if="details.error" color="error" icon="$error">{{ details.error }}</v-alert>

  <template v-else>
    <HeadingAction :title="ctf.name">
      <SolutionButton :path="path" />
    </HeadingAction>
    <Description />
    <hr style="width: 75%" />

    <v-responsive max-width="512" class="mx-auto">
      <v-form v-model="isValid" @submit.prevent="checkFlag">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Flag"
                v-model="flagInput"
                :rules="flagInputRules"
                class="flag-input"
                autocomplete="off"
                clearable
                variant="solo"
                rounded
              />
            </v-col>
          </v-row>
          <v-row align="center" justify="space-between" no-gutters class="ga-6 mt-1">
            <v-col>
              <v-alert
                v-if="solveStatus === 'error'"
                color="error"
                variant="tonal"
                density="compact"
                text="Flag is incorrect."
              />
            </v-col>
            <v-col cols="auto">
              <v-btn type="submit" :color="solveStatus" prepend-icon="mdi-check" text="Check" size="large" rounded />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-responsive>

    <hr style="margin-left: auto; width: 75%" />
    <v-card class="d-flex align-center mx-2 my-4 overflow-x-auto">
      <v-card-item v-if="CtfComponent" class="d-block flex-0-1 mx-auto">
        <CtfComponent />
      </v-card-item>
    </v-card>

    <SolvedAnimationOverlay :visible="showSolved" />
  </template>
</template>

<style scoped>
.v-card::before {
  display: block;
  float: left;
  padding-top: 100%;
  content: '';
}
</style>
<style>
.markdown-body {
  padding: 0 0.5rem;
  * {
    margin: revert;
    padding: revert;
    text-align: justify;
  }
}

.flag-input input {
  font-family: monospace;
}
</style>
