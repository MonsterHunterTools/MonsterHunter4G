<template>
  <div id="scoreboard">
    {{ resultdata }}
  </div>
</template>
<script setup lang="ts">
import { inject, ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router';
import { WSInit } from '../../utils/websocket';

const $axios: any = inject('$axios');

let tableData = ref([] as any); //表数据
let questionsNum = ref(0 as number); //总题目数量
let newfordata = ref([] as any);
let resultdata = ref([] as any);

let WS: WebSocket | null = new WebSocket(import.meta.env.VITE_API_BASE_WS);

const sendHeartBeat = function () {};
const receiveMsg = function () {};
const reconnectWs = function () {};
// 生命周期钩子
onMounted(() => {
  $axios.getTest('testdata').then((res: any) => {
    console.log('res', res);
    tableData.value = [...res.data];
    questionsNum.value = 0;
    res.data.forEach((item: any, i: any) => {
      if (item.gametype > questionsNum.value) {
        questionsNum.value = item.gametype;
      }
    });
    questionsNum.value++;
    console.log('questionsNum', questionsNum.value);
    for (let index = 1; index <= questionsNum.value; index++) {
      newfordata.value.push({
        lable: `问答游戏${index}`
      });
    }
    console.log('newfordata', newfordata.value);
    const transformedData = res.data.reduce(
      (
        acc: { [x: string]: { [x: string]: { correct_count: any; incorrect_count: any } } },
        obj: {
          accuracy: any;
          devicename: any;
          gametype: any;
          correct_count: any;
          incorrect_count: any;
          id: any;
        }
      ) => {
        const { accuracy, devicename, gametype, correct_count, incorrect_count, id } = obj;

        if (!acc[devicename]) {
          acc[devicename] = { accuracy, devicename, id };
        }

        acc[devicename][`gametype${gametype}`] = { correct_count, incorrect_count };

        return acc;
      },
      {}
    );
    resultdata.value = Object.values(transformedData);
    console.log(resultdata.value);
  });
  WSInit(WS, 'create', 5000, sendHeartBeat, receiveMsg, reconnectWs);
});
onBeforeUnmount(() => {
  WSInit(WS, 'close');
  WS = null;
});
</script>
<style lang="scss" scoped>
#scoreboard {
  height: 100vh;
  width: 100vw;
}
</style>
