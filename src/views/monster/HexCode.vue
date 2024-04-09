<template>
  <div>
    <v-data-table-virtual :headers="monsterListHeaders" :items="monsterList" height="90vh" fixed-header item-value="id"></v-data-table-virtual>
  </div>
</template>
<script setup lang="ts">
import { provide, inject, ref, reactive, shallowReactive, computed, watch, onMounted, onUnmounted, onServerPrefetch } from 'vue';

const axios: any = inject('$axios');

const monsterList = ref([]);
const monsterListHeaders = ref([
  { title: 'code', align: 'start', key: 'id' },
  { title: 'name', align: 'end', key: 'name' }
]);
const getMonster = () => {
  axios
    .getMonster(localStorage.getItem('lang') || 'ja')
    .then((res) => {
      console.log(res);
      if (res.length > 0) {
        monsterList.value = res;
      } else {
        monsterList.value = [];
      }
    })
    .catch((err) => {
      monsterList.value = [];
    });
};
getMonster();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
