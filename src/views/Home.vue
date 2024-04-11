<template>
  <div id="home">
    <h2 style="font-weight: 700; font-size: 36px">R.I.P.</h2>
    <h1 style="font-weight: 600">MonsterHunter 4G 4U</h1>
    <div>2014-10-11 —— 2024-04-09</div>
    <div>2015-02-13 —— 2024-04-09</div>
    <div>{{ endingTimeInit }}</div>
    <div>
      {{ TimesInit }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
const endingTimeInit = '2024-04-09-08:00:00';
const endingTime = new Date('2024-04-09T08:00:00').getTime();
let TimesInit = ref('');
function updateElapsedTime() {
  // 获取当前时间的时间戳
  const currentDateTime = new Date().getTime();

  // 计算时间差值（毫秒）
  const timeDiff = currentDateTime - endingTime;

  // 将毫秒转换为分钟、秒
  let minutesPassed = Math.floor(timeDiff / (1000 * 60));
  let secondsPassed = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // 判断是否超过60分钟
  if (minutesPassed >= 60) {
    let hoursPassed = Math.floor(minutesPassed / 60);
    minutesPassed = minutesPassed % 60;

    // 判断是否超过24小时
    if (hoursPassed >= 24) {
      let daysPassed = Math.floor(hoursPassed / 24);
      hoursPassed = hoursPassed % 24;

      // 判断是否是闰年
      const currentYear = new Date().getFullYear();
      const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0;
      const daysInYear = isLeapYear ? 366 : 365;

      if (daysPassed >= daysInYear) {
        const yearsPassed = Math.floor(daysPassed / daysInYear);
        daysPassed = daysPassed % daysInYear;

        return `${yearsPassed} year ${daysPassed} day ${hoursPassed.toString().padStart(2, '0')}:${minutesPassed.toString().padStart(2, '0')}:${secondsPassed.toString().padStart(2, '0')}`;
      }
      return `${daysPassed} day ${hoursPassed.toString().padStart(2, '0')}:${minutesPassed.toString().padStart(2, '0')}:${secondsPassed.toString().padStart(2, '0')}`;
    }
    return `${hoursPassed.toString().padStart(2, '0')}:${minutesPassed.toString().padStart(2, '0')}:${secondsPassed.toString().padStart(2, '0')}`;
  }
  return `${minutesPassed.toString().padStart(2, '0')}:${secondsPassed.toString().padStart(2, '0')}`;
}
const RipTime = setInterval(() => {
  TimesInit.value = updateElapsedTime();
}, 1000);
onMounted(() => {});
onUnmounted(() => {
  if (RipTime) {
    clearInterval(RipTime);
  }
});
</script>
<style lang="scss" scoped>
#home {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
