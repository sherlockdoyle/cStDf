<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
</script>

<template>
  <div class="hatcc">
    <div class="s">
      <div
        v-for="i in 10"
        :key="i"
        class="s"
        :style="{ '--x': Math.random(), '--y': Math.random(), '--w': Math.random() }"
      ></div>
      <div class="m" :style="{ '--x': (Date.now() / 21600000) % 2 }"></div>
    </div>
    <div class="b">
      <div v-for="i in 4" :key="i" class="f">
        <div v-for="j in 4" :key="j" class="f">
          <div :class="['w', `w${i}${j}`]"></div>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="f">
        <div v-for="i in 2" :key="i" class="l" :style="{ left: `${80 * i - 70}%` }"></div>
      </div>
    </div>
    <div v-if="visible" class="w" @dblclick="visible = !visible"></div>
  </div>
</template>

<style>
.hatcc {
  position: relative;
  background: linear-gradient(#1f2833, #0d3b0d);
  aspect-ratio: 1 / 1;
  width: 100%;

  & > * {
    position: absolute;
  }

  & > .s {
    background: linear-gradient(#0b0c10 0%, #1f2833 100%);
    width: 100%;
    height: 50%;

    & > .s,
    & > .m {
      position: absolute;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
    }

    & > .s {
      top: calc(var(--y) * 98.5%);
      left: calc(var(--x) * 98.5%);
      box-shadow: 0 0 8px calc(var(--w) * 3px) #fffc;
      background-color: #fff;
      height: calc(var(--w) * 1.5%);

      &::before,
      &::after {
        position: absolute;
        border-radius: 50%;
        background-color: #fff;
        content: '';
      }
      &::before {
        top: 25%;
        left: -50%;
        width: 200%;
        height: 50%;
      }
      &::after {
        top: -50%;
        left: 25%;
        width: 50%;
        height: 200%;
      }
    }

    & > .m {
      top: calc(pow(var(--x) - 1, 2) * 25%);
      left: calc(var(--x) * 40%);
      box-shadow:
        inset -10px 8px 6px -4px #fff,
        7px -7px 14px #fff4;
      background: radial-gradient(circle at 65% 35%, #bbb, #444 65%);
      width: 20%;
    }
  }

  & > .b {
    display: flex;
    top: 10%;
    left: 20%;
    flex-direction: column;
    clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
    background: linear-gradient(#380000 0%, #570000 50%, #470000 100%);
    width: 60%;
    height: 60%;

    & > .f {
      display: flex;
      flex: 1;
      justify-content: space-evenly;
      align-items: center;
      box-shadow: inset 0 0 8px #0007;
      border-top: 1rem solid #333;
      width: 100%;

      & > .f {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #666;
        aspect-ratio: 1 / 1;
        height: 65%;

        & > .w {
          position: relative;
          box-shadow:
            0 0 2px currentColor,
            0 0 8px currentColor;
          background-color: currentColor;
          width: 90%;
          height: 90%;

          &::before,
          &::after {
            display: block;
            position: absolute;
            box-shadow: inset 0 0 1px currentColor;
            background: linear-gradient(45deg, #666 5%, #bbb 15%, #888 30%, #999 50%, #888 70%, #bbb 80%, #666 95%);
            content: '';
          }
          &::before {
            top: 47.5%;
            width: 100%;
            height: 5%;
          }
          &::after {
            left: 47.5%;
            width: 5%;
            height: 100%;
          }
        }
      }
    }
  }

  & > .r {
    bottom: 0;
    background: repeating-linear-gradient(45deg, #2a2a2a, #2a2a2a 25%, #3a3a3a 25%, #3a3a3a 50%);
    width: 100%;
    height: 30%;

    &::after {
      position: absolute;
      top: 75%;
      background: repeating-linear-gradient(45deg, #fff8 0%, #fff8 10%, transparent 10%, transparent 20%);
      width: 100%;
      height: 5%;
      content: '';
    }

    & > .f {
      position: relative;
      box-shadow: 0 4px 8px -8px #0007;
      background: repeating-linear-gradient(45deg, #3c3c3c 0%, #3c3c3c 5%, #4a4a4a 5%, #4a4a4a 10%);
      width: 100%;
      height: 25%;

      &::after {
        position: absolute;
        bottom: 0;
        background: repeating-linear-gradient(90deg, #222a22 -1.5%, #222a22 3.87%, #2e382e 3.87%, #2e382e 9.24%);
        width: 100%;
        height: 20%;
        content: '';
      }

      & > .l {
        position: absolute;
        bottom: 35%;
        border-radius: 2px;
        background: linear-gradient(90deg, #444, #666 25%, #666 75%, #444);
        width: 0.5%;
        height: 150%;

        &::before {
          position: absolute;
          bottom: -50%;
          left: -1650%;
          background: radial-gradient(ellipse at center, #ffff9433 0%, #ffff9600 80%);
          aspect-ratio: 3/2;
          height: 100%;
          content: '';
        }

        &::after {
          position: absolute;
          top: -17.5%;
          left: -350%;
          background: radial-gradient(circle, #ffff94cc 0%, #ffff9600 70%);
          aspect-ratio: 1/1;
          width: 800%;
          content: '';
        }
      }
    }
  }

  & > .w {
    box-shadow: inset 0 0 8px #fffc;
    border: 15px solid;
    border-radius: 4%;
    border-image: repeating-linear-gradient(45deg, #8b5a2b, #8b5a2b 1%, #a0522d 1%, #a0522d 2%) 1;
    background: linear-gradient(135deg, #fff3, #fff1);
    width: 100%;
    height: 100%;
  }

  .w11 {
    color: #635374;
  }
  .w12 {
    color: #44667b;
  }
  .w13 {
    color: #4c3076;
  }
  .w14 {
    color: #335f6c;
  }
  .w21 {
    color: #316633;
  }
  .w22 {
    color: #7d6353;
  }
  .w23 {
    color: #744466;
  }
  .w24 {
    color: #7b4c30;
  }
  .w31 {
    color: #76335f;
  }
  .w32 {
    color: #6c3166;
  }
  .w33 {
    color: #337d63;
  }
  .w34 {
    color: #537444;
  }
  .w41 {
    color: #667b4c;
  }
  .w42 {
    color: #307633;
  }
  .w43 {
    color: #5f6c31;
  }
  .w44 {
    color: #66337d;
  }
}
</style>
