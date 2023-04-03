<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="公司名称：">
      <a-input v-model:value="formState.company_name" placeholder="公司名称"></a-input>

    </a-form-item>
    <a-form-item label="请勾选公司性质">
    <a-radio-group v-model:value="formState.company_category" :options="company_category_list" />
    </a-form-item>

    <a-form-item label="请勾选变更内容">
      <a-checkbox-group v-model:value="formState.checkedList" :options="plainOptions" />
    </a-form-item>

    <div  v-if="formState.checkedList.indexOf('经营范围') != -1">
      <a-form-item label="原来的经营范围：">
      <a-textarea v-model:value="formState.origin_jingyingfanwei" placeholder="请粘贴原来的经营范围"></a-textarea>
     </a-form-item>
    <a-form-item label="现在的经营范围：">
     <a-textarea v-model:value="formState.modify_jingyingfanwei" placeholder="请粘贴现在的经营范围"></a-textarea>
    </a-form-item>
    </div>

    <div  v-if="formState.checkedList.indexOf('住所') != -1">
      <a-form-item label="原来的住所：">
      <a-textarea v-model:value="formState.origin_zhusuo" placeholder="请输入原来的公司经营地址"></a-textarea>
     </a-form-item>
    <a-form-item label="现在的住所：">
     <a-textarea v-model:value="formState.modify_zhusuo" placeholder="请输入现在的公司经营地址"></a-textarea>
    </a-form-item>
    </div>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="generate_xiuzhengan">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, watch,reactive } from 'vue';
import {generate_head,generate_firstLine_description,generate_tiaokuan} from '@/utils/utils'
const labelCol = { style: { width: '150px' } }
const  wrapperCol =  { span: 14 }
const company_category_list = ['一人有限公司', '股份有限公司']
const formState = reactive({
  company_category:'一人有限公司',
    origin_jingyingfanwei: '',
    modify_jingyingfanwei: '',
    origin_zhusuo: '',
    modify_zhusuo: '',
    company_name: '',
    checkedList: ['经营范围'],
    location:'第二章第三条',
    listContent:[]
  });
const plainOptions = ['经营范围', '住所'];
watch(()=>formState.checkedList,(newValue,oldValue)=>{
  // console.log(newValue)
})

function generate_xiuzhengan(){
  let mycontent = ref('')
  for (let item of formState.checkedList){
    console.log(`item:${item}`)
    if (item == '住所'){
      mycontent.value += generate_tiaokuan(item,formState.origin_zhusuo,formState.origin_zhusuo)
    }
    if (item == '经营范围'){
      mycontent.value += generate_tiaokuan(item,formState.origin_jingyingfanwei,formState.modify_jingyingfanwei)
    }
  }
  mycontent.value += "<li>章程其他条款不变。</li>"
  // 将内容转换为Blob对象
  const content = generate_head(formState.company_name)+generate_firstLine_description(formState.company_category)+"<ol>"+mycontent.value+"</ol><div style='text-align:right;font-size:16px;'><span style='margin-right:100px'>法定代表人签字:________</span><p style='text-align:right;font-size:16px;'><span style='margin-right:20px'>________年________月________日</span></p></body></html>";


  console.log(content)
  const blob = new Blob([content], {type: "application/msword"});

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = formState.company_name + "章程修正案.doc";

  // 添加链接到页面中并触发下载
  document.body.appendChild(link);
  link.click();

  // 释放URL对象
  URL.revokeObjectURL(link.href);
}

</script>