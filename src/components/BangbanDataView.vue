<template>
  <a-row>
    <a-col :span="20"></a-col>
    <a-col :span="4">
      {{ userInfo.userInfo.username }}
      <a-button @click="SignOut">登出</a-button>
    </a-col>
  </a-row>
  <a-row>
    <a-card>
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="变更">
              <a-input v-model:value="formState.biangeng" type="number"> </a-input>
            </a-form-item>
            <a-form-item label="食品">
              <a-input v-model:value="formState.shipin" type="number"> </a-input>
            </a-form-item>
            <a-form-item label="酒类">
              <a-input v-model:value="formState.jiulei" type="number"> </a-input>
            </a-form-item>
            <a-form-item label="新设/迁入">
              <a-input v-model:value="formState.xinshe" type="number"> </a-input>
            </a-form-item>
            <a-form-item label="其他">
              <a-input v-model:value="formState.qita" type="number"> </a-input>
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="税务">
              <a-input v-model:value="formState.shuiwu" type="number"> </a-input>
            </a-form-item>
            <a-form-item label="卫健委">
              <a-input v-model:value="formState.weijianwei" type="number"> </a-input>
            </a-form-item>
            <a-form-item label="文旅局">
              <a-input v-model:value="formState.wenlv" type="number"> </a-input>
            </a-form-item>
            <a-form-item label="其他">
              <a-input v-model:value="formState.qita2" type="number"> </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="submitData"> 提交数据 </a-button>
            <a-button @click="getTodayData">获取今日已填报数据</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </a-row>
  <a-card title="帮办统计数据">
    <a-space :size="12">
      <a-tag color="#f50">{{ count }}</a-tag>
      <a-config-provider :locale="zhCN">
        <a-range-picker v-model:value="query_Date"
        @change="handleMonthRange"
        />
      </a-config-provider>
      <a-select
    v-model:value="selectedUsers"
    mode="multiple"
    style="width: 300px"
    placeholder="选择用户"
    :options=options
    @change="handleSelectedChange"
  ></a-select>
    </a-space>
    <!-- Database bangban data -->
    <a-table
      :columns="columns"
      :data-source="dataSource"
      @change="handleChange"
      @showSizeChange="onShowSizeChange"
      :pagination="pagination"
      bordered
      size="small"
    >
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import { onBeforeMount, ref, computed,watch } from 'vue';
import { message } from 'ant-design-vue';
import router from '@/router';
import api from '@/api';
import { useUserStore } from '@/stores/index';
const userInfo = useUserStore();
const dataSource = ref();
const formatedDate = new Date();
const selectedUsers = ref([])
const options = ref([
  { value: '秦殷其', label: '秦殷其' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
]);
// 业务员变化
const handleSelectedChange = () => {
  getData()
};
// 日期选择器变化
const query_Date = ref([]);
const handleMonthRange = ()=>{
  getData()
}
const submitDate =
  formatedDate.getFullYear().toString() +
  (formatedDate.getMonth() + 1).toString().padStart(2, '0') +
  formatedDate.getDate().toString().padStart(2, '0');
// const today = new Date().toISOString().slice(0,10)

interface FormState {
  biangeng: number;
  shipin: number;
  jiulei: number;
  xinshe: number;
  qita: number;
  shuiwu: number;
  weijianwei: number;
  wenlv: number;
  qita2: number;
}
const formState = ref<FormState>({
  biangeng: 0,
  shipin: 0,
  jiulei: 0,
  xinshe: 0,
  qita: 0,
  shuiwu: 0,
  weijianwei: 0,
  wenlv: 0,
  qita2: 0,
});
function getTodayData() {
  api
    .getBangbanData({ submitDate: submitDate, email: userInfo.userInfo.username })
    .then((res: any) => {
      console.log(res.rows);
      if (res.rows.length > 0) {
        let arr = res.rows[0]?.['business']?.split(',');
        formState.value.biangeng = arr[0] ?? 0;
        formState.value.shipin = arr[1] ?? 0;
        formState.value.jiulei = arr[2] ?? 0;
        formState.value.xinshe = arr[3] ?? 0;
        formState.value.qita = arr[4] ?? 0;
        formState.value.shuiwu = arr[5] ?? 0;
        formState.value.weijianwei = arr[6] ?? 0;
        formState.value.wenlv = arr[7] ?? 0;
        formState.value.qita2 = arr[8] ?? 0;
      }
    });
}

function submitData() {
  const business = [];
  let key: keyof FormState;
  for (key in formState.value) {
    // formState.value[key] = formState.value[key] == 0 ? 0 : formState.value[key];
    business.push(formState.value[key]);
  }
  const business_str = business.join(',');

  const dataToSubmit = {
    business: business_str,
    submitDate: submitDate,
    email: userInfo.userInfo.username,
  };
  api.addBangbanData(dataToSubmit).then((res) => {
    message.info('上报成功');
    getData();
  });
}
function SignOut() {
  userInfo.logout();
  router.push('Login');
}
const labelCol = { style: { width: '80px' } };
const wrapperCol = { span: 20 };
const count = ref<number>();

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '业务',
    dataIndex: 'business',
    key: 'business',
  },
  {
    title: '提交时间',
    dataIndex: 'submitDate',
    key: 'submitDate',
  },
  {
    title: '用户',
    dataIndex: 'email',
    key: 'email',
  },
];
onBeforeMount(() => {
  getData();
  console.log('userInfo===>', userInfo.userInfo.username);
});
// 分页
const pager = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});
const handleChange = async (page: any) => {
  pager.value = page;
  getData();
};
const pagination = computed(() => {
  return {
    ...pager.value,
    change: handleChange,
  };
});

const onShowSizeChange = async (page: any) => {};

const getData = async (params?: any) => {

  params = {
    ...params,
    ...pager.value,
  };
  if(selectedUsers.value.length > 0){
    params.selectedUsers = selectedUsers.value
  }
    // console.log(query_Date.value)
  if (query_Date.value !== null ){
    const startDate = dayjs(query_Date.value[0]).format('YYYYMMDD');
    const endDate = dayjs(query_Date.value[1]).format('YYYYMMDD');
    console.log(startDate,endDate);
    params.monthRange = [startDate,endDate]
  }else{
    params.monthRange = null
  }
  return await api.getBangbanData(params).then((res: any) => {
    pager.value = res.page;
    count.value = pager.value.total;
    dataSource.value = res.rows.map((item: any) => {
      return {
        editVisible: false,
        ...item,
      };
    });
    return res.rows;
  });
};
</script>

<style scoped></style>
