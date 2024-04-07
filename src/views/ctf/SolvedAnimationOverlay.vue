<script setup lang="ts">
import { onBeforeUpdate, onUpdated, ref } from 'vue';
import ConfettiExplosion from 'vue-confetti-explosion';

const props = defineProps<{ visible: boolean }>();

const showConfetti = ref(false);
onBeforeUpdate(() => {
  if (props.visible) showConfetti.value = false;
});
onUpdated(() => {
  if (props.visible)
    setTimeout(() => {
      showConfetti.value = true;
    }, 1000);
});
</script>

<template>
  <v-overlay :model-value="props.visible" persistent scrim="black" class="align-center justify-center">
    <div v-if="showConfetti" class="confetti">
      <ConfettiExplosion :duration="3000" />
    </div>

    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
      <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" stroke-linejoin="round" />
    </svg>

    <div class="hint text-h5 font-weight-black">Try another!</div>
  </v-overlay>
</template>

<style scoped>
.confetti {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 0;
  width: 100%;
  height: 100%;
}

.checkmark {
  display: block;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  stroke-width: 4;
  stroke: #fff;
  stroke-miterlimit: 10;
  animation:
    fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #7ac142;
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 50px #7ac142;
  }
}
@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #7ac142;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}
@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

.hint {
  opacity: 0;
  animation: fade 0.1s ease-in 1s forwards;
}
@keyframes fade {
  100% {
    opacity: 1;
  }
}
</style>
