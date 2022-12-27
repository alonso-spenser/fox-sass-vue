<template>
  <el-dialog
    :title="title"
    width="640px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="dialogClose"
    v-loading="loading"
  >
    <el-form
      :model="entity"
      :rules="formRules"
      ref="updateForm"
      label-width="100px"
      label-position="top"
    >
      <el-upload
        v-model="entity.file"
        ref="upload"
        class="upload-demo"
        accept=".xls,.xlsx"
        :action="serviceAddress"
        :on-change="handleChange"
        :data="parseData"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :auto-upload="false"
        :before-remove="beforeRemove"
        :on-error="handleError"
        :headers="headers"
        multiple
        drag
        :on-success="handleAvatarSuccess"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :before-upload="uploadBefore"
      >
        <div class="el-upload__text">
          将文件拖到此处<br>
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          只能上传 XLSX、XLS，
        </div>
      </el-upload>
    </el-form>
    <div slot="footer" class="dialog-footer clearfix">
      <el-button @click="dialogClose">
        {{ $t('base.operate.cancel') }}
      </el-button>
      <el-button type="primary" :loading="loading" @click="formValidation">
        {{ $t('base.operate.save') }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/theme'

export default {
  name: 'themeUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        file: ''
      },
      formRules: {
        name: [
          {
            required: true,
            message: this.$t('theme.update.entity.name.required'),
            trigger: 'blur'
          }
        ],
        screenshot: [
          {
            required: true,
            message: this.$t('theme.update.entity.screenshot.required'),
            trigger: 'blur'
          }
        ],
        siteId: [
          {
            required: true,
            message: this.$t('theme.update.entity.siteId.required'),
            trigger: 'blur'
          }
        ],
        siteType: [
          {
            required: true,
            message: this.$t('theme.update.entity.siteType.required'),
            trigger: 'blur'
          }
        ]
      },
      tagList: [],
      siteType: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    themeId: {
      type: String,
      default: ''
    }
  },
  computed: {
    title () {
      return this.themeId ? '编辑模板' : '新建模板'
    }
  },
  watch: {
    visible (val) {
      if (val) {
        if (this.themeId) {
          this.getDetail()
        }
      } else {
        this.entity = {
          tagList: []
        }
        this.$nextTick(() => {
          this.$refs['updateForm'].clearValidate()
        })
      }
    }
  },
  created () {
    this.getTag()
    this.siteType = this.resource.siteType
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'updateForm'
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.loading = true
          this.updateTheme()
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      http.themeDetail({
        id: this.themeId
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = {
                ...result.data,
                tagList: result.data.tagList.map(({ id }) => id)
              }
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 更新数据
     */
    updateTheme () {
      http.themeUpdate(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.dialogClose()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 关闭窗体
     * @param done
     */
    dialogClose (done) {
      this.$emit('close')
      this.$emit('update:visible', false)
    },
    /**
     * 分页
     */
    getTag () {
      http.themeTagPaging()
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.tagList = result.data
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
