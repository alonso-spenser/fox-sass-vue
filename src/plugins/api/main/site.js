import http from '../http'

/**
 * 店铺详情
 */
export const fetchSiteDetail = (params = {}) => http.post('/api/ops/site/detail', params)

/**
 * 添加 & 修改店铺
 */
export const fetchSiteUpdate = (params = {}) => http.post('/api/ops/site/update', params)

/**
 * 店铺分页数据
 */
export const fetchSitePaging = (params = {}) => http.post('/api/ops/site/paging', params)

/**
 * 删除店铺
 */
export const fetchSiteDelete = (params = {}) => http.post('/api/ops/site/delete', params)
