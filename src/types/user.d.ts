export type User = {
  token: string
  avatar: string
  id: number
  account: string
  mobile: string
}

export type Data<T> = {
  code: number
  message: string
  data: T
}
