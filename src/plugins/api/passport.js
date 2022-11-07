import http from './http'

/**
 * 商户登录
 */
export const fetchMerchantLogin = (params = {}) => http.post('/core/api/passport/merchant/login', params)

/**
 * 退出登录
 */
export const fetchMerchantLogout = (params = {}) => http.post('/core/api/passport/merchant/logout', params)

/**
 * 重置密码
 */
export const fetchResetPassword = (params = {}) => http.post('/platform/api/member/member/reset-password', params)

/**
 * 修改密码
 */
export const fetchUpdatePassword = (params = {}) => http.post('/core/api/passport/merchant/change-password', params)

/**
 * 授权登录
 */
export const fetchAuthorizedLogin = (params = {}) => http.post('/core/api/passport/merchant/authorized', params)
