<template>
  <div id="audioinit"></div>
  <div id="canvasinit"></div>
  <!-- <audio controls id="audioplay" :src="WelcomeToNewYork"></audio> -->
  <button @click="startaudiodream(SeaSideRoad)">SeaSideRoad</button>
  <!-- <button @click="startaudiodream(WelcomeToNewYork)">WelcomeToNewYork</button>
  <button @click="startaudiodream(Red)">Red</button>
  <button @click="startaudiodream(BlankSpace)">BlankSpace</button>
  <button @click="startaudiodream(PuppyLove)">PuppyLove</button>
  <button @click="startaudiodream(RedTaylor)">RedTaylor</button>
  <button @click="startaudiodream(TwentyTwo)">TwentyTwo</button>
  <button @click="startaudiodream(WeAreNeverEverGettingBackTogether)">
    WeAreNeverEverGettingBackTogether
  </button>
  <button @click="startaudiodream(BeginAgain)">BeginAgain</button>
  <button @click="startaudiodream(CruelWorld)">CruelWorld</button> -->
  <!-- <input id="loadfile" type="file" :onchange="upload" /> -->
</template>
<script setup lang="ts">
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
  onServerPrefetch,
  type HtmlHTMLAttributes
} from 'vue';
// import SeaSideRoad from '../../../assets/audios/Eshen Chen - Sea Side Road.mp3';
import SeaSideRoad from '@/assets/audios/Eshen Chen - Sea Side Road.mp3';
// import Red from '../../../assets/audios/07 Red.flac';
// import WelcomeToNewYork from "../../../assets/audios/01 Welcome To New York (Taylor's Version).flac";
// import BlankSpace from "../../../assets/audios/02 Blank Space (Taylor's Version).flac";
// import PuppyLove from '../../../assets/audios/puppy-love.mp3';
// import RedTaylor from "../../../assets/audios/2. Red (Taylor's Version).flac";
// import TwentyTwo from "../../../assets/audios/6. 22 (Taylor's Version).flac";
// import WeAreNeverEverGettingBackTogether from "../../../assets/audios/8. We Are Never Ever Getting Back Together (Taylor's Version).flac";
// import BeginAgain from "../../../assets/audios/16. Begin Again (Taylor's Version).flac";
// import CruelWorld from '../../../assets/audios/The Music of Red Dead Redemption 2 (Original Soundtrack)/13 Cruel World.flac';
let startaudiodream: any;
let AudioDom: HTMLMediaElement | null;
let audioCtx: AudioContext;
let audioSrc: any;
let analyser: any;
let voiceHeight: any;
let RAF: any;
let canvasCtx: any;
let bufferLength: any;
let canvas: any;
let canvasinit: any;
// 音频图的条数
const count = 150;
onMounted(() => {
  let audioinit = document.getElementById('audioinit') as HTMLDivElement;
  function init(srcdata: any) {
    audioinit.innerHTML = '<audio id="audioplay"></audio>';
    AudioDom = document.getElementById('audioplay') as HTMLMediaElement;
    canvasinit = document.getElementById('canvasinit') as HTMLDivElement;
    AudioDom.addEventListener(
      'ended',
      function () {
        try {
          audioSrc.disconnect();
          cancelAnimationFrame(RAF);
          AudioDom!.remove();
          AudioDom = null;
          canvasinit.removeChild(canvas);
        } catch (error) {}
      },
      false
    );
    AudioDom.src = srcdata;
    // 创建音频上下文对象
    if (!audioCtx) audioCtx = new AudioContext();

    // 断开连接
    if (audioSrc) {
      if (audioSrc.mediaElement !== AudioDom) {
        audioSrc.disconnect();
      }
    }
    // 创建媒体源,除了audio本身可以获取，也可以通过oCtx对象提供的api进行媒体源操作
    audioSrc = audioCtx.createMediaElementSource(AudioDom);
    // 创建分析机
    if (!analyser) {
      analyser = audioCtx.createAnalyser();
      // analyser.fftSize = 2048;
      analyser.fftSize = 8192;
      // 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768
    }
    bufferLength = analyser.frequencyBinCount;
    // 媒体源与分析机连接
    audioSrc.connect(analyser);
    // 输出的目标：将分析机分析出来的处理结果与目标点（耳机/扬声器）连接
    analyser.connect(audioCtx.destination);
    // 缓冲区:进行数据的缓冲处理，转换成二进制数据
    voiceHeight = new Uint8Array(bufferLength);
    // 或者转为 float32
    // voiceHeight = new Float32Array(bufferLength);

    //生成 2D canvas
    canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasinit!.appendChild(canvas);
    canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    AudioDom.play();
    drawaudio();
  }
  const drawaudio = function () {
    // 将当前的频率数据复制到传入的无符号字节数组中，做到实时连接
    analyser.getByteFrequencyData(voiceHeight);
    // 或者float32
    // analyser.getFloatFrequencyData(voiceHeight);
    // console.log(voiceHeight);
    // // 自定义获取数组里边数据的频步
    // var step = Math.round(voiceHeight.length / count);
    // // console.log('数据步速', step);

    //画一个黑色的背景
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    //绘制频谱
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let posX = 0;
    for (let i = 0; i < bufferLength; i++) {
      // const barHeight = (voiceHeight[i] + 140) * 2;
      // if (voiceHeight[i] == 110) console.log('111',voiceHeight[i]);
      const barHeight = voiceHeight[i];
      canvasCtx.fillStyle = 'rgb(' + Math.floor(barHeight + 100) + ', 50, 50)';
      // canvasCtx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
      canvasCtx.fillRect(posX, 100, barWidth, barHeight);
      canvasCtx.font = '16px Georgia';
      canvasCtx.fillStyle = 'red';
      canvasCtx.fillText(barHeight, posX, 30, 40);
      posX += barWidth + 1;
    }

    RAF = window.requestAnimationFrame(drawaudio);
  };
  startaudiodream = function (srcdata: any) {
    init(srcdata);
  };
});
onUnmounted(() => {
  try {
    cancelAnimationFrame(RAF);
    // 断开连接
    audioSrc.disconnect();
  } catch (error) {}
});
</script>
<style lang="scss" scoped></style>
