<script setup lang="ts">
import LoadingComponent from '@/components/LoadingComponent.vue';
import type { CtfContent } from '@/ctfs/all-ctfs';
import useAsyncLoader from './async-loader';

const props = defineProps<{ content: CtfContent; path: string }>();

const url = props.content.type !== 'vue' ? useAsyncLoader(props.content.url, props.path) : null;
</script>

<template>
  <v-card :class="['d-flex align-center my-4 overflow-x-scroll', { square: !url?.error }]">
    <component v-if="content.type === 'vue'" :is="content.component" />

    <v-layout v-else-if="!url || url.loading">
      <LoadingComponent />
    </v-layout>

    <v-alert v-else-if="url.error" color="error" icon="$error">
      {{ url.error }}
    </v-alert>

    <v-img v-else-if="content.type === 'image'" :src="url.data" />

    <div v-else class="w-100 d-flex flex-column align-center container justify-center">
      <template v-if="content.type === 'html'">
        <iframe :src="url.data" frameborder="0" width="100%" height="100%" />
        <v-btn class="top-0" icon="mdi-open-in-new" title="Open website in new tab" :href="url.data" target="_blank" />
      </template>

      <template v-else-if="content.type === 'pdf'">
        <embed :src="url.data" type="application/pdf" width="100%" height="100%" />
        <div>Download the PDF if you cannot see it.</div>
        <v-btn class="bottom-0" icon="mdi-download" title="Download PDF" :href="url.data" target="_blank" />
      </template>

      <template v-else-if="content.type === 'audio'">
        <audio :src="url.data" controls />
        <v-btn class="bottom-0" icon="mdi-download" title="Download audio" :href="url.data" target="_blank" />
      </template>
    </div>
  </v-card>
</template>

<style scoped>
.v-card {
  justify-content: safe center;

  &.square::before {
    display: block;
    padding-top: 100%;
    content: '';
  }
}

.container {
  aspect-ratio: 1/1;

  & > .v-btn {
    position: absolute;
    right: 0;
  }
}
</style>
