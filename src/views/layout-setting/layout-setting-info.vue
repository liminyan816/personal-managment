<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
    }"
  >
    <MyInfo :showAddress="showAddress"></MyInfo>
  </div>
</template>

<script setup lang="ts">
import MyInfo from '../../components/my-info/my-info.vue';
const showAddress = ref(true);
</script>

<style scoped></style>
