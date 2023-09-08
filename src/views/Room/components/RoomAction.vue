import CpIcon from '@/components/CpIcon.vue';
<script setup lang="ts"></script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
    ></van-field>
    <van-uploader :preview-image="false"
      ><cp-icon class="CpIcon" name="consult-img"></cp-icon>
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 15px;
  z-index: 1;
  box-sizing: border-box;
  padding: 8px 15px;
}
.CpIcon {
  width: 24px;
  height: 24px;
}
</style>
