<template>
  <!-- overflow-y: scroll -->
  <div id="smooth-wrapper" style="height: 900px">
    <div id="smooth-content" style="height: 3000px; position: relative">
      <div
        class="rotate"
        style="
          height: 200px;
          width: 200px;
          border-radius: 20px;
          background-color: aquamarine;
          position: absolute;
          top: 1000px;
          left: 0px;
        "
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Lenis from '@studio-freight/lenis';
import {
  provide,
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
// AnimationScroll
gsap.registerPlugin(ScrollTrigger);
let lenis: any;
onMounted(() => {
  lenis = new Lenis({
    // content: document.getElementById('smooth-wrapper'), //监听 元素
    duration: 1.5 // 滚动持续时间
  });
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const test1 = gsap.to('.rotate', {
    scrollTrigger: {
      trigger: '.rotate',
      toggleActions: 'restart',
      markers: true, //起始位置标注
      scrub: 2 //延迟1秒执行
    },
    x: 400,
    rotation: 360,
    duration: 2
  });
});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
