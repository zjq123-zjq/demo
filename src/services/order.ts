import type {
  MedicineOrderType,
  addressResponseType,
  MedicineResponseType,
  MedicineType,
  OrderDetailResponseType,
  ExpressResponseType
} from '@/types/order'

import request from '@/utils/request'
import { Status } from '../enums/index'
//收货地址
export const getAdderss = () => {
  return request<addressResponseType[]>('/patient/order/address', 'GET')
}
//药品信息
export const getMedicinrInfo = (params: MedicineType) => {
  return request<MedicineResponseType>('/patient/medicine/order/pre', 'GET', params)
}
//药品订单
export const createMedicalOrder = (data: MedicineOrderType) => {
  return request<{ id: string }>('/patient/medicine/order', 'POST', data)
}

//获取药品订单详情
export const getMedicalOrderDetail = (id: string) => {
  return request<OrderDetailResponseType>(`/patient/medicine/order/detail/${id}`, 'GET')
}

//获取物流详情
export const getLogisticsDetail = (id: string) => {
  return request<ExpressResponseType>(`/patient/order/${id}/logistics`, 'GET')
}
