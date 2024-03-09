<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import testpage from '@/router/testpage';
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/svg/054-worried-face.svg"
      width="125"
      height="125"
    /> -->

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <RouterLink v-for="(item, i) in testpage" :to="item.path">{{ item.name }}</RouterLink>
        <!-- <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/classstyle"> ClassStyle </RouterLink>
        <RouterLink to="/computed"> computed </RouterLink>
        <RouterLink to="/watch"> watch </RouterLink>
        <RouterLink to="/vforobject"> vforobject </RouterLink>
        <RouterLink to="/domref"> domref </RouterLink>
        <RouterLink to="/usecomponents"> usecomponents-emit&props </RouterLink>
        <RouterLink to="/usecomponents1"> usecomponents1-slot </RouterLink>
        <RouterLink to="/provideinject"> provide inject </RouterLink>
        <RouterLink to="/animation">animation</RouterLink>
        <RouterLink to="animationscroll">animationscroll</RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
