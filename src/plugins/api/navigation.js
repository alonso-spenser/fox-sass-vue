import http from './http'

/**
 *  添加 && 编辑网站导航菜单
 */
export const fetchSiteNavigationUpdate = (params = {}) => http.post('/site/api/site/navigation/saveOrUpdate', params)

/**
 * 获取导航菜单
 */
export const fetchSiteNavigationTreeData = (params = {}) => http.post('/site/api/site/navigation/tree', params)

/**
 * 删除导航菜单
 */
export const fetchDeleteSiteNavigationTree = (params = {}) => http.post('/site/api/site/navigation/delete', params)

/**
 * 导航排序
 */
export const fetchSiteNavigationSort = (params = {}) => http.post('/site/api/site/navigation/resort', params)

/**
 * 获取链接数据
 */
export const fetchLinkPicker = (params = {}) => http.post('/site/api/assembler/link-picker', params)
