import { ref, onUnmounted } from 'vue'
import { showToast } from 'vant'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/services/user'
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
export default function useLogin() {
  // 初始化store
  const store = useUserStore()

  // 初始化router与route
  const router = useRouter()
  const route = useRoute()

  // 手机号// 密码
  const loginForm = ref({
    mobile: '13230000002', // 13230000001
    password: 'abc12345',
    code: ''
  })

  // 协议状态
  const agree = ref<boolean>(false)
  // 密码状态
  const show = ref<boolean>(false)

  // 初始化密码与短信验证码界面状态
  const isPass = ref(true)

  // 登录方法
  const hanleLogin = async () => {
    if (!agree.value) {
      showToast('请勾选我已同意')
      return
    }

    // 第一种, 不是因为token过期进入到登录页面, 而是我们打开项目自己进入登录页, 没有携带当前页面的地址
    // 第二种 token过期, 自动跳转到登录页, 如果是第二种情况的话, 会携带当前的页面地址

    try {
      // 如果isPass的值为true,则表示是密码登录, false, 短信验证码登录
      // 调用登录接口

      const loginRes = isPass.value
        ? await loginByPassword(loginForm.value.mobile, loginForm.value.password)
        : await loginByMobile(loginForm.value.mobile, loginForm.value.code)

      // 将登录成功的token存储搭配本地和pinia
      store.setUser(loginRes.data)

      // 跳转到主页
      router.replace((route.query.returnUrl as string) || '/user')

      // 提示登录成功
      showToast('登录成功')
    } catch (error) {
      console.log(error)
    }
  }
  const time = ref(0)
  let timeId: number = 0
  // 发送验证码
  const sendCode = async () => {
    if (time.value > 0) return

    // 调用接口
    const codeRes = await sendMobileCode(loginForm.value.mobile, 'login')

    // 倒计时逻辑
    showToast('发送成功')
    time.value = 60
    clearInterval(timeId)
    timeId = setInterval(() => {
      time.value--
      if (time.value <= 0) clearInterval(timeId)
    }, 1000)
  }

  // 当页面卸载的时候, 清除定时器
  onUnmounted(() => {
    clearInterval(timeId)
  })

  return {
    loginForm,
    agree,
    show,
    isPass,
    hanleLogin,
    time,
    sendCode
  }
}
