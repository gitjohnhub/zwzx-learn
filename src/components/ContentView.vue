<template>
  <a-radio-group v-model:value="value1" size="large">
    <a-radio-button  v-for="item,key in bangban_content" :value="key">{{ key }}</a-radio-button>
  </a-radio-group>
  <h1>{{ value1}}</h1>

  <a-timeline>
      <a-timeline-item v-for="(item,index) in bangban_content[value1]['content']">{{index}}、{{ item }}</a-timeline-item>
    </a-timeline>
    <a-image v-for="(img_src,index) in img_list" :width="200" :src="img_src"></a-image>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {bangban_content} from '@/utils/bangban_content'
import bb1_1 from '@/assets/bb1_1.jpg'
const img_list = ref([])
const getImageUrl = () =>{
  for(let imgsrc of  bangban_content[value1.value]['imgsrc']){
    const img_url= new URL('../assets/'+imgsrc+'.jpg', import.meta.url).href
    img_list.value.push(img_url)
  }
  return img_list

  };
const value1 = ref<string>('电子营业执照申请');
</script>
