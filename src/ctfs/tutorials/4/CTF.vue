<template>
  <pre><span class="i">const</span> <span class="n">flag</span>: <span class="t">string</span> = <span class="i">await</span> <span class="f">getFlag</span>();
<span class="i">console</span>.<span class="f">log</span>(flag.<span class="f">toLowerCase</span>());  <span class="c">// cstdf{c5tdf}</span></pre>
</template>

<style scoped>
pre {
  border-radius: 0.5rem;
  background-color: rgb(13, 17, 23);
  padding: 0.5rem;
  color: rgb(201, 209, 217);
  font-weight: 400;
  font-family: monospace;

  span.i {
    color: rgb(255, 123, 114);
  }
  span.n {
    color: rgb(121, 192, 255);
  }
  span.t {
    color: rgb(255, 166, 87);
  }
  span.f {
    color: rgb(210, 168, 255);
  }
  span.c {
    color: rgb(139, 148, 158);
  }
}
</style>
