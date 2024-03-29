<script setup lang="ts">
import { showLoadingToast, showToast } from 'vant'
import { ref } from 'vue'
import { getConsultOrderPayUrl } from '@/services/consult'
const props = defineProps<{
  show: boolean
  orderId: string
  actualPayment: number
  onClose?: () => void
  payCallback: string
}>()

const emits = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()
const paymentMethod = ref<0 | 1>()
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({
    message: '跳转支付',
    forbidClick: true
  })

  const res = await getConsultOrderPayUrl({
    orderId: props.orderId,
    paymentMethod: paymentMethod.value,
    payCallback:
      (import.meta.env.MODE === 'development'
        ? 'http://localhost:5173/#'
        : 'http://43.140.247.104/#') + props.payCallback
  })
  window.location.href = res.data.payUrl
}
</script>

<template>
  <div class="pay-type">
    <van-action-sheet
      :show="show"
      @update:show="emits('update:show', $event)"
      title="选择支付方式"
      :close-on-popstate="false"
      :closeable="false"
      :before-close="onClose"
    >
      <div class="pay-type">
        <p class="amount">￥{{ actualPayment.toFixed(2) }}</p>
        <van-cell-group>
          <van-cell title="微信支付" @click="paymentMethod = 0">
            <template #icon><cp-icon class="icon" name="consult-wechat"></cp-icon></template>
            <template #extra><van-checkbox :checked="paymentMethod === 0"></van-checkbox></template>
          </van-cell>
          <van-cell title="支付宝支付" @click="paymentMethod = 1">
            <template #icon><cp-icon class="icon" name="consult-alipay"></cp-icon></template>
            <template #extra><van-checkbox :checked="paymentMethod === 1"></van-checkbox></template>
          </van-cell>
        </van-cell-group>
        <div class="btn">
          <van-button type="primary" block round @click="pay">立即支付</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<style lang="scss" scoped>
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
