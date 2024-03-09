<template>
  <div>
    <p>依赖注入(provide inject)，解决多层组件嵌套传值问题</p>
    <button @click="numset">点击+1</button>
    <ProvideInject2 />
  </div>
</template>
<script setup lang="ts">
import ProvideInject2 from './ProvideInject2.vue';
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
export interface PropsData {
  msg?: string;
  num?: number; //?非必传
}
const props = withDefaults(defineProps<PropsData>(), {
  msg: '默认值',
  num: 0
});
const emit = defineEmits<{
  changenum: [num?: number];
}>();

const numset = function () {
  emit('changenum');
};
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
