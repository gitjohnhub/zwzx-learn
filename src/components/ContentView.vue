<template>
  <a-radio-group v-model:value="value1" size="large">
    <a-radio-button  v-for="item,key in content" :value="key">{{ key }}</a-radio-button>
  </a-radio-group>
  <h1>{{ value1}}</h1>

  <ol>
    <li v-for="(item, i) in content[value1]">{{ item }}</li>
  </ol>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const value1 = ref<string>('电子营业执照申请');
const content = {
    "电子营业执照申请": [
      '询问法人是否为港澳台胞、外国人，若为以上几类人士则引导其前往咨询窗口领取表格办理。若不是则进入',
      '下载电子营业执照APP或打开微信、支付宝搜索电子营业执照小程序，即可进入下载',
      '选择下载执照，输入信息认证，完成后选择企业即可，初始密码123456',
      '如需授权他人使用，则点选主页"授权他人使用”按钮，选择需要授权的营业执照，输入被授权人的个人信息即可。完成授权后，被授权人再按照步骤2-3步骤完成下载即可使用',
    ],
    "食品经营许可证": [
      "a"
    ],
  };
</script>
