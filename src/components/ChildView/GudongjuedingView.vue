<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">

    <a-form-item label="变更内容">
      <a-radio-group v-model:value="formState.decide_item" :options="decide_item_list" />
    </a-form-item>

    <a-form-item label="公司名称：">
      <a-input v-model:value="formState.company_name" placeholder="公司名称"></a-input>
    </a-form-item>
    <a-form-item label="公司性质">
      <a-radio-group v-model:value="formState.company_category" :options="company_category_list" />
    </a-form-item>
    <div v-if="show_has_dongshihui">
      <a-form-item label="是否有董事会">
        <a-radio-group v-model:value="formState.dongshihui" :options="['设董事会', '不设董事会']" />
      </a-form-item>
    </div>
    <div v-if="show_modify_faren_name">
      <a-form-item label="法人性质">
        <a-radio-group v-model:value="formState.faren_category" :options="faren_category_list" />
      </a-form-item>
    </div>

    <div v-if="show_decide_date">
      <a-form-item label="决定时间">
        <a-date-picker v-model:value="formState.decide_date" :locale="locale" />
      </a-form-item>
    </div>
    <div v-if="show_dongshihui_num">
      <a-form-item label="董事会人数:">
        <a-input v-model:value="formState.dongshi_num" type="number"></a-input>
      </a-form-item>
    </div>
    <div v-if="show_gudong_num">
      <a-form-item label="股东会人数:">
        <a-input v-model:value="formState.gudong_num" type="number"></a-input>
      </a-form-item>
    </div>
    <div v-if="show_gudong_name">
      <a-form-item label="股东名字：">
        <a-input v-model:value="formState.gudong_name"></a-input>
      </a-form-item>
    </div>
    <div v-if="show_gudong_money">
      <a-form-item label="股东出资额：">
        <a-input v-model:value="formState.gudong_money"></a-input>
      </a-form-item>
    </div>

    <div v-if="show_modify_faren_name">
      <!-- <a-form-item label="法人性质">
        <a-radio-group v-model:value="formState.faren_category" :options="faren_category_list" />
      </a-form-item> -->
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
import { add_qianzi, generate_download_link } from '@/utils/utils';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 14 };
const company_category_list = ref(['股份有限公司', '一人有限公司', '合资有限公司']);
// const decide_item_list = ['股东', '法人'];
const decide_item_list = ['法人'];
const faren_category_list = ref(['执行董事', '经理']);
const show_has_dongshihui = ref(false);
const show_dongshihui_num = ref(true);

const show_gudong_num = ref(false);

const show_modify_faren_name = ref(true);
const show_decide_date = ref(true);

const show_gudong_name = ref(false)
const show_gudong_money = ref(false)


