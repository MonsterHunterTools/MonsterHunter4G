<template>
  <div>
    <button @click="refnameinput!.focus()">点击聚焦</button>
    <input
      style="transition: all ease-in-out 0.5s"
      :autofocus="false"
      type="text"
      ref="refnameinput"
    />
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
let changebackgroundcolortime: number;
// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
// 注意，你只可以在组件挂载后(onMounted)才能访问模板引用。
const refnameinput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  changebackgroundcolortime = setInterval(() => {
    refnameinput.value!.style.background = `#00${Math.floor(Math.random() * 10)}0006e`;
  }, 500);
});
onUnmounted(() => {
  console.log('unmounted');
  clearInterval(changebackgroundcolortime);
});
</script>
<style lang="scss" scoped></style>
