import CpIcon from '@/components/CpIcon.vue';
<script setup lang="ts">
const tabData = [
  {
    name: '首页',
    path: '/home',
    active: 'home-index-active',
    default: 'home-index-default'
  },
  {
    name: '健康百科',
    path: '/article',
    active: 'home-article-active',
    default: 'home-article-default'
  },
  {
    name: '消息中心',
    path: '/notify',
    active: 'home-notice-active',
    default: 'home-notice-default'
  },
  {
    name: '我的',
    path: '/user',
    active: 'home-mine-active',
    default: 'home-mine-default'
  }
]
</script>

<template>
  <div class="layout-page">
    <RouterView></RouterView>
    <van-tabbar route>
      <van-tabbar-item v-for="(item, index) in tabData" :key="index" :to="item.path"
        >{{ item.name }}
        <template #icon="{ active }">
          <CpIcon :name="active ? item.active : item.default"> </CpIcon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.layout-page {
  ::v-deep {
    .van-tabbar-item {
      &__icon {
        font-size: 21px;
      }
      &__text {
        font-size: 12px;
      }
      &--active {
        color: var(--cp-primary);
      }
    }
  }
}
</style>
