<template>
  <v-toolbar image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" dark prominent>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>../assets/logo.png</v-toolbar-title>

    <v-spacer></v-spacer>

    <template #append>
      <LanguageChange />
      <ThemeChange />
      <!-- <v-switch v-model="defaultTheme" hide-details></v-switch> -->
    </template>
  </v-toolbar>
</template>
<script setup lang="ts">
import LanguageChange from '@/components/LanguageChange.vue';
import ThemeChange from '@/components/ThemeChange.vue';
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
// import { storeToRefs } from 'pinia';
// import { useExampleStore } from '@/stores/example-pinia';
import { useRoute, useRouter } from 'vue-router';
// import { ElMessage } from 'element-plus';
// const store = useExampleStore();
// const { exampleData } = storeToRefs(store);
import { useTheme } from 'vuetify';
const defaultTheme = ref('light');
const theme = useTheme();
watch(
  defaultTheme,
  (newValue, oldValue) => {
    theme.global.name.value = newValue ? 'dark' : 'light';
  },
  { immediate: true }
);
const route = useRoute(); // route.query.exampleId
const router = useRouter();
const toExamplePage = () => {
  router.push({
    path: '/example',
    query: {
      exampleId: 'exampleId'
    }
  });
};

onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="scss" scoped></style>
