<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="公司名称：">
      <a-input v-model:value="formState.company_name" placeholder="公司名称"></a-input>
    </a-form-item>
    <a-form-item label="公司性质">
      <a-radio-group v-model:value="formState.company_category" :options="company_category_list" />
    </a-form-item>
    <div v-if="!is_company_category">
      <a-form-item label="是否有董事会">
        <a-radio-group v-model:value="formState.dongshihui" :options="['设董事会', '不设董事会']" />
      </a-form-item>
    </div>

    <a-form-item label="变更内容">
      <a-radio-group v-model:value="formState.decide_item" :options="decide_item_list" />
    </a-form-item>
    <div v-if="formState.dongshihui == '设董事会' || is_company_category ">
      <a-form-item label="决定时间">
        <a-date-picker v-model:value="formState.decide_date" :locale="locale" />
      </a-form-item>
    </div>
    <div v-if="formState.dongshihui == '设董事会' || is_company_category">
      <a-form-item label="董事会人数:">
        <a-input v-model:value="formState.dongshi_num" type="number"></a-input>
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
import { generate_download_link } from '@/utils/utils';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { func } from 'vue-types';
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
const company_category_list = ['股份有限公司', '一人有限公司', '合资有限公司'];
const is_modify_farenzhiwu = ref(true);
const is_company_category = ref(true);

const faren_category_list = ref(['执行董事', '经理']);
const formState = reactive({
  company_name: '',
  company_category: '一人有限公司',
  faren_category: '执行董事',
  decide_item: '法人',
  dongshihui: '不设董事会',
  dongshi_num: 0,
  decide_date: '',
  gudong_number: 1,
  origin_faren_name: '',
  modify_faren_name: '',
  origin_content_1: '',
  modify_content_2: '',
});
watch(
  () => formState.company_category,
  (newValue, oldValue) => {
    if (newValue == '股份有限公司') {
      is_company_category.value = true
    }
    if (newValue == '一人有限公司') {
      is_company_category.value = false
    }
    // is_modify_farenzhiwu.value = formState.company_category == '一人有限公司' ? true: false
    // console.log(newValue)
    // is_company_category.value = formState.company_category == '一人有限公司' ? true : formState.company_category == '股份有限公司' ? true:false
  }
);
watch(
  () => formState.decide_item,
  (newValue, oldValue) => {
    is_modify_farenzhiwu.value = formState.decide_item == '法人' ? true : false;
    // console.log(newValue)
  }
);
watch(
  () => formState.dongshihui,
  (newValue, oldValue) => {
    faren_category_list.value =
      formState.dongshihui == '不设董事会'
        ? ['执行董事', '经理']
        : ['股东任命的董事长', '董事会选举的董事长', '经理'];

    // console.log(newValue)
  }
);
const decide_item_list = ['股权', '法人'];

