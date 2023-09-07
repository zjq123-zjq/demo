<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAdderss, getMedicinrInfo, createMedicalOrder } from '@/services/order'
import type { MedicineResponseType, addressResponseType } from '@/types/order'
import { useRoute } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
const route = useRoute()
const item = ref<MedicineResponseType>()
const address = ref<addressResponseType>()
const prescriptionId = route.query.id
onMounted(async () => {
  const res = await getMedicinrInfo({ prescriptionId: prescriptionId as string })
  const addRes = await getAdderss()
  item.value = res.data
  address.value = addRes.data[0]
})
//生成订单
const agree = ref(false)
const show = ref(false)
const loading = ref(false)
const medicalOrderId = ref<string>()
const onsubmit = async () => {
  if (!agree.value) return showToast('请同意支付协议')
  if (!address.value?.id) return showToast('请选择收货地址')
  if (!prescriptionId) return showToast('未找到处方')
  const orderRes = await createMedicalOrder({
    id: prescriptionId as string,
    addressId: address.value?.id as string
  })
  show.value = true
  console.log(orderRes.data)

  medicalOrderId.value = orderRes.data.id
}
const onClose = () => {
  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--cp-primary)'
  })
    .then((res) => {
      return false
    })
    .catch((error) => {
      // router.push('/user/consult')
      return true
    })
}
</script>
<template>
  <div class="order-pay-page" v-if="item && address">
    <CpNavBar title="药品支付"></CpNavBar>
    <div class="order-address">
      <p class="area">
        <van-icon name="location"></van-icon>
        <span>{{ address?.province }}</span>
      </p>
      <p class="detail">{{ address?.addressDetail }}</p>
      <p>
        {{ address?.receiver }}
        {{ address?.mobile?.replace(/^(\d{3})(?:\d{4})(\d{4})$/, '\$1****\$2') }}
      </p>
    </div>
    <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div class="item van-hairline--top" v-for="i in item.medicines" :key="i.id">
        <img class="img" :src="i.avatar" alt="" />
        <div class="info">
          <p class="name">
            <span>{{ i.name }}</span>
            <span>×{{ i.quantity }}</span>
          </p>
          <p class="size">
            <van-tag v-if="i.prescriptionFlag === 1">处方药</van-tag>
            <span>{{ i.specs }}</span>
          </p>
          <p class="price">￥{{ i.amount }}</p>
        </div>
        <div class="desc">{{ i.usageDosag }}</div>
      </div>
    </div>
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${item.payment}`"></van-cell>
        <van-cell title="运费" :value="`￥${item.expressFee}`"></van-cell>
        <van-cell title="优惠劵" :value="`￥${item.couponDeduction}`"></van-cell>
        <van-cell title="实付款" :value="`￥${item.actualPayment}`" class="price"></van-cell>
      </van-cell-group>
    </div>
    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如⾮错发、漏发药品的情况，药品⼀经发出
        不得退换，请核对药品信息⽆误后下单。
      </p>
      <van-checkbox v-model="agree">我已同意<a href="javascript:;">⽀付协议</a></van-checkbox>
    </div>
    <van-submit-bar
      :loading="loading"
      @submit="onsubmit"
      :price="item.actualPayment * 100"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
    ></van-submit-bar>
  </div>
  <div class="order-pay-page" v-else>
    <cp-nav-bar title="药品⽀付" />
    <van-skeleton title avatar row="2" style="margin-top: 15px" />
    <van-skeleton title :row="4" style="margin-top: 50px" />
    <van-skeleton title :row="4" style="margin-top: 50px" />
  </div>
  <CpPaySheet
    payCallback="order/pay/result"
    :onClose="onClose"
    :actualPayment="item?.actualPayment!"
    v-model:show="show"
    :orderId="medicalOrderId!"
  ></CpPaySheet>
</template>

<style lang="scss" scoped>
:deep(.van-nav-bar) {
  background-color: var(--cp-primary);

  .van-nav-bar__arrow,
  .van-nav-bar__title {
    color: #fff;
  }
}

:deep(.van-cell) {
  .van-cell__title {
    font-size: 16px;
  }

  .van-cell__value {
    font-size: 16px;
  }

  &.price {
    .van-cell__value {
      font-size: 18px;
      color: var(--cp-price);
    }
  }
}

:deep(.van-submit-bar) {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

  .van-button {
    width: 200px;
  }
}

.order-pay-page {
  padding: 46px 0 65px;
}

.order-address {
  padding: 15px 15px 0 15px;
  background-color: #fff;
  font-size: 13px;

  .area {
    color: var(--cp-tag);
    margin-bottom: 5px;

    .van-icon-location {
      color: #ff7702;
      font-size: 14px;
    }
  }

  .detail {
    font-size: 17px;
    margin-bottom: 5px;
  }

  &::after {
    content: '';
    display: block;
    height: 12px;
    background-color: var(--cp-bg);
    margin: 0 -15px;
    margin-top: 15px;
  }
}

.order-medical {
  background-color: #fff;
  padding: 0 15px;

  .head {
    display: flex;
    height: 54px;
    align-items: center;

    > h3 {
      font-size: 16px;
      font-weight: normal;
    }

    > small {
      font-size: 13px;
      color: var(--cp-tag);
      margin-left: 10px;
    }
  }

  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;

    .img {
      width: 80px;
      height: 70px;
      border-radius: 2px;
      overflow: hidden;
    }

    .info {
      padding-left: 15px;
      width: 150px;

      .name {
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;

        > span:first-child {
          width: 200px;
        }

        > span:last-child {
          width: 50px;
          text-align: right;
        }
      }

      .size {
        margin-bottom: 5px;

        .van-tag {
          background-color: var(--cp-primary);
          vertical-align: middle;
        }

        span:not(.van-tag) {
          margin-left: 10px;
          color: var(--cp-tag);
          vertical-align: middle;
        }
      }

      .price {
        font-size: 16px;
        color: #eb5757;
      }
    }

    .desc {
      width: 100%;
      background-color: var(--cp-bg);
      border-radius: 4px;
      margin-top: 10px;
      padding: 4px 10px;
      color: var(--cp-tip);
    }
  }
}

.order-tip {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;

  .tip {
    font-size: 12px;
    color: var(--cp-tag);
    width: 100%;

    &::before {
      content: '*';
      color: var(--cp-price);
      font-size: 14px;
    }

    margin-bottom: 30px;
  }

  .van-checkbox {
    a {
      color: var(--cp-primary);
    }
  }
}
</style>
