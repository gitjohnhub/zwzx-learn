<template>
  <a-layout class="outer">
    <a-layout-header class="header">
      <h1>食品经营许可申请表</h1>
    </a-layout-header>

    <a-layout-content>
      <a-row class="row_outer">
        <a-col :span="6">名    称</a-col>
        <a-col :span="18"  class="col_outer"><a-tag color="#f50">{{ table_info.company_name }}</a-tag></a-col>
      </a-row>
      <a-row style="border-bottom: solid;">
        <a-col :span="6">社会信用代码</a-col>
        <a-col :span="18"  class="col_outer"><a-tag color="#f50">{{ table_info.code }}</a-tag></a-col>
      </a-row>
      <a-row style="border-bottom: solid;">
        <a-col :span="6">经济性质</a-col>
        <a-col :span="18"  class="col_outer"><a-tag color="#f50">□企业</a-tag>   □个体工商户    □农民专业合作社    □其他</a-col>
      </a-row>
      <a-row style="border-bottom: solid;">
        <a-col :span="6">所属区（县）</a-col>
        <a-col :span="6"  class="col_outer"><a-tag color="#f50">{{ table_info.quxian }}</a-tag></a-col>
        <a-col :span="6">所属街道</a-col>
        <a-col :span="6"  class="col_outer"><a-tag color="#f50">{{ table_info.jiedao }}</a-tag></a-col>
      </a-row>
      <a-row style="border-bottom: solid;">
        <a-col :span="6">住所</a-col>
        <a-col :span="18"  class="col_outer"><a-tag color="#f50">{{ table_info.code }}</a-tag></a-col>
      </a-row>
      <a-row style="border-bottom: solid;">
        <a-col :span="6">经营场所</a-col>
        <a-col :span="18"  class="col_outer"><a-tag color="#f50">□企业</a-tag>   □个体工商户    □农民专业合作社    □其他</a-col>
      </a-row>
      <TwoCol title="E-mail" :content="table_info.email"/>
    </a-layout-content>
    <a-layout-footer class="footer"
      >上海市市场监督管理局
      <h2>填报说明</h2></a-layout-footer
    >
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import TwoCol from '../TwoCol.vue';
const table_info = ref({
  company_name: '上海**餐饮有限公司',
  shenqing_date: '2021年  11 月  12 日',
  code:'92310*************',
  quxian:'长宁区',
  jiedao:'周家桥街道',
  email:'xx@qq.com',
  content: `敬告

1、	申请人应当了解相当的法律、法规，并确知其享有的权力和应承担的义务。
2、	申请人应该如实向许可机关提交有关材料和反映真实情况，并对申请材料的真实性、有效性、合法性负责。
3、	提交的申请材料、证件复印件应该是原件，如需提交复印件的，应当在复印件上注明与原件一致，并由申请人或者指定代表（委托代理人）签字（盖章）。
4、	提交的申请材料、证件复印件应当使用A4纸。
5、	填写申请书应当字迹工整，使用钢笔或签字笔（蓝色或者黑色）。
6、	在申请许可过程中，申请人应当认真阅读申请书的内容。
`,
});
</script>
<style>
.outer {
  height: 100vh;
  width: 80vh;
  border: solid;
  background-color: white;
}
.row_outer{
  border-bottom: solid;
  border-top: solid;

}
.col_outer{
  border-left: solid;
  /* border-top: solid; */

}
.info {
  border: solid;
  background-color: white;
  margin: 100px;
  font-size: 10px;
}
.footer {
  background-color: white;
}
.header {
  background-color: white;
}
</style>
