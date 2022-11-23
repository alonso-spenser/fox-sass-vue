import http from './http'

/**
 * 网站详情
 */
export const fetchSiteInfo = (params = {}) => http.post('/site/api/site/site-info', params)

/**
 * 域名重复性检查
 */
export const fetchDomainRepeatability = (params = {}) => http.post('/site/api/site/domain/repeatability', params)

/**
 * 开店
 */
export const fetchCreate = (params = {}) => http.post('/site/api/site/creation', params)

/**
 * 开店
 */
export const fetchCloneSite = (params = {}) => http.post('/site/api/site/clone', params)
/**
 * 商户店表
 */
export const fetchMySite = (params = {}) => http.post('/site/api/site/owned', params)

/**
 * 删除网站
 */
export const fetchSiteRemove = (params = {}) => http.post('/site/api/site/remove', params)

/**
 * 延长网站试用期
 */
export const fetchSiteTrial = (params = {}) => http.post('/site/api/site/trial', params)

/**
 * 网站语言
 */
export const fetchSiteLanguageState = (params = {}) => http.post('/site/api/site/language/update-state', params)

/**
 * 修改下载密码
 */
export const fetchDownloadPass = (params = {}) => http.post('/site/api/site/down-pass', params)

/**
 * 获取下载密码
 */
export const fetchGetDownloadPass = (params = {}) => http.post('/site/api/site/get-down-pass', params)

/**
 * 网站翻译
 */
export const fetchTranslateSite = (params = {}) => http.post('/site/api/site/translate', params)

/**
 * 递增翻译
 */
export const fetchIncreaseTranslate = (params = {}) => http.post('/site/api/site/increase-translate', params)

/**
 * 网站主题分页数据
 */
export const fetchSiteThemeList = (params = {}) => http.post('/site/api/site/theme/list', params)

/**
 * 更新主题名称
 */
export const fetchSiteUpdateName = (params = {}) => http.post('/site/api/site/theme/update', params)

/**
 * 发布网站
 */
export const fetchSitePublish = (params = {}) => http.post('/site/api/site/theme/publish', params)

/**
 * 试用校验
 */
export const fetchTrialCheck = (params = {}) => http.post('/site/api/site/trial-check', params)

/**
 * 添加 & 修改网站路由
 */
export const fetchSiteRouteUpdate = (params = {}) => http.post('/site/api/site/route/update', params)

/**
 * 网站路由分页数据
 */
export const fetchSiteRoutePaging = (params = {}) => http.post('/site/api/site/route/paging', params)

/**
 * 删除网站路由
 */
export const fetchSiteRouteDelete = (params = {}) => http.post('/site/api/site/route/delete', params)

/**
 *  seo网站数据报表
 */
export const fetchReportCheck = (params = {}) => http.post('/stat/api/report/detail', params)

/**
 *  生成报告
 */
export const fetchReportGenerate = (params = {}) => http.post('/stat/api/report/generate', params)

/**
 *  SEO目标
 */
export const fetchSEOTarget = (params = {}) => http.post('/official/api/worksheet/target', params)
