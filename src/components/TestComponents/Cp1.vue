<template>
  <div>
    {{ props.name }}
    {{ props.msg }}
  </div>
  <button @click="changenamebyfather">改变名字</button>
  <div :class="$attrs.class">
    <span>自定义数据修饰符：</span>
    <input type="text" />
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
import type { Ref } from 'vue';
// 标注props类型方式 TS
// 1 泛型
// const props = defineProps<{
//   name: string;
//   num?: number; //?非必传
// }>();
// 2 单独命名引用、、目前这样写Volar会报错：模块的默认导出具有或正在使用专用名称“PropsData”。ts(4082) 解决方式：tsconfig.app.json去除"composite": true,
// export interface PropsData {
//   name: string;
//   num?: number; //?非必传
// }
// const props = defineProps<PropsData>();
// 3 解构并设置props默认值
export interface PropsData {
  msg?: string;
  name: string;
  num?: number; //?非必传
}
const props = withDefaults(defineProps<PropsData>(), {
  msg: 'withDefaults解构赋默认值',
  name: 'name',
  num: 0
});
// 注册事件TS的3种方式
// 运行时
// const emit = defineEmits(['getchangename', 'update']);

// 基于类型
// const emit1 = defineEmits<{
//   (e: 'change', id: number): void;
//   (e: 'update', value: string): void;
// }>();

// // 3.3+: 可选的、更简洁的语法
const emit = defineEmits<{
  getchangename: [id: number];
  update: [value: string];
}>();

const cnum: Ref<number> = ref(0);

const changenamebyfather = function () {
  emit('getchangename', cnum.value++);
};
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
