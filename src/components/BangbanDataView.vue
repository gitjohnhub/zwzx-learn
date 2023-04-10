<template>
  <a-row>
    <a-col :span="20">{{ dataStore.user }}</a-col>
    <a-col :span="4">
      <a-button @click="SignOut">登出</a-button>
    </a-col>
    <a-col :span="4">
      <a-button @click="getTodayData">获取今日已填报数据</a-button>
    </a-col>
  </a-row>
  <a-row>
    <a-card>
      <a-form
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="变更">
      <a-input v-model:value="formState.biangeng" type='number'>
      </a-input>
    </a-form-item>
    <a-form-item label="食品">
      <a-input v-model:value="formState.shipin" type='number'>
      </a-input>
    </a-form-item>
    <a-form-item label="酒类">
      <a-input v-model:value="formState.jiulei" type='number'>
      </a-input>
    </a-form-item>
    <a-form-item label="新设/迁入">
      <a-input v-model:value="formState.xinshe" type='number'>
      </a-input>
    </a-form-item>
    <a-form-item label="其他">
      <a-input v-model:value="formState.qita" type='number'>
      </a-input>
    </a-form-item>
    <a-form-item label="税务">
      <a-input v-model:value="formState.shuiwu" type='number'>
      </a-input>
    </a-form-item>
    <a-form-item label="卫健委">
      <a-input v-model:value="formState.weijianwei" type='number'>
      </a-input>
    </a-form-item>
    <a-form-item label="文旅局">
      <a-input v-model:value="formState.wenlv" type='number'>
      </a-input>
    </a-form-item>
    <a-form-item label="其他">
      <a-input v-model:value="formState.qita2" type='number'>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        @click="submitData"
      >
        提交数据
      </a-button>
    </a-form-item>
  </a-form>

    </a-card>
  </a-row>

  <a-table :dataSource="dataStore.bangban_data" :columns="columns" >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'email'">
          <a-tag :color="record.email == dataStore.user ?'red':'green'">
            {{ record.email }}
          </a-tag>
        </template>
    </template>
  </a-table>
</template>


<script setup lang="ts">
import {useDataStore} from '@/stores/counter'
import { onBeforeMount,ref } from 'vue';
import { message } from 'ant-design-vue';
import router from '@/router';
const dataStore = useDataStore()
interface FormState {
  biangeng: number,
      shipin: number,
      jiulei:number,
      xinshe:number,
      qita:number,
      shuiwu:number,
      weijianwei:number,
      wenlv:number,
      qita2:number
}
const formState = ref<FormState>({
      biangeng: 0,
      shipin: 0,
      jiulei:0,
      xinshe:0,
      qita:0,
      shuiwu:0,
      weijianwei:0,
      wenlv:0,
      qita2:0
});
function getTodayData(){
  console.log(dataStore.todayData[0]?.['business']?.[0])
  let arr = dataStore.todayData[0]?.['business']?.split(',')
  formState.value.biangeng =arr[0] ?? 0
  formState.value.shipin = arr[1] ?? 0
  formState.value.jiulei = arr[2] ?? 0
  formState.value.xinshe = arr[3] ?? 0
  formState.value.qita = arr[4] ?? 0
  formState.value.shuiwu = arr[5] ?? 0
  formState.value.weijianwei = arr[6] ?? 0
  formState.value.wenlv = arr[7] ?? 0
  formState.value.qita2 = arr[8] ?? 0
}
function submitData(){
  const business = []
  let key: keyof FormState
  for (key in formState.value){
    business.push(formState.value[key])
  }
  const business_str = business.join(',')
  const submitDate = new Date().toLocaleDateString()
  const submitData = {'business':business_str,'submitDate':submitDate,'id':0}
  if (dataStore.isTodayDataExists() == null){
    console.log('insert')
    dataStore.insertBangban_data(submitData).then(res=>{
      message.info("上报成功")
    })
  }else{
    console.log('update')
    submitData['id'] = dataStore.isTodayDataExists() as number
    dataStore.updateBangban_data(submitData).then(res=>{
      message.info("今日数据更新成功")
    })
  }
  dataStore.getBangban_data()
}
function SignOut(){
  dataStore.signOut()
  router.push({name:'Login'})
}
const labelCol = { style: { width: '80px' } }
const wrapperCol =  { span: 20 }
const columns = [
          {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'business',
            dataIndex: 'business',
            key: 'business',
          },
          {
            title: 'submitDate',
            dataIndex: 'submitDate',
            key: 'submitDate',
            sorter: (a: any, b: any) => new Date(a.submitDate) > new Date(b.submitDate),
            sortDirections: ['descend'],
            defaultSortOrder: 'descend',
          },
          {
            title: 'user',
            dataIndex: 'email',
            key: 'email',
          },
        ]
onBeforeMount(()=>{
   getData()
})
async function getData(){
  await dataStore.getBangban_data()
}
</script>


<style scoped>
</style>
