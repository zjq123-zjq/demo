import type { Knowledgepage, KnowledgeParams } from '@/types/knowledge'
import type {
  PageParams,
  DoctorPage,
  TopDep,
  Image,
  ConsultOrderPreParams,
  ConsultOrderPreData
} from '@/types/consult'
import request from '@/utils/request'
import type { FollowType } from '../types/consult'
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
