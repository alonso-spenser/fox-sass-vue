import http from './http'

/**
 * 分页获取自定义页面
 */
export const fetchPagesPaging = (params = {}) => http.post('/site/api/site/page/paging', params)

/**
 *  添加自定义页面
 */
export const fetchAddPage = (params = {}) => http.post('/site/api/site/page/add', params)

/**
 * 批量删除自定义页面
 */
export const fetchDeletePage = (params = {}) => http.post('/site/api/site/page/delete', params)

/**
 * 自定义页面详情
 */
export const fetchGetPageDetail = (params = {}) => http.post('/site/api/site/page/detail', params)

/**
 * 更新自定义页面
 */
export const fetchUpdatePage = (params = {}) => http.post('/site/api/site/page/update', params)

/**
 *  更改页面状态
 */
export const fetchChangePageState = (params = {}) => http.post('/site/api/site/page/state', params)
