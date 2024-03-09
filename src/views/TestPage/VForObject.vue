<template>
  <li v-for="(value, key, index) in myObject">{{ index }}. {{ key }}: {{ value }}</li>
</template>
<script setup lang="ts">
import { inject, ref, reactive, shallowReactive, computed, onMounted, onBeforeUnmount } from 'vue';
const myObject = reactive({
  title: '遍历对象',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
});
onMounted(() => {});
onBeforeUnmount(() => {});
</script>
<style lang="scss" scoped></style>
