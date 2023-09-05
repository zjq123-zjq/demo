<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getConsultOrderPre, createConsultOrder, getConsultOrderPayUrl } from '@/services/consult'
import { getPatientDetail } from '@/services/user'
import { useCounterStore } from '@/stores/consult'
import type { ConsultOrderPreData } from '@/types/consult'
import type { Patient } from '@/types/user'
import { showToast, showConfirmDialog, showLoadingToast } from 'vant'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
const router = useRouter()
const store = useCounterStore()
const payInfo = ref<ConsultOrderPreData>()
const loadData = async () => {
  const res = await getConsultOrderPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  payInfo.value = res.data
  store.setCoupon(payInfo.value.couponId)
}
loadData()
const patient = ref<Patient>()
const loadPatient = async () => {
  if (store.consult.patientId) {
    const res = await getPatientDetail(store.consult.patientId)
    patient.value = res.data
  }
}
loadPatient()
const agree = ref(false)
const show = ref(false)
const loading = ref(false)
const orderId = ref('')
const paymentMethod = ref<0 | 1>()
const submit = async () => {
  if (!agree.value) return showToast('请勾选我已同意支付协议')
  try {
    loading.value = true
    const res = await createConsultOrder(store.consult)
    orderId.value = res.data.id
    store.clear()
    show.value = true
  } finally {
    loading.value = false
  }
}
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})
const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确定关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({
    message: '跳转支付',
    forbidClick: true
  })
  const res = await getConsultOrderPayUrl({
    orderId: orderId.value,
    paymentMethod: paymentMethod.value,
    payCallback: 'http://localhost:5173/#/room'
  })
  window.location.href = res.data.payUrl
}
onMounted(() => {
  if (
    !store.consult.type ||
    !store.consult.illnessDesc ||
    !store.consult.illnessTime ||
    !store.consult.patientId ||
    !store.consult.depId
  ) {
    return showConfirmDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
})
</script>

<template>
  <div class="consult-pay-page" v-if="payInfo">
    <cp-nav-bar title="支付"></cp-nav-bar>
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payInfo?.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠劵" :value="`-￥${payInfo.couponDeduction}`"></van-cell>
      <van-cell title="积分抵扣" :value="`-￥${payInfo.pointDeduction}`"></van-cell>
      <van-cell title="实付款" :value="`￥${payInfo.actualPayment}`" class="pay-price"></van-cell>
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${patient?.name} | ${patient?.genderValue} | ${patient?.age} 岁`"
      ></van-cell>
      <van-cell title="病情描述" :label="store.consult.illnessDesc"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意<span class="text">支付协议</span></van-checkbox>
    </div>
    <van-submit-bar
      button-type="primary"
      :price="payInfo.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
      :loading="loading"
      @click="submit"
    />
    <cp-pay-sheet
      v-model:show="show"
      :order-id="orderId"
      :actualPayment="payInfo.actualPayment"
      :onClose="onClose"
    ></cp-pay-sheet>

    <!-- <van-action-sheet
      v-model:show="show"
      title="选择支付方式"
      :close-on-popstate="false"
      :closeable="false"
      :before-close="onClose"
    >
      <div class="pay-type">
        <p class="amount">￥{{ payInfo.actualPayment.toFixed(2) }}</p>
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
    </van-action-sheet> -->
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;

  .pay-info {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    align-items: center;

    .tit {
      width: 100%;
      font-size: 16px;
      margin-bottom: 10px;
    }

    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
    }

    .desc {
      flex: 1;

      > span {
        display: block;
        color: var(--cp-tag);

        &:first-child {
          font-size: 16px;
          color: var(--cp-text2);
        }
      }
    }
  }

  .pay-price {
    ::v-deep() {
      .van-cell__title {
        font-size: 16px;
      }

      .van-cell__value {
        font-size: 16px;
        color: var(--cp-price);
      }
    }
  }

  .pay-space {
    height: 12px;
    background-color: var(--cp-bg);
  }

  .pay-schema {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      color: var(--cp-primary);
    }
  }

  ::v-deep() {
    .van-submit-bar__button {
      font-weight: normal;
      width: 160px;
    }
  }
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
      .icon {
        font-size: 18px;
        margin-right: 10px;
      }
      .van-checkbox:deep(.van-checkbox__icon) {
        font-size: 16px;
      }
    }
  }
}
</style>
