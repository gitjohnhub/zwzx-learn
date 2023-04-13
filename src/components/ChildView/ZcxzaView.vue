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

    <div v-if="formState.checkedList.indexOf('经营范围') != -1">
      <a-form-item label="原来的经营范围：">
        <a-textarea
          v-model:value="formState.origin_jingyingfanwei"
          placeholder="请粘贴原来的经营范围"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="现在的经营范围：">
        <a-textarea
          v-model:value="formState.modify_jingyingfanwei"
          placeholder="请粘贴现在的经营范围"
        ></a-textarea>
      </a-form-item>
    </div>

    <div v-if="formState.checkedList.indexOf('住所') != -1">
      <a-form-item label="原来的住所：">
        <a-textarea
          v-model:value="formState.origin_zhusuo"
          placeholder="请输入原来的公司经营地址"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="现在的住所：">
        <a-textarea
          v-model:value="formState.modify_zhusuo"
          placeholder="请输入现在的公司经营地址"
        ></a-textarea>
      </a-form-item>
    </div>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="generate_xiuzhengan">生成</a-button>
      <!-- <a-button style="margin-left: 10px">Cancel</a-button> -->
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import type { Ref } from 'vue';
import { generate_head, generate_firstLine_description, generate_tiaokuan,generate_download_link, add_qianzi, add_date } from '@/utils/utils';
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
const company_category_list = ['一人有限公司', '股份有限公司'];
const formState = reactive({
  company_category: '一人有限公司',
  origin_jingyingfanwei: '',
  modify_jingyingfanwei: '',
  origin_zhusuo: '',
  modify_zhusuo: '',
  company_name: '',
  checkedList: ['经营范围'],
  location: '第二章第三条',
  listContent: [],
});
const plainOptions = ['住所', '经营范围'];
watch(
  () => formState.checkedList,
  (newValue, oldValue) => {
    // console.log(newValue)
  }
);
const number_array = ['一、', '二、', '三、'];
function generate_xiuzhengan() {
  let mycontent = ref('');
  const content_array: Ref<string[]> = ref([]);

  for (let item of formState.checkedList) {
    // console.log(`item:${item}`)

    if (item == '经营范围') {
      content_array.value.push(
        generate_tiaokuan(item, formState.origin_jingyingfanwei, formState.modify_jingyingfanwei)
      );
    }
    if (item == '住所') {
      content_array.value.push(
        generate_tiaokuan(item, formState.origin_zhusuo, formState.origin_zhusuo)
      );
    }
  }
  content_array.value.push('章程其他条款不变');
  for (let i = 0; i <= formState.checkedList.length; i++) {
    mycontent.value += number_array[i] + content_array.value[i];
  }
  // 将内容转换为Blob对象
  const content =
    generate_head(formState.company_name) +
    generate_firstLine_description(formState.company_category) +
    mycontent.value +
    add_qianzi('法定代表人：')+
    add_date();
  console.log(content)

 generate_download_link(content,formState.company_name+'修正案')
}
</script>
