<template>
  <a-card title="工作人员登陆" style="width: 500px; margin-top: 300px">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item
        label="邮箱"
        name="username"
        :rules="[{ required: false, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" suffix="@zwzx.com" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: false, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" @click="login">登陆</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script lang="ts" setup>
import { defineComponent, reactive } from 'vue';
import { message } from 'ant-design-vue';
import useAuthUser from '@/auth/useAuthUser';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/counter';
const dataStore = useDataStore();
const router = useRouter();
const user = useAuthUser();
const formState = {
  username: '',
  password: '',
};

const login = async () => {
  if (formState.username == '' || formState.password == '') {
    message.info('请输入用户名和密码');
  } else {
    await user.login(formState.username + '@zwzx.com', formState.password).then(res=>{
      if (res.data.user != null){
        console.log(res.data.user)
        user.user.value = res.data.user.email!
        dataStore.user = res.data.user.email!;
        router.push({ name: 'BangbanData' });
      }else {
        message.info('用户名或密码错误，联系管理员');
      }
    })
  }
}
</script>
