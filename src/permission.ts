import router from '@/router'
import { useUserStore } from '@/stores/user'

const whiteList = ['/login', '/register', '/404', '/401']

router.beforeEach((to, from) => {
  const store = useUserStore()
  document.title = '医疗问诊 - ' + to.meta.title
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})
