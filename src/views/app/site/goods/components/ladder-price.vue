<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="dialogClose"
    top="30px"
    width="700px">
    <div slot="title">
      <p class="mt-0">
        <b>{{$t('ladderPrice.heading')}}</b>
      </p>
    </div>
    <el-form :model="entity" v-if="true" ref="update">
      <el-row
        v-for="(item, index) in entity.dataset"
        :key="`value-${index}`"
        :gutter="20"
        class="mb-5"
      >
        <el-col
          :span="3"
        >
          <label class="line-40">
            {{ $t('ladderPrice.step') }} {{index + 1}}
          </label>
        </el-col>
        <el-col
          :span="1"
        >
          <label class="line-40">
            ≥
          </label>
        </el-col>
        <el-col
          :span="8"
        >
          <el-input-number
            v-model="item.minCount"
            controls-position="right"
            :precision="0"
            :min="index > 0 ? (entity.dataset[index - 1].minCount + 1) : 1"
            :max="999999"
            @change="valueChange"
          >
          </el-input-number>
          &nbsp;
          {{ $t('ladderPrice.piece') }}
        </el-col>
        <el-col
          :offset="1"
          :span="8"
        >
          <el-form-item
            :key="`dataset-${index}`"
            :prop="'dataset.' + index + '.price'"
            :rules="formRules.price"
          >
            <el-input-number
              class="w-100"
              controls-position="right"
              :min="0.00"
              :max="999999.99"
              :precision="2"
              :controls="false"
              v-model="item.price"
              :placeholder="$t('ladderPrice.entity.price.placeholder')"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col
          :span="3"
        >
          <el-button
            type="text"
            v-if="entity.dataset.length > 1"
            @click="removeRow(index)"
          >
            <i class="el-icon-close"></i>
          </el-button>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        class="mb-4"
        v-if="entity.dataset.length < 5"
      >
        <el-col
          :offset="4"
          :span="17"
        >
          <el-button
            class="absolutely"
            @click="addRow"
          >
            <i class="el-icon-plus"></i>
            {{ $t('ladderPrice.add') }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogClose">
        {{ $t("base.operate.cancel") }}
      </el-button>
      <el-button size="small" type="primary" @click="asyncClose">
        {{ $t("base.operate.save") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ladder-price',
  data () {
    return {
      entity: {
        dataset: []
      },
      formRules: {
        price: [
          {
            required: true,
            message: this.$t('ladderPrice.entity.price.required')
          },
          {
            pattern: this.utility.expression.FloatZeroPositive,
            message: this.$t('ladderPrice.entity.price.custom')
          }
        ]
      }
    }
  },
  props: {
    rows: {
      type: Array,
      default: () => {
        return []
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    rows: {
      deep: true,
      handler () {
        this.getData()
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
  created () {
    this.getData()
  },
  methods: {
    /**
     * 删除一行
     */
    removeRow (index) {
      this.entity.dataset.splice(index, 1)
    },
    /**
     * 添加一行
     */
    addRow () {
      if (this.entity.dataset.length < 5) {
        this.entity.dataset.push({
          minCount: 0,
          price: 0
        })
      }
    },
    /**
     * 关闭窗体并回传值
     */
    dialogClose () {
      this.getData()
      this.$emit('close')
    },
    /**
     * 有数据传数
     */
    asyncClose () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('close', this.entity.dataset)
          this.resetForm(formName)
        }
      })
    },
    /**
     * 表单验证重置
     */
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    /**
     * 值改变
     * @param val
     */
    valueChange () {
      let val = 1
      this.entity.dataset.forEach((o, index) => {
        if (index > 0 && o.minCount <= val) {
          o.minCount = val + 1
        }
        val = o.minCount
      })
    },
    /**
     * 设置数据
     */
    getData () {
      if (this.rows && this.rows.length > 0) {
        this.entity.dataset = JSON.parse(JSON.stringify(this.rows))
        if (this.entity.dataset.length === 0) {
          // this.addRow()
        }
      } else {
        this.addRow()
      }
    }
  }
}
</script>
