<template>
  <div>
    如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 $attrs
    属性来实现指定
  </div>
  <div :class="$attrs.class">
    注意： 主组件 style不能阻断 scoped
    <br />如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 $attrs
    属性来实现指定
  </div>
  <div>
    如果你的组件有多个根元素，你将需要指定哪个根元素来接收这个 class。你可以通过组件的 $attrs
    属性来实现指定
  </div>
</template>
<script setup lang="ts">
import { inject, ref, reactive, shallowReactive, computed, onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {});
onBeforeUnmount(() => {});
</script>
<style lang="scss" scoped></style>
