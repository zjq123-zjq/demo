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
import { ConsultType, IllnessTime } from '@/enums'
//图片列表
export type Image = {
  //图片ID
  id: string
  //图片地址
  url: string
}
//问诊记录
export type Consult = {
  // 问诊记录ID
  id: string
  // 问诊类型
  type: ConsultType
  // 快速问诊类型，0 普通 1 三甲
  illnessType: 0 | 1
  // 科室ID
  depId: string
  // 疾病描述
  illnessDesc: string
  // 疾病持续时间
  illnessTime: IllnessTime
  // 是否就诊过，0 未就诊过 1 就诊过
  consultFlag: 0 | 1
  // 图⽚数组
  pictures: Image[]
  // 患者ID
  patientId: string
  // 优惠券ID
  couponId: string
}
//问诊记录-全部可选
export type PartialConsult = Partial<Consult>
//科室
export type SubDep = {
  //科室ID
  id: string
  //科室名称
  name: string
}
export type TopDep = SubDep & {
  //二级科室数组
  child: SubDep[]
}

export type ConsultIllness = Pick<
  PartialConsult,
  'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'
>

export type DepList = TopDep[]

// 问诊订单预⽀付传参
export type ConsultOrderPreParams = Pick<PartialConsult, 'type' | 'illnessType'>
// 问诊订单预⽀付信息
export type ConsultOrderPreData = {
  // 积分抵扣
  pointDeduction: number
  // 优惠券抵扣
  couponDeduction: number
  // 优惠券ID
  couponId: string
  // 需付款
  payment: number
  // 实付款
  actualPayment: number
}
