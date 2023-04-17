<template>
  <a-row>
    <a-col :span="6">
      <a-row> <a-divider>事项列表 </a-divider> </a-row>

      <a-directory-tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        :multiple="false"
        :tree-data="treeData"
        :autoExpandParent="false"
      ></a-directory-tree>
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


const expandedKeys = ref<string[]>(['0-0', '0-1','0-2','0-3','0-4']);
const selectedKeys = ref<string[]>([]);
watch(selectedKeys,(newValue,oldValue)=>{
  console.log("selected keys=>",selectedKeys)
  pdfurl.value = `/${selectedKeys.value[0]}.pdf`
})
const treeData = [
  {
    title: '食品经营许可证',
    key: '0-0',
    selectable:false,
    children: [
      {
        title: '新办',
        key: 'shipin_xinban',
        isLeaf: true,
      },
      {
        title: '变更',
        key: 'shipin_biangeng',
        isLeaf: true,
      },
      {
        title: '延续',
        key: 'shipin_yanxu',
        isLeaf: true,
      },
      {
        title: '注销',
        key: 'shipin_zhuxiao',
        isLeaf: true,
      },
    ],
  },
  {
    title: '酒类经营许可证（零售）',
    key: '0-1',
    selectable:false,
    children: [
      {
        title: '新办',
        key: 'jiuleilingshou_xinban',
        isLeaf: true,
      },
      {
        title: '变更',
        key: 'jiuleilingshou_biangeng',
        isLeaf: true,
      },
      {
        title: '延续',
        key: 'jiuleilingshou_yanxu',
        isLeaf: true,
      },
      {
        title: '注销',
        key: 'jiuleilingshou_zhuxiao',
        isLeaf: true,
      },
    ],
  },
  {
    title: '酒类经营许可证（批发）',
    key: '0-2',
    selectable:false,
    children: [
      {
        title: '新办',
        key: 'jiuleipifa_xinban',
        isLeaf: true,
      },
      {
        title: '变更',
        key: 'jiuleipifa_biangeng',
        isLeaf: true,
      },
      {
        title: '延续',
        key: 'jiuleipifa_yanxu',
        isLeaf: true,
      },
      {
        title: '注销',
        key: 'jiuleipifa_zhuxiao',
        isLeaf: true,
      },
    ],
  },
  {
    title: '特种设备',
    key: '0-3',
    selectable:false,
    children: [
      {
        title: '新办',
        key: 'tezhongshebei_xinban',
        isLeaf: true,
      },
      {
        title: '复审',
        key: 'tezhongshebei_fushen',
        isLeaf: true,
      }
    ],
  },
  {
    title: '公共卫生许可证',
    key: '0-4',
    selectable:false,
    children: [
      {
        title: '新办',
        key: 'weisheng_xinban',
        isLeaf: true,
      },
      {
        title: '变更',
        key: 'weisheng_biangeng',
        isLeaf: true,
      },
      {
        title: '延续',
        key: 'weisheng_yanxu',
        isLeaf: true,
      },
      {
        title: '注销',
        key: 'weisheng_zhuxiao',
        isLeaf: true,
      },
    ],
  },
];
const radioStyle = ref({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});

</script>