const formState = reactive({
  company_name: '',
  company_category: '股份有限公司',
  faren_category: '经理',
  decide_item: '法人',
  dongshihui: '不设董事会',
  dongshi_num: 1,
  decide_date: '',
  gudong_num: 1,
  gudong_name: '',
  gudong_money:'',
  origin_faren_name: '',
  modify_faren_name: '',
  origin_content_1: '',
  modify_content_2: '',
});
watch(formState, (newValue, oldValue) => {
  if (newValue.decide_item == '法人') {
    show_gudong_name.value = false
    show_gudong_money.value = false
    company_category_list.value = ['股份有限公司', '一人有限公司', '合资有限公司'];
    show_modify_faren_name.value = true;
    if (newValue.company_category == '股份有限公司') {
      show_gudong_num.value = false;
      show_has_dongshihui.value = false;
      show_decide_date.value = true;
      show_dongshihui_num.value = true;
      faren_category_list.value = ['执行董事', '经理'];
    }
    if (newValue.company_category == '一人有限公司') {
      show_gudong_num.value = false;
      show_has_dongshihui.value = true;
      if (newValue.dongshihui == '设董事会') {
        faren_category_list.value = ['股东任命的董事长', '董事会选举的董事长', '经理'];
        if (newValue.faren_category == '股东任命的董事长') {
          show_dongshihui_num.value = false;
          show_decide_date.value = false;
        } else {
          show_dongshihui_num.value = true;
          show_decide_date.value = true;
        }
      }
      if (newValue.dongshihui == '不设董事会') {
        show_dongshihui_num.value = false;
        show_decide_date.value = false;
        faren_category_list.value = ['执行董事', '经理'];
      }
    }
    if (newValue.company_category == '合资有限公司') {
      show_has_dongshihui.value = true;
      show_decide_date.value = true;

      if (newValue.dongshihui == '不设董事会') {
        show_gudong_num.value = true;
        show_dongshihui_num.value = false;
        faren_category_list.value = ['执行董事', '经理'];
      }
      if (newValue.dongshihui == '设董事会') {
        show_gudong_num.value = false;
        show_dongshihui_num.value = true;
        faren_category_list.value = ['股东任命的董事长', '董事会选举的董事长', '经理'];
      }
    }
  }
  if (newValue.decide_item == '股东') {
    company_category_list.value = ['合资有限公司', '一人有限公司'];
    show_gudong_name.value = true
    show_gudong_money.value = true
    show_has_dongshihui.value = false
    show_dongshihui_num.value = false
    show_modify_faren_name.value = false



  }
});

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
      formState.company_category == '一人有限公司' &&
      formState.dongshihui == '设董事会' &&
      formState.faren_category == '股东任命的董事长'
    ) {
      all_content = generate_gudongjueding(
        formState.origin_faren_name,
        formState.modify_faren_name,
        '董事长'
      );
    }

    if (
      formState.company_category == '一人有限公司' &&
      formState.dongshihui == '设董事会' &&
      formState.faren_category == '董事会选举的董事长'
    ) {
      all_content = generate_dongshihuijueyi('董事长');
    }

    if (formState.company_category == '股份有限公司' && formState.faren_category == '执行董事') {
      all_content = generate_dongshihuijueyi('董事长');
    }

    if (formState.company_category == '股份有限公司' && formState.faren_category == '经理') {
      all_content = generate_dongshihuijueyi('经理');
    }

    if (
      formState.company_category == '一人有限公司' &&
      formState.decide_item == '法人' &&
      formState.dongshihui == '设董事会' &&
      formState.faren_category == '经理'
    ) {
      all_content = generate_dongshihuijueyi('经理');
    }
    // 合资有限公司 变法人 不设董事会
    if (formState.company_category == '合资有限公司' && formState.decide_item == '法人') {
      if (formState.dongshihui == '不设董事会') {
        if (formState.faren_category == '执行董事') {
          all_content = generate_gudonghuijueyi('董事长');
        } else {
          all_content = generate_gudonghuijueyi('经理');
        }
      }else{
        if (formState.faren_category == '股东任命的董事长'){
          all_content = generate_gudonghuijueyi('董事长')
        }
        if (formState.faren_category == '董事会选举的董事长'){
          all_content = generate_dongshihuijueyi('董事长')
        }
        if (formState.faren_category == '经理'){
          all_content = generate_dongshihuijueyi(formState.faren_category)
        }


      }
    }
  }
  if (formState.decide_item == '股东'){
    if(formState.company_category == '一人有限公司'){
      all_content =  generate_guquanzhuanrang_gudongjueding()
    }
  }
  generate_download_link(all_content, formState.company_name+'股东决定');
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
function generate_dongshihuijueyi(faren_title: string) {
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

function generate_gudonghuijueyi(faren_title: string) {
  const ex_title =
    "<html><body><p style='text-align:center;font-size:24px;'>" +
    '股东会决定' +
    "</p ><p style='font-size:16px;'>";
  const ex_firstLine =
    '<p>根据《公司法》及本公司章程的有关规定，' +
    formState.company_name +
    '临时股东会会议于' +
    formatDate(new Date(formState.decide_date)) +
    '在上海召开。本次会议由' +
    formState.origin_faren_name +
    '提议召开。' +
    '董事会已于会议召开3日前以电话方式通知全体股东，应到会股东' +
    formState.gudong_num +
    '人，实际到会股东' +
    formState.dongshi_num +
    '人，占总股数100%。会议由董事长主持，形成决议如下：';
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
    formState.gudong_num +
    "人，占总股数100%;</p><p style='margin-left:20px'>不同意0人，占总股数0%;<p style='margin-left:20px'>弃权0人，占总股数0%</p><p>.</p><p>.</p><p>.</p>";
  const last =
    "<div style='text-align:left;font-size:16px;'><span style='margin-right:100px'>股东(签字、盖章):________</span><p style='text-align:right;font-size:16px;'><span style='margin-right:20px'>________年________月________日</span></p></body></html>";
  return ex_title + ex_firstLine + ex_content_1 + ex_content_2 + last;
}
//一人有限公司股东决定：股权转让
function generate_guquanzhuanrang_gudongjueding() {
  const ex_title =
    "<html><body><p style='text-align:center;font-size:24px;'>" +
    '股东决定' +
    "</p ><p style='font-size:16px;'>";
  const ex_firstLine = '<p>根据《公司法》规定，股东做出决定如下：</p>'
  const ex_content_1 = '<p>一、公司股东变更后，股东的出资额和持股比例如下：</p>'
  const ex_content_2 = '<p>股东'+formState.gudong_name+'，出资额：'+formState.gudong_money+'万元，出资比例：100％。</p>'
  const ex_content_3 = '<p>二、通过公司章程修正案;</p><p>三、公司股东发生变动后，公司董事、监事、高管人员不变。</p>'
  return ex_title + ex_firstLine + ex_content_1 + ex_content_2 +ex_content_3+ add_qianzi('股东');
}

const gudongqianzi = "</p><p>.</p><p>.</p><p>.</p><div style='text-align:left;font-size:16px;'><span style='margin-right:100px'>股东(签字、盖章):________</span><p style='text-align:right;font-size:16px;'><span style='margin-right:20px'>________年________月________日</span></p></body></html>";


function formatDate(date: Date) {
  const year = date.getFullYear(); // 获取年份，例如 2023
  const month = date.getMonth() + 1; // 获取月份，注意月份从 0 开始，需要加 1，例如 4
  const day = date.getDate(); // 获取日期，例如 11

  // 将年月日拼接成字符串形式
  const formatDate = `${year}年${month}月${day}日`;
  return formatDate;
}
</script>
