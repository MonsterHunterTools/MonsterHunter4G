<script setup lang="ts">
import ToolBars from '@/components/layout/ToolBars.vue';
import { RouterLink, RouterView } from 'vue-router';
import testpage from '@/router/pageList';
</script>

<template>
  <ToolBars />
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink v-for="(item, i) in testpage" :to="item.path">{{ item.name }}</RouterLink>
      </nav>
    </div>
  </header> -->
  <div id="defaultBox">
    <RouterView />
  </div>
</template>

<style scoped>
#defaultBox {
  height: calc(100vh - 64px);
}
</style>
