<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const primeRules = [
    (v: string | undefined) => !!v?.match(/\d+/) || 'Must be a number',
    (v: string) => BigInt(v) > 2n || 'Must be greater than 2',
  ],
  messageRules = [
    (v: string | undefined) => !(v && !v.match(/\d+/)) || 'Must be a number',
    (v: string) => {
      const m = BigInt(v);
      return !(m < 0n || m >= n.value) || `Must be between 0 and ${n.value - 1n}`;
    },
  ];

function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}
function modInv(a: bigint, m: bigint): bigint {
  if (m <= 1n) return 0n; // m should not be 0, but if it is, return 0
  const m0 = m;
  let y = 0n,
    x = 1n;
  while (a > 1n) {
    const q = a / m;
    let t = m;
    m = a % m;
    a = t;
    t = y;
    y = x - q * y;
    x = t;
  }
  if (x < 0n) x += m0;
  return x;
}
function powMod(b: bigint, p: bigint, m: bigint): bigint {
  if (m === 0n) return 0n; // m should not be 0, but if it is, return 0
  let r = 1n;
  b %= m;
  if (b === 0n) return 0n;
  while (p > 0n) {
    if (p % 2n === 1n) r = (r * b) % m;
    p = p >> 1n;
    b = (b * b) % m;
  }
  return r;
}

const p = ref<string | null>('5'),
  q = ref<string | null>('11'),
  m = ref<string | null>('48'),
  c = ref<string | null>();
const n = computed(() =>
    p.value && q.value
      ? BigInt(p.value) * BigInt(q.value)
      : 1524157877515647915714744640673658430040741060333989936102274670076966070262981833538950468888038085808805693249090218478005129336316939313541391869824651884614844485976992554861850821137986271148099n,
  ),
  phi = computed(() => (p.value && q.value ? (BigInt(p.value) - 1n) * (BigInt(q.value) - 1n) : null)),
  e = computed(() => {
    if (p.value && q.value) for (let i = 2n; i < phi.value!; ++i) if (gcd(i, phi.value!) === 1n) return i;
    return 65537n;
  }),
  d = computed(() => (p.value && q.value ? modInv(e.value, phi.value!) : null)),
  mHint = computed(() => (p.value && q.value ? `Enter a number between 0 and ${n.value - 1n} (inclusive)` : undefined)),
  mDecrypted = computed(() => {
    if (c.value && d.value != null) return powMod(BigInt(c.value), d.value, n.value);
    return null;
  });

watch([p, q, m], () => {
  c.value = m.value ? powMod(BigInt(m.value), e.value, n.value).toString() : null;
});
</script>

