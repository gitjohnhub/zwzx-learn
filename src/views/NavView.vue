<template>
  <a-menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="inline"
    @click="handleClick"
  >
    <a-sub-menu key="sub1" @titleClick="titleClick">
      <template #icon>
        <usergroup-add-outlined />
      </template>
      <template #title>帮办服务</template>
      <a-menu-item-group key="g1">
        <template #icon>
          <QqOutlined />
        </template>
        <template #title>市场监督局</template>
        <RouterLink to="/"><a-menu-item key="1">直达链接</a-menu-item></RouterLink>
        <RouterLink to="/Content"><a-menu-item key="2">办理指引</a-menu-item></RouterLink>
        <RouterLink to="/Shipinxiazai"><a-menu-item key="3">指导视频</a-menu-item></RouterLink>
      </a-menu-item-group>

       <!-- 税务直达链接 -->
      <!-- <a-menu-item-group key="g2" title="税务局">
        <RouterLink to='/Shuiwu'><a-menu-item key="4">直达链接</a-menu-item></RouterLink>
      </a-menu-item-group> -->
      <a-menu-item-group key="g3" title="卫生健康委员会">
        <!-- <a-menu-item key="4">Option 3</a-menu-item> -->
        <RouterLink to="/Weijianwei"><a-menu-item key="4">直达链接</a-menu-item></RouterLink>
      </a-menu-item-group>
      <a-menu-item-group key="g4" title="民政">
        <!-- <a-menu-item key="3">Option 3</a-menu-item> -->
        <RouterLink to="/Minzhen"><a-menu-item key="4">直达链接</a-menu-item></RouterLink>
      </a-menu-item-group>
    </a-sub-menu>

    <!-- 章程范本自动生成 -->

    <a-sub-menu key="sub2" @titleClick="titleClick">
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>章程范本</template>
      <RouterLink to="/Zidongshengcheng"><a-menu-item key="5">自动生成</a-menu-item></RouterLink>
      <!-- <RouterLink to="/Fanben"><a-menu-item key="6">表格样张参考</a-menu-item></RouterLink> -->
    </a-sub-menu>
    <a-sub-menu key="sub3" @titleClick="titleClick">
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>表格样张参考</template>
      <!-- <RouterLink to="/Fanben/Shipinxinban"><a-menu-item key="6">食品经营许可证新办</a-menu-item></RouterLink> -->
      <RouterLink to="/Fanben/PdfView"><a-menu-item key="6">样表查询</a-menu-item></RouterLink>
      <!-- <RouterLink to="/Fanben"><a-sub-menu key="7">表格样张参考</a-sub-menu></RouterLink> -->
    </a-sub-menu>

    <a-sub-menu key="sub4">
      <template #icon>
        <SettingOutlined />
      </template>
      <template #title>工作人员入口</template>
      <RouterLink to="/BangbanData"><a-menu-item key="8">帮办数据上报</a-menu-item></RouterLink>
      <RouterLink to="/Leave"><a-menu-item key="9">请假审批</a-menu-item></RouterLink>
      <!-- <a-menu-item key="10">Option 10</a-menu-item> -->
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import {
  UsergroupAddOutlined,
  QqOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import BangbanView from '@/components/BangbanView.vue';
export default defineComponent({
  components: {
    UsergroupAddOutlined,
    QqOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup() {
    const selectedKeys = ref<string[]>(['1']);
    const openKeys = ref<string[]>(['sub1']);
    const handleClick: MenuProps['onClick'] = (e) => {
      console.log('click', e);
    };
    const titleClick = (e: Event) => {
      console.log('titleClick', e);
    };
    watch(
      () => openKeys,
      (val) => {
        console.log('openKeys', val);
      }
    );
    return {
      selectedKeys,
      openKeys,

      handleClick,
      titleClick,
    };
  },
});
</script>
