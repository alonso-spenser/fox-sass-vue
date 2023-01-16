import http from './http'

/**
 * 站点资源详情
 */
export const resourceDetail = (params = {}) => http.post('/api/site/resource/detail', params)

/**
 * 添加 & 修改站点资源
 */
export const resourceUpdate = (params = {}) => http.post('/api/site/resource/update', params)

/**
 * 站点资源分页数据
 */
export const resourcePaging = (params = {}) => http.post('/api/site/resource/paging', params)

/**
 * 删除站点资源
 */
export const resourceDelete = (params = {}) => http.post('/api/site/resource/delete', params)

/**
 * 集合数据
 */
export const resourceCollectionData = (params = {}) => http.post('/api/site/resource/list-by-collection', params)
