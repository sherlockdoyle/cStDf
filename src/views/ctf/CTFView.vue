<script setup lang="ts">
import HeadingAction from '@/components/HeadingAction.vue';
import ctfs, { type Details } from '@/ctfs/all-ctfs';
import { addSolved } from '@/storage/solved';
import SparkMD5 from 'spark-md5';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SolutionButton from './SolutionButton.vue';
import SolvedAnimationOverlay from './SolvedAnimationOverlay.vue';

interface DataLoading {
  loading: true;
  error: null;
  data: null;
}
interface DataError {
  loading: false;
  error: Error;
  data: null;
}
interface DataSuccess<T> {
  loading: false;
  error: null;
  data: T;
}
type Data<T> = DataLoading | DataError | DataSuccess<T>;

const path = useRoute().params.path as string;
const ctf = ctfs[path];

const details = ref<Data<Details>>({ loading: true, error: null, data: null });
watch(
  () => path,
  async () => {
    details.value = { loading: true, error: null, data: null };
    try {
      details.value = { loading: false, error: null, data: await ctf.details() };
    } catch (e) {
      details.value = { loading: false, error: e instanceof Error ? e : new Error(String(e)), data: null };
    }
  },
  { immediate: true },
);
const { Description, Ctf } = ctf;

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
          <v-row align="center" justify="space-between" no-gutters class="mt-1 ga-6">
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
    <v-card class="mx-2 my-4 pa-6 d-flex justify-center align-center">
      <Ctf />
    </v-card>

    <SolvedAnimationOverlay :visible="showSolved" />
  </template>
</template>

<style scoped>
.v-card {
  font-size: 1.1em;
  &::before {
    display: block;
    float: left;
    padding-top: 100%;
    content: '';
  }
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
