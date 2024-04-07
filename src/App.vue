<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-app-bar title="cStDf">
      <template v-slot:append>
        <v-btn
          color="info"
          density="compact"
          size="x-large"
          icon="mdi-github"
          href="https://github.com/sherlockdoyle/cStDf"
          target="_blank"
        />
      </template>
    </v-app-bar>

    <v-main class="px-3">
      <v-responsive max-width="1024" class="mx-auto mt-2">
        <RouterView />
      </v-responsive>
    </v-main>
  </v-app>
</template>

<style>
.mdi-github {
  --v-icon-size-multiplier: 1.5 !important;
}
</style>
