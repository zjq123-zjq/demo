<script setup lang="ts">
import { Button as vanButton } from 'vant'
import { useUserStore } from './stores/user'
const store = useUserStore()
</script>

<template>
  <p>{{ store.user }}</p>
  <button @click="store.setUser({ id: 1, mobile: '123', account: '1', avatar: '22', token: '12' })">
    登录
  </button>
  <button @click="store.delUser()">退出</button>
  <van-button type="danger">危险按钮</van-button>
</template>

<style scoped>
button {
  border: 1px solid #ccc;
  color: black;
  margin-top: 10px;
}
</style>
