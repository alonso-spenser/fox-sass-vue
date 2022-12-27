import http from './http'

/**
 * 添加 & 修改主题标签
 */
export const themeTagUpdate = (params = {}) => http.post('/site/admin/theme/tag/saveOrUpdate', params)

/**
 * 主题标签分页数据
 */
export const themeTagPaging = (params = {}) => http.post('/site/admin/theme/tag/list', params)

/**
 * 删除主题标签
 */
export const themeTagDelete = (params = {}) => http.post('/site/admin/theme/tag/delete', params)

/**
 * 添加 & 修改Section标签
 */
export const fetchThemeSectionTagUpdate = (params = {}) => http.post('/site/admin/theme/section-tag/saveOrUpdate', params)

/**
 * Section标签分页数据
 */
export const fetchThemeSectionTagList = (params = {}) => http.post('/site/admin/theme/section-tag/list', params)

/**
 * 删除Section标签
 */
export const fetchThemeSectionTagDelete = (params = {}) => http.post('/site/admin/theme/section-tag/delete', params)

/**
 * 主题详情
 */
export const themeDetail = (params = {}) => http.post('/site/admin/theme/detail', params)

/**
 * 添加 & 修改主题
 */
export const themeUpdate = (params = {}) => http.post('/site/admin/theme/update', params)

/**
 * 主题分页数据
 */
export const themePaging = (params = {}) => http.post('/site/admin/theme/paging', params)

/**
 * 删除主题
 */
export const themeDelete = (params = {}) => http.post('/site/admin/theme/delete', params)

/**
 * 主题状态
 */
export const themeState = (params = {}) => http.post('/site/admin/theme/state', params)

/**
 * 模板页面详情
 */
export const themePageDetail = (params = {}) => http.post('/site/admin/theme/page/detail', params)

/**
 * 添加 & 修改模板页面
 */
export const themePageUpdate = (params = {}) => http.post('/site/admin/theme/page/update', params)

/**
 * 模板页面分页数据
 */
export const themePagePaging = (params = {}) => http.post('/site/admin/theme/page/paging', params)

/**
 * 删除模板页面
 */
export const themePageDelete = (params = {}) => http.post('/site/admin/theme/page/delete', params)

/**
 * 模板页面绑定的section
 */
export const themePageSection = (params = {}) => http.post('/site/admin/theme/page/section', params)

/**
 * 页面初始绑定
 */
export const themePageInitSection = (params = {}) => http.post('/site/admin/theme/page/init-section', params)

/**
 * SECTION追加绑定
 */
export const themePageSectionAppend = (params = {}) => http.post('/site/admin/theme/page/section-append', params)

/**
 * 面页追加绑定
 */
export const themePageAppend = (params = {}) => http.post('/site/admin/theme/page/page-append', params)

/**
 * 初始
 */
export const themePageInit = (params = {}) => http.post('/site/admin/theme/page/init', params)

/**
 * 面面绑定SECTION
 */
export const themePageSectionUpdate = (params = {}) => http.post('/site/admin/theme/page/section-update', params)

/**
 * 组件详情
 */
export const themeSectionDetail = (params = {}) => http.post('/site/admin/theme/section/detail', params)

/**
 * 添加 & 修改组件
 */
export const themeSectionUpdate = (params = {}) => http.post('/site/admin/theme/section/update', params)

/**
 * 更新语言
 */
export const themeSectionUpdateLang = (params = {}) => http.post('/site/admin/theme/section/update-lang', params)
/**
 * 组件分页数据
 */
export const themeSectionPaging = (params = {}) => http.post('/site/admin/theme/section/paging', params)

/**
 * 删除组件
 */
export const themeSectionDelete = (params = {}) => http.post('/site/admin/theme/section/delete', params)

/**
 * 主题Schema详情
 */
export const themeSchemaDetail = (params = {}) => http.post('/site/admin/theme/schema/detail', params)

/**
 * 添加 & 修改主题Schema
 */
export const themeSchemaUpdate = (params = {}) => http.post('/site/admin/theme/schema/update', params)

/**
 * TAG
 */
export const fetchThemeSectionUpdateTag = (params = {}) => http.post('/site/admin/theme/section/update-tag', params)

/**
 * TAG
 */
export const fetchThemeSectionUpdateSiteType = (params = {}) => http.post('/site/admin/theme/section/update-site-type', params)

/**
 * 翻译预设
 */
export const fetchTranslatePreset = (params = {}) => http.post('/site/admin/theme/translate-preset', params)

/**
 * 翻译组件
 */
export const fetchTranslateSection = (params = {}) => http.post('/site/admin/theme/translate-section', params)
