<script setup lang="ts">
import { ref } from 'vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
const size =  ref<SizeType>('large')
</script>

<template>
  <h1>帮办指引</h1>
  <RouterLink to="/Content/Dianzizhizhao"><a-button type="normal" shape="round" :size="size">
    电子营业执照
  </a-button></RouterLink>

  <RouterLink to="/Content/Shipinxinban"><a-button type="normal" shape="round" :size="size">
    食品经营许可证新办
  </a-button></RouterLink>

  <RouterView />
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
