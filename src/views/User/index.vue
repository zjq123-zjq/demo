<script setup lang="ts">
import { getUserInfo } from '@/services/user'
import type { UserInfo } from '@/types/user'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { showConfirmDialog } from 'vant'
const store = useUserStore()
const router = useRouter()
const logout = () => {
  showConfirmDialog({
    title: '温馨提示',
    message: '您确定要退出优医问诊吗？'
  })
    .then(() => {
      store.delUser()
      router.push('/login')
    })
    .catch(() => {})
}
const tools = [
  {
    title: '我的问诊',
    path: '/user/consult'
  },
  {
    title: '我的处方',
    path: '/'
  },
  {
    title: '家庭档案',
    path: '/user/patient'
  },
  {
    title: '地址管理',
    path: '/user/address'
  },
  {
    title: '我的评价',
    path: '/'
  },
  {
    title: '官方客服',
    path: '/'
  },
  {
    title: '设置',
    path: '/'
  }
]

const user = ref<UserInfo>()
onMounted(async () => {
  const res = await getUserInfo()
  user.value = res.data
})
</script>

<template>
  <div class="user-page" v-if="user">
    <div class="user-page-head">
      <div class="top">
        <van-image round width="70px" height="70px" :src="user?.avatar" />
        <div class="name">
          <p>{{ user.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ user.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.couponNumber }}</p>
          <p>优惠劵</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <p>全部订单 ></p>
      </div>
      <van-row>
        <van-col span="6">
          <van-badge :content="user.orderInfo.paidNumber || ''">
            <CpIcon name="user-paid" class="cpicon"></CpIcon>
          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="user.orderInfo.shippedNumber || ''" color="#1989fa">
            <CpIcon name="user-shipped" class="cpicon"></CpIcon
          ></van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="user.orderInfo.receivedNumber || ''" color="#1989fa">
            <CpIcon name="user-received" class="cpicon"></CpIcon
          ></van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="user.orderInfo.finishedNumber || ''" color="#1989fa">
            <CpIcon name="user-finished" class="cpicon"></CpIcon
          ></van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell
        v-for="(item, index) in tools"
        :key="index"
        :title="item.title"
        icon="location-o"
        is-link
      >
        <template #icon>
          <CpIcon class="cpicon" :name="`user-tool-0${index + 1}`"></CpIcon>
        </template>
      </van-cell>
    </div>

    <a class="logout" href="javascript:;" @click="logout">退出登录</a>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  min-height: calc(100vh - 60px);
  background-color: var(--cp-bg);
  padding: 0 15px 65px;

  &-head {
    height: 200px;
    margin: 0 -15px;
    padding: 0 15px;
    margin-bottom: 15px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));

    .top {
      display: flex;
      align-items: center;
      padding-top: 50px;

      .name {
        margin-left: 10px;

        p {
          &:first-child {
            font-size: 18px;
            font-weight: 900;
          }

          &:last-child {
            color: var(--cp-primary);
            margin-top: 10px;
            font-size: 16px;
          }
        }
      }
    }

    .van-row {
      margin: 0 -15px;

      p {
        text-align: center;
        margin: 0;

        &:first-child {
          font-weight: 900;
          font-size: 20px;
        }

        &:last-child {
          color: var(--cp-dark);
        }
      }
    }
  }

  &-order {
    background-color: white;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 10px 10px 15px;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        color: var(--cp-dark);
      }
    }

    .van-row {
      .van-col {
        text-align: center;
        margin: 0;

        .cpicon {
          font-size: 28px;
        }

        p {
          margin: 0;
          font-weight: 600;
        }
      }
    }
  }
  &-group {
    background-color: #fff;
    border-radius: 10px;
    h3 {
      line-height: 45px;
      padding-left: 20px;
    }
    .van-cell {
      align-items: center;
      .cpicon {
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
}
.logout {
  display: block;
  margin: 20px auto;
  width: 100px;
  text-align: center;
  color: var(--cp-price);
}
</style>
