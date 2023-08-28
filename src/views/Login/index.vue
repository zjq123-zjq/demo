<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { showToast } from 'vant'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/services/user'
const router = useRouter()
const route = useRoute()
const store = useUserStore()
const loginFrom = ref({
  mobile: '13230000001',
  password: 'abc12345',
  code: ''
})
const isPass = ref(false)
const agree = ref<boolean>(false)
const show = ref<boolean>(false)
const login = async () => {
  if (!agree.value) {
    return showToast('请勾选我已同意')
  }
  try {
    const res = isPass.value
      ? await loginByPassword(loginFrom.value.mobile, loginFrom.value.password)
      : await loginByMobile(loginFrom.value.mobile, loginFrom.value.code)
    store.setUser(res.data)
    router.replace((route.query.returnUrl as string) || '/user')
    showToast('登录成功')
  } catch (error) {
    console.log(error)
  }
}
const time = ref(0)
let timeId: number = 0
const send = async () => {
  if (time.value > 0) {
    return
  }
  await sendMobileCode(loginFrom.value.mobile, 'login')
  showToast('发生成功')
  time.value = 60
  clearInterval(timeId)
  timeId = setInterval(() => {
    time.value--
    if (time.value <= 0) clearInterval(timeId)
  }, 1000)
}
onUnmounted(() => {
  clearInterval(timeId)
})
</script>
<template>
  <div class="login-page">
    <CpNavBar rightText="注册"> </CpNavBar>
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow" />
      </a>
    </div>
    <van-form @submit="login" autocomplete="off">
      <van-field
        v-model="loginFrom.mobile"
        name="用户名"
        type="tel"
        placeholder="请输入手机号"
        :rules="mobileRules"
      />
      <van-field
        v-if="isPass"
        v-model="loginFrom.password"
        :type="show ? 'text' : 'password'"
        name="密码"
        placeholder="请输入密码"
        :rules="passwordRules"
      >
        <template #button>
          <CpIcon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"> </CpIcon>
        </template>
      </van-field>
      <van-field v-else v-model="loginFrom.code" placeholder="请输入验证码" :rules="codeRules">
        <template #button>
          <span class="btn-send" @click="send" :class="{ active: time > 0 }">{{
            time > 0 ? `${time}s后再次发送` : '发生验证码'
          }}</span>
        </template>
      </van-field>
      <div>
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">登录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>

    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <img src="@/assets/qq.svg" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }

  &-head {
    padding: 15px 30px 35px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h3 {
      font-size: 25px;
    }

    a {
      font-size: 16px;
      color: var(--cp-text1);
    }
  }

  &-other {
    padding: 0 30px;
    padding-top: 50px;
    text-align: center;

    img {
      width: 35px;
      height: 35px;
    }
  }
}

.van-form {
  padding: 0 15px;

  .van-checkbox {
    margin-top: 10px;

    a {
      color: var(--cp-primary);
    }
  }

  .cp-cell {
    a {
      color: black;
    }
  }

  .van-button {
    background-color: var(--cp-primary);
  }
}

.btn-send {
  color: var(--cp-primary);

  &.active {
    color: rgba(22, 194, 163, 0.5);
  }
}
</style>
