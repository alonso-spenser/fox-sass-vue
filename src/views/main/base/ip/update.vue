<template>
  <main>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <fo-page-header
        :actions="crumbAction"
      ></fo-page-header>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top"
      >
        <fo-page-section>
          <el-row
            :gutter="20"
            class="el-form-item">
            <el-col :span="12">
              <el-form-item
                prop="ipAddress"
                :label="$t('backstage.ip.update.entity.ipAddress.label')">
                <el-input
                  v-model="entity.ipAddress"
                  :placeholder="$t('backstage.ip.update.entity.ipAddress.placeholder')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="ipLocation"
                :label="$t('backstage.ip.update.entity.ipLocation.label')">
                <el-input
                  v-model="entity.ipLocation"
                  :placeholder="$t('backstage.ip.update.entity.ipLocation.placeholder')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            class="el-form-item">
            <el-col :span="12">
              <el-form-item
                prop="deadline"
                :label="$t('backstage.ip.update.entity.deadline.label')">
                <el-date-picker
                  class="w-100"
                  v-model="entity.deadline"
                  value-format="timestamp"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="ossCatalog"
                :label="$t('backstage.ip.update.entity.ossCatalog.label')">
                <el-input
                  v-model="entity.ossCatalog"
                  :placeholder="$t('backstage.ip.update.entity.ossCatalog.placeholder')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            class="el-form-item">
            <el-col :span="12">
              <el-form-item
                prop="merchantId"
                :label="$t('backstage.ip.update.entity.merchantId.label')">
                <el-input
                  v-model="entity.merchantId"
                  :placeholder="$t('backstage.ip.update.entity.merchantId.placeholder')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                prop="merchantName"
                :label="$t('backstage.ip.update.entity.merchantName.label')">
                <el-input
                  v-model="entity.merchantName"
                  :placeholder="$t('backstage.ip.update.entity.merchantName.placeholder')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            class="el-form-item">
            <el-col :span="8">
              <el-form-item
                prop="idc"
                :label="$t('backstage.ip.update.entity.idc.label')">
                <el-input
                  v-model="entity.idc"
                  :placeholder="$t('backstage.ip.update.entity.idc.placeholder')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="icp"
                :label="$t('backstage.ip.update.entity.icp.label')">
                <el-switch
                  v-model="entity.icp"
                  :active-value="0"
                  :inactive-value="1"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="status"
                :label="$t('backstage.ip.update.entity.status.label')">
                <el-switch
                  v-model="entity.status"
                  :active-value="0"
                  :inactive-value="1"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </fo-page-section>
      </el-form>
      <fo-fixed-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        @confirmed="formValidation"
      >
      </fo-fixed-unsaved>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import {
  fetchIpDetail,
  fetchIpUpdate,
  fetchIpDelete
} from '@/plugins/api/main/base'

export default {
  name: 'BaseIpRepositoryUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        deadline: 0,
        icp: 0,
        idc: '',
        ipAddress: '',
        ipLocation: '',
        merchantId: '',
        merchantName: '',
        ossCatalog: '',
        status: 0
      },
      formRules: {
        deadline: [
          {
            required: true,
            message: this.$t('backstage.ip.update.entity.deadline.required'),
            trigger: 'blur'
          }
        ],
        icp: [
          {
            required: true,
            message: this.$t('backstage.ip.update.entity.icp.required'),
            trigger: 'blur'
          }
        ],
        ipAddress: [
          {
            required: true,
            message: this.$t('backstage.ip.update.entity.ipAddress.required'),
            trigger: 'blur'
          }
        ],
        ipLocation: [
          {
            required: true,
            message: this.$t('backstage.ip.update.entity.ipLocation.required'),
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
      return [
        {
          label: this.$t('base.delete.button'),
          icon: 'el-icon-delete',
          visible: this.id,
          click: () => {
            this.deleteRepository()
          }
        }
      ]
    }
  },
  created () {
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
      this.$router.push('/main/base/ip')
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
            this.updateRepository()
          } else {
            this.addRepository()
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
      fetchIpDetail({
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
    addRepository () {
      fetchIpUpdate(this.entity)
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
    updateRepository () {
      fetchIpUpdate(this.entity)
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
    },
    /**
     * 删除
     */
    deleteRepository () {
      this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            fetchIpDelete({
              ids: [this.id]
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  url: '/main/base/ip'
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
