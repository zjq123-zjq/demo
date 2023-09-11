<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { onMounted, ref, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import { MsgType, OrderType } from '@/enums'
import type { Message, TimeMessages } from '@/types/room'
import { getOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import dayjs from 'dayjs'
import { closeToast, showLoadingToast, showToast } from 'vant'
const consult = ref<ConsultOrderItem>()
const store = useUserStore()
const route = useRoute()
const list = ref<Message[]>([])
const initialMsg = ref(true)
const loading = ref(false)
let socket: Socket

onMounted(async () => {
  socket = io('https://consult-api.itheima.net/', {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })
  socket.on('connect', () => {
    //建立连接成功
    console.log('连接成功')
  })
  socket.on('error', (event) => {
    //错误异常消息
    console.log('连接失败', event)
  })
  socket.on('disconnect', () => {
    //已经断开连接
    console.log('断开连接')
  })

  //聊天记录
  socket.on('chatMsgList', async ({ data }: { data: TimeMessages[] }) => {
    //准备转换常规消息列表
    const arr: Message[] = []
    data.forEach((item, index) => {
      if (index === 0) time.value = item.createTime
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    //追加到聊天消息列表
    list.value.unshift(...arr)
    loading.value = false
    closeToast()
    if (!data.length) {
      closeToast()
      return showToast('没有聊天记录了')
    }
    if (initialMsg.value) {
      socket.emit('updateMsgStatus', arr[arr.length - 1].id)
      await nextTick()
      window.scrollTo(0, document.body.scrollHeight)
      initialMsg.value = false
    }
  })
  //订单状态是否改变
  socket.on('statusChange', () => {
    initOrderDetail()
  })
  //接受消息
  socket.on('receiveChatMsg', async (event) => {
    list.value?.push(event)
    await nextTick()
    socket.emit('updateMsgStatus', event.id)
    window.scrollTo(0, document.body.scrollHeight)
  })

  //建立连接成功
  socket.on('connect', () => {
    list.value = []
  })
})

const initOrderDetail = async () => {
  const res = await getOrderDetail(route.query.orderId as string)

  consult.value = res.data
}
initOrderDetail()

//发送文本
const sendText = async (text: string) => {
  socket.emit('sendChatMsg', {
    //发送人
    from: store.user?.id,
    //接收人
    to: consult.value?.docInfo?.id,
    //发送消息的类型
    msgType: MsgType.MsgText,
    //消息内容
    msg: {
      content: text
    }
  })
}

//发送图片
const sendImage = (data: { id: string; url: string }) => {
  socket.emit('sendChatMsg', {
    //发送人
    from: store.user?.id,
    //接收人
    to: consult.value?.docInfo?.id,
    //发送消息的类型
    msgType: MsgType.MsgImage,
    //消息内容
    msg: {
      picture: data
    }
  })
}

const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const onRefresh = () => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  })
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId)
}
</script>

<template>
  <div class="room-page">
    <CpNavBar title="医生问诊室"></CpNavBar>
    <RoomStatus :status="consult?.status" :countdown="consult?.countdown" />

    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <RoomMessage :list="list" />
    </van-pull-refresh>
    <RoomAction
      @send-image="sendImage"
      @send-text="sendText"
      :disabled="consult?.status === OrderType.ConsultChat ? false : true"
    />
    <!-- <van-button @click="$router.push('/order/pay?id=6938582318133248')">购买药品</van-button> -->
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);

  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>
