<template>
  <div class="periodic-table-ctf">
    <p>Enter the decryption keyword found in the description:</p>
    <input type="text" v-model="userInputKeyword" placeholder="Keyword" :disabled="isDecrypted" />
    <button @click="handleDecryption" :disabled="isDecrypted">Decrypt Elements</button>

    <div v-if="feedbackMessage" class="feedback">{{ feedbackMessage }}</div>

    <div v-if="isDecrypted" class="puzzle-area">
      <h3>Decrypted Elements:</h3>
      <ul class="element-list">
        <li v-for="element in displayedElements" :key="element">{{ element }}</li>
      </ul>

      <p>Arrange the elements into their correct periods (comma-separated, e.g., Li,Be,B,...):</p>
      <div class="solution-input">
        <label for="period2">Period 2:</label>
        <input type="text" id="period2" v-model="period2Input" placeholder="e.g., Li,Be,B,C,N,O,F,Ne" />
      </div>
      <div class="solution-input">
        <label for="period3">Period 3:</label>
        <input type="text" id="period3" v-model="period3Input" placeholder="e.g., Na,Mg,Al,Si,P,S,Cl,Ar" />
      </div>
      <button @click="handleCheckSolution">Check Arrangement</button>
    </div>
    <div v-else class="puzzle-area">
       <h3>Encrypted Elements:</h3>
       <ul class="element-list">
         <li v-for="element in displayedElements" :key="element">{{ element }}</li>
       </ul>
       <p><i>Enter the correct keyword to decrypt the elements and begin arranging them.</i></p>
    </div>


    <div v-if="isSolved" class="flag-container">
      <h3>Congratulations!</h3>
      <p>Flag: <code>{{ flag }}</code></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const keyword = "VALENCE";
const flag = "cStDf{P3r1od1c_L0g1c}";

// Store elements as an array of strings
const plaintextElements = ["Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"];
// Pre-calculated encrypted elements based on Vigenere("ELEMENT", "VALENCE")
const encryptedElements = ["GI", "MI", "O", "G", "N", "S", "H", "AI", "YA", "ZP", "EX", "SW", "T", "U", "EL", "MR"];

const userInputKeyword = ref("");
const isDecrypted = ref(false);
const isSolved = ref(false);
const displayedElements = ref<string[]>([...encryptedElements]); // Start with encrypted
const feedbackMessage = ref("");

// User input for solution (comma-separated strings)
const period2Input = ref("");
const period3Input = ref("");

// Correct solution arrays (for comparison)
const correctPeriod2 = ["Li", "Be", "B", "C", "N", "O", "F", "Ne"];
const correctPeriod3 = ["Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar"];

// --- Vigenere Cipher Logic (Uppercase Letters Only) ---
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function vigenereProcess(text: string, key: string, decrypt: boolean): string {
  let result = "";
  let keyIndex = 0;
  const upperText = text.toUpperCase();
  const upperKey = key.toUpperCase();

  for (let i = 0; i < upperText.length; i++) {
    const textChar = upperText[i];
    const textCharCode = ALPHABET.indexOf(textChar);

    if (textCharCode === -1) { // Handle non-alphabetic characters (optional, keep them as is)
        result += textChar;
        continue;
    }

    const keyChar = upperKey[keyIndex % upperKey.length];
    const keyCharCode = ALPHABET.indexOf(keyChar);

    let processedCharCode;
    if (decrypt) {
      processedCharCode = (textCharCode - keyCharCode + 26) % 26;
    } else { // Encrypt
      processedCharCode = (textCharCode + keyCharCode) % 26;
    }

    result += ALPHABET[processedCharCode];
    keyIndex++; // Only increment key index for alphabetic characters
  }
  return result;
}

function vigenereDecrypt(ciphertext: string, key: string): string {
    return vigenereProcess(ciphertext, key, true);
}

// Not strictly needed for the component logic after pre-calculation, but good to have
// function vigenereEncrypt(plaintext: string, key: string): string {
//     return vigenereProcess(plaintext, key, false);
// }

// --- Event Handlers ---

function handleDecryption() {
  if (userInputKeyword.value.toUpperCase() === keyword) {
    isDecrypted.value = true;
    // Decrypt each element individually
    displayedElements.value = encryptedElements.map(el => vigenereDecrypt(el, keyword));
    feedbackMessage.value = "Elements decrypted! Now arrange them correctly by period.";
    userInputKeyword.value = ""; // Clear input after successful decryption
  } else {
    feedbackMessage.value = "Incorrect keyword. Please try again.";
  }
}

// Helper to normalize and compare array inputs
const parseAndCompareArrays = (input: string, correct: string[]): boolean => {
    const userArray = input.split(',').map(s => s.trim()).filter(s => s); // Split, trim, remove empty
    if (userArray.length !== correct.length) return false;
    return userArray.every((val, index) => val.toLowerCase() === correct[index].toLowerCase()); // Case-insensitive compare
};


function handleCheckSolution() {
  if (!isDecrypted.value) {
    feedbackMessage.value = "You need to decrypt the elements first.";
    return;
  }

  const period2Correct = parseAndCompareArrays(period2Input.value, correctPeriod2);
  const period3Correct = parseAndCompareArrays(period3Input.value, correctPeriod3);

  if (period2Correct && period3Correct) {
    isSolved.value = true;
    feedbackMessage.value = "Correct! Arrangement matches the periodic table.";
  } else {
    isSolved.value = false;
    let error = "Arrangement is incorrect. ";
    if (!period2Correct) error += "Check Period 2. ";
    if (!period3Correct) error += "Check Period 3. ";
    error += "Ensure elements are comma-separated and in the right order."
    feedbackMessage.value = error;
  }
}

</script>

<style scoped>
.periodic-table-ctf {
  font-family: sans-serif;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 600px;
  margin: 20px auto;
}

input[type="text"] {
  padding: 8px;
  margin-right: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 5px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

.feedback {
  margin-top: 10px;
  padding: 10px;
  border-radius: 3px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.puzzle-area {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.element-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.element-list li {
  background-color: #e9ecef;
  padding: 5px 10px;
  border-radius: 3px;
  font-family: monospace;
}

.solution-input {
    margin-bottom: 10px;
}

.solution-input label {
    display: inline-block;
    width: 70px; /* Align labels */
}
.solution-input input {
    width: calc(100% - 85px); /* Adjust input width */
}


.flag-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
}

code {
  background-color: #eee;
  padding: 2px 5px;
  border-radius: 3px;
}
</style>
