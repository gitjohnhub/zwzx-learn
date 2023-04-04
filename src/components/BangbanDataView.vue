<script setup lang="ts">
import {useDataStore} from '@/stores/counter'
import { onBeforeMount,ref } from 'vue';
import { message } from 'ant-design-vue';

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
    dataStore.insertBangban_data(submitData)
  }else{
    console.log('update')
    submitData['id'] = dataStore.isTodayDataExists()
    dataStore.updateBangban_data(submitData)
  }
  dataStore.getBangban_data()
}
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
    <a-form
    layout="inline"
    :model="formState"
  >
    <a-form-item label="biangeng">
      <a-input v-model:value="formState.biangeng" type='number' placeholder="biangeng">
      </a-input>
    </a-form-item>
    <a-form-item label="shipin">
      <a-input v-model:value="formState.shipin" type='number' placeholder="shipin">
      </a-input>
    </a-form-item>
    <a-form-item label="shipin">
      <a-input v-model:value="formState.jiulei" type='number' placeholder="shipin">
      </a-input>
    </a-form-item>
    <a-form-item label="biangeng">
      <a-input v-model:value="formState.xinshe" type='number' placeholder="biangeng">
      </a-input>
    </a-form-item>
    <a-form-item label="shipin">
      <a-input v-model:value="formState.qita" type='number' placeholder="shipin">
      </a-input>
    </a-form-item>
    <a-form-item label="shipin">
      <a-input v-model:value="formState.shuiwu" type='number' placeholder="shipin">
      </a-input>
    </a-form-item>
    <a-form-item label="shipin">
      <a-input v-model:value="formState.weijianwei" type='number' placeholder="shipin">
      </a-input>
    </a-form-item>
    <a-form-item label="shipin">
      <a-input v-model:value="formState.wenlv" type='number' placeholder="shipin">
      </a-input>
    </a-form-item>
    <a-form-item label="shipin">
      <a-input v-model:value="formState.qita2" type='number' placeholder="shipin">
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
  <a-table :dataSource="dataStore.bangban_data" :columns="columns" />
</template>

<style scoped>
</style>
