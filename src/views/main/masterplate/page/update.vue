<template>
  <fox-layout-main
      :loading="pageLoading"
      :offset="200"
      google-style
  >
    <fox-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top"
    >
      <fox-section>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item
                prop="title">
              <fox-input
                  shrink
                  v-model="entity.title"
                  :placeholder="$t('theme.page.update.entity.title.label')"
                  :description="$t('theme.page.update.entity.title.placeholder')"
              ></fox-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <fox-select
                  class="w-100"
                  shrink
                  v-model="entity.pageType"
                  @change="pageTypeChange"
                  :placeholder="$t('theme.page.update.entity.pageType.label')"
                  :description="$t('theme.page.update.entity.pageType.placeholder')"
              >
                <el-option
                    v-for="item in pageType"
                    :key="item.pageType"
                    :label="item.title"
                    :value="item.pageType"
                ></el-option>
              </fox-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <fox-select
                  class="w-100"
                  shrink
                  v-model="mySiteType"
                  multiple
                  @change="siteTypeChange"
                  :placeholder="$t('theme.page.update.entity.siteType.label')"
                  :description="$t('theme.page.update.entity.siteType.placeholder')"
              >
                <el-option
                    v-for="item in siteType"
                    :key="`st${item.id}`"
                    :label="item.label"
                    :value="item.id"
                ></el-option>
              </fox-select>
            </el-form-item>
          </el-col>
        </el-row>
      </fox-section>
      <fox-section>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item
                prop="bindSection"
                :label="$t('theme.page.update.entity.bindSection.label')">
              <el-switch
                  v-model="entity.bindSection"
                  :inactive-value="1"
                  :active-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
                prop="hasFloatMenu"
                :label="$t('theme.page.update.entity.hasFloatMenu.label')">
              <el-switch
                  v-model="entity.hasFloatMenu"
                  :inactive-value="1"
                  :active-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
                prop="hasFooter"
                :label="$t('theme.page.update.entity.hasFooter.label')">
              <el-switch
                  v-model="entity.hasFooter"
                  :inactive-value="1"
                  :active-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
                prop="hasHeader"
                :label="$t('theme.page.update.entity.hasHeader.label')">
              <el-switch
                  v-model="entity.hasHeader"
                  :inactive-value="1"
                  :active-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
                prop="menuVisible"
                :label="$t('theme.page.update.entity.menuVisible.label')">
              <el-switch
                  v-model="entity.menuVisible"
                  :inactive-value="1"
                  :active-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
                prop="addSection"
                :label="$t('theme.page.update.entity.addSection.label')">
              <el-switch
                  v-model="entity.addSection"
                  :inactive-value="1"
                  :active-value="0"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </fox-section>
    </fox-form>
    <fox-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        @confirmed="formValidation"
    >
    </fox-unsaved>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/theme'

export default {
  name: 'themePageUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        addSection: 0,
        bindSection: 0,
        hasFloatMenu: 0,
        hasFooter: 0,
        hasHeader: 0,
        menuVisible: 0,
        pageType: '',
        siteType: '3',
        title: ''
      },
      formRules: {
        pageType: [
          {
            required: true,
            message: this.$t('theme.page.update.entity.pageType.required'),
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: this.$t('theme.page.update.entity.title.required'),
            trigger: 'blur'
          }
        ]
      },
      siteType: [],
      pageType: [],
      mySiteType: []
    }
  },
  watch: {
    entity: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  },
  created () {
    this.siteType = this.$t('enumerate.siteType')
    this.pageType = this.$t('pageType')
    if (this.id) {
      this.getDetail()
    } else {
      this.pageValid()
    }
  },
  methods: {
    /**
     * 上一步
     */
    previous () {
      this.$router.push('/main/masterplate/page')
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.formValidate(formName, (valid, fields) => {
        if (valid) {
          this.loading = true
          if (this.id) {
            this.updatePage()
          } else {
            this.addPage()
          }
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      http.themePageDetail({
        id: this.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
              let s = []
              this.entity.siteType.split(',').forEach((value) => {
                s.push(parseInt(value))
              })
              this.getSiteType(s)
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
     * 添加数据
     */
    addPage () {
      http.themePageUpdate(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.previous()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 页面类型更改
     */
    pageTypeChange (value) {
      let s = this.pageType.filter((o) => {
        return o.pageType === value
      })
      if (s.length > 0) {
        this.entity.addSection = s[0].addSection
        this.entity.bindSection = s[0].bindSection
        this.entity.hasFloatMenu = s[0].hasFloatMenu
        this.entity.hasFooter = s[0].hasFooter
        this.entity.hasHeader = s[0].hasHeader
        this.entity.menuVisible = s[0].menuVisible
        this.entity.title = s[0].title
        this.entity.pageType = s[0].pageType
        this.getSiteType([s[0].siteType])
      }
    },
    siteTypeChange () {
      this.entity.siteType = this.mySiteType.join(',')
    },
    getSiteType (siteType) {
      this.mySiteType = siteType
    },
    /**
     * 更新数据
     */
    updatePage () {
      delete this.entity.siteTypeList
      http.themePageUpdate(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.previous()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 删除
     */
    deletePage () {
      this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            http.themePageDelete({
              ids: [this.id]
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: '/main/masterplate/page'
                }
                this.resultMessage(result, () => {
                  done()
                  instance.confirmButtonLoading = false
                })
              })
              .catch(error => {
                this.networkMistake(error)
                done()
                instance.confirmButtonLoading = false
              })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    }
  }
}
</script>
