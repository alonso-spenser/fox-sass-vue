import http from './http'

/**
 * 获取世界流量分布
 */
export const fetchFlowDistribution = (params = {}) => http.post('/api/ga/analysis/flow', params)

/**
 * 获取世界询盘分布
 */
export const fetchEnquiryDistribution = (params = {}) => http.post('/api/ga/analysis/enquiry-distribution', params)

/**
 * 获取流量趋势
 */
export const fetchFlowTrend = (params = {}) => http.post('/api/ga/analysis/flow-trend', params)

/**
 * 获取流量来源
 */
export const fetchFlowSource = (params = {}) => http.post('/api/ga/analysis/flow-source', params)

/**
 * 询盘来源
 */
export const fetchEnquirySource = (params = {}) => http.post('/api/ga/analysis/enquiry-source', params)

/**
 * 询盘趋势
 */
export const fetchEnquiryTrend = (params = {}) => http.post('/api/ga/analysis/enquiry-trend', params)

/**
 * 数据中心流量分析
 */
export const fetchFlowAnalysis = (params = {}) => http.post('/api/ga/analysis/traffic', params)

/**
 * 数据中心询盘分析
 */
export const fetchEnquiry = (params = {}) => http.post('/api/ga/analysis/enquiry', params)

/**
 * set view id
 */
export const fetchSetViewId = (params = {}) => http.post('/api/ga/set-view-id', params)

/**
 * set view id
 */
export const fetchGetViewId = (params = {}) => http.post('/api/ga/find-view-id', params)

/**
 * clear view id
 */
export const fetchClearViewId = (params = {}) => http.post('/api/ga/clear-view-id', params)

/**
 * 获取排名列表
 */
export const fetchRankingList = (params = {}) => http.post('/api/ga/analysis/ranking', params)

/**
 * 可用的服务帐号
 */
export const fetchGaConfigAvailable = (params = {}) => http.post('/api/ga/config/available', params)
