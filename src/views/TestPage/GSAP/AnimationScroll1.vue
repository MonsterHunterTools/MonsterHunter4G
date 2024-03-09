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
      <div
        class="svgpathto"
        style="height: 200px; width: 200px; border-radius: 20px; background-color: bisque"
      ></div>
      <div
        class="draggablebox"
        style="height: 200px; width: 200px; border-radius: 20px; background-color: beige"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger, MotionPathPlugin, Draggable } from 'gsap/all';
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
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Draggable);
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
      //   toggleActions: 'restart',
      //   start: 'center 100px',
      start: 'top 95%', ///第一个参数相对于元素位置 top 或end , 第二个参数相对于监听整个浏览器窗口的起始结束视点,开启markers属性可以看的更直观
      end: 'bottom center',
      id: 'testid',
      //   markers: true, //起始位置标注
      scrub: 1 //延迟1秒执行 scrub 到end才结束
    },
    x: 400,
    rotation: 360,
    duration: 2
  });
  //   SVG路径
  gsap.to('.svgpathto', {
    motionPath: {
      path: 'm128.26105,152.17314c98.54919,117.39068 -43.47821,282.6084 -57.97096,395.65176c-14.49275,113.04336 2.89855,244.92729 210.14471,291.30405c207.24617,46.37676 208.69544,184.05778 179.70996,237.68091c-28.98548,53.62314 -146.37666,163.76795 -321.7388,86.95644c-175.36213,-76.81152 -85.50715,-217.39108 0,-317.39098c85.50716,-99.9999 289.85478,-15.94201 357.97065,-144.92739c68.11587,-128.98537 121.739,-284.05768 -15.94201,-359.41992c-68.84051,-37.68112 -218.11572,112.68104 -234.78237,300.90549c-16.66665,188.22444 99.27526,414.31117 143.47811,533.87626'
    },
    scrollTrigger: {
      trigger: '.svgpathto',
      start: 'top 187px',
      end: '+=1200',
      id: 'ccc',
      markers: true, //起始位置标注
      scrub: 1
    },
    transformOrigin: '50% 50%',
    duration: 5,
    ease: 'Power0.easeIn'
  });
  //   拿捏
  Draggable.create('.draggablebox', {
    // bounds: '#smooth-content',
    type: 'rotation',
    inertia: true
  });
});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
