import http from './http'

export const fetchSite = (params = {}) => http.post('/site/api/site/owned', params)

/**
 *获取商铺信息
 */
export const fetchCompany = (params = {}) => http.post('/core/api/merchant/detail', params)

/**
 * 更改商铺信息
 */
export const fetchUpdateCompany = (params = {}) => http.post('/core/api/merchant/update', params)

/**
 * 获取角色详情
 */
export const fetchRoleDetail = (params = {}) => http.post('/core/api/role/detail', params)

/**
 *  获取角色列表
 */
export const fetchRoleList = (params = {}) => http.post('/core/api/role/list', params)

/**
 * 删除角色 ???
 */
export const fetchRoleDelete = (params = {}) => http.post('/core/api/role/delete', params)

/**
 * 更新&& 添加角色
 */
export const fetchRoleUpdate = (params = {}) => http.post('/core/api/role/update', params)

/**
 * 我的信息
 */
export const fetchPersonal = (params = {}) => http.post('/core/api/employee/personal', params)

/**
 * 更新信息
 */
export const fetchPersonalUpdate = (params = {}) => http.post('/core/api/employee/personal-update', params)

/**
 * 员工分页
 */
export const fetchEmployeePaging = (params = {}) => http.post('/core/api/employee/paging', params)

/**
 * 启用或停用
 */
export const fetchEmployeeState = (params = {}) => http.post('/core/api/employee/state', params)

/**
 * 员工详情
 */
export const fetchEmployeeDetail = (params = {}) => http.post('/core/api/employee/detail', params)

/**
 * 添加修改员工
 */
export const fetchEmployeeUpdate = (params = {}) => http.post('/core/api/employee/update', params)
