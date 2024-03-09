<template>
  <div>
    <button @click="computedclick">computed</button>
    <div>{{ computedtest }}</div>
    <div :class="setdatainit(1)">
      {{ computedchange }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, ref, reactive, shallowReactive, computed, onMounted, onBeforeUnmount } from 'vue';

const testdata = reactive({
  name: '测试计算属性',
  arrdata: [
    {
      num: 0
    }
  ]
});
const timenum = ref(0);
const computedclick = function () {
  testdata.arrdata[0].num = testdata.arrdata[0].num == 1 ? 0 : 1;
};
const computedtest = computed(() => {
  return testdata.arrdata[0].num == 0
    ? `原始数据${testdata.arrdata[0].num}`
    : `修改后数据${testdata.arrdata[0].num}`;
});
// 传参数

const setdatainit = computed(() => (index: any) => {
  return index % 2 == 0 ? 'test2' : 'test1';
});
const computedchange = computed({
  get() {
    console.log('get');
    return timenum.value;
  },
  set(newValue) {
    console.log('newValue', newValue);
    timenum.value = newValue - 2;
  }
});
setInterval(() => {
  console.log('timeout');

  computedchange.value = timenum.value;
  timenum.value++;
}, 1000);
onMounted(() => {});
onBeforeUnmount(() => {});
</script>
<style lang="scss" scoped>
.test2 {
  background-color: aquamarine;
}
.test1 {
  background-color: rgba(104, 201, 95, 0.658);
}
</style>
