<template>
  <v-card
    title="Set two numbers"
    text="Input height and width of the game field"
    class="d-flex flex-column"
  >
    <v-form
      class="d-flex justify-space-around"
      @submit.prevent="onSetSize"
    >
      <div class="d-flex w-50 flex-md-grow-0 flex-shrink-1">
        <v-text-field
          v-model.number="boxSize.height"
          label="Height"
          required
          class="align-self-center mr-4"
          :error-messages="v$.height.$errors.map((err) => err.$message)"
        />
        <v-text-field
          v-model.number="boxSize.width"
          label="Width"
          required
          class="align-self-center"
          :error-messages="v$.width.$errors.map((err) => err.$message)"
        />
      </div>
      <v-btn
        type="submit"
        variant="outlined"
        class="align-self-center"
      >
        Start game
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup>
import { reactive, defineEmits } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric, minValue } from '@vuelidate/validators';
import Box from '@/composables/savedBox.js';

const emit = defineEmits(['set-size']);
const box = new Box('box');
const { height, width } = box.getSavedBox();

const boxSize = reactive({
  height,
  width,
});
const rules = {
  height: { required, numeric, minValue: minValue(1) },
  width: { required, numeric, minValue: minValue(1) },
};
const v$ = useVuelidate(rules, boxSize);

const onSetSize = async () => {
  const isFormValid = await v$.value.$validate();

  if (isFormValid) {
    emit('set-size', boxSize);
  }
}
</script>
