<template>
  <div>
    <ProvideInject1 :num="fatherdata" @changenum="changenum" />
  </div>
</template>
<script setup lang="ts">
import {
  provide,
  inject,
  ref,
  readonly,
  reactive,
  shallowReactive,
  computed,
  watch,
  onMounted,
  onUnmounted,
  onServerPrefetch
} from 'vue';
import type { Ref } from 'vue';
import ProvideInject1 from '@/components/TestComponents/ProvideInject1.vue';
import { Keyfatherdatainit, Keyfatherdatainit1 } from '../../utils/InjectionKeyType';
const fatherdata = ref(0);
const fatherdatas = ref(0);
const fatherdatas1: any = ref(100);
// 单值提供
provide('fatherdata', fatherdata);
// 多值提供 传方法
provide(Keyfatherdatainit, {
  fatherdatas,
  changefather
});
provide(Keyfatherdatainit1, fatherdatas1);
// provide(Keyfatherdatainit1, readonly(fatherdatas1));
// 如果你想确保提供的数据不能被注入方的组件更改，你可以使用 readonly() 来包装提供的值。
function changefather() {
  fatherdatas.value--;
}
const changenum = function () {
  fatherdata.value++;
  console.log(fatherdata.value);
};
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
