<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="公司名称：">
      <a-input v-model:value="formState.company_name" placeholder="公司名称"></a-input>
    </a-form-item>
    <a-form-item label="公司性质">
      <a-radio-group v-model:value="formState.company_category" :options="company_category_list" />
    </a-form-item>
    <a-form-item label="是否有董事会">
      <a-radio-group v-model:value="formState.dongshihui" :options="['设董事会','不设董事会']" />
    </a-form-item>

    <a-form-item label="变更内容">
      <a-radio-group v-model:value="formState.decide_item" :options="decide_item_list" />
    </a-form-item>
    <div v-if="false">
      <a-form-item label="决定时间">
        <a-date-picker v-model:value="formState.decide_date" />
      </a-form-item>
    </div>
    <div v-if="false">
      <a-form-item label="股东人数：">
        <a-input v-model:value="formState.gudong_number" type="number"></a-input>
      </a-form-item>
    </div>
    <div v-if="false">
      <a-form-item label="法人股东名字：">
        <!-- <a-input v-model:value="formState.gudong_name"></a-input> -->
      </a-form-item>
    </div>

      <div v-if="is_modify_farenzhiwu">
        <a-form-item label="法人性质">
          <a-radio-group v-model:value="formState.faren_category" :options="faren_category_list" />
        </a-form-item>
        <a-form-item label="原法人">
          <a-input v-model:value="formState.origin_faren_name"></a-input>
        </a-form-item>
        <a-form-item label="现法人：">
          <a-input v-model:value="formState.modify_faren_name"></a-input>
        </a-form-item>
      </div>
    <!-- 生成按钮-->
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="generate_content">生成</a-button>
      <!-- <a-button style="margin-left: 10px">Cancel</a-button> -->
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import type { Dayjs } from 'dayjs';
import {
  generate_head,
  generate_firstLine_description,
  generate_download_link,
} from '@/utils/utils';
import { func } from 'vue-types';
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
const company_category_list = ['股份有限公司', '一人有限公司', '合资有限公司'];
const is_modify_farenzhiwu = ref(true)
const faren_category_list = ref(['执行董事','经理'])
const formState = reactive({
  company_name: '',
  company_category: '一人有限公司',
  faren_category:'执行董事',
  decide_item: '股权',
  dongshihui:'设董事会',
  decide_date: '',
  gudong_number: 1,
  origin_faren_name: '',
  modify_faren_name: '',
  origin_content_1: '',
  modify_content_2: '',
});
watch(()=>formState.company_category,(newValue,oldValue)=>{
  is_modify_farenzhiwu.value = formState.company_category == '一人有限公司' ? true: false
  // console.log(newValue)
})
watch(()=>formState.decide_item,(newValue,oldValue)=>{
  is_modify_farenzhiwu.value = formState.decide_item == '法人' ? true: false
  // console.log(newValue)
})
watch(()=>formState.dongshihui,(newValue,oldValue)=>{
  faren_category_list.value = formState.dongshihui == '不设董事会' ? ['执行董事','经理']: ['股东任命的董事长','董事会选举的董事长','经理']
  // console.log(newValue)
})
const decide_item_list = ['股权', '法人'];

function generate_content() {
  let all_content = "";
  let mycontent = '';
  const title = formState.company_category === '一人有限公司' ? '股东决定' : '';
  if (formState.company_category == '一人有限公司'){
    if (formState.decide_item == '法人') {
      mycontent = "聘任<span style='text-decoration:underline;'>"+formState.origin_faren_name+"</span>为公司"+formState.faren_category+"，免去<span style='text-decoration:underline;'>"+formState.origin_faren_name+"</span>"+"公司"+formState.faren_category+"的职务。"
      all_content = generate_example(title,mycontent)
    }
  }
  generate_download_link(all_content, formState.company_name + formState.company_category);
}
// （一人有限公司变法人职务，不设董事会）股东决定
function generate_example(title:string,content:string){
  const ex_title =  "<html><body><p style='text-align:center;font-size:24px;'>"+title+"</p ><p style='font-size:16px;'>"
  const ex_firstLine = "<p>根据《公司法》规定，股东做出决定如下：</p>"
  const ex_content = "<p style='margin-left:20px'>"+content+"</p>"+"<p>.</p><p>.</p><p>.</p><p>.</p>"
  const last ="<div style='text-align:left;font-size:16px;'><span style='margin-right:100px'>股东（签字、盖章）:________</span><p style='text-align:right;font-size:16px;'><span style='margin-right:20px'>________年________月________日</span></p></body></html>"
  return ex_title + ex_firstLine + ex_content + last
  }
// 一人有限公司变法人职务，设董事会，股东决定（董事长为法定代表人，由股东任命）

</script>