<template>
  <v-container>
    <h3>RSA Encryption Demo</h3>

    <h4>Introduction to RSA</h4>
    <p>
      RSA (Rivest-Shamir-Adleman) is one of the first public-key cryptosystems and is widely used for secure data
      transmission. It's an asymmetric cryptographic algorithm, meaning it uses two different keys: a public key for
      encryption and a private key for decryption.
    </p>

    <h4>Choosing Prime Numbers</h4>
    <p>The process starts by selecting two distinct prime numbers, usually called <em>p</em> and <em>q</em>.</p>
    <v-textarea
      rows="1"
      auto-grow
      label="Prime p"
      inputmode="numeric"
      :rules="[...primeRules, (v: string) => v !== q || 'Cannot be equal to q']"
      v-model="p"
    />
    <v-textarea
      rows="1"
      auto-grow
      label="Prime q"
      inputmode="numeric"
      :rules="[...primeRules, (v: string) => v !== p || 'Cannot be equal to p']"
      v-model="q"
    />
    <ul>
      <li>In our case, no checks are performed to ensure that <em>p</em> and <em>q</em> are prime.</li>
      <li>Also, in practice, these primes are very large, typically 2048 bits or more.</li>
    </ul>
    <p>
      <a href="https://en.wikipedia.org/wiki/Prime_number" target="_blank">Learn more about prime numbers</a>
    </p>

    <h4>Calculating n (the modulus)</h4>
    <p><em>n</em> is the product of <em>p</em> and <em>q</em>: <em>n = p * q</em></p>
    <v-textarea rows="1" auto-grow label="n (p*q)" readonly :model-value="n" />
    <ul>
      <li>This value is used in both the public and private keys.</li>
      <li>It's part of the encryption and decryption processes.</li>
    </ul>

    <h4>Calculating φ(n) (Euler's totient function)</h4>
    <p><em>φ(n) = (p-1) * (q-1)</em></p>
    <v-textarea rows="1" auto-grow label="φ(n)" readonly :model-value="phi" />
    <ul>
      <li>This step is crucial for generating the keys.</li>
      <li>It represents the count of numbers less than <em>n</em> that are coprime to <em>n</em>.</li>
    </ul>
    <p>
      <a href="https://en.wikipedia.org/wiki/Euler%27s_totient_function" target="_blank">
        Learn more about Euler's totient function
      </a>
    </p>

    <h4>Choosing the Public Exponent (e)</h4>
    <p>Select a number e such that:</p>
    <ol>
      <li>1 &lt; e &lt; φ(n)</li>
      <li>e is coprime to φ(n) (their greatest common divisor is 1)</li>
    </ol>
    <v-textarea rows="1" auto-grow label="Public Key (e)" readonly :model-value="e" />
    <ul>
      <li>Common choices for <em>e</em> are 3, 5, 17, or 65537.</li>
      <li>In our demo the smallest suitable <em>e</em> is automatically calculated.</li>
    </ul>

    <h4>Calculating the Private Exponent (d)</h4>
    <p><em>d</em> is the modular multiplicative inverse of <em>e modulo φ(n)</em></p>
    <p><em>d * e ≡ 1 (mod φ(n))</em></p>
    <v-textarea rows="1" auto-grow label="Private Key (d)" readonly :model-value="d" />
    <ul>
      <li>This means <em>(d * e) / φ(n)</em> leaves a remainder of 1.</li>
      <li>In our demo, <em>d</em> is automatically calculated using the modular inverse function.</li>
    </ul>
    <p>
      <a href="https://en.wikipedia.org/wiki/Modular_multiplicative_inverse" target="_blank">
        Learn more about modular arithmetic
      </a>
    </p>

    <h4>6. Generating the Keys</h4>
    <ul class="k">
      <li>
        Public Key: <em>&lbrace;{{ e }}, {{ n }}&rbrace;</em>
      </li>
      <li>
        Private Key: <em> &lbrace;{{ d }}, {{ n }}&rbrace; </em>
      </li>
    </ul>
    <p>The public key is shared openly, while the private key must be kept secret.</p>

    <h4>Encryption</h4>
    <p>
      To encrypt a message <em>m</em>: <em>c = m<sup>e</sup> mod n</em>
    </p>
    <v-textarea
      rows="1"
      auto-grow
      label="Message"
      inputmode="numeric"
      :hint="mHint"
      :rules="messageRules"
      v-model="m"
    />
    <ul>
      <li><em>m</em> must be less than <em>n</em></li>
      <li><em>c</em> is the resulting ciphertext</li>
    </ul>
    <v-textarea
      rows="1"
      auto-grow
      label="Encrypted Message"
      inputmode="numeric"
      :hint="mHint"
      :rules="messageRules"
      v-model="c"
    />

    <h4>Decryption</h4>
    <p>
      To decrypt the ciphertext <em>c</em>: <em>m = c<sup>d</sup> mod n</em>
    </p>
    <v-textarea rows="1" auto-grow label="Decrypted Message" readonly :model-value="mDecrypted" />
    <p>This recovers the original message <em>m</em>.</p>

    <h4>Security of RSA</h4>
    <p>
      The security of RSA relies on the practical difficulty of factoring the product of two large prime numbers. While
      factoring <em>n</em> to find <em>p</em> and <em>q</em> is theoretically possible, it becomes computationally
      infeasible with sufficiently large primes.
    </p>
    <p>
      <a href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)#Security_and_practical_considerations" target="_blank">
        Learn more about RSA security
      </a>
    </p>
  </v-container>
</template>

<style scoped>
h4 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
p {
  margin-bottom: 0.5rem;
}
li {
  margin: revert;
  padding: revert;
}

.k {
  word-break: break-all;
}
</style>
