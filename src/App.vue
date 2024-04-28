<script setup lang="ts">
import { RouterView } from 'vue-router';
import WhatIsThis from './views/main/WhatIsThis.vue';
</script>

<template>
  <v-app>
    <v-app-bar>
      <template v-slot:title>
        <router-link to="/">cStDf</router-link>
      </template>
      <template v-slot:append>
        <WhatIsThis />
        <v-btn
          color="info"
          density="compact"
          size="x-large"
          icon="mdi-github"
          title="Open GitHub project"
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

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
<style>
.mdi-github {
  --v-icon-size-multiplier: 1.5 !important;
}
</style>
