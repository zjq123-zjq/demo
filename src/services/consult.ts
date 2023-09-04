import type { Knowledgepage, KnowledgeParams } from '@/types/knowledge'
import type {
  PageParams,
  DoctorPage,
  TopDep,
  Image,
  ConsultOrderPreParams,
  ConsultOrderPreData,
  ConsultOrderPage,
  ConsultOrderListParams
} from '@/types/consult'
import request from '@/utils/request'
import type { FollowType, PartialConsult } from '../types/consult'
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<Knowledgepage>('/patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

export const followDotor = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })
//所有科室
export const getAllDep = () => request<TopDep[]>('dep/all', 'GET')

//图片上传
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}

//拉取预支付订单信息
export const getConsultOrderPre = (payParams: ConsultOrderPreParams) => {
  return request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', payParams)
}

//生成订单
export const createConsultOrder = (data: PartialConsult) => {
  return request<{ id: string }>('/patient/consult/order', 'POST', data)
}

//获取支付地址  0是微信 1支付宝
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => {
  return request<{ payUrl: string }>('patient/consult/pay', 'POST', params)
}

//问诊记录
export const getConsultOrderList = (params: ConsultOrderListParams) => {
  return request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)
}

//取消订单
export const cancelOrder = (id: string) => {
  return request(`/patient/order/cancel/${id}`, 'PUT')
}

//删除订单
export const deleteOrder = (id: string) => {
  return request(`/patient/order/${id}`, 'DELETE')
}
