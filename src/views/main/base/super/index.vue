<template>
  <main>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <fox-page-header
        :actions="crumbAction"
      ></fox-page-header>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-position="right"
        label-width="150px"
      >
        <fox-section>
          <el-form-item
            prop="logo"
            :label="$t('core.agent.entity.logo.label')">
            <fox-image-single
              v-model="entity.logo"
              :alt-visible="false"
              :size-limit="10"
              :oss-bucket="resource.themeBucket"
              :server-address="utility.uploadURL()"
              file-folder="section"
              :width="180"
            ></fox-image-single>
            <div class="text-secondary">
              最佳尺寸：高度 <b>100PX</b> 以内，宽度随意。<b>PNG</b> <b>SVG</b> 文件格式
            </div>
          </el-form-item>
          <el-form-item
            prop="name"
            :label="$t('core.agent.entity.name.label')">
            <el-input
              v-model="entity.name"
              :placeholder="$t('core.agent.entity.name.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="shortForm"
            :label="$t('core.agent.entity.shortForm.label')">
            <el-input
              v-model="entity.shortForm"
              :placeholder="$t('core.agent.entity.shortForm.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="website"
            :label="$t('core.agent.entity.website.label')">
            <el-input
              v-model="entity.website"
              :placeholder="$t('core.agent.entity.website.placeholder')"
            >
              <template slot="prepend">https://</template>
            </el-input>
          </el-form-item>
          <el-form-item
            prop="domain"
            :label="$t('core.agent.entity.domain.label')">
            <el-input
              v-model="entity.domain"
              :placeholder="$t('core.agent.entity.domain.placeholder')"
            >
              <template slot="prepend">https://</template>
            </el-input>
          </el-form-item>
          <el-form-item
            prop="contact"
            :label="$t('core.agent.entity.contact.label')">
            <el-input
              v-model="entity.contact"
              :placeholder="$t('core.agent.entity.contact.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="email"
            :label="$t('core.agent.entity.email.label')">
            <el-input
              v-model="entity.email"
              :placeholder="$t('core.agent.entity.email.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="mobile"
            :label="$t('core.agent.entity.mobile.label')">
            <el-input
              v-model="entity.mobile"
              :placeholder="$t('core.agent.entity.mobile.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="icp"
            :label="$t('core.agent.entity.icp.label')">
            <el-input
              v-model="entity.icp"
              :placeholder="$t('core.agent.entity.icp.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="address"
            :label="$t('core.agent.entity.address.label')">
            <el-input
              v-model="entity.address"
              :placeholder="$t('core.agent.entity.address.placeholder')"
            ></el-input>
          </el-form-item>
        </fox-section>
      </el-form>
      <fox-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        @confirmed="formValidation"
      >
      </fox-unsaved>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import {
  fetchAgentDetail,
  fetchBaseAgentUpdate
} from '@/plugins/api/core'

export default {
  name: 'BaseAgentUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        address: '',
        name: '',
        contact: '',
        domain: '',
        email: '',
        icp: '',
        id: '',
        logo: '',
        mobile: '',
        shortForm: '',
        website: ''
      },
      formRules: {
        address: [
          {
            required: true,
            message: this.$t('core.agent.entity.address.required'),
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: this.$t('core.agent.entity.name.required'),
            trigger: 'blur'
          }
        ],
        contact: [
          {
            required: true,
            message: this.$t('core.agent.entity.contact.required'),
            trigger: 'blur'
          }
        ],
        domain: [
          {
            required: true,
            message: this.$t('core.agent.entity.domain.required'),
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('core.agent.entity.email.required'),
            trigger: 'blur'
          }
        ],
        logo: [
          {
            required: true,
            message: this.$t('core.agent.entity.logo.required'),
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: this.$t('core.agent.entity.mobile.required'),
            trigger: 'blur'
          }
        ],
        shortForm: [
          {
            required: true,
            message: this.$t('core.agent.entity.shortForm.required'),
            trigger: 'blur'
          }
        ],
        website: [
          {
            required: true,
            message: this.$t('core.agent.entity.website.required'),
            trigger: 'blur'
          }
        ]
      }
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
  computed: {
    /**
     * 面包屑操作
     */
    crumbAction () {
      return []
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    /**
     * 上一步
     */
    previous () {
      this.$router.push('/base/agent')
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.loading = true
          if (this.id) {
            this.updateAgent()
          } else {
            this.addAgent()
          }
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 获取详情
     */
    getDetail () {
      fetchAgentDetail({
        id: this.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
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
    addAgent () {
      fetchBaseAgentUpdate(this.entity)
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
     * 更新数据
     */
    updateAgent () {
      fetchBaseAgentUpdate(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              // this.previous()
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
