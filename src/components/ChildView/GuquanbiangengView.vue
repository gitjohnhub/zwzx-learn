<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="公司名称：">
      <a-input v-model:value="formState.company_name" placeholder="公司名称"></a-input>
    </a-form-item>
    <a-form-item label="公司性质">
      <a-radio-group v-model:value="formState.company_category" :options="company_category_list" />
    </a-form-item>
    <!-- <div v-if="show_gudong_num">
      <a-form-item label="股东人数：">
        <a-input v-model:value="formState.gudong_num" type="number"></a-input>
      </a-form-item>
    </div> -->

    <template v-if="!show_single_gudong">
      <!-- 添加原股东 -->
      <a-card>


      <a-form :model="formState_hezi">
        <a-form-item> <a-button @click="addGudong">添加原来所有的股东</a-button></a-form-item>

        <a-row v-for="(gudong, index) in formState_hezi.gudongs" :key="index">
          <a-form-item>
            <a-input
              addon-before="原出资人姓名"
              v-model:value="gudong.name"
              placeholder="placeholder"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              addon-before="出资额"
              v-model:value="gudong.chuzie"
              placeholder="placeholder"
              addon-after="万元"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <minus-circle-outlined
              v-if="formState_hezi.gudongs.length > 1"
              class="dynamic-delete-button"
              :disabled="formState_hezi.gudongs.length === 1"
              @click="removeGudong(gudong)"
            />
          </a-form-item>
        </a-row>
      </a-form>
    </a-card>
      <!-- 添加现有股东 -->
      <a-card>
      <a-form-item> <a-button @click="addModifyGudong">添加现在所有的股东</a-button></a-form-item>

      <a-form :model="modify_hezi">
        <a-row v-for="(gudong, index) in modify_hezi.gudongs" :key="index">
          <a-form-item>
            <a-input
              addon-before="现出资人姓名"
              v-model:value="gudong.name"
              placeholder="placeholder"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              addon-before="现出资额"
              v-model:value="gudong.chuzie"
              placeholder="placeholder"
              addon-after="万元"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <minus-circle-outlined
              v-if="modify_hezi.gudongs.length > 1"
              class="dynamic-delete-button"
              :disabled="modify_hezi.gudongs.length === 1"
              @click="removeModifyGudong(gudong)"
            />
          </a-form-item>
        </a-row>
      </a-form>
    </a-card>
      <!-- 添加转让信息 -->
      <a-card>

      <a-form :model="zhuanrang_info">
        <a-form-item> <a-button @click="addZhuanrangInfo">添加转让信息</a-button></a-form-item>

        <a-row v-for="(zhuanrang, index) in zhuanrang_info.zhuanrangs" :key="index">
          <!-- 转让人 -->
          <a-form-item>
            转让人姓名：<a-select v-model:value="zhuanrang.zhuanrang_name" style="width: 120px">
              <a-select-option
                v-for="(gudong, index) in formState_hezi.gudongs"
                :key="index"
                :value="gudong.name"
                >{{ gudong.name }}</a-select-option
              ></a-select
            >
          </a-form-item>
          <a-form-item>
            受让人姓名：<a-select v-model:value="zhuanrang.shourang_name" style="width: 120px">
              <a-select-option
                v-for="(gudong, index) in modify_hezi.gudongs"
                :key="index"
                :value="gudong.name"
                >{{ gudong.name }}</a-select-option
              ></a-select
            >
          </a-form-item>
          <a-form-item>
            <a-input
              addon-before="转让额"
              v-model:value="zhuanrang.zhuanrange"
              placeholder="转让额"
              addon-after="万元"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <minus-circle-outlined
              v-if="zhuanrang_info.zhuanrangs.length > 1"
              class="dynamic-delete-button"
              :disabled="zhuanrang_info.zhuanrangs.length === 1"
              @click="removeZhuanrangInfo(zhuanrang)"
            />
          </a-form-item>
        </a-row>
      </a-form>
    </a-card>
    </template>

    <div v-if="show_single_gudong">
      <a-form-item label="原股东（出让方）出资额:">
        <a-input v-model:value="formState.gudong_money" addon-after="万元"></a-input>
      </a-form-item>
      <a-form-item label="原股东出资时间">
        <a-date-picker v-model:value="formState.origin_decide_date" :locale="locale" />
      </a-form-item>
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
      <a-form-item label="现股东出资方式:">
        <!-- <a-input v-model:value="formState.modify_chuzifangshi"></a-input> -->
        <a-select ref="select" v-model:value="formState.modify_chuzifangshi">
          <a-select-option value="购买">购买</a-select-option>
          <a-select-option value="继承">继承</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="原股东（出让方）名字：">
        <a-input v-model:value="formState.origin_gudong_name"></a-input>
      </a-form-item>
      <a-form-item label="原股东（出让方）住址：">
        <a-input v-model:value="formState.origin_gudong_address"></a-input>
      </a-form-item>

      <a-form-item label="现股东（受让方）名字：">
        <a-input v-model:value="formState.modify_gudong_name"></a-input>
      </a-form-item>
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
      <!-- <a-button @click="testButton">测试打印</a-button> -->
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="generate_content"
        >生成股权转让协议、章程修正案、股东决定</a-button
      >
      <!-- <a-button style="margin-left: 10px">Cancel</a-button> -->
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { MinusCircleOutlined } from '@ant-design/icons-vue';
import { ref, watch, reactive } from 'vue';
import type { FormInstance } from 'ant-design-vue';
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
import { func } from 'vue-types';

