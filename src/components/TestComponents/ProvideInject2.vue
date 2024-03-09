<template>
  <div>孙组件{{ fatherdata }}@@@@@@@{{ Keyfatherdata2 }}</div>
  <div>
    孙组件多值，借用主组件函数:
    <button @click="changenum">点击--&nbsp; | &nbsp;{{ fatherdatas }}</button>
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
export interface PropsData {
  msg?: string;
  num?: number; //?非必传
}
import { Keyfatherdatainit, Keyfatherdatainit1 } from '@/utils/InjectionKeyType';
const props = withDefaults(defineProps<PropsData>(), {
  msg: '默认值',
  num: 0
});
const emit = defineEmits<{
  getchangename: [id: number];
}>();
// 接收主组件的传值
// 1
// const fatherdata = inject('fatherdata');
// 2 设置默认值
const fatherdata = inject('fatherdata', 1);
// 3 。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值
// const value = inject('fatherdata', () => new ExpensiveClass(), 0)

// 解构接收多值传送
const { fatherdatas, changefather } = inject(Keyfatherdatainit);
const Keyfatherdata2 = inject(Keyfatherdatainit1);
function changenum() {
  changefather();
}
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
