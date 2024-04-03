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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const rows = ref(0);
    const columns = ref(0);
    const router = useRouter();

    const onSetSize = (box) => {
      rows.value = box.height;
      columns.value = box.width;
    }

    const onLogout = () => {
      router.push('/');
    }

    return { onSetSize, onLogout, rows, columns }
  }
}
</script>