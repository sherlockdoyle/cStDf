<script setup lang="ts">
import HeadingAction from '@/components/HeadingAction.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import ctfs from '@/ctfs/all-ctfs';
import { addSolved, getAllSolved } from '@/storage/solved';
import SparkMD5 from 'spark-md5';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import DependencyList from './DependencyList.vue';
import SolutionButton from './SolutionButton.vue';
import SolvedAnimationOverlay from './SolvedAnimationOverlay.vue';
import useAsyncLoader from './async-loader';

const path = useRoute().params.path as string;
const ctf = ctfs[path];
const isSolved = getAllSolved().has(path);

const { title } = document;
onMounted(() => (document.title = `${ctf.name} - ${title}`));
onBeforeUnmount(() => (document.title = title));

const details = useAsyncLoader(ctf.details, path);
const { Description, CtfComponent } = ctf;
const htmlUrl = ctf.htmlUrl && useAsyncLoader(ctf.htmlUrl, path);
const imageUrl = ctf.imageUrl && useAsyncLoader(ctf.imageUrl, path);
const pdfUrl = ctf.pdfUrl && useAsyncLoader(ctf.pdfUrl, path);
const wavUrl = ctf.wavUrl && useAsyncLoader(ctf.wavUrl, path);

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
  <v-layout v-if="details.loading || htmlUrl?.loading || imageUrl?.loading">
    <LoadingComponent />
  </v-layout>

  <v-alert v-else-if="details.error || htmlUrl?.error || imageUrl?.error" color="error" icon="$error">
    {{ details.error }} {{ htmlUrl?.error }} {{ imageUrl?.error }}
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
    <v-card
      v-if="CtfComponent || htmlUrl?.data || imageUrl?.data || pdfUrl?.data || wavUrl?.data"
      class="d-flex align-center mx-2 my-4 overflow-x-auto"
    >
      <v-card-item v-if="CtfComponent" class="d-block flex-0-1 mx-auto">
        <CtfComponent />
      </v-card-item>

      <v-img v-else-if="imageUrl?.data" :src="imageUrl.data" />

      <div v-else-if="htmlUrl?.data || pdfUrl?.data || wavUrl?.data" class="container">
        <template v-if="htmlUrl?.data">
          <iframe :src="htmlUrl.data" frameborder="0" width="100%" height="100%" />
          <v-btn icon="mdi-open-in-new" title="Open website in new tab" :href="htmlUrl.data" target="_blank" />
        </template>

        <template v-else-if="pdfUrl?.data">
          <embed :src="pdfUrl.data" type="application/pdf" width="100%" height="100%" />
          <div>Download the PDF if you cannot see it.</div>
          <v-btn icon="mdi-download" title="Download PDF" :href="pdfUrl.data" target="_blank" />
        </template>

        <template v-else-if="wavUrl?.data">
          <audio :src="wavUrl.data" controls />
          <v-btn icon="mdi-download" title="Download audio" :href="wavUrl.data" target="_blank" />
        </template>
      </div>
    </v-card>

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

.v-card::before {
  display: block;
  float: left;
  padding-top: 100%;
  content: '';
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  aspect-ratio: 1/1;
  width: 100%;

  iframe,
  embed {
    display: block;
  }
  audio {
    width: 50%;
    min-width: 300px;
    max-width: 600px;
  }

  embed + div {
    width: 100%;
  }

  .v-btn {
    position: absolute;
    right: 0;

    iframe ~ & {
      top: 0;
    }
    embed ~ &,
    audio ~ & {
      bottom: 0;
    }
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
