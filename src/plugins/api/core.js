import http from './http'

/**
 * 功能树
 */
export const fetchTree = (params = {}) => http.post('/api/function/tree', params)

/**
 * 批量添加
 */
export const fetchUpdateFunctionBath = (params = {}) => http.post('/api/ops/function/update', params)

/**
 * 删除功能
 */
export const fetchDeleteFunction = (params = {}) => http.post('/api/ops/function/delete', params)

/**
 * 获取角色详情
 */
export const fetchRoleDetail = (params = {}) => http.post('/api/role/detail', params)

/**
 * 初始超级
 */
export const fetchRoleInitSuper = (params = {}) => http.post('/api/ops/role/super', params)

/**
 *  获取角色列表
 */
export const fetchRoleList = (params = {}) => http.post('/api/role/list', params)

/**
 * 删除角色 ???
 */
export const fetchDeleteRole = (params = {}) => http.post('', params)

/**
 * 更新&& 添加角色
 */
export const fetchUpdateRole = (params = {}) => http.post('/api/role/saveOrUpdate', params)

/**
 * 系统角色详情
 */
export const fetchAdminRoleDetail = (params = {}) => http.post('/api/ops/role/detail', params)

/**
 * 后台管理功能树
 */
export const fetchAdminTree = (params = {}) => http.post('/api/ops/function/tree', params)

/**
 * 系统角色
 */
export const fetchAdminRoleUpdate = (params = {}) => http.post('/api/ops/role/update', params)

/**
 * 文章树数据
 */
export const fetchSupportTree = params => http.post('/site/admin/doc/tree', params)

/**
 * 修改文章
 */
export const fetchSupportUpdate = params => http.post('/site/admin/doc/update', params)

/**
 * 文章详情
 */
export const fetchSupportDetail = params => http.post('/site/admin/doc/detail', params)

/**
 * 删除文章
 */
export const fetchSupportDelete = params => http.post('/site/admin/doc/delete', params)

/**
 * 文章拖动排序
 */
export const fetchSupportReSort = params => http.post('/site/admin/doc/resort', params)

/**
 * 获取区域数据字典
 */
export const fetchBaseArea = (params = {}) => http.post('/api/base/area', params)

/**
 * 数据字典更新
 */
export const fetchAgentDictUpdate = (params = {}) => http.post('/api/agent/dict-update', params)

/**
 * 数据字典删除
 */
export const fetchAgentDictDelete = (params = {}) => http.post('/api/agent/dict-delete', params)

/**
 * 数据字典详情
 */
export const fetchAgentDictDetail = (params = {}) => http.post('/api/agent/dict-detail', params)

/**
 * 数据字典
 */
export const fetchAgentDictList = (params = {}) => http.post('/api/agent/dict-list', params)

/**
 * 数据字典批量添加
 */
export const fetchAgentDictBatchAdd = (params = {}) => http.post('/api/agent/dict-add', params)

/**
 * 数据字典分页
 */
export const fetchAgentDictPaging = (params = {}) => http.post('/api/agent/dict', params)

/**
 * 语言
 */
export const fetchBaseLanguage = (params = {}) => http.post('/api/base/language', params)

/**
 * 代理商详情
 */
export const fetchAgentDetail = (params = {}) => http.post('/api/base/super', params)

/**
 * 添加 & 修改代理商
 */
export const fetchBaseAgentUpdate = (params = {}) => http.post('/api/ops/base/support/super', params)
