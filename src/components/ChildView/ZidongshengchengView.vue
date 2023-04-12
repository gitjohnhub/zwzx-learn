<script setup lang="ts">
import { ref } from 'vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
const size =  ref<SizeType>('large')
</script>

<template>
  <h1>自动生成</h1>
  <h3>*使用须知：仅生成基础模版，请按照实际情况修改，如有不清楚请打印后拿给窗口老师指导修改，具体内容以窗口老师为准，本自动生成器不承担任何责任</h3>
  <a-row>
    <RouterLink to="/Zidongshengcheng/zcxza"><a-button type="normal" shape="round" :size="size">
    章程修正案
  </a-button></RouterLink>
  <RouterLink to="/Zidongshengcheng/gudongjueding"><a-button type="normal" shape="round" :size="size">
    法人变更股东决定
  </a-button></RouterLink>
  <RouterLink to="/Zidongshengcheng/Guquanbiangeng"><a-button type="normal" shape="round" :size="size">
    股权变更
  </a-button></RouterLink>
  </a-row>
  <a-row style="margin-top: 20px;">
    <RouterView />

  </a-row>


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
