<script setup lang="ts">
import { getMedicalOrderDetail } from '@/services/order'
import { OrderType } from '@/enums'
import type { OrderDetailResponseType } from '@/types/order'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMedicineOrderDetail } from '@/composable'
const route = useRoute()
// const order = ref<OrderDetailResponseType>()
// onMounted(async () => {
//   const res = await getMedicalOrderDetail(route.query.orderId as string)
//   order.value = res.data
//   console.log(res)
// })
const { item } = useMedicineOrderDetail(route.query.orderId as string)
</script>

<template>
  <div class="order-pay-result-page">
    <cp-nav-bar title="药品支付结果" />
    <div class="result" v-if="item?.status === OrderType.ConsultPay">
      <van-icon name="checked"></van-icon>
      <p class="price">￥{{ item?.actualPayment }}</p>
      <p class="status">支付失败</p>
      <p class="tip">订单支付成功，已通知</p>
      <div class="btn">
        <van-button type="primary" :to="`/order/${item?.id}`">查看订单</van-button>
        <van-button :to="`/room?orderId=${item?.roomId}`">返回诊室</van-button>
      </div>
    </div>
    <div class="result" v-else>
      <van-icon name="checked"></van-icon>
      <p class="price">￥{{ item?.actualPayment }}</p>
      <p class="status">支付成功</p>
      <p class="tip">订单支付成功，已通知</p>
      <div class="btn">
        <van-button type="primary" :to="`/order/${item?.id}`">查看订单</van-button>
        <van-button :to="`/room?orderId=${item?.roomId}`">返回诊室</van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-pay-result-page {
  padding-top: 46px;
}
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-icon {
    font-size: 75px;
    color: var(--cp-primary);
    margin-top: 60px;
  }
  .price {
    font-size: 22px;
    margin-top: 10px;
  }
  .status {
    color: var(--cp-text3);
  }
  .tip {
    color: var(--cp-tip);
    width: 240px;
    text-align: center;
    margin-top: 20px;
  }
  .btn {
    margin-top: 60px;
    .van-button--primary {
      margin-right: 20px;
    }
  }
  &.error {
    .van-icon {
      color: var(--cp-price);
    }
  }
}
</style>
