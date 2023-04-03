<template>
  <a-radio-group v-model:value="value1" size="large">
    <a-radio-button  v-for="item,key in bangban_content" :value="key">{{ key }}</a-radio-button>
  </a-radio-group>
  <h1>{{ value1}}</h1>

  <a-timeline>
      <a-timeline-item v-for="(item,index) in bangban_content[value1]['content']">{{index}}、{{ item }}</a-timeline-item>
    </a-timeline>
    <a-image v-for="(img_src,index) in bangban_content[value1]['imgsrc']" :width="200" :src="img_src"></a-image>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {bangban_content} from '@/utils/bangban_content'
import bb1_1 from '@/assets/bb1_1.jpg'
const getImageUrl = () => {
        	// 里面可以根据需求写逻辑
          for
            return new URL('../assets/img/home/container_bg.png', import.meta.url).href;
        };
const value1 = ref<string>('电子营业执照申请');
</script>
