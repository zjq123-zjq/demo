export type User =
  | {
      token: string
      avatar: string
      id: number | string
      account: string
      mobile: string | number
    }
  | undefined
