<template>
  <v-card
    ref="card"
    title="Set two numbers"
    text="Input height and width of the game field"
    class="d-flex flex-column"
  >
    <v-form
      class="d-flex justify-space-around flex-md-column"
      @submit.prevent="onSetSize"
    >
      <v-container>
        <v-row class="align-center" justify="space-around">
          <v-col cols="4" md="4">
            <v-text-field
              v-model.number="boxSize.height"
              label="Height"
              required
              :error-messages="v$.height.$errors.map((err) => err.$message)"
            />
          </v-col>
          <v-col cols="4" md="4">
            <v-text-field
              v-model.number="boxSize.width"
              label="Width"
              required
              :error-messages="v$.width.$errors.map((err) => err.$message)"
            />
          </v-col>
          <v-col
            cols="10"
            md="4"
            class="mt-2 mt-md-0"
          >
            <v-btn
              type="submit"
              variant="outlined"
            >
              Start game
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric, minValue, maxValue } from '@vuelidate/validators';
import Box from '@/composables/savedBox.js';

const card = ref(null);
const { width: screenWidth, height: screenHeight } = useDisplay();
const emit = defineEmits(['set-size']);
const props = defineProps({
  headerHeight: {
    type: Number,
    default: 0,
  },
});
const box = new Box('box');
const { boxHeight, boxWidth } = box.getSavedBox();
const cardHeight = ref(0);
const maxBoxHeight = ref(0);
// Box width counted in square units
const maxBoxWidth = Math.floor(screenWidth.value / 36);

const boxSize = reactive({
  height: boxHeight > maxBoxHeight.value ? 0 : boxHeight,
  width: boxWidth > maxBoxWidth ? 0 : boxWidth,
});
const rules = {
  height: { required, numeric, minValue: minValue(1), maxValue: maxValue(maxBoxHeight) },
  width: { required, numeric, minValue: minValue(1), maxValue: maxValue(maxBoxWidth) },
};
const v$ = useVuelidate(rules, boxSize);

const onSetSize = async () => {
  const isFormValid = await v$.value.$validate();

  if (isFormValid) {
    emit('set-size', { boxHeight: boxSize.height, boxWidth: boxSize.width });
  }
}

onMounted(() => {
  cardHeight.value = card.value.$el.clientHeight;

  // use the screen height without header and card, divided on the size of one square item
  maxBoxHeight.value = Math.floor((screenHeight.value - cardHeight.value - props.headerHeight) / 36);
})
</script>