interface Gudong {
  name: string;
  chuzie: string;
}
interface Zhuanrang {
  zhuanrang_name: string;
  shourang_name: string;
  zhuanrange: string;
}
const labelCol = { span: 10};
const wrapperCol = { span: 14 };
const company_category_list = ref(['一人有限公司', '合资有限公司']);
const show_single_gudong = ref(true);
const show_decide_date = ref(true);
const formRef = ref<FormInstance>();
const formState_hezi = reactive<{ gudongs: Gudong[] }>({
  gudongs: [],
});
const modify_hezi = reactive<{ gudongs: Gudong[] }>({
  gudongs: [],
});
const zhuanrang_info = reactive<{ zhuanrangs: Zhuanrang[] }>({
  zhuanrangs: [],
});
// watch(formState_hezi,(newValue,oldValue)=>{
//   modify_hezi.value.gudongs = formState_hezi.gudongs
//   console.log("modify_hezi=>",modify_hezi.value)
// })
const testButton = () => {
  console.log('testButton=>', formState_hezi);
};
const addGudong = () => {
  console.log(formState_hezi.gudongs);
  formState_hezi.gudongs.push({
    name: '',
    chuzie: '',
  });
};
const addModifyGudong = () => {
  console.log(modify_hezi.gudongs);
  modify_hezi.gudongs.push({
    name: '',
    chuzie: '',
  });
};
const addZhuanrangInfo = () => {
  console.log(zhuanrang_info.zhuanrangs);
  zhuanrang_info.zhuanrangs.push({
    zhuanrang_name: '',
    shourang_name: '',
    zhuanrange: '',
  });
};

const removeModifyGudong = (item: Gudong) => {
  let index = modify_hezi.gudongs.indexOf(item);
  if (index !== -1) {
    modify_hezi.gudongs.splice(index, 1);
  }
};
const removeZhuanrangInfo = (item: Zhuanrang) => {
  let index = zhuanrang_info.zhuanrangs.indexOf(item);
  if (index !== -1) {
    zhuanrang_info.zhuanrangs.splice(index, 1);
  }
};

