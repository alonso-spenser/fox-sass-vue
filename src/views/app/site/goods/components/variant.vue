<template>
  <div class="product-variant-list">
    <slot></slot>
    <el-form class="product-variant" :model="variantModel" ref="variantForm" v-if="priceType > 0">
      <el-row class="mb-3" :gutter="20">
        <el-col :span="4">
          {{ $t('variant.attrKey') }}
        </el-col>
        <el-col :span="20">
          {{ $t('variant.attrValue') }}
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        v-for="(variant, index) in variantModel.variantList"
        :key="index"
      >
        <el-col :span="4">
          <el-form-item
            :prop="'variantList.' + index + '.variantName'"
            :rules="formRules.name"
          >
            <el-input
              :maxlength="16"
              size="small"
              v-model.trim="variant.variantName"
              placeholder="eg: Color"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <div class="form-item-wrap">
            <template v-for="(value, subIndex) in variant.valueList">
              <el-tag
                :key="subIndex"
                class="variant-value__tag"
                :class="`variant-value__tag-${index + 1}`"
                closable
                type="info"
                :disable-transitions="true"
                @close="deleteVariantValue({ index, subIndex })"
                v-if="value"
              >
                {{ value.variantValue }}
              </el-tag>
            </template>
            <el-input
              class="input-new-key"
              :ref="`saveValueInput${index}`"
              :maxlength="16"
              size="small"
              v-model.trim="variantValue[index].value"
              placeholder="eg: Red"
              @keyup.enter.native="addVariantValue(index)"
              @blur="addVariantValue(index)"
              v-if="variantValue[index].visible"
            ></el-input>
            <el-button v-else class="button-new-key" size="small" @click="displayValueTextbox(index)">
              {{ $t('variant.button.addValue') }}
            </el-button>
          </div>
        </el-col>
        <el-col :span="2" v-show="variantModel.variantList.length > 1">
          <el-button
            icon="el-icon-delete"
            circle
            @click.prevent="removeVariant(variant)"
          ></el-button>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        :class="variantModel.variantList.length === 1 ? 'mt-3' : ''"
        v-show="variantModel.variantList.length < 3"
      >
        <el-col :span="21">
          <el-button size="small" class="w-100" @click="addVariant">
            {{ $t('variant.button.addKey') }}
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-dropdown @command="singleVariant">
            <label class="el-button el-button--default el-button--small">
              {{ $t('variant.button.single.label') }}<i class="el-icon-arrow-down el-icon--right"></i>
            </label>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="english">{{ $t('variant.button.single.english.label') }}</el-dropdown-item>
              <el-dropdown-item command="chinese">{{ $t('variant.button.single.chinese.label') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-form>
    <!--    <template v-if="tableData.length > 0">-->
    <!--      <div class="mt-4 mb-4 text-normal">-->
    <!--        {{$t('variant.tips')}}-->
    <!--      </div>-->
    <!--      <el-table-->
    <!--        ref="multipleTable"-->
    <!--        :data="tableData"-->
    <!--        style="width: 100%"-->
    <!--        max-height="618"-->
    <!--        @selection-change="variantChange"-->
    <!--        row-key="index"-->
    <!--        class="sku-table"-->
    <!--      >-->
    <!--        <el-table-column-->
    <!--          type="selection"-->
    <!--          width="55"-->
    <!--          :variantChecked="variantChecked"-->
    <!--        ></el-table-column>-->
    <!--        <el-table-column-->
    <!--          v-for="(item, index) in columns"-->
    <!--          :key="index"-->
    <!--          :prop="item.prop"-->
    <!--          :label="item.label"-->
    <!--          :class-name="item.className"-->
    <!--          width="120"-->
    <!--        >-->
    <!--          <template slot-scope="scope">-->
    <!--            {{ scope.row.variantList[index].variantValue }}-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column width="150" :label="$t('goods.sku.update.entity.skuId.label')">-->
    <!--          <template slot="header">-->
    <!--            类型-->
    <!--            <p>fuck</p>-->
    <!--          </template>-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.skuId"-->
    <!--              :placeholder="$t('goods.sku.update.entity.skuId.label')"-->
    <!--            ></el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column width="120" :label="`${$t('goods.sku.update.entity.salePrice.label')}`">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.salePrice"-->
    <!--              :placeholder="$t('goods.sku.update.entity.salePrice.label')"-->
    <!--            >-->
    <!--              <template slot="prepend">￥</template>-->
    <!--            </el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column  width="120" :label="`${$t('goods.sku.update.entity.vipPrice.label')}`">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.vipPrice"-->
    <!--              :placeholder="$t('goods.sku.update.entity.vipPrice.label')"-->
    <!--            >-->
    <!--              <template slot="prepend">￥</template>-->
    <!--            </el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column width="80" :label="`${$t('goods.sku.update.entity.crea.label')}￥`">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.marketPrice"-->
    <!--              :placeholder="$t('goods.sku.update.entity.marketPrice.label')"-->
    <!--            ></el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column width="80" :label="`${$t('goods.sku.update.entity.costPrice.label')}￥`">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.costPrice"-->
    <!--              :placeholder="$t('goods.sku.update.entity.costPrice.label')"-->
    <!--            ></el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column width="85" :label="$t('goods.sku.update.entity.shelfLife.label')">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.shelfLife"-->
    <!--              :placeholder="$t('goods.sku.update.entity.shelfLife.label')"-->
    <!--            ></el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column width="100" :label="$t('goods.sku.update.entity.hsCode.label')">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.hsCode"-->
    <!--              :placeholder="$t('goods.sku.update.entity.hsCode.label')"-->
    <!--            ></el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column width="100" :label="$t('goods.sku.update.entity.width.label')">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.width"-->
    <!--              :placeholder="$t('goods.sku.update.entity.width.label')"-->
    <!--            ></el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column width="100" :label="$t('goods.sku.update.entity.height.label')">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.height"-->
    <!--              :placeholder="$t('goods.sku.update.entity.height.label')"-->
    <!--            ></el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column width="100" :label="$t('goods.sku.update.entity.weight.label')">-->
    <!--          <template slot-scope="scope">-->
    <!--            <el-input-->
    <!--              class="absolutely"-->
    <!--              size="small"-->
    <!--              v-model="scope.row.weight"-->
    <!--              :placeholder="$t('goods.sku.update.entity.weight.label')"-->
    <!--            ></el-input>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--      </el-table>-->
    <!--    </template>-->
  </div>
</template>

<script>
import sku from '@/plugins/variant'

export default {
  name: 'initVariant',
  data () {
    return {
      variantModel: {
        variantList: []
      },
      variantValue: [],
      tableData: [],
      multipleSelection: [],
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
        ],
        price: [
          {
            required: true,
            message: this.$t('variant.entity.value.required'),
            trigger: 'blur'
          },
          {
            pattern: this.utility.expression.FloatPositive,
            message: this.$t('variant.entity.value.required'),
            trigger: 'blur'
          }
        ]
      },
      firstLoad: true,
      defaultValue: []
    }
  },
  props: {
    spuCode: {
      type: String,
      default: ''
    },
    edit: {
      type: Boolean,
      default: false
    },
    imageList: {
      type: Array,
      default: () => {
        return []
      }
    },
    priceType: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  computed: {
    columns () {
      return this.variantModel.variantList.map((item, index) => ({
        prop: item.variantName,
        label: item.variantName,
        className: `variant-name__${index + 1}`
      }))
    }
  },
  watch: {
    variantModel: {
      deep: true,
      immediate: true,
      handler () {
        this.resolution()
        this.variantValue = this.variantModel.variantList.map(item => ({
          visible: false,
          value: ''
        }))
      }
    },
    tableData: {
      deep: true,
      handler (val, oldValue) {
        this.variantChange(val)

        // if (val.length > 0 && oldValue.length > 0) {
        //   sku.update(val)
        // }
        // for (let index of this.tableData.keys()) {
        //   this.$nextTick(() => {
        //     this.$refs.multipleTable.toggleRowSelection(this.tableData[index])
        //   })
        // }
      }
    }
  },
  created () {
    // this.initNature()
    // this.singleVariant('english')
    this.initDefaultValue()
  },
  methods: {
    /**
     * 加载缓存属性
     */
    initNature () {
      const data = sku.nature()
      if (data && data.length > 0) {
        this.variantModel.variantList = data
        this.variantValue = this.variantModel.variantList.map(item => ({
          visible: false,
          value: ''
        }))
        this.firstLoad = false
      }
    },
    /**
     * 初始值
     */
    initDefaultValue () {
      this.defaultValue = this.$t('variant.defaultValue')
      if (this.defaultValue.length > 0) {
        this.variantModel.variantList = [JSON.parse(JSON.stringify(this.defaultValue[0]))]
        this.variantValue = this.variantModel.variantList.map(item => ({
          visible: false,
          value: ''
        }))
      }
    },
    /**
     * 单款无下级SKU
     */
    singleVariant (command) {
      this.variantModel.variantList = [
        {
          'variantName': this.$t(`variant.button.single.${command}.key`),
          'valueList': [
            {
              'variantValue': this.$t(`variant.button.single.${command}.value`)
            }
          ]
        }
      ]
    },
    /**
     * 显示属性值输入框
     */
    displayValueTextbox (index) {
      this.variantValue[index].visible = true
      this.$nextTick(() => {
        this.$refs[`saveValueInput${index}`][0].$refs.input.focus()
      })
    },
    /**
     * 添加属性值事件
     */
    addVariantValue (index) {
      const value = this.variantValue[index].value
      if (value) {
        const exist = this.variantModel.variantList[index].valueList.filter((o) => {
          return o.variantValue === value
        })
        if (exist.length === 0) {
          this.variantModel.variantList[index].valueList.push({
            variantValue: value
          })
          this.variantModel.variantList[index].valueList.sort((x, y) => {
            return x.variantValue.localeCompare(y.variantValue)
          })
        }
      }
      this.variantValue[index].visible = false
      this.variantValue[index].value = ''
    },
    /**
     * 删除属性值
     */
    deleteVariantValue ({ index, subIndex }) {
      this.variantModel.variantList[index].valueList.splice(subIndex, 1)
    },
    /**
     *  添加变体商品
     */
    addVariant () {
      let data = {
        variantName: '',
        valueList: []
      }
      if (this.defaultValue.length >= this.variantModel.variantList.length) {
        data = JSON.parse(JSON.stringify(this.defaultValue[this.variantModel.variantList.length]))
      }
      this.variantModel.variantList.push(data)
    },
    /**
     *  删除变体商品
     */
    removeVariant (item) {
      const index = this.variantModel.variantList.indexOf(item)
      if (index !== -1) {
        this.variantModel.variantList.splice(index, 1)
      }
    },
    /**
     * SKU值发生变化时，推送到引用组件
     * @param val
     */
    variantChange (val) {
      this.multipleSelection = val
      this.$emit('variant-change', {
        skuList: val,
        variantList: this.variantModel.variantList
      })
    },
    /**
     * SKU选中状态
     * @param row
     * @returns {boolean}
     */
    variantChecked (row) {
      let variantChecked = true
      for (let item of row.variantList.values()) {
        if ((!item.variantValue || !item.variantName) && variantChecked) {
          variantChecked = false
        }
      }
      return variantChecked
    },
    /**
     * SKU递归组合
     */
    resolution () {
      const result = sku.resolution(this.variantModel.variantList, this.spuCode)
      this.tableData = result.data.map((item, index) => ({
        ...item,
        // skuId: `${this.spuCode}${index < 10 ? '0' + index.toString() : index}`,
        index: index
      }))
      // this.variantChange(this.tableData)
    }
  }
}
</script>

<style lang="scss">
.product-variant-list {
  .variant-name {
    &__1 {
      color: #29bc94;
    }

    &__2 {
      color: #763eaf;
    }

    &__3 {
      color: #ff9517;
    }
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  .el-input-group__prepend {
    padding: 0 5px;
  }

  .variant-value__tag {
    color: #ffffff;
    margin: 0 8px 12px 0;

    .el-tag__close {
      color: #ffffff;
    }

    &-1 {
      background: #29bc94;
      border-color: #29bc94;
    }

    &-2 {
      background: #763eaf;
      border-color: #763eaf;
    }

    &-3 {
      background: #ff9517;
      border-color: #ff9517;
    }
  }

  .input-new-key {
    width: 120px;
    margin-right: 10px;
  }
}

.el-form-item__content {
  line-height: normal;
}
</style>
