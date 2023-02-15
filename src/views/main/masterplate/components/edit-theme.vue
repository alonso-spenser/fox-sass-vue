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
      <el-form-item prop="name" :label="$t('theme.update.entity.name.label')">
        <el-input
          v-model="entity.name"
          :placeholder="$t('theme.update.entity.name.placeholder')"
        ></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="screenshot" :label="$t('theme.update.entity.screenshot.label')">
            <fox-image-single
              v-model="entity.screenshot"
              :alt-visible="false"
              :size-limit="10"
              :oss-bucket="resource.ossBucket"
              :server-address="utility.uploadURL()"
              file-folder="theme"
            ></fox-image-single>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="longImage" :label="$t('theme.update.entity.longImage.label')">
            <fox-image-single
              v-model="entity.longImage"
              :alt-visible="false"
              :size-limit="10"
              :oss-bucket="resource.ossBucket"
              :server-address="utility.uploadURL()"
              file-folder="theme"
            ></fox-image-single>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="mobileImage" :label="$t('theme.update.entity.mobileImage.label')">
            <fox-image-single
              v-model="entity.mobileImage"
              :alt-visible="false"
              :size-limit="10"
              :oss-bucket="resource.ossBucket"
              :server-address="utility.uploadURL()"
              file-folder="theme"
            ></fox-image-single>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="tagList" :label="$t('theme.update.entity.tagList.label')">
        <el-select
          class="w-100"
          v-model="entity.tagList"
          multiple
          filterable
          :placeholder="$t('theme.update.entity.tagList.placeholder')"
        >
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.tagName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item prop="author" :label="$t('theme.update.entity.author.label')">
            <el-input
              v-model="entity.author"
              :placeholder="$t('theme.update.entity.author.placeholder')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="siteType" :label="$t('theme.update.entity.siteType.label')">
            <el-select
              class="w-100"
              v-model="entity.siteType"
              :placeholder="$t('theme.update.entity.siteType.placeholder')"
            >
              <el-option
                v-for="item in siteType"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="version" :label="$t('theme.update.entity.version.label')">
            <el-input
              v-model="entity.version"
              :placeholder="$t('theme.update.entity.version.placeholder')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item prop="sortIndex" :label="$t('theme.update.entity.sortIndex.label')">
            <el-input
              v-model="entity.sortIndex"
              :placeholder="$t('theme.update.entity.sortIndex.placeholder')"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="14">
          <el-form-item prop="siteId" :label="$t('theme.update.entity.siteId.label')">
            <el-input
              v-model="entity.siteId"
              :placeholder="$t('theme.update.entity.siteId.placeholder')"
            >
              <template slot="prepend">
                <el-select
                  style="width: 105px"
                  size="small"
                  v-model="entity.sourceType"
                >
                  <el-option
                    v-for="item in $t('theme.update.entity.sourceType.option')"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="demoUrl" :label="$t('theme.update.entity.demoUrl.label')">
            <el-input
              v-model="entity.demoUrl"
              :placeholder="$t('theme.update.entity.demoUrl.placeholder')"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="synopsis" :label="$t('theme.update.entity.synopsis.label')">
        <el-input
          v-model="entity.synopsis"
          type="textarea"
          :placeholder="$t('theme.update.entity.synopsis.placeholder')"
        ></el-input>
      </el-form-item>

      <el-form-item prop="description" :label="$t('theme.update.entity.description.label')">
        <el-input
          v-model="entity.description"
          type="textarea"
          :placeholder="$t('theme.update.entity.description.placeholder')"
        ></el-input>
      </el-form-item>

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
        author: 'fomille',
        authorId: '',
        demoUrl: '',
        description: '',
        longImage: '',
        mobileImage: '',
        name: '',
        screenshot: 'https://theme.fomillesite.com/img/placeholder.jpg',
        siteId: '0000',
        siteType: 3,
        sortIndex: 0,
        state: 0,
        synopsis: '',
        sourceType: 1,
        version: '0.0.1',
        tagList: []
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
