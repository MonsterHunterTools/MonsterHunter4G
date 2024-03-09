<template>
  <div>插槽</div>

  <Cp3>
    <div>{{ slottip }}</div>
  </Cp3>
  <Cp3> </Cp3>
  <Cp3>
    <template #slottest> <div style="background-color: #aeee7f">具名插槽</div> </template>
    <template #slottest1> <div style="background-color: #af1e7f">具名插槽1</div> </template>
    <template #[slottest2]> <div style="background-color: #af1e7f">动态具名插槽</div> </template>
    <template v-slot:[slottest2]>
      <div style="background-color: #af1e7f">动态具名插槽1</div>
    </template>
  </Cp3>
  <!-- 插槽子组件传参 -->
  <div>
    <div>插槽子组件传参</div>
    <Cp4>
      <template #slotname1="slotname1">
        <div>具名作用域传参:</div>
        <div>
          {{ slotname1 }}
        </div>
      </template>
    </Cp4>
    <Cp4 v-slot="slotname1">
      <div>整体作用域传参:</div>
      <div>
        {{ slotname1 }}
      </div>
    </Cp4>
    <Cp4 v-slot="{ namevalue1 }">
      <div>整体作用域传参（解构）:</div>
      <div>
        {{ namevalue1 }}
      </div>
    </Cp4>
  </div>
</template>
<script setup lang="ts">
import Cp3 from '@/components/TestComponents/Cp3.vue';
import Cp4 from '@/components/TestComponents/Cp4.vue';
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
const slottip = ref('插槽');
const slottest2 = ref('slottest2');
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
