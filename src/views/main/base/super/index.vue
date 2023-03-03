<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <el-form
      :model="entity"
      :rules="formRules"
      ref="update"
    >
      <fox-section>
        <fox-form-item
          prop="logo"
          :show-message="false">
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
        </fox-form-item>
        <el-form-item
          prop="name">
          <fox-input shrink
                     v-model="entity.name"
                     :placeholder="$t('core.agent.entity.name.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="shortForm">
          <fox-input shrink
                     v-model="entity.shortForm"
                     :placeholder="$t('core.agent.entity.shortForm.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="website">
          <fox-input shrink
                     v-model="entity.website"
                     :placeholder="$t('core.agent.entity.website.placeholder')"
          >
            <template slot="prepend">https://</template>
          </fox-input>
        </el-form-item>
        <el-form-item
          prop="domain">
          <fox-input shrink
                     v-model="entity.domain"
                     :placeholder="$t('core.agent.entity.domain.placeholder')"
          >
            <template slot="prepend">https://</template>
          </fox-input>
        </el-form-item>
        <el-form-item
          prop="contact">
          <fox-input shrink
                     v-model="entity.contact"
                     :placeholder="$t('core.agent.entity.contact.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="email">
          <fox-input shrink
                     v-model="entity.email"
                     :placeholder="$t('core.agent.entity.email.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="mobile">
          <fox-input shrink
                     v-model="entity.mobile"
                     :placeholder="$t('core.agent.entity.mobile.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="icp">
          <fox-input shrink
                     v-model="entity.icp"
                     :placeholder="$t('core.agent.entity.icp.placeholder')"
          ></fox-input>
        </el-form-item>
        <el-form-item
          prop="address">
          <fox-input shrink
                     v-model="entity.address"
                     :placeholder="$t('core.agent.entity.address.placeholder')"
          ></fox-input>
        </el-form-item>
      </fox-section>
    </el-form>
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
