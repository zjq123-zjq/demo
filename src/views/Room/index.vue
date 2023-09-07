<script setup lang="ts"></script>

<template>
  <div class="room-page">
    <CpNavBar title="医生问诊室"></CpNavBar>
    聊天室
    <van-button @click="$router.push('/order/pay?id=6938582318133248')">购买药品</van-button>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 46px;
}
</style>
