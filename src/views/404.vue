<template>
  <div>404</div>
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
// import { storeToRefs } from 'pinia';
// import { useExampleStore } from '@/stores/example-pinia';
import { useRoute, useRouter } from 'vue-router';
// import { ElMessage } from 'element-plus';
// const store = useExampleStore();
// const { exampleData } = storeToRefs(store);
const route = useRoute(); // route.query.exampleId
const router = useRouter();
const toExamplePage = () => {
  router.push({
    path: '/example',
    query: {
      exampleId: 'exampleId'
    }
  });
};

onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
