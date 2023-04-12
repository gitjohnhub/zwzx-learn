<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="公司名称：">
      <a-input v-model:value="formState.company_name" placeholder="公司名称"></a-input>
    </a-form-item>
    <a-form-item label="公司性质">
      <a-radio-group v-model:value="formState.company_category" :options="company_category_list" />
    </a-form-item>
    <div v-if="show_gudong_num">
      <a-form-item label="股东人数：">
        <a-input v-model:value="formState.gudong_num" type="number"></a-input>
      </a-form-item>
    </div>


    <template v-for="i in Number(formState.gudong_num)" :key="i" v-if='formState.company_category=="合资有限公司"'>
      <a-form :model="formState_hezi"  layout="inline">
            <a-form-item>
              <a-input addon-before="出资人" v-model:value="formState.company_name" placeholder="placeholder"></a-input>
            </a-form-item>
            <a-form-item>
              <a-input addon-before="出资人" v-model:value="formState.company_name" placeholder="placeholder" addon-after="万元"></a-input>
            </a-form-item>
          </a-form>

        </template>

    <div v-if="show_gudong_money">
      <a-form-item label="原股东（出让方）出资额:">
        <a-input v-model:value="formState.gudong_money" addon-after="万元"></a-input>
      </a-form-item>
    </div>
    <div v-if="show_decide_date">
      <a-form-item label="原股东出资时间">
        <a-date-picker v-model:value="formState.origin_decide_date" :locale="locale" />
      </a-form-item>
    </div>
    <div v-if="show_gudong_money">
      <a-form-item label="原股东出资方式:">
        <!-- <a-input v-model:value="formState.origin_chuzifangshi"></a-input> -->
        <a-tooltip>
          <template #title>可以查看原章程第四章第五条：原股东出资方式</template>
          <a-select ref="select" v-model:value="formState.origin_chuzifangshi">
            <a-select-option value="购买">购买</a-select-option>
            <a-select-option value="继承">继承</a-select-option>
          </a-select>
        </a-tooltip>
      </a-form-item>
    </div>
    <div v-if="show_gudong_money">
      <a-form-item label="现股东出资方式:">
        <!-- <a-input v-model:value="formState.modify_chuzifangshi"></a-input> -->
        <a-select ref="select" v-model:value="formState.modify_chuzifangshi">
          <a-select-option value="购买">购买</a-select-option>
          <a-select-option value="继承">继承</a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <div v-if="show_gudong_name">
      <a-form-item label="原股东（出让方）名字：">
        <a-input v-model:value="formState.origin_gudong_name"></a-input>
      </a-form-item>
    </div>

    <div v-if="show_gudong_money">
      <a-form-item label="原股东（出让方）住址：">
        <a-input v-model:value="formState.origin_gudong_address"></a-input>
      </a-form-item>
    </div>

    <div v-if="show_gudong_name">
      <a-form-item label="现股东（受让方）名字：">
        <a-input v-model:value="formState.modify_gudong_name"></a-input>
      </a-form-item>
    </div>
    <div v-if="show_gudong_money">
      <a-form-item label="现股东（受让方）住址：">
        <a-input v-model:value="formState.modify_gudong_address"></a-input>
      </a-form-item>
    </div>
    <div v-if="show_decide_date">
      <a-form-item label="股权转让协议签署时间">
        <a-date-picker v-model:value="formState.decide_date" :locale="locale" />
      </a-form-item>
    </div>
    <!-- 生成按钮-->
    <p>**生成内容仅供参考，下载完成后可根据实际情况修改word文档内容</p>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="generate_content"
        >生成股权转让协议、章程修正案、股东决定</a-button
      >
      <!-- <a-button style="margin-left: 10px">Cancel</a-button> -->
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import {
  generate_download_link,
  formatDate,
  add_underLine,
  add_p,
  add_qianzi,
  add_date,
  add_title,
} from '@/utils/utils';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
const labelCol = { style: { width: '200px' } };
const wrapperCol = { span: 14 };
const company_category_list = ref(['一人有限公司', '合资有限公司']);
const show_modify_faren_name = ref(true);
const show_decide_date = ref(true);
const show_gudong_num = ref(true)
const show_gudong_name = ref(true);
const show_gudong_money = ref(true);
const formState_hezi = reactive({
  company_name: '',

})
const formState = reactive({
  company_name: '',
  company_category: '一人有限公司',
  faren_category: '经理',
  decide_item: '法人',
  gudong_num: 1,
  origin_decide_date: '',
  decide_date: '',
  origin_gudong_name: '',
  origin_gudong_address: '',
  modify_gudong_address: '',
  modify_gudong_name: '',
  gudong_money: '',
  origin_chuzifangshi: '',
  modify_chuzifangshi: '',
});
watch(formState, (newValue, oldValue) => {
  if(formState.company_category == "合资有限公司"){
    show_gudong_num.value = true
  }
});

