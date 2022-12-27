<template>
  <el-dialog
    :title="$t('variant.batch.title')"
    :visible.sync="display"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="600px"
  >
    <el-form
      :model="entity"
      :rules="formRules"
      label-position="left"
      label-width="80px"
      ref="update"
      size="small"
      class="small-prepend"
    >
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogClose">
        {{ this.$t("base.operate.cancel") }}
      </el-button>
      <el-button
        size="small"
        :loading="loading"
        type="primary"
        @click="formValidation"
      >
        {{ this.$t("base.operate.save") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/base'

/**
 * SKU 批量价格设置
 */
export default {
  name: 'variant-price',
  extends: extend,
  data () {
    return {
      entity: {
        'barcode': '',
        'length': 0,
        'width': 0,
        'weight': 0,
        'height': 0,
        'vipPrice': 0,
        'costPrice': 0,
        'marketPrice': 0,
        'lockStock': 0,
        'soldStock': 0,
        'salePrice': 0,
        'surplusStock': 0,
        'hsCode': '',
        'shelfLife': 0
      },
      formRules: {
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
        shelfLife: [
          {
            required: true,
            message: this.$t('goods.sku.update.entity.shelfLife.required'),
            trigger: 'blur'
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
  computed: {
    /**
     * 站点信息
     */
    siteModel () {
      return this.$store.state.siteModel
    }
  },
  props: {
    display: {
      type: Boolean,
      default: false
    },
    /**
     * 默认价格
     */
    defaultValue: {
      type: Object,
      default: () => {
        return {
          'barcode': '',
          'length': 0,
          'width': 0,
          'weight': 0,
          'height': 0,
          'vipPrice': 0,
          'costPrice': 0,
          'servicePrice': 0,
          'salePrice': 0,
          'lockStock': 0,
          'soldStock': 0,
          'surplusStock': 0,
          'hsCode': '',
          'shelfLife': 0
        }
      }
    }
  },
  watch: {
    /**
     * 监控窗口显示状态
     */
    display (val) {
      if (val) {
        this.entity = this.defaultValue
      }
    }
  },
  created () {
    this.entity = this.defaultValue
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('close', this.entity)
        }
      })
    },
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.small-prepend {
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 5px;
    font-size: 10px;
  }

  .el-form-item {
    margin-bottom: 6px;

    .el-form-item__content {
      .el-form-item__error {
        display: none;
      }
    }
  }
}
</style>
