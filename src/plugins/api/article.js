import http from './http'
import { fetchCollectRuleDelete } from '@/plugins/api/collect'

/**
 * 文章信息详情
 */
export const articleDetail = (params = {}) => http.post('/api/article/detail', params)

/**
 * 添加 & 修改文章信息
 */
export const articleUpdate = (params = {}) => http.post('/api/article/update', params)

/**
 * 文章信息分页数据
 */
export const articlePaging = (params = {}) => http.post('/api/article/paging', params)

/**
 * 查找可引用的产品数据
 */
export const fetchAvailableGoods = (params = {}) => http.post('/api/article/available-goods', params)

/**
 * 文章状态
 */
export const articleState = (params = {}) => http.post('/api/article/state', params)

/**
 * 文章置顶
 */
export const articleSticky = (params = {}) => http.post('/api/article/sticky', params)

/**
 * 文章排序
 */
export const articleSort = (params = {}) => http.post('/api/article/sort', params)

/**
 * 文章复制
 */
export const articleClone = (params = {}) => http.post('/api/article/clone', params)

/**
 * 文章排序刷新
 */
export const articleDelete = (params = {}) => http.post('/api/article/delete', params)

/**
 * 删除文章信息
 */
export const articleSortRefresher = (params = {}) => http.post('/api/article/refresher', params)

/**
 * 文章批量加入到集合
 */
export const articleJoinToCollection = (params = {}) => http.post('/api/article/join-to-collection', params)

/**
 * 文章批量移除集合
 */
export const articleRemoveFromCollection = (params = {}) => http.post('/api/article/remove-from-collection', params)

/**
 * 文章集合详情
 */
export const articleCollectionDetail = (params = {}) => http.post('/api/article/collection/detail', params)

/**
 * 添加 & 修改文章集合
 */
export const articleCollectionUpdate = (params = {}) => http.post('/api/article/collection/update', params)

/**
 * 文章集合分页数据
 */
export const articleCollectionPaging = (params = {}) => http.post('/api/article/collection/paging', params)

/**
 * 文章集合
 */
export const articleCollectionList = (params = {}) => http.post('/api/article/collection/list', params)

/**
 * 文章集合内文章排序
 */
export const articleCollectionResort = (params = {}) => http.post('/api/article/collection/article-resort', params)

/**
 * 文章集合内文章自动排序
 */
export const articleCollectionAutoResort = (params = {}) => http.post('/api/article/collection/article-auto-resort', params)

/**
 * 文章集合数据
 */
export const articleCollectionData = (params = {}) => http.post('/api/article/list-by-collection', params)
/**
 * 文章集合状态
 */
export const articleCollectionState = (params = {}) => http.post('/api/article/collection/state', params)

/**
 * 删除文章集合
 */
export const articleCollectionDelete = (params = {}) => http.post('/api/article/collection/delete', params)

/**
 * 文章集合快速添加
 */
export const articleCollectionQuickly = (params = {}) => http.post('/api/article/collection/quickly', params)

/**
 * 文章标签详情
 */
export const articleTagDetail = (params = {}) => http.post('/api/article/tag/detail', params)

/**
 * 添加 & 修改文章标签siteAside
 */
export const articleTagUpdate = (params = {}) => http.post('/api/article/tag/update', params)

/**
 * 文章标签分页数据
 */
export const articleTagPaging = (params = {}) => http.post('/api/article/tag/paging', params)

/**
 * 删除文章标签
 */
export const articleTagDelete = (params = {}) => http.post('/api/article/tag/delete', params)

/**
 * 文章标签列表
 */
export const articleTagList = (params = {}) => http.post('/api/article/tag/list', params)

/**
 * 文章检查URL
 */
export const articleTagCheckURL = (params = {}) => http.post('/api/article/tag/list', params)

/**
 * 文章标签快速添加
 */
export const articleTagQuickly = (params = {}) => http.post('/api/article/tag/quickly', params)

/**
 * 文章移除标签
 */
export const articleRemoveFromTag = (params = {}) => http.post('/api/article/remove-from-tag', params)

/**
 * 文章添加标签
 */
export const articleJoinToTag = (params = {}) => http.post('/api/article/join-to-tag', params)

/**
 * 默认规格参数
 */
export const articleSpecDefault = (params = {}) => http.post('/api/article/spec/default', params)

/**
 * 添加 & 修改商品规格参数预设
 */
export const articleSpecUpdate = (params = {}) => http.post('/api/article/spec/update', params)

/**
 * 添加 & 修改商品规格参数预设
 */
export const articleSpecBatchUpdate = (params = {}) => http.post('/api/article/spec/batch-update', params)

/**
 * 商品规格参数预设分页数据
 */
export const articleSpecList = (params = {}) => http.post('/api/article/spec/list', params)

/**
 * 删除商品规格参数预设
 */
export const articleSpecDelete = (params = {}) => http.post('/api/article/spec/delete', params)

/**
 * 删除商品规格参数预设
 */
export const taskDetail = (params = {}) => http.post('/task/api/product/detail', params)
