<script setup lang="ts">
const props = defineProps<{ title: string }>();
</script>

<template>
  <div class="header my-2">
    <h1 class="text-h4">{{ props.title }}</h1>
    <div class="action">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  .action {
    margin-left: auto;
  }
}
</style>
