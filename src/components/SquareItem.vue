<template>
  <div
    class="item"
    :class="{ 'active': isActive }"
    :onmouseenter="handleSquareColor"
  />
</template>
<script setup>
import { ref } from 'vue';

const isActive = ref(false);
const handleSquareColor = () => {
  isActive.value = !isActive.value;
}
</script>
<style scoped lang="scss">
.item {
  width: 36px;
  height: 36px;
  background-color: white;

  &.active {
    background-color: blue;
  }
}
</style>