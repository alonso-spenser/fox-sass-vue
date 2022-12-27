<template>
  <main>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <fo-page-header>
      </fo-page-header>
      <div class="section-neighbor">
        {{spuDetail.title}}
      </div>
<!--      <div class="go-back el-icon-arrow-left"  @click="redirectGoodsDetail">-->
<!--        {{ spuDetail.title }}-->
<!--      </div>-->
<!--      <h3 class="page-title">-->
<!--        <small class="float-right pointer" v-if="skuId" @click="confirmDeleteVariant">-->
<!--          <i class="el-icon-delete"></i>-->
<!--          {{ $t('goods.variant.delete')}}-->
<!--        </small>-->
<!--        {{ $t('goods.variant.edit')}}-->
<!--      </h3>-->
      <el-row class="variant-page section-neighbor" :gutter="20">
        <el-col :span="6">
<!--          <fo-page-section class="mt-0">-->
<!--            <el-row type="flex" class="pointer" @click.native="redirectGoodsDetail">-->
<!--              <el-avatar-->
<!--                class="mr-4"-->
<!--                :size="96"-->
<!--                shape="square"-->
<!--                :src="spuDetail.coverImage || imagePlaceholder"-->
<!--                style="flex: none"-->
<!--              ></el-avatar>-->
<!--              {{ spuDetail.title }}-->
<!--            </el-row>-->
<!--          </fo-page-section>-->
          <fo-page-section>
            <div class="variant-list">
              <div
                class="variant-item"
                :class="{ active: skuId === null }"
                @click="switchVariant()"
              >
                <el-avatar
                  :size="48"
                  shape="square"
                  icon="el-icon-plus"
                ></el-avatar>
                <div class="variant-name-list">
                  {{ $t("goods.variant.add") }}
                </div>
              </div>
              <div
                class="variant-item"
                :class="{ active: skuId === sku.id }"
                :data-skuId="sku.id"
                v-for="(sku, index) in spuDetail.skuList"
                :key="index"
                @click="switchVariant(sku.id)"
              >
                <el-avatar
                  class="variant-cover"
                  :size="48"
                  shape="square"
                  :src="sku.skuImage || imagePlaceholder"
                ></el-avatar>
                <div class="variant-name-list">
                <span
                  class="variant-name"
                  v-for="(item, subIndex) in sku.variantList"
                  :key="subIndex"
                  :data-id="item.variantValue"
                >
                  <template v-if="subIndex"
                  >/</template
                  >
                  {{ item.variantValue }}
                </span>
                </div>
              </div>
            </div>
          </fo-page-section>
        </el-col>
        <el-col :span="18">
          <el-form
            :model="entity"
            ref="skuUpdateForm"
            :rules="formRules"
            label-position="top"
            size="small"
          >
            <fo-page-section class="mt-0">
              <el-row type="flex">
                <div style="flex: auto">
                  <el-form-item
                    v-for="(variant, index) in entity.variantList"
                    :key="index"
                    :label="variant.variantName"
                    :prop="`variantList.${index}.variantValue`"
                    :rules="formRules.value"
                  >
                    <el-input
                      class="mt-2"
                      :maxlength="16"
                      v-model="variant.variantValue"
                    ></el-input>
                  </el-form-item>
                  <el-input type="hidden" v-model="entity.skuImage"></el-input>
                </div>
                <div class="pl-4 ml-7">
                  <el-avatar
                    class="variant-cover"
                    :size="100"
                    shape="square"
                    fit="cover"
                    :src="entity.skuImage || imagePlaceholder"
                    @click.native="variantAvatarVisible = true"
                  ></el-avatar>
                </div>
              </el-row>
            </fo-page-section>
            <fo-page-section>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="salePrice" :label="$t('goods.sku.update.entity.salePrice.label')">
                    <el-input
                      v-model="entity.salePrice"
                      :placeholder="$t('goods.sku.update.entity.salePrice.placeholder')"
                    >
                      <template slot="prepend">￥</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="marketPrice" :label="$t('goods.sku.update.entity.marketPrice.label')">
                    <el-input
                      v-model="entity.marketPrice"
                      :placeholder="$t('goods.sku.update.entity.marketPrice.placeholder')"
                    >
                      <template slot="prepend">￥</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="surplusStock" :label="$t('goods.sku.update.entity.surplusStock.label')">
                    <el-input
                      v-model="entity.surplusStock"
                      :placeholder="$t('goods.sku.update.entity.surplusStock.placeholder')"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="barcode" :label="$t('goods.sku.update.entity.barcode.label')">
                    <el-input
                      v-model="entity.barcode"
                      :placeholder="$t('goods.sku.update.entity.barcode.placeholder')"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <!--              <el-col :span="12">-->
                <!--                <el-form-item prop="skuId" :label="$t('goods.sku.update.entity.skuId.label')">-->
                <!--                  <el-input-->
                <!--                    v-model="entity.skuId"-->
                <!--                    :placeholder="$t('goods.sku.update.entity.skuId.placeholder')"-->
                <!--                  ></el-input>-->
                <!--                </el-form-item>-->
                <!--              </el-col>-->
                <el-col :span="12">
                  <el-form-item prop="width" :label="$t('goods.sku.update.entity.width.label')">
                    <el-input
                      v-model="entity.width"
                      :placeholder="$t('goods.sku.update.entity.width.placeholder')"
                    >
                      <template slot="append">CM</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="shelfLife" :label="$t('goods.sku.update.entity.shelfLife.label')">
                    <el-input
                      v-model="entity.shelfLife"
                      :placeholder="$t('goods.sku.update.entity.shelfLife.placeholder')"
                    >
                      <template slot="append">月</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item prop="height" :label="$t('goods.sku.update.entity.height.label')">
                    <el-input
                      v-model="entity.height"
                      :placeholder="$t('goods.sku.update.entity.height.placeholder')"
                    >
                      <template slot="append">CM</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="hsCode" :label="$t('goods.sku.update.entity.hsCode.label')">
                    <el-input
                      v-model="entity.hsCode"
                      :placeholder="$t('goods.sku.update.entity.hsCode.placeholder')"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="length" :label="$t('goods.sku.update.entity.length.label')">
                    <el-input
                      v-model="entity.length"
                      :placeholder="$t('goods.sku.update.entity.length.placeholder')"
                    >
                      <template slot="append">CM</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="weight" :label="$t('goods.sku.update.entity.weight.label')">
                    <el-input
                      v-model="entity.weight"
                      :placeholder="$t('goods.sku.update.entity.weight.placeholder')"
                    >
                      <template slot="append">克</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--            <el-form-item-->
              <!--              label="SKU编号"-->
              <!--              prop="skuId"-->
              <!--              :rules="formRules.skuId"-->
              <!--            >-->
              <!--              <el-input-->
              <!--                class="mt-2"-->
              <!--                :maxlength="66"-->
              <!--                v-model="entity.skuId"-->
              <!--              ></el-input>-->
              <!--            </el-form-item>-->
            </fo-page-section>
          </el-form>
        </el-col>
      </el-row>
      <fo-fixed-unsaved
        :unsaved.sync="unsaved"
        @confirmed="formValidation"
      >
      </fo-fixed-unsaved>
      <!--SKU图片弹窗-->
      <variant-avatar
        :display="variantAvatarVisible"
        :default-value="spuDetail.imageList"
        @close="variantAvatarCall"
      >
      </variant-avatar>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import VariantAvatar from '../components/variant-avatar'
