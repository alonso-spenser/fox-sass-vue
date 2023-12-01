import http from '../http'

/**
 * 商户和登录帐号
 */
export const fetchMerchantOwner = (params = {}) => http.post('/ops/merchant/owner', params)

/**
 * 商户列表
 */
export const fetchMerchantPaging = (params = {}) => http.post('/ops/merchant/paging', params)
