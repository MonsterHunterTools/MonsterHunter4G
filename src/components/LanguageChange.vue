<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi mdi-translate" v-bind="props"></v-btn>
    </template>
    <v-list @click:select="onSelectLang" nav>
      <v-list-item v-for="(item, i) in langList" :key="i" :value="i" :active="item.select">
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLocale } from 'vuetify';
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
export interface PropsData {
  msg?: string;
  num?: number; //?非必传
}
const { current, name } = useLocale();
const localLang = localStorage.getItem('lang') || navigator.language.replace('-', '') || 'en';
const { locale } = useI18n();
const onSelectLang = (items: any) => {
  langList.value.forEach((item, i) => {
    if (i == items.id) {
      item.select = true;
      current.value = item.title;
      locale.value = item.title;
      localStorage.setItem('lang', item.title);
    } else {
      item.select = false;
    }
  });
};
const items = [
  {
    title: 'zhCN',
    name: '简体中文',
    select: false
  },
  {
    title: 'zhTW',
    name: '繁体中文',
    select: false
  },
  {
    title: 'en',
    name: 'English',
    select: false
  },
  {
    title: 'ja',
    name: '日本語',
    select: false
  },
  {
    title: 'th',
    name: 'ไทย',
    select: false
  }
];
items.forEach((item) => {
  if (item.title == localLang) {
    item.select = true;
  } else {
    item.select = false;
  }
});
const langList = ref(items);
const props = withDefaults(defineProps<PropsData>(), {
  msg: '默认值',
  num: 0
});
const emit = defineEmits<{
  getchangename: [id: number];
}>();

onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
