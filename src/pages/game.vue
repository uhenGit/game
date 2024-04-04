<template>
  <div class="d-flex justify-space-between pa-4">
    <h2>Game</h2>
    <v-btn
      type="button"
      @click="onLogout"
    >
      Logout
    </v-btn>
  </div>
  <size-form
    @set-size="onSetSize"
  />
  <div
    v-if="rows"
    class="container"
  >
    <v-card class="d-flex flex-column justify-center align-center">
      <div
        v-for="(row) in rows"
        :key="row"
        class="d-flex"
      >
        <square-item
          v-for="(item) in columns"
          :key="item"
        />
      </div>
    </v-card>
  </div>
</template>
<script>
import { nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import Box from '@/composables/savedBox.js';

export default {
  setup() {
    const box = new Box('box');
    const { height, width } = box.getSavedBox();
    const rows = ref(height);
    const columns = ref(width);
    const router = useRouter();

    const onSetSize = async (boxSize) => {
      // force rerender of the container to drop the blocks color to default
      rows.value = 0;
      await nextTick();
      rows.value = boxSize.height;
      columns.value = boxSize.width;
      box.saveBox(boxSize);
    }

    const onLogout = () => {
      box.clearBox();
      router.push('/');
    }

    return { onSetSize, onLogout, rows, columns }
  }
}
</script>
