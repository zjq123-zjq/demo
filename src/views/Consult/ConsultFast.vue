<script setup lang="ts">
import { useCounterStore } from '@/stores/consult'
const store = useCounterStore()
</script>

<template>
  <div class="consult-fast-page">
    <CpNavBar
      title="极速问诊"
      right-text="问诊记录"
      @click-right="$router.push('/user/consult')"
    ></CpNavBar>
    <div class="fast-logo">
      <img class="img" src="@/assets/consult-fast.png" alt="" />
      <p class="text"><span>20s</span>快速匹配专业医生</p>
    </div>
    <div class="fast-type">
      <router-link to="/consult/dep" @click="store.setTllnessType(1)" class="item">
        <CpIcon name="consult-doctor" class="pic"></CpIcon>
        <div class="info">
          <p>三甲图文问诊</p>
          <p>三甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
      <router-link to="/consult/dep" @click="store.setTllnessType(0)" class="item">
        <CpIcon name="consult-message" class="pic"></CpIcon>
        <div class="info">
          <p>普通图文问诊</p>
          <p>二甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow"></van-icon>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-fast-page {
  padding-top: 46px;

  .fast-logo {
    padding: 30px 0;
    text-align: center;

    .img {
      width: 240px;
    }

    .text {
      font-size: 16px;
      margin-top: 10px;

      > span {
        color: var(--cp-primary);
      }
    }
  }

  .fast-type {
    padding: 15px;

    .item {
      display: flex;
      padding: 16px;
      border-radius: 4px;
      align-items: center;
      margin-bottom: 16px;
      border: 0.5px solid var(--cp-line);
    }

    .pic {
      font-size: 40px;
    }

    .info {
      margin-left: 12px;
      flex: 1;

      > p:first-child {
        font-size: 16px;
        color: var(--cp-text1);
        margin-bottom: 4px;
      }

      > p:last-child {
        font-size: 13px;
        color: var(--cp-tag);
      }
    }
  }

  .van-icon {
    color: var(--cp-tip);
  }
}
</style>
