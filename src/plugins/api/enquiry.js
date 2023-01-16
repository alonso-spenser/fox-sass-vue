import http from './http'

/**
 * 询盘记录分页数据
 */
export const fetchEnquiryRecordPaging = (params = {}) => http.post('/api/enquiry/record/paging', params)

/**
 * 导出轮盘记录
 */
export const fetchEnquiryRecordExport = (params = {}) => {
  return http({
    method: 'POST',
    url: '/api/enquiry/record/export',
    responseType: 'blob',
    data: params
  })
}

/**
 * 获取询盘详情
 */
export const fetchEnquiryDetail = (params = {}) => http.post('/api/enquiry/record/detail', params)

/**
 * 跟踪记录列表
 */
export const fetchEnquiryRecordList = (params = {}) => http.post('/api/enquiry/timeline/list', params)

/**
 * 添加追踪记录
 */
export const fetchEnquiryRecordAdd = (params = {}) => http.post('/api/enquiry/timeline/save', params)

/**
 * 获取询盘邮箱
 */
export const fetchEnquiryEmailList = (params = {}) => http.post('/api/enquiry/receiver/list', params)

/**
 *  询盘邮箱添加 && 修改
 */
export const fetchEnquiryReceiverUpdate = (params = {}) => http.post('/api/enquiry/receiver/save-batch', params)

/**
 * 询盘表单详情
 */
export const fetchEnquiryFormDetail = (params = {}) => http.post('/api/enquiry/form/detail', params)

/**
 * 添加 & 修改询盘表单
 */
export const fetchEnquiryFormUpdate = (params = {}) => http.post('/api/enquiry/form/save', params)

/**
 * 询盘表单分页数据
 */
export const fetchEnquiryFormPaging = (params = {}) => http.post('/api/enquiry/form/paging', params)

/**
 * 删除询盘表单
 */
export const fetchEnquiryFormDelete = (params = {}) => http.post('/api/enquiry/form/delete', params)
