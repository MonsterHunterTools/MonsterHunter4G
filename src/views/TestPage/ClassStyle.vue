<template>
  <div :class="classlist"></div>
  <ClassStyle class="classtextcolor" />
  <div :style="{ display: 'flex', alignItems: 'center' }">
    <div>多值绑定同理 class</div>
    <div>多值绑定同理 class</div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { inject, ref, reactive, shallowReactive, computed, onMounted, onBeforeUnmount } from 'vue';
import ClassStyle from '@/components/ClassStyle.vue';
const classlist = reactive({
  'class-bgcolor': true,
  classtextcolor: false
});
onMounted(() => {});
onBeforeUnmount(() => {});
</script>
<style lang="scss">
.classtextcolor {
  color: cadetblue;
}
</style>
<style lang="scss" scoped>
.class-bgcolor {
  background-color: aquamarine;
}
// 样式穿透 :deep(样式名) {}
:deep(.rowbg1) {
  background-color: #aeee7f;
}
</style>
