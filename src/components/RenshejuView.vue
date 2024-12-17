<script setup lang="ts">
import { ref } from 'vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import { useDataStore } from '@/stores/counter';
const data = useDataStore().data;
const size = ref<SizeType>('large');
</script>

<template>
  <a-divider />
  <a-row><h3>自助经办平台</h3></a-row>
  <a-row>
    <a-col
      ><a :href="data.rensheju.id" target="_blank"
        ><a-button type="primary" shape="round" :size="size">{{ data.rensheju.name }}</a-button></a
      ></a-col
    >
  </a-row>
</template>

<style scoped></style>
