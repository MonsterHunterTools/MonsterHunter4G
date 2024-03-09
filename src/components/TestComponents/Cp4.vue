<template>
  <div style="margin-top: 20px; border-top: 1px solid #aefe7f">
    <slot name="slotname1" :namevalue="name"> </slot>
    <slot :namevalue1="namevalue1"></slot>
  </div>
</template>
<script setup lang="ts">
import {
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
export interface PropsData {
  msg?: string;
  num?: number; //?非必传
}
const props = withDefaults(defineProps<PropsData>(), {
  msg: '默认值',
  num: 0
});
const emit = defineEmits<{
  getchangename: [id: number];
}>();
const name = ref('测试传参');
const namevalue1 = ref('测试传参1');
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
