<script setup lang="ts">
import { useRoute } from 'vue-router'
import { OrderType } from '@/enums'
import OrderMedical from './components/OrderMedical.vue'
import { useMedicineOrderDetail } from '@/composable'
const route = useRoute()
const { item } = useMedicineOrderDetail(route.params.id as string)
</script>

<template>
  <div class="order-detail-page" v-if="item">
    <CpNavBar title="药品订单详情" />
    <div class="order-head">
      <div class="card" @click="$router.push(`/order/logistics/${item.id}`)">
        <div class="logistics">
          <p>{{ item?.expressInfo?.content }}</p>
          <p>{{ item?.expressInfo?.time }}</p>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
    <OrderMedical :medicineInfo="item" />
    <!-- <div class="order-medical">
      <div class="head">
        <h3>优医药房</h3>
        <small>优医质保 假一赔十</small>
      </div>
      <div class="item van-hairline--top" v-for="i in 3" :key="i">
        <img class="img" src="@/assets/ad.png" alt="" />
        <div class="info">
          <p class="name">
            <span>友赛名维生素</span>
            <span>X1</span>
          </p>
          <p class="size">
            <van-tag>处方药</van-tag>
            <span>40</span>
          </p>
          <p class="price">￥25.000</p>
        </div>
        <div class="desc">⽤法⽤量：⼝服，每次1袋，每天3次，⽤药3天</div>
      </div>
    </div> -->
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品⾦额" value="￥50" />
        <van-cell title="运费" value="￥4" />
        <van-cell title="优惠券" value="-￥0" />
        <van-cell title="实付款" value="￥54" class="price" />
        <van-cell title="订单编号" value="202201127465" />
        <van-cell title="创建时间" value="2022-01-23 09:23:46" />
        <van-cell title="⽀付时间" value="2022-01-23 09:23:46" />
        <van-cell title="⽀付⽅式" value="⽀付宝⽀付" />
      </van-cell-group>
    </div>
    <!-- 已取消 -->
    <van-action-bar v-if="item.status === OrderType.MedicineCancel">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="沟通记录" />
    </van-action-bar>
    <!-- 待收货 -->
    <van-action-bar v-if="item.status === OrderType.MedicineTake">
      <van-action-bar-button type="primary" text="确认收货" />
    </van-action-bar>
    <!-- 待发货 -->
    <van-action-bar v-if="item.status === OrderType.MedicineSend">
      <van-action-bar-button type="primary" text="提醒发货" />
    </van-action-bar>
    <!-- 待支付 -->
    <van-action-bar v-if="item.status === OrderType.MedicinePay">
      <p class="price">
        需要支付：<span>￥ {{ item.actualPayment }}</span>
      </p>
      <van-action-bar-button color="#bbb" text="取消问诊" />
      <van-action-bar-button type="primary" text="继续支付" />
    </van-action-bar>
    <!-- 已完成 -->
    <van-action-bar v-if="item.status === OrderType.MedicineComplete">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="再次购买" />
    </van-action-bar>
  </div>
</template>

<style lang="scss" scoped>
.order-detail-page {
  padding-top: 46px;
  padding-bottom: 65px;
}
.order-head {
  position: relative;
  padding: 15px;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }
  .card {
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
    .logistics {
      flex: 1;
      p {
        &:first-child {
          color: var(--cp-primary);
        }
        &:last-child {
          color: var(--cp-tag);
          font-size: 13px;
          margin-top: 5px;
        }
      }
    }
    .van-icon {
      color: var(--cp-tip);
    }
  }
}
:deep(.van-cell) {
  .van-cell__title {
    font-size: 16px;
    flex: none;
    width: 100px;
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
      width: 250px;
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
.van-action-bar {
  padding: 0 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .price {
    padding: 0 10px;
    > span {
      font-size: 18px;
      color: var(--cp-price);
    }
  }
}
</style>
