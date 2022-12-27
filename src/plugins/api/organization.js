import http from './http'

/**
 *
 * 获取员工列表
 */
export const fetchEmployeeList = params => http.post('/core/api/employee/paging', params)

/**
 * 获取员工详情
 */
export const fetchEmployeeDetail = params => http.post('/core/api/employee/detail', params)

/**
 * 员工停止或者开始使用状态
 */
export const fetchOperationEmployeeState = params => http.post('/core/api/employee/state', params)

/**
 * 新增或 && 修改员工
 */
export const fetchAddOrUpdateEmployee = params => http.post('/core/api/employee/update', params)

// 获取角色列表 (差分页)==》对应相差权限列表接口
export const fetchRoleList = params => http.post('/core/api/role/list', params)

// 获取角色详情
export const fetchRoleDetail = (params = {}) => http.post('/core/api/role/detail', params)

// 删除角色
export const fetchDeleteRole = id => http.post('/core/api/role/delete/' + id)

// 获取权限列表树（暂无）
export const fetchFunctionTree = () => http.get('/core/api/function/tree')

/**
 * 添加 & 更新权限
 * @param params
 */
export const fetchUpdateRole = params => http.post('/core/api/role/merchant-role-update', params)
