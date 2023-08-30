export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'
export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'
export type PageParams = {
  current: number
  pageSize: number
}

export type KnowledgrParams = PageParams & {
  type: KnowledgeType
}

export type Doctor = {
  // 医⽣ID
  id: string
  // 医⽣名称
  name: string
  // 头像
  avatar: string
  // 医院名称
  hospitalName: string
  // 医院等级
  gradeName: string
  // 科室
  depName: string
  // 职称
  positionalTitles: string
  // 是否关注，0 未关注 1 已关注
  likeFlag: 0 | 1
  // 接诊服务费
  serviceFee: number
  // 接诊⼈数
  consultationNum: number
  // 评分
  score: number
  // 主攻⽅向
  major: string
}

export type DoctorList = Doctor[]
export type DoctorPage = {
  pageTotal: number
  total: number
  rows: DoctorList
}
