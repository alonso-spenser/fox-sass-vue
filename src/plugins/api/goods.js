import http from './http'

/**
 * 商品SPU详情
 */
export const goodsDetail = (params = {}) => http.post('/api/goods/detail', params)

/**
 * 添加 & 修改商品SPU
 */
export const goodsUpdate = (params = {}) => http.post('/api/goods/update', params)

/**
 * 商品SPU分页数据
 */
export const goodsPaging = (params = {}) => http.post('/api/goods/paging', params)

/**
 * 删除商品SPU
 */
export const goodsDelete = (params = {}) => http.post('/api/goods/delete', params)

/**
 * 上下架
 */
export const goodsState = (params = {}) => http.post('/api/goods/state', params)

/**
 * 删除商品SKU
 */
export const goodsSkuDelete = (params = {}) => http.post('/api/goods/sku/delete', params)

/**
 * 修改商品SKU
 */
export const goodsSkuUpdate = (params = {}) => http.post('/api/goods/sku/update', params)

/**
 * 修改SKU属性名
 */
export const fetchGoodsVariantNameUpdate = (params = {}) => http.post('/api/goods/variant/update', params)

/**
 * 添加SKU属性
 */
export const fetchGoodsVariantAdd = (params = {}) => http.post('/api/goods/variant/value-add', params)

/**
 * 删除SKU属性
 */
export const fetchGoodsVariantDelete = (params = {}) => http.post('/api/goods/variant/delete', params)

/**
 * 商品SKU属性
 */
export const fetchGoodsVariantList = (params = {}) => http.post('/api/goods/variant/goods-variants', params)

/**
 * 商品SKU属性排序
 */
export const fetchGoodsVariantResort = (params = {}) => http.post('/api/goods/variant/resort', params)

/**
 * 商品数量限制
 */
export const fetchGoodsLimited = (params = {}) => http.post('/api/goods/limited', params)

/**
 * 处理规格数字
 */
export const fetchGoodsFixedSpecDigit = (params = {}) => http.post('/api/goods/fixed-spec-digit', params)
