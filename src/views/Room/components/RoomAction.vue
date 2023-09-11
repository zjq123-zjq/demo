<script setup lang="ts">
import { ref } from 'vue'
import { showLoadingToast, closeToast, showToast } from 'vant'
import { uploadImage } from '@/services/consult'
defineProps<{
  disabled: boolean
}>()
const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-image', { id: string, url: string }): void
}>()

const text = ref<string>('')

const sendText = () => {
  if (text.value.trim() === '') {
    return showToast('请输入内容')
  }
  emit('send-text', text.value)
  text.value = ''
}

//图片上传
const afterRead = async (data: any) => {
  if (!data.file) return
  showLoadingToast('正在上传')
  const res = await uploadImage(data.file)
  console.log(res)

  closeToast()
  emit('send-image', res.data)
}
</script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      :disabled="disabled"
      v-model="text"
      @keyup.enter="sendText"
    ></van-field>
    <van-uploader :preview-image="false" :disabled="disabled" :after-read="afterRead">
      <cp-icon name="consult-img" />
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
