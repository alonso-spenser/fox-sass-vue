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
export const fetchSiteDelete = (params = {}) => http.post('/api/ops/site/remove', params)

/**
 * 网站数据复制
 */
export const fetchCloneSiteData = (params = {}) => http.post('/api/ops/site/clone-site-data', params)

/**
 * 授权登录
 */
export const fetchAuthorizedLogin = (params = {}) => http.post('/api/passport/merchant/authorized', params)

/**
 * 网站语言
 */
export const fetchSiteRegion = (params = {}) => http.post('/api/ops/site/site-region', params)

/**
 * 删除网站语言
 */
export const fetchSiteRemoveRegion = (params = {}) => http.post('/api/ops/site/remove-site-region', params)
