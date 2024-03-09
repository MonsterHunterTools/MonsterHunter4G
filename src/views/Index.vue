<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import testpage from '@/router/pageList';
</script>

<template>
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
