/**
 * SKU递归组合
 */
export default {
  /**
   * 递归
   * @param arr 数组
   * @param spuCode spu code
   * @returns {[]}
   */
  combine (arr, spuCode) {
    let r = []
    let index = -1;
    (function f (t, a, n) {
      if (n === 0) {
        index++
        return r.push({
          variantList: t,
          variantIndex: '',
          spuId: spuCode,
          skuImage: '',
          title: '',
          barcode: '',
          length: 0,
          width: 0,
          weight: 0,
          height: 0,
          salePrice: 0,
          vipPrice: 0,
          costPrice: 0,
          marketPrice: 0,
          servicePrice: 0,
          goodsPrice: 0,
          lockStock: 0,
          soldStock: 0,
          surplusStock: 1000,
          hsCode: '',
          shelfLife: 24,
          storageSkuId: '',
          skuId: `${spuCode}${index < 10 ? '0' + index.toString() : index}`
        })
      }
      for (let i = 0; i < a[n - 1].length; i++) {
        f(t.concat(a[n - 1][i]), a, n - 1)
      }
    })([], arr, arr.length)
    return r
  },
  /**
   * 排列组合
   */
  resolution (variant, spuCode) {
    let s = []
    let result = {
      rowspan: [],
      data: []
    }
    if (variant.length === 0) {
      return result
    }
    variant.forEach((o) => {
      let sub = []
      o.valueList.forEach((subItem) => {
        sub.push({
          variantValue: subItem.variantValue,
          variantName: o.variantName
        })
      })
      s.push(sub)
    })
    result.data = this.combine(s.reverse(), spuCode)
    // result.data = this.getCache(result.data)
    return result
  },
  /**
   * 缓存属情趣
   * @param data
   * @returns {boolean|any|*[]}
   */
  nature (data) {
    if (data) {
      localStorage.setItem('variantProperty', JSON.stringify(data))
      return false
    }
    let cache = localStorage.getItem('variantProperty')
    return cache ? JSON.parse(cache) : []
  },
  update (data) {
    localStorage.setItem('variant', JSON.stringify(data))
  },
  getCache (data) {
    console.log(data.length)
    let cache = localStorage.getItem('variant')
    let cacheData = []
    if (cache) {
      cacheData = JSON.parse(cache)
    }
    if (data.length === 0 || cacheData.length === 0) {
      return data
    }
    data.forEach((o, index) => {
      cacheData.forEach((c) => {
        if (JSON.stringify(o.variantList) === JSON.stringify(c.variantList)) {
          data[index] = c
          console.log('牛B', o.skuId)
        }
      })
    })
    return data
  }
}