function generate_content() {
  let all_content = '';
  if (formState.decide_item == '法人') {
    if (formState.company_category == '一人有限公司' && formState.dongshihui == '不设董事会') {
      all_content = generate_gudongjueding(
        formState.origin_faren_name,
        formState.modify_faren_name,
        formState.faren_category
      );
    }
    if (
      (formState.company_category == '一人有限公司' &&
      formState.dongshihui == '设董事会' &&
      formState.faren_category == '股东任命的董事长')

    ) {
      all_content = generate_gudongjueding(
        formState.origin_faren_name,
        formState.modify_faren_name,
        '董事长'
      );
    }

    if (
      (formState.company_category == '一人有限公司' &&
      formState.dongshihui == '设董事会' &&
      formState.faren_category == '董事会选举的董事长')
    ) {
      all_content = generate_dongshihuijueyi(
        formState.origin_faren_name,
        formState.modify_faren_name,
        '董事长'
      );
    }

    if (
        formState.company_category == '股份有限公司' &&
        formState.faren_category == '执行董事'
      ){
        all_content = generate_dongshihuijueyi(
        formState.origin_faren_name,
        formState.modify_faren_name,
        '董事长'
      );

      }

    if (
      formState.company_category == '一人有限公司' &&
      formState.decide_item == '法人' &&
      formState.dongshihui == '设董事会' &&
      formState.faren_category == '经理'
    ) {
      all_content = generate_dongshihuijueyi(
        formState.origin_faren_name,
        formState.modify_faren_name,
        '经理'
      );
    }
  }

  generate_download_link(all_content, formState.company_name);
}
// （一人有限公司变法人职务，不设董事会）股东决定
function generate_gudongjueding(
  origin_faren_name: string,
  modify_faren_name: string,
  faren_title: string
) {
  const ex_title =
    "<html><body><p style='text-align:center;font-size:24px;'>" +
    '股东决定' +
    "</p ><p style='font-size:16px;'>";
  const ex_firstLine = '<p>根据《公司法》规定，股东做出决定如下：</p>';
  const ex_content =
    "<p style='margin-left:20px'>" +
    "聘任<span style='text-decoration:underline;'>" +
    modify_faren_name +
    '</span>为公司' +
    faren_title +
    "，免去<span style='text-decoration:underline;'>" +
    origin_faren_name +
    '</span>' +
    '公司' +
    faren_title +
    '的职务。' +
    '</p>' +
    '<p>.</p><p>.</p><p>.</p><p>.</p>';
  const last =
    "<div style='text-align:left;font-size:16px;'><span style='margin-right:100px'>股东（签字、盖章）:________</span><p style='text-align:right;font-size:16px;'><span style='margin-right:20px'>________年________月________日</span></p></body></html>";
  return ex_title + ex_firstLine + ex_content + last;
}
// 一人有限公司变法人职务，设董事会，股东决定（董事长为法定代表人，由股东任命）
function generate_dongshihuijueyi(
  origin_faren_name: string,
  modify_faren_name: string,
  faren_title: string
) {
  const ex_title =
    "<html><body><p style='text-align:center;font-size:24px;'>" +
    '董事会决定' +
    "</p ><p style='font-size:16px;'>";
  const ex_firstLine =
    '<p>根据《公司法》及本公司章程的有关规定，' +
    formState.company_name +
    '董事会会议于' +
    formatDate(new Date(formState.decide_date)) +
    '在上海召开。董事长已于会议召开3日前以电话方式通知全体董事，应到会董事' +
    formState.dongshi_num +
    '人，实际到会董事' +
    formState.dongshi_num +
    '人。会议由董事长主持，形成决议如下：';
  const ex_content_1 =
    '<p>选举' +
    formState.modify_faren_name +
    '为公司' +
    faren_title +
    '，免去' +
    formState.origin_faren_name +
    faren_title +
    '的职务。</p>';
  const ex_content_2 =
    "<p>以上事项表决结果：</p><p style='margin-left:20px'>同意" +
    formState.dongshi_num +
    "人，占董事总数100%;</p><p style='margin-left:20px'>不同意0人，占董事总数0%;<p style='margin-left:20px'>弃权0人，占董事总数0%</p><p>.</p><p>.</p><p>.</p>";
  const last =
    "<div style='text-align:left;font-size:16px;'><span style='margin-right:100px'>与会董事签字:________</span><p style='text-align:right;font-size:16px;'><span style='margin-right:20px'>________年________月________日</span></p></body></html>";
  return ex_title + ex_firstLine + ex_content_1 + ex_content_2 + last;
}

function formatDate(date: Date) {
  const year = date.getFullYear(); // 获取年份，例如 2023
  const month = date.getMonth() + 1; // 获取月份，注意月份从 0 开始，需要加 1，例如 4
  const day = date.getDate(); // 获取日期，例如 11

  // 将年月日拼接成字符串形式
  const formatDate = `${year}年${month}月${day}日`;
  return formatDate;
}
</script>
