const mobileRules = [
  { required: true, message: '请填写手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
]
const passwordRules = [
  { required: true, message: '请填写密码' },
  { pattern: /^\w{8,24}$/, message: '密码需8-24个字符' }
]

export { mobileRules, passwordRules }
