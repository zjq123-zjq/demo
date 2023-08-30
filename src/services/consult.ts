import type { Knowledgepage, KnowledgeParams } from '@/types/knowledge'
import type { PageParams, DoctorPage } from '@/types/consult'
import request from '@/utils/request'
import type { FollowType } from '../types/consult'
export const getKnowledgePage = (params: KnowledgeParams) =>
  request<Knowledgepage>('/patient/home/knowledge', 'GET', params)

export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

export const followDotor = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })
