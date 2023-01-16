import http from './http'

/**
 * SEO数据
 */
export const fetchOptimizePaging = (params = {}) => http.post('/api/site/optimize/paging', params)

/**
 * 修改数据
 */
export const fetchOptimizeUpdate = (params = {}) => http.post('/api/site/optimize/update', params)
