<script setup lang="ts">
import KnowledgeList from './components/KnowledgeList.vue'
import FollowDoctor from './components/FollowDoctor.vue'
import { ref } from 'vue'
import type { KnowledgeType } from '@/types/consult'
const active = ref<KnowledgeType>('recommend')
</script>

<template>
  <div class="home-page">
    <div class="home-page-header">
      <h1>优医</h1>
      <div class="search">
        <CpIcon class="icon" name="home-search"></CpIcon>搜⼀搜：疾病/症状/医⽣/健康知识
      </div>
    </div>
    <div class="home-page-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <CpIcon class="icon" name="home-doctor"></CpIcon>
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <CpIcon class="icon" name="home-graphic"></CpIcon>
            <p class="title">极速问诊</p>
            <p class="desc">20s医生极速回复</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <CpIcon class="icon" name="home-prescribe"></CpIcon>
            <p class="title">开药门诊</p>
            <p class="desc">线上买药更方便</p>
          </router-link>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <CpIcon class="icon" name="home-order"></CpIcon>
            <p class="title">药品订单</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <CpIcon class="icon" name="home-docs"></CpIcon>
            <p class="title">健康档案</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <CpIcon class="icon" name="home-rp"></CpIcon>
            <p class="title">我的处方</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <CpIcon class="icon" name="home-find"></CpIcon>
            <p class="title">疾病查询</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="home-page-banner">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item>
          <img src="@/assets/ad.png" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/ad.png" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-tabs v-model:active="active" shrink>
      <van-tab title="关注" name="like">
        <FollowDoctor />
        <KnowledgeList type="like" />
      </van-tab>
      <van-tab title="推荐" name="recommend"><KnowledgeList type="recommend" /> </van-tab>
      <van-tab title="减脂" name="fatReduction"><KnowledgeList type="fatReduction" /> </van-tab>
      <van-tab title="饮食" name="food"><KnowledgeList type="food" /> </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;

  &-header {
    height: 100px;
    background-color: var(--cp-primary);
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    position: relative;

    h1 {
      color: white;
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 20px;
    }

    .search {
      position: absolute;
      left: 20px;
      bottom: -25px;
      height: 50px;
      width: 90%;
      background-color: #fff;
      border-radius: 50px;
      box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
      display: flex;
      align-items: center;
      padding-left: 30px;
      box-sizing: border-box;
      color: gray;

      .icon {
        margin-right: 5px;
        font-size: 20px;
      }
    }
  }

  &-navs {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    padding: 10px;

    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        font-size: 50px;
      }

      .title {
        font-weight: 900;
        font-size: 18px;
        color: var(--cp-text1);
      }

      .desc {
        color: var(--cp-text3);
        margin-top: 2px;
      }
    }

    .min {
      margin-top: 20px;

      .icon {
        font-size: 30px;
      }

      .title {
        font-size: 16px;
        color: var(--cp-text3);
      }
    }
  }

  &-banner {
    padding: 10px 15px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
