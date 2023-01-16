import http from './http'

/**
 * 商户登录
 */
export const fetchMerchantLogin = (params = {}) => http.post('/api/passport/merchant/login', params)

/**
 * 退出登录
 */
export const fetchMerchantLogout = (params = {}) => http.post('/api/passport/merchant/logout', params)

/**
 * 修改密码
 */
export const fetchUpdatePassword = (params = {}) => http.post('/api/passport/merchant/change-password', params)

/**
 * 验证码
 */
export const fetchCodeForRegister = (params = {}) => http.post('/api/passport/merchant/code-register', params)

/**
 * 商户帐户校验
 */
export const fetchAccountCheck = (params = {}) => http.post('/api/passport/merchant/check', params)

/**
 * 商户注册
 */
export const fetchMerchantRegister = (params = {}) => http.post('/api/passport/merchant/register', params)

/**
 * 重置密码（邮件方式）
 */
export const fetchResetEmailPassword = (params = {}) => http.post('/api/passport/merchant/reset-email-password', params)

/**
 * 校验邮件验证码
 */
export const fetchForgetEmailCode = (params = {}) => http.post('/api/passport/merchant/code-forget', params)

/**
 * 查询登录信息
 */
export const fetchMerchantSession = (params = {}) => http.post('/api/passport/merchant/token', params)