import * as http from '@/plugins/api/goods'

const initEntity = {
  variantList: [],
  spuId: '',
  skuImage: '',
  skuName: '',
  barcode: '',
  length: 0,
  width: 0,
  weight: 0,
  height: 0,
  salePrice: 0,
  vipPrice: 10,
  costPrice: 0,
  marketPrice: 10,
  servicePrice: 0,
  salePrice: 10,
  lockStock: 0,
  soldStock: 0,
  surplusStock: 1000,
  hsCode: '',
  shelfLife: 24,
  storageSkuId: '',
  skuId: +new Date()
}

export default {
  name: 'SkuUpdate',
  extends: extend,
  components: {
    VariantAvatar
  },
  data () {
    return {
      skuId: null,
      spuId: null,
      addSkuSuccess: false,
      imagePlaceholder: 'https://img.cdn.86planet.com/img/placeholder.jpg',
      variantAvatarVisible: false,
      spuDetail: {
        skuList: [],
        imageList: []
      },
      entity: JSON.parse(JSON.stringify(initEntity)),
      formRules: {
        value: [
          {
            required: true,
            message: this.$t('variant.entity.value.required'),
            trigger: 'blur'
          }
        ],
        skuId: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.skuId.required'),
            trigger: 'blur'
          }
        ],
        salePrice: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.salePrice.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.FloatZeroPositive,
            message: this.$t('goods.sku.update.entity.salePrice.custom')
          }
        ],
        servicePrice: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.servicePrice.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.FloatPositive,
            message: this.$t('goods.sku.update.entity.servicePrice.custom')
          }
        ],
        costPrice: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.costPrice.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.FloatPositive,
            message: this.$t('goods.sku.update.entity.costPrice.custom')
          }
        ],
        surplusStock: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.surplusStock.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.IntZeroPositive,
            message: this.$t('goods.sku.update.entity.surplusStock.custom')
          }
        ],
        height: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.height.required'),
            trigger: 'blur'
          }
        ],
        length: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.length.required'),
            trigger: 'blur'
          }
        ],
        marketPrice: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.marketPrice.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.FloatZeroPositive,
            message: this.$t('goods.sku.update.entity.marketPrice.custom')
          }
        ],
        shelfLife: [
          {
            required: true,
            message: this.$t('goods.update.entity.shelfLife.required')
          },
          {
            pattern: this.utility.expression.Float,
            message: this.$t('goods.update.entity.shelfLife.custom')
          }
        ],
        vipPrice: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.vipPrice.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.FloatPositive,
            message: this.$t('goods.sku.update.entity.vipPrice.custom')
          }
        ],
        weight: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.weight.required'),
            trigger: 'blur'
          }
        ],
        width: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.width.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    skuId () {
      this.setActiveVariant()
    },
    $route: {
      deep: true,
      immediate: true,
      handler () {
        this.skuId = this.$route.params.skuId || null
        this.spuId = this.$route.params.spuId || null
        initEntity.spuId = this.$route.params.spuId || null
      }
    },
    entity: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  },
  created () {
    this.getDetail()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    if (this.addSkuSuccess) {
      this.getDetail()
    }
  },
  methods: {
    /**
     * 商品详情
     */
    redirectGoodsDetail (id) {
      this.$router.push(`/site/${this.siteId}/goods/update/${this.spuId}`)
    },
    /**
     * 切换SKU
     */
    switchVariant (skuId) {
      if (skuId) {
        this.$router.replace(`/site/${this.siteId}/goods/variant/${this.spuId}/${skuId}`)
      } else {
        this.$router.replace(`/site/${this.siteId}/goods/variant/${this.spuId}`)
      }
    },
    formValidation () {
      const formName = 'skuUpdateForm'
      this.$refs[formName].validate(valid => {
        if (valid) {
          let name = []
          this.entity.salePrice = parseFloat(this.entity.salePrice) + parseFloat(this.entity.servicePrice)
          this.entity.variantList.forEach((b) => {
            name.push(b.variantValue)
          })
          this.entity.skuName = name.join(',')
          this.goodsSkuSave()
        }
      })
    },
    /**
     * 添加sku
     */
    goodsSkuSave () {
      http.goodsSkuUpdate(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, success => {
            if (success) {
              this.addSkuSuccess = true
              this.switchVariant(result.data.id)
              this.getDetail()
            }
          })
        })
        .catch(error => this.networkMistake(error))
    },
    /**
     * 删除sku
     */
    deleteVariant () {
      http.goodsSkuDelete({
        siteId: this.siteId,
        spuId: this.spuId,
        ids: [this.skuId]
      })
        .then(result => {
          result.options = {
            action: this.actionType.delete,
            formName: 'delete'
          }
          this.resultMessage(result, success => {
            if (success) {
              this.addSkuSuccess = true
              this.switchVariant()
              this.getDetail()
            }
          })
        })
        .catch(error => console.log(error))
    },
    /**
     * 获取spu详情
     */
    getDetail () {
      http.goodsDetail({
        id: this.spuId,
        siteId: this.siteId
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, success => {
            if (success) {
              if (result.data.skuList.length === 0) {
                this.redirectGoodsDetail()
              } else {
                this.spuDetail = result.data
                initEntity.variantList = result.data.skuList[0].variantList.map(
                  variant => {
                    return {
                      // id: '',
                      // valueId: '',
                      variantId: variant.variantId,
                      variantName: variant.variantName,
                      variantValue: ''
                    }
                  }
                )
                this.setActiveVariant()
              }
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 图片弹窗回调
     * @param action 0关闭，1更新，2移出
     * @param url
     */
    variantAvatarCall (action, url) {
      this.variantAvatarVisible = false
      if (action === 1 && url) {
        this.entity.skuImage = url
      } else if (action === 2) {
        this.entity.skuImage = ''
      } else if (action === 3 && url) {
        // this.entity.imageList.push(url)
      }
    },
    /**
     * 切换sku
     */
    setActiveVariant () {
      const skuList = JSON.parse(JSON.stringify(this.spuDetail.skuList))
      const activeVariant = skuList.find(sku => sku.id === this.skuId)
      if (activeVariant) {
        this.entity = activeVariant
      } else {
        this.entity = JSON.parse(JSON.stringify(initEntity))
      }
      this.$nextTick(() => {
        this.unsaved = false
      })
    },
    /**
     * 确认删除sku
     */
    confirmDeleteVariant () {
      this.$confirm(
        '被删除的变体商品无法恢复，确认要删除吗？',
        '删除变体商品',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.deleteVariant()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.variant-page {
  .variant-list {
    margin: -10px -20px;
    max-height: 560px;
    overflow-y: auto;
    .variant-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 10px 10px;
      border-bottom: 1px solid #e4e7ed;
      &.active {
        background: #eaf5ff;
      }
      &:last-child {
        border-bottom: none;
      }
      .variant-name-list {
        margin-left: 10px;
        font-size: 14px;
        .variant-name {
          &:nth-child(1) {
            color: #29bc94;
          }
          &:nth-child(2) {
            color: #763eaf;
          }
          &:nth-child(3) {
            color: #ff9517;
          }
        }
      }
    }
  }
  .variant-cover {
    border: 1px solid #DCDFE6;
    border-radius: 8px;
    cursor: pointer;
  }
  .el-form-item__error {
    display: none!important;
  }
  .el-form-item__label {
    padding: 10px 0 5px 0;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 10px;
  }
}
</style>
