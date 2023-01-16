import http from './http'

/**
 * 获取客户列表
 */
export const fetchCustomerList = (params = {}) => http.post('/api/client/paging', params)

/**
 * 获取用客户详情
 */
export const fetchCustomerDetail = (params = {}) => http.post('/api/client/detail', params)

/**
 * 修改客户信息
 */
export const fetchUpdateCustomer = (params = {}) => http.post('/api/client/update', params)
