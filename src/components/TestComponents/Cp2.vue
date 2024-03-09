<template>
  <div>
    {{ props.testName }}
    <p>{{ props.tips }}</p>
    <input :value="props.testName" @input="changeinput" type="text" name="" id="" />
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
  // 带修饰符写法
  testName?: string;
  testNameModifiers?: { setlowcase: boolean; setupcase: boolean };
  tips?: string;
}
const props = withDefaults(defineProps<PropsData>(), {
  msg: '默认值',
  num: 0,
  tips: '将输入框的大写转为小写'
});
const emit = defineEmits<{
  changename: [value: string];
}>();
const changeinput = function (e: Event) {
  // console.log((e.target as HTMLInputElement).value);
  let upvalue = (e.target as HTMLInputElement).value;
  if (props.testNameModifiers?.setlowcase) {
    upvalue = upvalue.toLowerCase();
  }
  if (props.testNameModifiers?.setupcase) {
    upvalue = upvalue.toUpperCase();
  }
  console.log(upvalue);
  emit('changename', upvalue);
};
console.log(props.testNameModifiers, props.testName);
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
