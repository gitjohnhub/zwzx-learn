<script setup lang="ts">
import { ref } from 'vue';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import {useDataStore} from '@/stores/counter'
const data = useDataStore().data
const size = ref<SizeType>('large')

</script>

<template>
   <a-divider />
  <a-row><h3>{{data.qiyebiangeng[0].name}}</h3></a-row>
  <a-row>
    <a-col v-for='item in data.qiyebiangeng'>
      <a :href='data.banli_url.id+item.id' target="_blank"><a-button type="primary" shape="round" :size="size">{{item.name}}</a-button></a>
    </a-col>
    <a-col><a :href='data.zhangchengfanben.id' target="_blank"><a-button type="primary" shape="round" :size="size">{{data.zhangchengfanben.name}}</a-button></a></a-col>
  </a-row>

  <a-divider />
  <a-row ><h3>食品经营许可</h3></a-row>
  <a-row >
    <a-col v-for='item in data.shipin'>
      <a :href='data.banli_url.id+item.id' target="_blank"><a-button type="primary" shape="round" :size="size">{{item.name}}</a-button></a>
    </a-col>
  </a-row>
  <a-row style="margin-top: 10px;">
    <a-col><a :href='data.yubaozhuangchaxun.id' target="_blank"><a-button type="primary" shape="round" :size="size">{{data.yubaozhuangchaxun.name}}</a-button></a></a-col>
  </a-row>

  <a-divider />
  <a-row><h3>《酒类商品零售许可证》审批</h3></a-row>
  <a-row>
    <a-col v-for='item in data.jiulei'>
      <a :href='data.banli_url.id+item.id' target="_blank"><a-button type="primary" shape="round" :size="size">{{item.name}}</a-button></a>
    </a-col>
  </a-row>

  <a-divider />
  <a-row><h3>《酒类商品批发许可证》审批</h3></a-row>
  <a-row>
    <a-col v-for='item in data.jiuleipifa'>
      <a :href='data.banli_url.id+item.id' target="_blank"><a-button type="primary" shape="round" :size="size">{{item.name}}</a-button></a>
    </a-col>
  </a-row>
  <a-divider />
  <a-row><h3>特种设备安全管理人员和作业人员资格认定</h3></a-row>
  <a-row>
    <a-col v-for='item in data.tezhongshebei'>
      <a :href='data.banli_url.id+item.id' target="_blank"><a-button type="primary" shape="round" :size="size">{{item.name}}</a-button></a>
    </a-col>
  </a-row>


  <a-divider />
  <a-row><a href="https://zwdt.sh.gov.cn/govPortals/municipalDepartments/SHSPSH" target="_blank"><h3>第二类医疗器械经营备案</h3></a></a-row>
  <a-row>
    <a-col v-for='item in data.yiliao'>
      <a :href='data.banli_url.id+item.id' target="_blank"><a-button type="primary" shape="round" :size="size">{{item.name}}</a-button></a>
    </a-col>
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
