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
import { ref ,watch} from 'vue';
import {bangban_content} from '@/utils/bangban_content'
const value1 = ref<string>('电子营业执照申请');
const img_list = ref([])
const getImageUrl = (img_name:string) => {
        	// 里面可以根据需求写逻辑
            return new URL(`../assets/${img_name}.jpg`, import.meta.url).href;
        };
watch(value1,(newValue,oldValue)=>{
  img_list.value = []
  for(let imgsrc of  bangban_content[value1.value]['imgsrc']){
   img_list.value.push(getImageUrl(imgsrc))
  }
})
for(let imgsrc of  bangban_content[value1.value]['imgsrc']){
   img_list.value.push(getImageUrl(imgsrc))
  }

</script>
