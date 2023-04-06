<template>
  <form @submit.prevent="login">
  <label>
  Username:
  <input type="text" v-model="formData.username">
  </label>
  <br>
  <label>
  Password:
  <input type="password" v-model="formData.password">
  </label>
  <br>
  <button type="submit">Login</button>
  </form>
  </template>

  <script lang="ts" setup>
const formData = {
  username: '',
  password: '',
  }
const login = (()=>{
  // Perform login logic and store user information in local storage
  localStorage.setItem('user', JSON.stringify({ username: formData.username }))
  // Redirect to homepage
  this.$router.push('/homepage')
  }
)

</script>