function generate_content() {
  let gudongjueding_content = '';
  let zhangchengxiuzhengan = '';
  let guquanzhuanrangxieyi_content = '';

  if (formState.company_category == '一人有限公司') {
    gudongjueding_content = generate_guquanzhuanrang_gudongjueding();
    guquanzhuanrangxieyi_content = generate_guquanzhuanrang_xieyi();
    zhangchengxiuzhengan = generate_zhangchengxiuzhengan();
  }
  console.log(gudongjueding_content);

  generate_download_link(gudongjueding_content, formState.company_name + '股东决定');
  generate_download_link(zhangchengxiuzhengan, formState.company_name + '章程修正案');
  generate_download_link(guquanzhuanrangxieyi_content, formState.company_name + '股权转让协议');
}

//一人有限公司股东决定：股权转让
function generate_guquanzhuanrang_gudongjueding() {
  const ex_title = add_title('股东决定');
  const ex_firstLine = '<p>根据《公司法》规定，股东做出决定如下：</p>';
  const ex_content_1 = '<p>一、公司股东变更后，股东的出资额和持股比例如下：</p>';
  const ex_content_2 =
    '<p>股东' +
    formState.origin_gudong_name +
    '，出资额：' +
    formState.gudong_money +
    '万元，出资比例：100％。</p>';
  const ex_content_3 =
    '<p>二、通过公司章程修正案;</p><p>三、公司股东发生变动后，公司董事、监事、高管人员不变。</p>';
  return (
    ex_title +
    ex_firstLine +
    ex_content_1 +
    ex_content_2 +
    ex_content_3 +
    add_qianzi('股东') +
    add_date()
  );
}
function generate_zhangchengxiuzhengan() {
  const all_content =
    add_title(`${formState.company_name}章程修正案`) +
    add_p('根据《公司法》及股东会决议，对章程如下：') +
    add_p(
      `一、章程第四章第五条原为：股东姓名（名称）:${formState.origin_gudong_name}，出资额:${
        formState.gudong_money
      }，出资方式：${formState.origin_chuzifangshi},出资时间:${formatDate(
        formState.origin_decide_date
      )}`
    ) +
    add_p(
      `现将该条修改为：股东姓名（名称）:${formState.modify_gudong_name}，出资额:${
        formState.gudong_money
      }，出资方式：${formState.origin_chuzifangshi},出资时间:${formatDate(formState.decide_date)}`
    ) +
    add_p(`三、章程其他条款不变。`) +
    add_qianzi('股东') +
    add_date();
  return all_content;
}

//一人有限公司股权转让协议样本
function generate_guquanzhuanrang_xieyi() {
  const all_content =
    add_title('股权转让协议') +
    add_p(`本协议由以下各方于${add_underLine(formatDate(formState.decide_date))}在上海共同签署。`) +
    add_p(
      `出让方:${add_underLine(formState.origin_gudong_name)}(以下称甲方）住所：${add_underLine(
        formState.origin_gudong_address
      )}`
    ) +
    add_p(
      `受让方:${add_underLine(formState.modify_gudong_name)}(以下称乙方）住所：${add_underLine(
        formState.modify_gudong_address
      )}`
    ) +
    add_p(
      add_underLine(formState.company_name) +
        '（以下称标的公司）注册资本' +
        add_underLine(formState.gudong_money) +
        '万元人民币，甲方出资' +
        add_underLine(formState.gudong_money) +
        '万元人民币，占100%。根据有关法律、法规规定，经本协议各方友好协商，达成条款如下：'
    ) +
    add_p('第一条 （股权转让标的和转让价格）') +
    add_p(`一、甲方将所持有标的公司100％股权作价${formState.gudong_money}万元人民币转让给乙方。`) +
    add_p(`二、附属于股权的其他权利随股权的转让而转让。`) +
    add_p(`三、受让方应于本协议签定之日起  日内，向出让方付清全部股权转让价款。`) +
    add_p(`第二条 （承诺和保证）`) +
    add_p(
      `甲方保证本合同第一条转让给乙方的股权为甲方合法拥有，甲方拥有完全、有效的处分权。甲方保证其所转让的股权没有设置任何质押或其他担保权，不受任何第三人的追索。`
    ) +
    add_p(`第三条 （违约责任）`) +
    add_p(`${add_underLine('违约责任')}`) +
    add_p(`第四条 （解决争议的方法）`) +
    add_p(`本协议受中华人民共和国相关法律的羁束并适用其解释。`) +
    add_p(
      `凡因本协议引起的或与本协议有关的任何争议，双方应友好协商解决。协商不成，应直接向人民法院起诉。`
    ) +
    add_p(`第五条 （其他）`) +
    add_p(`一、本协议一式3份，协议各方各执1份，标的公司执1份，以备办理有关手续时使用。`) +
    add_p(`二、本协议各方签字后生效。`) +
    add_qianzi('甲方') +
    add_qianzi('乙方') +
    add_date();

  return all_content;
}
</script>
