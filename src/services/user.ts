import type { User, UserInfo } from '@/types/user.d'
import request from '../utils/request'
import type { CodeType } from './types/user.d'

export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}

export const sendMobileCode = (mobile: string, type: CodeType) => {
  return request<User>('/code', 'GET', { mobile, type })
}

export const loginByMobile = (mobile: string, code: string) => {
  request<User>('/login', 'POST', { mobile, code })
}

export const getUserInfo = () => {
  return request<UserInfo>('/patient/myUser', 'GET')
}
