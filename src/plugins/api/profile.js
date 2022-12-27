import http from './http'

/**
 *获取商铺信息
 */
export const fetchProfileDetai = (params = {}) => http.post('/core/api/merchant/detail', params)

/**
 * 更改商铺信息
 */
export const fetchUpdateProfileDetai = (params = {}) => http.post('/core/api/merchant/updateMerchant', params)
