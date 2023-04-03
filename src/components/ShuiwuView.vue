<script setup lang="ts">
import { ref } from 'vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import {useDataStore} from '@/stores/counter'
const data = useDataStore().data
const size = ref<SizeType>('large')
</script>

<template>
    <a-divider />
  <a-row><h3>{{data.shuiwu[1].name}}</h3></a-row>
  <a-row>
    <a-col v-for='item in data.shuiwu'>
      <a :href='item.id' target="_blank"><a-button type="primary" shape="round" :size="size">{{item.name}}</a-button></a>
    </a-col>
  </a-row>
</template>

<style scoped>
</style>
