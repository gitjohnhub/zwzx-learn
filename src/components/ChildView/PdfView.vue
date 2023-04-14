<template>
  <a-row>
    <a-col :span="6">
      <a-row> <a-divider>市场监督局事项 </a-divider> </a-row>
      <a-row><a-divider>食品经营许可证 </a-divider></a-row>
      <a-row>
        <a-radio-group v-model:value="value">
          <a-radio :style="radioStyle" v-for="item in list.shipin" :value="item.url" :key="item.url">{{item.name}}</a-radio>
        </a-radio-group>
      </a-row>

      <a-row><a-divider>酒类经营许可证零售 </a-divider></a-row>
      <a-row>
        <a-radio-group v-model:value="value">
          <a-radio :style="radioStyle" v-for="item in list.jiulei" :value="item.url" :key="item.url">{{item.name}}</a-radio>
        </a-radio-group>
      </a-row>
    </a-col>
    <a-col :span="18">
      <PdfApp style="height: 90vh; width: 100vh" :pdf="pdfurl"></PdfApp>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import PdfApp from 'vue3-pdf-app';
import 'vue3-pdf-app/dist/icons/main.css';
import { ref, watch } from 'vue';
const pdfurl = ref('/shipin_xinban.pdf');
const value = ref<string>('');
const list = ref({
  shipin: [
    {
      name: '新办',
      url: 'shipin_xinban',
    },
    {
      name: '变更',
      url: 'shipin_biangeng',
    },
    {
      name: '注销',
      url: 'shipin_zhuxiao',
    },
    {
      name: '延续',
      url: 'shipin_yanxu',
    },
  ],
  jiulei: [
    {
      name: '新办',
      url: 'jiulei_xinban',
    },
    {
      name: '变更',
      url: 'jiulei_biangeng',
    },
    {
      name: '注销',
      url: 'jiulei_zhuxiao',
    },
    {
      name: '延续',
      url: 'jiulei_yanxu',
    },
  ],
});
const radioStyle = ref({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});

watch(value, (newValue, oldValue) => {
  pdfurl.value = `/${value.value}.pdf`;
});
</script>
