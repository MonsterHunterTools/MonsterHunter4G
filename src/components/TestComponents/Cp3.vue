<template>
  <div style="margin-bottom: 20px; border-bottom: 2px solid #aeee7f">
    child内容
    <slot>
      <div>默认内容</div>
    </slot>
    <slot name="slottest1"></slot>
    <slot name="slottest"></slot>
    <slot name="slottest2"></slot>
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

onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
