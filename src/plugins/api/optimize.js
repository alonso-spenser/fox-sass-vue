import http from './http'

/**
 * SEO数据
 */
export const fetchOptimizePaging = (params = {}) => http.post('/site/api/optimize/paging', params)

/**
 * 修改数据
 */
export const fetchOptimizeUpdate = (params = {}) => http.post('/site/api/optimize/update', params)
