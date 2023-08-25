<script setup lang="ts">
import { ref } from 'vue'
import vanNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import { showToast } from 'vant'
import { mobileRules, passwordRules } from '@/utils/rules'
import type { loginParamsRules } from '@/services/types/user'

const loginFrom = ref({
  mobile: '13230000001',
  password: 'abc12345'
})
const agree = ref(false)
const show = ref(false)
const login = async () => {
  if (!agree.value) {
    showToast('请勾选我已同意')
  }
}
</script>
<template>
  <div class="login-page">
    <van-nav-bar rightText="注册"> </van-nav-bar>
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
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
</style>
