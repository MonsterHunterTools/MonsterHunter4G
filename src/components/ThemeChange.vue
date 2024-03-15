<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi mdi-theme-light-dark" v-bind="props"></v-btn>
    </template>
    <v-card class="mx-auto" min-width="300">
      <v-list @click:select="onSelectTheme" nav>
        <v-list-item v-for="(item, i) in themeList" :key="i" :value="i" :active="item.select">
          <v-icon :icon="'mdi ' + item.icon"></v-icon>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from 'vuetify';
const theme = useTheme();
const localLang = localStorage.getItem('theme') || 'dark';
theme.global.name.value = localLang;

const onSelectTheme = (items: any) => {
  themeList.value.forEach((item, i) => {
    if (i == items.id) {
      item.select = true;
      theme.global.name.value = item.name;
      localStorage.setItem('theme', item.name);
    } else {
      item.select = false;
    }
  });
};
const items = [
  {
    title: 'dark',
    name: 'dark',
    icon: 'mdi-weather-night',
    select: false
  },
  {
    title: 'light',
    name: 'light',
    icon: 'mdi-weather-sunny',
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
const themeList = ref(items);
//   const props = withDefaults(defineProps<PropsData>(), {
//     msg: '默认值',
//     num: 0
//   });
//   const emit = defineEmits<{
//     getchangename: [id: number];
//   }>();
</script>
<style lang="scss" scoped></style>
