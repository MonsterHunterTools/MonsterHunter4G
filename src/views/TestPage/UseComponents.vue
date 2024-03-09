<template>
  <div>
    <Cp1 :name="cpname" @getchangename="getchangename" class="classtextcolor" />
    <Cp2 v-model:test-name.setlowcase="cpname2" @changename="changename" />
    <Cp2 v-model:test-name.setupcase="cpname2" :tips="tips" @changename="changename" />
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
import Cp1 from '@/components/TestComponents/Cp1.vue';
import Cp2 from '@/components/TestComponents/Cp2.vue';
const cpname = ref('测试传值');
const cpname2 = ref('v-model带修饰符 使用：v-model: 不能简写：');
const tips = ref('将输入框的小写转为大写');
const getchangename = function (ed: any) {
  cpname.value = `测试传值 ++ ${ed}`;
  console.log(ed);
};
const changename = function (value: string) {
  cpname2.value = value;
};
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped>
:deep(.classtextcolor) {
  margin-bottom: 20px;
}
</style>
