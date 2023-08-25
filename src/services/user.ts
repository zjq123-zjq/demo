import type { User } from '@/types/user'
import request from '../utils/request'
import type { loginParamsRules } from './types/user.d'

export const loginByPassword = (loginFrom: loginParamsRules) => {
  request<User>('/login/password', 'POST', { loginFrom })
}

// import request from '@/utils/request'
// import type { loginParamsRules } from './types/user.d'
// // 密码登录
// export const loginByPassword = (loginParams: loginParamsRules) => {
//   return request('/login/password', 'POST', loginParams)
// }
