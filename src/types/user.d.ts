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
