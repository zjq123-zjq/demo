<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { DoctorList } from '@/types/consult'
import { getDoctorPage } from '@/services/consult'

const list = ref<DoctorList>()
const LoadData = async () => {
  const res = await getDoctorPage({ current: 1, pageSize: 5 })
  console.log(res)
  list.value = res.data.rows
}
LoadData()
const widthvalue = ref(0)

const setWidth = () => {
  const { width } = useWindowSize()
  widthvalue.value = (150 / 375) * width.value
}
onMounted(() => {
  setWidth()
  window.addEventListener('resize', setWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', setWidth)
})
</script>

<template>
  <div class="follow-doctor">
    <div class="head">
      <p>推荐关注</p>
      <a href="javascript:;">查看更多<i class="van-icon van-icon-arrow"></i></a>
    </div>
    <div class="body">
      <van-swipe :width="widthvalue" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="item in list" :key="item.id">
          <DoctorCard :item="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;

  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;

    a {
      color: var(--cp-tip);
    }
  }

  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
