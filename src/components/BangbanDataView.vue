<script setup lang="ts">
import {useDataStore} from '@/stores/counter'
import { onBeforeMount,ref } from 'vue';
import { message } from 'ant-design-vue';
import router from '@/router';
const dataStore = useDataStore()

const formState = ref({
      'biangeng': 0,
      'shipin': '0',
      'jiulei':0,
      'xinshe':0,
      'qita':0,
      'shuiwu':0,
      'weijianwei':0,
      'wenlv':0,
      'qita2':0
});
function submitData(){
  const business = []
  for (let key in formState.value){
    business.push(formState.value[key])
  }
  const business_str = business.join(',')
  const submitDate = new Date().toLocaleDateString()
  const submitData = {'business':business_str,'submitDate':submitDate,'id':'0'}
  if (dataStore.isTodayDataExists() == null){
    console.log('insert')
    dataStore.insertBangban_data(submitData).then(res=>{
      message.info("上报成功")
    })
  }else{
    console.log('update')
    submitData['id'] = dataStore.isTodayDataExists()
    dataStore.updateBangban_data(submitData).then(res=>{
      message.info("今日数据更新成功")
    })
  }
  dataStore.getBangban_data()
}
function SignOut(){
  dataStore.signOut()
  router.push('Login')
}
const labelCol = { style: { width: '150px' } }
const wrapperCol =  { span: 14 }
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
          },
          {
            title: 'user',
            dataIndex: 'user',
            key: 'user',
          },
        ]
onBeforeMount(()=>{
   getData()
})
async function getData(){
  await dataStore.getBangban_data()
}
</script>

<template>
  <a-row>
    {{ dataStore.user }}
    <a-button @click="SignOut">登出</a-button>
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
        submit
      </a-button>
    </a-form-item>
  </a-form>

    </a-card>
  </a-row>

  <a-table :dataSource="dataStore.bangban_data" :columns="columns" />
</template>

<style scoped>
</style>
