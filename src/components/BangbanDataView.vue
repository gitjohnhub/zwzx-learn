<script setup lang="ts">
import {useDataStore} from '@/stores/counter'
import { onBeforeMount,ref } from 'vue';
import type { FormProps } from 'ant-design-vue';
import { func } from 'vue-types';

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
  const submitDate = new Date().toString()
  const submitData = {business:business_str,submitDate:submitDate}
  dataStore.insertBangban_data(submitData)
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
        ]
onBeforeMount(()=>{
   getData()
   console.log(`page data ${dataStore.bangban_data}`)
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
