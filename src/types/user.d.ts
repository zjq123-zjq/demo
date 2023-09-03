export type User = {
  token: string
  avatar: string
  id: string
  account: string
  mobile: string
}

type OmitUser = Omit<User, 'token'>

export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

export type Patient = {
  // 患者姓名
  name: string
  // 患者身份证号
  idCard: string
  // 是否设置为默认患者 0不是默认 1是默认患者
  defaultFlag: 0 | 1
  // 性别 1男 0女
  gender?: 0 | 1
  // 性别值
  genderValue?: number
  // 年龄
  age?: number
  // id
  id?: string
}

export type PatientList = Patient[]
