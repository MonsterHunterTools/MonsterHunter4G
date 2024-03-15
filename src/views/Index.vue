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

  <RouterView />
</template>

<style scoped></style>
