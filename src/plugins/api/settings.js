import http from './http'

/**
 * 获取网站基本信息
 */
export const fetchSiteBasicDetail = (params = {}) => http.post('/site/api/site/detail', params)

/**
 *保存网站基本设置
 */
export const fetchSaveSiteBasicDetail = (params = {}) => http.post('/site/api/site/update', params)

/**
 * 站点启用
 */
export const fetchSiteEnable = (params = {}) => http.post('/site/api/site/enable', params)

/**
 * 站点停用
 */
export const fetchSiteDisable = (params = {}) => http.post('/site/api/site/disable', params)

/**
 * 获取域名列表
 */
export const fetchGetDomainList = (params = {}) => http.post('/site/api/site/domain/group-list', params)

/**
 * 已连接域名列表
 */
export const fetchDomainNormalList = (params = {}) => http.post('/site/api/site/domain/simple-list', params)

/**
 * 设置默认连接域名
 */
export const fetchDomainDefault = (params = {}) => http.post('/site/api/site/domain/set-default', params)

/**
 * 检查域名是否存在
 */
export const fetchDomainIsExistence = (params) => http.post('/site/api/site/domain/repeatability', params)

/**
 * 删除域名
 */
export const fetchDomainDelete = (params = {}) => http.post('/site/api/site/domain/delete', params)

/**
 *  验证域名 &&  添加
 */
export const fetchDomainValidate = (params = {}) => http.post('/site/api/site/domain/validate', params)

/**
 * 域名重连
 */
export const fetchDomainReconnect = (params = {}) => http.post('/site/api/site/domain/reconnect', params)

/**
 * 获取法律政策详情
 */
export const fetchLegalDetail = (params = {}) => http.post('/site/api/site/legal/detail', params)

/**
 *更新 && 添加法律政策
 */
export const fetchUpdateLega = (params = {}) => http.post('/site/api/site/legal/saveOrUpdate', params)

/**
 * 跟踪信息
 */
export const fetchSiteTracking = (params = {}) => http.post('/site/api/site/tracking', params)

/**
 * 跟踪信息更新
 */
export const fetchSiteTrackingUpdate = (params = {}) => http.post('/site/api/site/tracking-update', params)
