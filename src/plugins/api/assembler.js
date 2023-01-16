import http from './http'

/**
 * 链接选择器
 */
export const fetchLinkPicker = (params = {}) => http.post('/api/assembler/link-picker', params)

/**
 * 我的主题
 */
export const fetchMyTheme = (params = {}) => http.post('/api/assembler/my-theme', params)

/**
 * 页面
 */
export const fetchPageGroup = (params = {}) => http.post('/api/assembler/page-group', params)

/**
 * 页面信息 & SECTION
 */
export const fetchPageInfo = (params = {}) => http.post('/api/assembler/page-info', params)

/**
 * SECTION TAG
 */
export const fetchSectionTag = (params = {}) => http.post('/api/assembler/section-tag', params)

/**
 * SECTION
 */
export const fetchSection = (params = {}) => http.post('/api/assembler/section', params)

/**
 * SECTION绑定
 */
export const fetchSectionMount = (params = {}) => http.post('/api/assembler/section-mount', params)

/**
 * SECTION 改名
 */
export const fetchSectionRename = (params = {}) => http.post('/api/assembler/section-rename', params)

/**
 * SECTION 可见状态
 */
export const fetchSectionState = (params = {}) => http.post('/api/assembler/section-state', params)
/**
 * SECTION 范围
 */
export const fetchSectionScope = (params = {}) => http.post('/api/assembler/section-scope', params)

/**
 * SECTION 排序
 */
export const fetchSectionSorting = (params = {}) => http.post('/api/assembler/section-sorting', params)

/**
 * SECTION SCHEMA
 */
export const fetchSectionSchema = (params = {}) => http.post('/api/assembler/section-schema', params)

/**
 * SECTION UPDATE
 */
export const fetchSectionUpdate = (params = {}) => http.post('/api/assembler/section-update', params)

/**
 * SECTION REMOVE
 */
export const fetchSectionRemove = (params = {}) => http.post('/api/assembler/section-remove', params)

/**
 * SECTION COPY & CLONE
 */
export const fetchSectionClone = (params = {}) => http.post('/api/assembler/section-clone', params)

/**
 * THEME TAG
 */
export const fetchThemeTag = (params = {}) => http.post('/api/assembler/theme-tag', params)

/**
 * THEMES
 */
export const fetchTheme = (params = {}) => http.post('/api/assembler/theme', params)

/**
 * 资源选择器
 */
export const fetchResourceSelector = (params = {}) => http.post('/api/assembler/resource-selector', params)

/**
 * 页面克隆
 */
export const fetchClonePage = (params = {}) => http.post('/api/assembler/page-clone', params)

/**
 * 同步导航菜单
 */
export const fetchAsyncNavigation = (params = {}) => http.post('/api/assembler/async-menu', params)

/**
 * 同步导航菜单
 */
export const fetchSectionAnchor = (params = {}) => http.post('/api/assembler/section-anchor', params)

/**
 * 清理SCHEMA
 */
export const fetchClearSchema = (params = {}) => http.post('/api/site/clear-schema', params)
