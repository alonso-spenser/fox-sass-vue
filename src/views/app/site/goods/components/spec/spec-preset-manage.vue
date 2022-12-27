<template>
  <el-dialog
    :title="$t('specPresetManage.heading')"
    :visible.sync="display"
    :show-close="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="600px">
    {{ $t('specPresetManage.subheading') }}
    <el-form class="mt-3" :model="model" :rules="formRules" ref="update" label-width="100px" label-position="top">
      <el-table
        :data="model.dataset"
        max-height="500"
        class="spec-preset"
        style="width: 100%">
        <el-table-column
          prop="title"
          :label="$t('specPresetManage.tableHeader.title')">
          <template slot-scope="scope">
            <el-form-item
              :prop="`dataset.${scope.$index}.title`"
              :rules="formRules.title"
            >
              <el-input
                :maxlength="32"
                show-word-limit
                size="small"
                :placeholder="$t('specPresetManage.title.placeholder')"
                v-model="scope.row.title"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('specPresetManage.tableHeader.isDefault')"
          width="50">
          <template slot-scope="scope">
            <el-form-item
              :prop="`dataset.${scope.$index}.title`"
              :rules="formRules.title"
            >
              <el-radio @change="radioChange(scope.row.id)" v-model="model.id" :label="scope.row.id"></el-radio>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column width="60">
          <template slot-scope="scope">
            <el-button
              class="no-border"
              icon="el-icon-delete"
              circle
              size="small"
              @click="removeSpec(scope.$index, scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogClose">
        {{ $t("base.operate.cancel") }}
      </el-button>
      <el-button size="small" :loading="loading" type="primary" @click="formValidation">
        {{ $t("base.operate.save") }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { articleSpecList, articleSpecBatchUpdate, articleSpecDelete } from '@/plugins/api/article'

/**
 * 规格参数预设管理
 */
export default {
  name: 'spec-preset-manage',
  extends: extend,
  data () {
    return {
      model: {
        id: '',
        dataset: []
      },
      settings: '',
      presetData: [],
      formRules: {
        title: [
          {
            required: true,
            message: this.$t('specPresetManage.title.required'),
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
     * 参数类型
     */
    specType: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  watch: {
    /**
     * 监控窗口显示状态
     */
    display (val) {
      if (val) {
        this.getData()
      }
    }
  },
  methods: {
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('close')
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          articleSpecBatchUpdate({
            items: this.model.dataset,
            siteId: this.siteId,
            region: this.regionCode
          })
            .then(result => {
              result.options = {
                formName: formName,
                action: this.actionType.update
              }
              this.resultMessage(result, (success) => {
                if (success) {
                  this.$emit('close')
                }
              })
              this.loading = false
            })
            .catch(error => {
              this.networkMistake(error)
            })
        }
      })
    },
    /**
     * 默认规格
     */
    radioChange (value) {
      this.model.dataset.forEach((o) => {
        o.isDefault = o.id === value ? 0 : 1
      })
    },
    /**
     * 移出规格参数
     */
    removeSpec (index, id) {
      articleSpecDelete({
        ids: [id],
        siteId: this.siteId
      })
        .then(result => {
          result.options = {
            action: this.actionType.delete
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.model.dataset.splice(index, 1)
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 获取数据
     */
    getData () {
      this.presetData = []
      this.settings = ''
      articleSpecList({
        siteId: this.siteId,
        region: this.regionCode
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.model.dataset = result.data
              result.data.forEach((o) => {
                if (o.isDefault === 0) {
                  this.model.id = o.id
                }
              })
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>

<style lang="scss">
  .spec-preset {
    .el-radio__label {
      display: none!important;
    }
  }
</style>
