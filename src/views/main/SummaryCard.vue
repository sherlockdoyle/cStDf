<script setup lang="ts">
const props = defineProps<{
  name: string;
  solved: boolean;
  to: string;
}>();
</script>

<template>
  <v-card
    :title="props.name"
    :subtitle="props.solved ? 'Solved' : 'Not Solved'"
    :color="props.solved ? 'success' : undefined"
    variant="tonal"
    :to="props.to"
    hover
  ></v-card>
</template>

<style scoped>
.v-card:not(:visited) {
  color: lightblue;
}
</style>
