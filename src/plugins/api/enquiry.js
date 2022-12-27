import http from './http'

/**
 * 询盘记录详情
 */
export const fetchEnquiryRecordDetail = (params = {}) => http.post('', params)

/**
 * 添加 & 修改询盘记录
 */
export const fetchEnquiryRecordUpdate = (params = {}) => http.post('', params)

/**
 * 询盘记录分页数据
 */
export const fetchEnquiryRecordPaging = (params = {}) => http.post('/inquiry/api/enquiry/record/paging', params)

/**
 * 导出轮盘记录
 */
export const fetchEnquiryRecordExport = (params = {}) => {
  return http({
    method: 'POST',
    url: '/inquiry/api/enquiry/record/export',
    responseType: 'blob',
    data: params
  })
}

/**
 * 删除询盘记录
 */
export const fetchEnquiryRecordDelete = (params = {}) => http.post('/inquiry/api/enquiry/record/export', params)

/**
 * 获取询盘详情
 */
export const fetchEnquiryDetail = (params = {}) => http.post('/inquiry/api/enquiry/record/detail', params)

/**
 * 跟踪记录列表
 */
export const fetchEnquiryRecordList = (params = {}) => http.post('inquiry/api/enquiry/timeline/list', params)

/**
 * 添加追踪记录
 */
export const fetchEnquiryRecordAdd = (params = {}) => http.post('/inquiry/api/enquiry/timeline/save', params)

/**
 * 获取询盘邮箱
 */
export const fetchEnquiryEmailList = (params = {}) => http.post('/inquiry/api/enquiry/receiver/list', params)

/**
 *  询盘邮箱添加 && 修改
 */
export const fetchEnquiryReceiverUpdate = (params = {}) => http.post('/inquiry/api/enquiry/receiver/save-batch', params)

/**
 * 询盘表单详情
 */
export const fetchEnquiryFormDetail = (params = {}) => http.post('/inquiry/api/enquiry/form/detail', params)

/**
 * 添加 & 修改询盘表单
 */
export const fetchEnquiryFormUpdate = (params = {}) => http.post('/inquiry/api/enquiry/form/save', params)

/**
 * 询盘表单分页数据
 */
export const fetchEnquiryFormPaging = (params = {}) => http.post('/inquiry/api/enquiry/form/paging', params)

/**
 * 删除询盘表单
 */
export const fetchEnquiryFormDelete = (params = {}) => http.post('/inquiry/api/enquiry/form/delete', params)
