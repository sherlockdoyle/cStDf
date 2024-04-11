<script setup lang="ts">
import { ref } from 'vue';
import back from './b.png';
import front from './f.png';

const [dl, dt, dr, db] = [3, 5, 7, 11].sort(() => Math.random() - 0.5);
const rx = ref(Math.floor(Math.random() * 360)),
  ry = ref(Math.floor(Math.random() * 360));
</script>

<template>
  <div class="v">
    <div class="c" :style="{ transform: `rotateX(${rx}deg) rotateY(${ry}deg)` }">
      <div class="s f">
        <img :src="front" />
        <span>Front</span>
      </div>
      <div class="s b">
        <img :src="back" />
        <span>Back</span>
      </div>
      <div class="s l">
        <img :src="front" />
        <span>Left</span>
      </div>
      <div class="s r">
        <img :src="back" />
        <span>Right</span>
      </div>
      <div class="s u">
        <img :src="front" />
        <span>Up</span>
      </div>
      <div class="s d">
        <img :src="back" />
        <span>Down</span>
      </div>
    </div>

    <div class="a">
      <v-btn icon="mdi-arrow-up" variant="plain" @click="ry += dt" />
      <v-btn icon="mdi-arrow-left" variant="plain" @click="rx += dl" />
      <v-btn icon="mdi-arrow-right" variant="plain" @click="rx -= dr" />
      <v-btn icon="mdi-arrow-down" variant="plain" @click="ry -= db" />
    </div>
  </div>
</template>

<style scoped>
.v {
  --size: min(85vw, 512px);

  position: relative;
  width: var(--size);
  height: var(--size);
}

.c {
  transform-style: preserve-3d;
  transition: all 0.5s;
  width: 100%;
  height: 100%;
}
.s {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: absolute;
    top: 0;
    left: 6px;
    font-weight: bolder;
    font-size: larger;
  }
}

.f {
  transform: translateZ(calc(var(--size) / 2));
}
.b {
  transform: rotateY(180deg) translateZ(calc(var(--size) / 2));
}
.l {
  transform: rotateY(-90deg) translateZ(calc(var(--size) / 2));
}
.r {
  transform: rotateY(90deg) translateZ(calc(var(--size) / 2));
}
.u {
  transform: rotateX(90deg) translateZ(calc(var(--size) / 2));
}
.d {
  transform: rotateX(-90deg) translateZ(calc(var(--size) / 2));
}

.a {
  display: grid;
  position: absolute;
  right: 0;
  bottom: 0;
  grid-template-areas:
    '. u .'
    'l . r'
    '. d .';

  button:first-child {
    grid-area: u;
  }
  button:nth-child(2) {
    grid-area: l;
  }
  button:nth-child(3) {
    grid-area: r;
  }
  button:last-child {
    grid-area: d;
  }
}
</style>
