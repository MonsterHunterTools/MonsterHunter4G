<template>
  <div>
    <button @click="openchildWindow">创建子窗口11211</button>
  </div>
</template>
<script setup lang="ts">
import {
  provide,
  inject,
  ref,
  reactive,
  shallowReactive,
  computed,
  watch,
  onMounted,
  onUnmounted,
  onServerPrefetch
} from 'vue';
// import { ipcRenderer } from 'electron';
const { ipcRenderer } = require('electron');
const openchildWindow = function () {
  try {
    ipcRenderer.send('open-sub-window', 'testelectronchild');
  } catch (error) {}
};
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
