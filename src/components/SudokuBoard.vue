<script setup lang="ts">
const props = defineProps<{ board: string }>();
</script>

<template>
  <v-container class="pa-0 w-auto">
    <v-row>
      <v-col>
        <table>
          <tr v-for="row in 9" :key="row">
            <td v-for="col in 9" :key="col">
              <div>
                <input
                  v-if="props.board.charAt((row - 1) * 9 + col - 1) === '0'"
                  type="number"
                  min="1"
                  max="9"
                  step="1"
                  maxlength="1"
                />
                <span v-else class="text-blue">{{ props.board.charAt((row - 1) * 9 + col - 1) }}</span>
              </div>
            </td>
          </tr>
        </table>
      </v-col>
    </v-row>
    <v-row no-gutters align="center">
      <v-col>Please do not cheat.</v-col>
      <v-col
        ><v-btn
          text="Solve in Sudoku-Lovers"
          append-icon="mdi-open-in-new"
          :href="`https://www.sudokulovers.com/game/${props.board}`"
          target="_blank"
      /></v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 512px;
  table-layout: fixed;

  tr {
    &:first-child {
      td {
        border-top: 3px solid currentColor;
      }
    }
    &:nth-child(3n) {
      td {
        border-bottom: 3px solid currentColor;
      }
    }

    td {
      border: 1px solid currentColor;

      &:first-child {
        border-left: 3px solid currentColor;
      }
      &:nth-child(3n) {
        border-right: 3px solid currentColor;
      }

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        aspect-ratio: 1 / 1;
        font-size: min(2.3em, 5vw);

        input {
          appearance: textfield;
          width: 100%;
          height: 100%;
          text-align: center;
        }
      }
    }
  }
}
</style>
