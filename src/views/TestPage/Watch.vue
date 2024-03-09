<template>
  <div @click="changenum">
    num++ <br />
    num1随机加减判断
  </div>
  <div @click="changeself" style="margin-top: 20px">更改自身？</div>
  <div>
    {{ numshow }}
  </div>
  <div @click="changedeepobject">深度监听{{ deepdatacheck }}</div>
  <div @click="changedeepobjectunchange">深度监听未改变{{ deepdatacheck }}</div>
  <h2>及时监听watchEffect</h2>
  <template v-for="branch in branches">
    <input type="radio" :id="branch" :value="branch" name="branch" v-model="currentBranch" />
    <label :for="branch">{{ branch }}</label>
  </template>
  <p>vuejs/vue@{{ currentBranch }}</p>
  <ul>
    <li v-for="{ html_url, sha, author, commit } in commits">
      <a :href="html_url" target="_blank" class="commit">{{ sha.slice(0, 7) }}</a>
      <!-- - <span class="message">{{ truncate(commit.message) }}</span><br> -->
      by
      <span class="author">
        <a :href="author.html_url" target="_blank">{{ commit.author.name }}</a>
      </span>
      <!-- at <span class="date">{{ formatDate(commit.author.date) }}</span> -->
    </li>
  </ul>
</template>
<script setup lang="ts">
import {
  inject,
  ref,
  reactive,
  shallowReactive,
  computed,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  onServerPrefetch
} from 'vue';

const num = ref(0);
const num1 = ref(0);
const objectdata = reactive({
  count: 0,
  countunchange: 0
});
const numshow = ref('点击判断num1加减');
const deepdatacheck = ref('');
const changenum = function () {
  const valuetf = Math.random() < 0.5;
  num.value++;
  num1.value = valuetf ? num1.value + 1 : num1.value - 1;
  console.log(num1.value);
};
const changeself = function () {
  num.value = Math.random();
  console.log(num.value);
};
const changedeepobject = function () {
  objectdata.count++;
};
const changedeepobjectunchange = function () {
  objectdata.countunchange--;
};
// 监听多个
watch([num, num1], (newValue, oldValue) => {
  console.log(`newValue,oldValue`, newValue, oldValue);
  numshow.value = newValue[1] > oldValue[1] ? '+++' : newValue[1] == oldValue[1] ? '值未变' : '---';
});
// 监听深层对象指定值
// 谨慎使用

// 深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
watch(
  () => objectdata.count,
  (newValue, oldValue) => {
    console.log(`objectdata.count`, newValue, oldValue);
    deepdatacheck.value = `deepdatacheck${newValue}`;
    // 仅当 objectdata.count 被替换时触发
  }
);

// 及时监听---immediate: true
watch(
  num,
  (newValue, oldValue) => {
    // 立即执行，
    console.log(`newValue,oldValue`, newValue, oldValue);
  },
  { immediate: true }
);

// 及时监听-并无需指定监听值
// 如果你需要侦听一个嵌套数据结构中的几个属性，watchEffect() 可能会比深度侦听器更有效，因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性。
const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`;
const branches = ['main', 'v2-compat'];
const currentBranch = ref(branches[0]);
const commits = ref(null) as any;
watchEffect(async () => {
  // 该 effect 会立即运行，
  // 并且在 currentBranch.value 改变时重新运行
  const url = `${API_URL}${currentBranch.value}`;
  commits.value = await (await fetch(url)).json();
});

// 定时器中启动异步监听需要清除
// 避免内存泄漏
// setTimeout(() => {
const unwatch = watchEffect(() => {});
// }, 100)
onMounted(() => {});
onUnmounted(() => {
  try {
    unwatch();
  } catch (error) {}
});
</script>
<style lang="scss" scoped></style>
