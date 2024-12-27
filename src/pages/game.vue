<template>
  <div
    ref="header"
    class="d-flex justify-space-between pa-4"
  >
    <h2>Game</h2>
    <v-btn
      type="button"
      @click="onLogout"
    >
      Logout
    </v-btn>
  </div>
  <size-form
    :header-height="headerHeight"
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
import { nextTick, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Box from '@/composables/savedBox.js';

export default {
  setup() {
    const box = new Box('box');
    const { boxHeight, boxWidth } = box.getSavedBox();
    const rows = ref(boxHeight);
    const columns = ref(boxWidth);
    const header = ref(null);
    const headerHeight = ref(0);
    const router = useRouter();

    const onSetSize = async (boxSize) => {
      // force rerender of the container to drop the blocks color to default
      rows.value = 0;
      await nextTick();
      rows.value = boxSize.boxHeight;
      columns.value = boxSize.boxWidth;
      box.saveBox(boxSize);
    }

    const onLogout = () => {
      box.clearBox();
      router.push('/');
    }

    onMounted(() => {
      headerHeight.value = header.value.clientHeight;
    })

    return { header, headerHeight, onSetSize, onLogout, rows, columns }
  }
}
</script>
