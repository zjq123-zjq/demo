import router from '@/router'
import { useUserStore } from '@/stores/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/register', '/404', '/401']
NProgress.configure({
  showSpinner: false
})
router.beforeEach((to, from) => {
  NProgress.start()
  const store = useUserStore()
  if (!store.user?.token && !whiteList.includes(to.path)) return '/login'
})

router.afterEach((to) => {
  document.title = '医疗问诊 - ' + to.meta.title
  NProgress.done()
})
