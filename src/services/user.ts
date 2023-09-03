import type { User, UserInfo, PatientList, Patient } from '@/types/user.d'
import request from '../utils/request'
import type { CodeType } from './types/user.d'
//密码登录
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}
//获取验证码
export const sendMobileCode = (mobile: string, type: CodeType) => {
  return request<User>('/code', 'GET', { mobile, type })
}
//验证码登录
export const loginByMobile = (mobile: string, code: string) => {
  return request<User>('/login', 'POST', { mobile, code })
}
//用户信息
export const getUserInfo = () => {
  return request<UserInfo>('/patient/myUser', 'GET')
}
//查询患者详情
export const getPatientDetail = (id: string) => {
  return request<Patient>(`/patient/info/${id}`, 'GET')
}
