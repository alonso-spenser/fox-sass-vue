<template>
  <el-dialog
    :title="$t('variant.edit.heading')"
    width="850px"
    class="variant-edit-dialog"
    :visible.sync="display"
    :before-close="closeDialog"
  >
    <el-form :model="variantModel" ref="variantEditForm">
      <el-row :gutter="20" class="mb-4">
        <el-col :span="6">{{ $t("variant.entity.name.label") }}</el-col>
        <el-col :span="15">{{ $t("variant.entity.value.label") }}</el-col>
      </el-row>
      <el-row
        :gutter="20"
        v-for="(variant, index) in variantModel.variantList"
        :key="variant.id"
      >
        <el-col :span="6">
          <el-form-item
            :prop="`variantList.${index}.variantName`"
            :rules="formRules.name"
            class="w-100"
          >
            <el-input
              size="small"
              :maxlength="16"
              :placeholder="$t('variant.entity.name.placeholder')"
              v-model="variant.variantName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item
            v-for="(value, subIndex) in variant.valueList"
            :key="`variant-edit-${subIndex}`"
            :prop="`variantList.${index}.valueList.${subIndex}.variantValue`"
            :rules="formRules.name"
          >
            <el-input
              size="small"
              :maxlength="16"
              :placeholder="$t('variant.entity.value.placeholder')"
              v-model="value.variantValue"
            >
              <template slot="append">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleConfirmDelete({id: value.id, index, subIndex, length: variant.valueList.length})"
                ></el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40" class="mb-4" v-if="variantModel.variantList.length < 3">
        <el-col :span="21">
          <el-button class="w-100" @click="addVariant">
            {{$t('variant.button.addValue')}}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">
        {{ $t("base.operate.cancel") }}
      </el-button>
      <el-button type="primary" :disabled="!modified" @click="formValidation">
        {{ $t("base.operate.save") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchGoodsVariantNameUpdate, fetchGoodsVariantAdd, fetchGoodsVariantDelete } from '@/plugins/api/goods'

export default {
  name: 'VariantEdit',
  extends: extend,
  data () {
    return {
      modified: false,
      variantModel: {
        variantList: []
      },
      formRules: {
        name: [
          {
            required: true,
            message: this.$t('variant.entity.name.required'),
            trigger: 'blur'
          }
        ],
        value: [
          {
            required: true,
            message: this.$t('variant.entity.value.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: {
    display: {
      type: Boolean,
      default: false
    },
    /**
     * 已有库存
     */
    variant: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     * SPU ID
     */
    spuId: {
      type: String,
      default: ''
    }
  },
  computed: {
    newVariant () {
      let newVariant = []
      for (let variant of this.variantModel.variantList.values()) {
        if (!variant.id) {
          newVariant.push({
            variantName: variant.variantName,
            variantValue: variant.valueList[0].variantValue
          })
        }
      }
      return newVariant
    },
    modifiedVariant () {
      let modifiedVariant = []
      for (let variant of this.variantModel.variantList.values()) {
        for (let initVariant of this.variant) {
          let hasChild = []
          variant.valueList.forEach((o) => {
            let same = initVariant.valueList.filter((c) => {
              return c.id === o.id && (c.variantValue !== o.variantValue)
            })
            if (same.length > 0) {
              hasChild.push(same.length)
            }
          })
          if (((variant.id === initVariant.id) && (variant.variantName !== initVariant.variantName)) || hasChild > 0) {
            modifiedVariant.push({
              id: variant.id,
              variantName: variant.variantName,
              valueList: variant.valueList
            })
          }
        }
      }
      return modifiedVariant
    }
  },
  watch: {
    variant: {
      deep: true,
      immediate: true,
      handler (val = []) {
        if (val.length === 0) {
          this.$emit('update:display', false)
        } else {
          const list = JSON.parse(JSON.stringify(val))
          let variantList = []
          for (let variant of list.values()) {
            if (variant.valueList && variant.valueList.length) {
              variantList.push(variant)
            }
          }
          this.variantModel.variantList = variantList
          // eslint-disable-next-line no-return-assign
          this.$nextTick(() => this.modified = false)
        }
      }
    },
    variantModel: {
      deep: true,
      handler () {
        this.modified = true
      }
    }
  },
  methods: {
    /**
     * 关闭窗体
     */
    closeDialog () {
      this.$emit('update:display', false)
      this.$emit('close')
    },
    formValidation () {
      const formName = 'variantEditForm'
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.modifiedVariant.length && !this.newVariant.length) {
            this.closeDialog()
          } else {
            if (this.newVariant.length) {
              this.goodsVariantBatchAdd()
            }
            if (this.modifiedVariant.length) {
              this.goodsVariantNameEdit()
            }
          }
        }
      })
    },
    /**
     *  添加属性
     */
    addVariant () {
      this.variantModel.variantList.push({
        variantName: '',
        valueList: [
          {
            variantValue: ''
          }
        ]
      })
    },
    /**
     * 删除属性
     */
    deleteVariant (index) {
      this.variantModel.variantList.splice(index, 1)
    },
    /**
     * 确认删除属性值
     */
    handleConfirmDelete (params) {
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
          this.goodsVariantValueDelete(params)
        })
        .catch(() => {})
    },
    /**
     * 删除属性值 (sku)
     */
    goodsVariantValueDelete ({ id, index, subIndex, length }) {
      const params = {
        siteId: this.siteId,
        spuId: this.id,
        id
      }
      fetchGoodsVariantDelete(params)
        .then(result => {
          result.options = {
            action: this.actionType.delete,
            formName: 'delete'
          }
          this.resultMessage(result, success => {
            if (success) {
              if (length === 1) {
                this.variantModel.variantList.splice(index, 1)
              } else {
                this.variantModel.variantList[index].valueList.splice(subIndex, 1)
              }
              // this.$emit('update:display', false)
              this.$emit('close')
            }
          })
        })
        .catch(error => console.log(error))
    },
    /**
     * 批量新增变体
     */
    goodsVariantBatchAdd () {
      fetchGoodsVariantAdd({
        items: this.newVariant,
        spuId: this.spuId
      })
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, success => {
            if (success) {
              this.closeDialog()
            }
          })
        })
        .catch(error => console.log(error))
    },
    /**
     * 修改变体属性名
     * @param data
     * @returns {*}
     */
    goodsVariantNameEdit () {
      fetchGoodsVariantNameUpdate({
        spuId: this.spuId,
        variantList: this.modifiedVariant
      })
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, success => {
            if (success) {
              this.closeDialog()
            }
          })
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss">
.variant-edit-dialog {
  .el-form-item__error {
    display: none!important;
  }
  .el-row {
    .el-form-item {
      display: inline-block;
      margin:0 10px 10px 0;
      width: 140px;
      .el-input__inner {
        padding: 0 8px;
      }

      .el-input-group__append {
        padding: 0 12px;
      }
    }
  }
  .variant-value {
    height: 40px;
    line-height: 38px;
    color: #ffffff;
    margin: 0 5px 5px 0;
    &__1 {
      background: #29bc94;
      border-color: #29bc94;
    }
    &__2 {
      background: #763eaf;
      border-color: #763eaf;
    }
    &__3 {
      background: #ff9517;
      border-color: #ff9517;
    }
    &.el-tag {
      .el-tag__close {
        color: #ffffff;
      }
    }
  }
}
</style>
