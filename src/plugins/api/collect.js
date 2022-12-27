import http from './http'

/**
 * 采集规则详情
 */
export const fetchCollectRuleDetail = (params = {}) => http.post('/site/api/collect/rule/detail', params)

/**
 * 添加 & 修改采集规则
 */
export const fetchCollectRuleUpdate = (params = {}) => http.post('/site/api/collect/rule/update', params)

/**
 * 采集规则分页数据
 */
export const fetchCollectRulePaging = (params = {}) => http.post('/site/api/collect/rule/paging', params)

/**
 * 删除采集规则
 */
export const fetchCollectRuleDelete = (params = {}) => http.post('/site/api/collect/rule/delete', params)

/**
 * 数据采集
 */
export const fetchCollect = (params = {}) => http.post('/site/api/article/collect', params)

/**
 * 万邦数据采集
 */
export const fetchCollectOnebound = (params = {}) => http.post('/site/api/collect/onebound', params)
