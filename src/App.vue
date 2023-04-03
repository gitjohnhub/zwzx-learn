<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavView from './views/NavView.vue'
import yiwangtongban_logo2 from './assets/yiwangtongban_logo2.jpeg'
</script>

<template>
   <a-row>
    <a-col :span="8">

      <a-row><a-avatar shape="square" :src="yiwangtongban_logo2" style="margin-top: 5px;margin-left: 10px;"></a-avatar><h1>长宁区政务服务中心</h1></a-row>
      <NavView />

    </a-col>
    <a-col :span="12" style="margin-top: 10px;">

      <RouterView/>
    </a-col>
  </a-row>
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
