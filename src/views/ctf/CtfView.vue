<script setup lang="ts">
import HeadingAction from '@/components/HeadingAction.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ctfs from '@/ctfs/all-ctfs';
import { addSolved, getAllSolved } from '@/storage/solved';
import SparkMD5 from 'spark-md5';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CtfCard from './CtfCard.vue';
import DependencyList from './DependencyList.vue';
import SolutionButton from './SolutionButton.vue';
import SolvedAnimationOverlay from './SolvedAnimationOverlay.vue';
import useAsyncLoader from './async-loader';
import useMetaTags from './meta-tags';

const path = useRoute().params.path as string;
const ctf = ctfs[path];
const isSolved = getAllSolved().has(path);

const details = useAsyncLoader(ctf.details, path);
const { Description, content } = ctf;

const descUpdater = useMetaTags(ctf.name, path);
watch(details, details => descUpdater(details.data?.summary ?? null));

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
  <v-layout v-if="details.loading">
    <LoadingComponent />
  </v-layout>

  <v-alert v-else-if="details.error" color="error" icon="$error">
    {{ details.error }}
  </v-alert>

  <template v-else>
    <HeadingAction :title="ctf.name">
      <div class="d-flex flex-column align-end">
        <div v-if="isSolved" class="text-success">Solved!</div>
        <SolutionButton :path="path" />
      </div>
    </HeadingAction>
    <DependencyList v-if="details.data.dependencies?.length" :dependencies="details.data.dependencies" />
    <Description />
    <hr />

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

    <hr class="ml-auto" />
    <CtfCard v-if="content" :content="content" :path="path" />

    <SolvedAnimationOverlay :visible="showSolved" />
  </template>
</template>

<style scoped>
.text-success {
  margin: -0.9em 0.75em -0.1em 0;
  font-size: 0.75rem;
  line-height: 1;
}

hr {
  width: 75%;
}

.flag-input :deep(input) {
  font-family: monospace;
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
  pre {
    text-align: left;
    white-space: pre-wrap;
    word-break: break-word;
  }
  big {
    line-height: 1; /* Don't shift the text */
  }
}
</style>
