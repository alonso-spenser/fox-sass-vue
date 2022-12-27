import http from '../http'

/**
 * ip分页查找详情
 */
export const fetchIpPaging = (params = {}) => http.post('/core/admin/base/ip/paging', params)

/**
 *  删除
 */
export const fetchIpDelete = (params = {}) => http.post('/core/admin/base/ip/delete', params)

/**
 * 添加ip或者修改
 */
export const fetchIpUpdate = (params = {}) => http.post('/core/admin/base/ip/update', params)

/**
 *  ip单独详情
 */
export const fetchIpDetail = (params = {}) => http.post('/core/admin/base/ip/detail', params)

/**
 * GOOGLE API KEY分页数据
 */
export const fetchSiteGoogleApiPaging = (params = {}) => http.post('/site/admin/google-api/paging', params)

/**
 * 删除GOOGLE API KEY
 */
export const fetchSiteGoogleApiDelete = (params = {}) => http.post('/site/admin/google-api/delete', params)
