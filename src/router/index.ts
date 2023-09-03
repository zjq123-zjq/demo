import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

//hash模式
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录' },
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register/index.vue')
    },
    {
      path: '/user/patient',
      name: 'patien',
      meta: { title: '家庭档案' },
      component: () => import('../views/User//PatientPage.vue')
    },
    {
      path: '/consult/fast',
      meta: { title: '极速问诊' },
      component: () => import('../views/Consult/ConsultFast.vue')
    },
    {
      path: '/consult/dep',
      meta: { title: '选择科室' },
      component: () => import('../views/Consult/ConsultDep.vue')
    },
    {
      path: '/consult/illness',
      meta: { title: '病情描述' },
      component: () => import('../views/Consult/ConsultIllness.vue')
    },
    {
      path: '/consult/pay',
      meta: { title: '问诊支付' },
      component: () => import('../views/Consult/ConsultPay.vue')
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: { title: '首页' },
          component: () => import('../views/Home/index.vue')
        },
        {
          path: '/article',
          name: 'article',
          meta: { title: '健康百科' },
          component: () => import('../views/Article/index.vue')
        },
        {
          path: '/notify',
          name: 'notify',
          meta: { title: '消息通知' },
          component: () => import('../views/Notify/index.vue')
        },
        {
          path: '/user',
          name: 'user',
          meta: { title: '个人中心' },
          component: () => import('../views/User/index.vue')
        }
      ]
    }
  ]
})

export default router
