<template>
  <a-card title="工作人员登陆" style="width: 500px; margin-top: 300px">
    <a-form
      :model="formState"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="用户名" name="account">
        <a-input v-model:value="formState.account" />
      </a-form-item>

      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" @click="login">登陆</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import api from '../api/index';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/index';
const userStore = useUserStore();
const router = useRouter();
const formState = ref({
  account: '',
  password: '',
});

const login = async () => {
  if (formState.value.account == '' || formState.value.password == '') {
    message.info('请输入用户名和密码');
  } else {
    await api.login(formState.value).then((res: any) => {
      userStore.saveUserInfo(res);
      router.push('BangbanData');
    });
  }
};
</script>