const removeGudong = (item: Gudong) => {
  let index = formState_hezi.gudongs.indexOf(item);
  if (index !== -1) {
    formState_hezi.gudongs.splice(index, 1);
  }
};
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
  if (formState.company_category == '合资有限公司') {
    show_single_gudong.value = false;
    // show_gudong_num.value = true
  } else {
    show_single_gudong.value = true;
  }
});
watch(
  () => formState.gudong_num,
  (newValue, oldValue) => {}
);

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
  if (formState.company_category == '合资有限公司'){
    gudongjueding_content = generate_multi_guquanzhuanrang_jueyi()
    zhangchengxiuzhengan = generate_hezi_zhangchengxiuzhengan()
    guquanzhuanrangxieyi_content = generate_hezi_guquanzhuanrang_xieyi()
  }


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
// 合资有限公司股权转让
function generate_multi_guquanzhuanrang_jueyi() {
  const all_content =
    add_title(`股东会决议`) +
    add_p(
      `根据《公司法》及本公司章程的有关规定，${formState.company_name}临时股东会会议于${formatDate(formState.decide_date)}在上海召开。本次会议由${formState_hezi.gudongs[0].name}提议召开，${formState_hezi.gudongs[0].name}于会议召开3日以前以电话方式通知全体股东，应到会股东 ${formState_hezi.gudongs.length}人，实际到会股东${formState_hezi.gudongs.length}人，占总股数100%。会议由 ${formState_hezi.gudongs[0].name}主持，形成决议如下：`
    ) +
    add_p(`一、${generate_tongyi()}其他股东放弃优先购买权。`) +
    add_p(`二、股权转让后，公司股东持股情况如下：`) +
    generate_new_chuzibili() +
    add_p(`三、通过公司章程修正案；`) +
    add_p(`四、公司股东发生变动后，公司董事、监事、高管人员不变。`) +
    add_p(`.`) +
    add_p(`以上事项表决结果：同意的，占总股数100%,`) +
    add_p(`不同意的，占总股数 ，0%,`) +
    add_p(`弃权的，占总股数 ，0%,`) +
    add_qianzi('股东') +
    add_date();
  return all_content
}
// 合资有限公司 章程修正案
function generate_hezi_zhangchengxiuzhengan() {
  const all_content =
    add_title(`${formState.company_name}章程修正案`) +
    add_p('根据《公司法》及股东会决议，对章程如下：') +
    add_p(`一、章程第四章第五条原为：${get_xiuzhengan_tiaokuan()}`) +
    add_p(`现将该条修改为${get_xiuzhengan_modify_tiaokuan()}`)+
    add_p(`三、章程其他条款不变。`) +
    add_qianzi('股东') +
    add_date();
  return all_content;
}
function get_xiuzhengan_tiaokuan(){
  let content = ''
  for (let item of formState_hezi.gudongs) {
    content += `股东姓名（名称）:${item.name}，出资额:${
        item.chuzie
      }，出资方式：${add_underLine('待修改')},出资时间:${add_underLine('待修改')}。`

  }
  return content
}
function get_xiuzhengan_modify_tiaokuan(){
  let content = ''
  for (let item of modify_hezi.gudongs) {
    content += `股东姓名（名称）:${item.name}，出资额:${
        item.chuzie
      }，出资方式：${add_underLine('待修改')},出资时间:${add_underLine('待修改')}。`

  }
  return content
}
//合资有限公司 股权转让协议
function generate_hezi_guquanzhuanrang_xieyi() {
  const all_content =
    add_title('股权转让协议') +
    add_p(`本协议由以下各方于${add_underLine(formatDate(formState.decide_date))}在上海共同签署。`) +
    get_zhuanrang_shourang_content().content+
    add_p(
      add_underLine(formState.company_name) +
        '（以下称标的公司）注册资本' +
      add_underLine(`${get_zhuceziben()}`) +
        `万元人民币，${get_zhuanrang_shourang_content().oneLine}`+'根据有关法律、法规规定，经本协议各方友好协商，达成条款如下：'
    ) +
    add_p('第一条 （股权转让标的和转让价格）') +
    add_p(`一、${get_zhuanrang_shourang_content().twoLine}`) +
    add_p(`二、附属于股权的其他权利随股权的转让而转让。`) +
    add_p(`三、受让方应于本协议签定之日起3日内，向出让方付清全部股权转让价款。`) +
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
    get_zhuanrang_shourang_content().qianzi +
    add_date();

  return all_content;
}
function get_zhuanrang_shourang_content(){
  const zh_list = ['甲','乙','丙','丁',]
  let count = 0
  let content = ''
  let churangfang = ''
  let shourangfang = ''
  let oneLine = ''
  let twoLine =''
  let qianzi = ''
  for (let item of zhuanrang_info.zhuanrangs) {
    churangfang += add_p(`${add_underLine(item.zhuanrang_name)}（以下称${zh_list[count]}方),住所:${add_underLine(`待填`)};`)
    shourangfang += add_p(`${add_underLine(item.shourang_name)}（以下称${zh_list[count+1]}方),住所:${add_underLine(`待填`)};`)
    oneLine+=`${zh_list[count]}方出资${get_chuzie_byName(item.zhuanrang_name)}万元人民币，占${get_chuzie_byName(item.zhuanrang_name) *100 / get_zhuceziben()}%；`
    twoLine+= `${zh_list[count]}方将所持有标的公司${Number(item.zhuanrange) * 100 / get_zhuceziben()}％股权作价${item.zhuanrange}万元人民币转让给${zh_list[count+1]}方；`
    qianzi+= add_qianzi(`${zh_list[count]}方：`) + add_qianzi(`     ${zh_list[count+1]}方：`)
    count+=1
  }
  content = `${add_p('出让方:')+churangfang+add_p('受让方:')+shourangfang}`
  return {content,oneLine,count,twoLine,qianzi}
}
function get_chuzie_byName(name:string){
  return Number(formState_hezi.gudongs.filter(item=>item.name == name).map(item=>item.chuzie))
}
// 合资有限公司 获得总资本
function get_zhuceziben() {
  return formState_hezi.gudongs
    .map((gudong) => Number(gudong.chuzie))
    .reduce((pre, cur) => pre + cur);
}

function generate_tongyi() {
  console.log(zhuanrang_info.zhuanrangs)
  let content = '';
  for (let item of zhuanrang_info.zhuanrangs) {
    content += `同意股东${item.shourang_name} 受让${item.zhuanrang_name}持有的本公司${
      (Number(item.zhuanrange) / get_zhuceziben()) * 100
    }%的股权，`;
  }
  return content;
}

function generate_new_chuzibili() {
  const modify_all_chuzi = modify_hezi.gudongs
    .map((gudong) => Number(gudong.chuzie))
    .reduce((pre, cur) => pre + cur);
  let content = '';
  for (let item of modify_hezi.gudongs) {
    content += add_p(
      `${add_underLine(item.name)},认缴出资额：${add_underLine(item.chuzie)}万元,出资比例${
        (Number(item.chuzie) * 100) / modify_all_chuzi
      } %`
    );
  }

  return content;
}
// 一人有限公司股权转让章程修正案
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
    add_p(`三、受让方应于本协议签定之日起3日内，向出让方付清全部股权转让价款。`) +
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
