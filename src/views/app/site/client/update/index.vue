<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <fox-section :heading="$t('client.update.heading')">
      <el-form
        :model="entity"
        ref="update"
      >
        <el-row type="flex">
          <div class="mr-6 ml-6">
            <el-avatar
              :size="40"
              style="background: #73B6FD"
              v-if="avatar">{{ avatar }}
            </el-avatar>
            <el-avatar
              :size="40"
              icon="el-icon-user-solid"
              style="background: #FFCC01"
              v-else
            ></el-avatar>
          </div>
          <div style="flex: auto;">
            <el-row
              :gutter="20"
              class="mb-3">
              <el-col :span="10">
                <el-form-item
                  prop="firstName"
                >
                  <fox-input
                    shrink
                    :maxlength="32"
                    v-model.trim="entity.firstName"
                    :placeholder="$t('client.update.entity.firstName.label')"
                    :description="$t('client.update.entity.firstName.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  prop="email"
                >
                  <fox-input
                    shrink
                    v-model="entity.email"
                    :placeholder="$t('client.update.entity.email.label')"
                    :description="$t('client.update.entity.email.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              class="mb-3">
              <el-col :span="10">
                <el-form-item
                  prop="lastName"
                >
                  <fox-input
                    shrink
                    :maxlength="32"
                    v-model.trim="entity.lastName"
                    :placeholder="$t('client.update.entity.lastName.label')"
                    :description="$t('client.update.entity.lastName.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  prop="mobile"
                >
                  <fox-input
                    shrink
                    v-model="entity.phone"
                    :placeholder="$t('client.update.entity.mobile.label')"
                    :description="$t('client.update.entity.mobile.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              class="mb-3">
              <el-col :span="20">
                <el-form-item
                  prop="remark"
                >
                  <fox-input
                    shrink
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    :maxlength="255"
                    v-model.trim="entity.remark"
                    :placeholder="$t('client.update.entity.remark.label')"
                    :description="$t('client.update.entity.remark.placeholder')"
                  ></fox-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-form>
    </fox-section>
    <fox-paging-table
      class="enquiry-table"
      :columns="dataConfig.columns"
      :actions="dataConfig.actions"
      :dataset="pagingOptions.dataset"
      :loading="tableOptions.loading"
      :first-loading="pagingOptions.firstLoading"
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
      @paging="getData"
      :multi-select="false"
    ></fox-paging-table>
    <!--保存按钮-->
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
import { fetchCustomerDetail, fetchUpdateCustomer } from '@/plugins/api/customer'

export default {
  name: 'siteCustomizeUpdate',
  extends: extend,
  data () {
    return {
      entity: {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        remark: '',
        clientEnquiryRecordList: []
      },
      formRules: {
        firstName: [
          {
            required: true,
            message: this.$t('client.update.entity.firstName.required'),
            trigger: 'blur'
          }
        ],
        lastName: [
          {
            required: true,
            message: this.$t('client.customer.update.entity.lastName.required'),
            trigger: 'blur'
          }
        ],
        remark: [
          {
            required: true,
            message: this.$t('client.customer.update.entity.remark.required'),
            trigger: 'blur'
          }
        ]
      },
      dataConfig: {
        actions: {
          update: {
            label: this.$t('base.actionUpdate'),
            invisible: true,
            onClick: row => {
              this.updateEnquiry(row)
            }
          }
        },
        columns: [
          {
            width: 50,
            label: '',
            render: row => {
              return (
                <i
                  class={`${this.utility.getDicType(
                    this.deviceList,
                    row.formDevice,
                    'icon'
                  )}`}
                />
              )
            }
          },
          {
            prop: 'clientName',
            label: this.$t('client.update.tableHeader.customer')
          },
          {
            prop: 'createTime',
            dataType: 'dateFull',
            width: 220,
            label: this.$t('client.update.tableHeader.createTime')
          },
          {
            prop: 'formName',
            label: this.$t('client.update.tableHeader.form')
          },
          {
            prop: 'state',
            label: this.$t('client.update.tableHeader.state'),
            align: 'center',
            render: row => {
              return (
                <el-tag
                  size="medium"
                  type={this.utility.getDicType(
                    this.$t('enquiry.record.recordState'),
                    row.state,
                    'type'
                  )}
                >
                  {this.utility.getDicType(this.$t('enquiry.record.recordState'), row.state)}
                </el-tag>
              )
            }
          }
        ],
        rowsClassName: row => `state__${row.state}`
      }
    }
  },
  computed: {
    avatar () {
      const { firstName, lastName } = this.entity
      return firstName ? firstName.charAt() : lastName ? lastName.charAt() : ''
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
    this.deviceList = this.$t('enquiry.deviceTypeList')
    this.getData()
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id) {
            this.updateMember()
          }
        }
      })
    },
    /**
     *  询盘数据
     */
    getData () {
      fetchCustomerDetail({
        id: this.id,
        siteId: this.siteId
      })
        .then(result => {
          this.pageValid()
          this.tableOptions.loading = false
          this.resultMessage(result, success => {
            if (success) {
              this.entity = result.data
              this.pagingOptions.dataset = result.data['inquiryList']
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.tableOptions.loading = false
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 更新数据
     */
    updateMember () {
      fetchUpdateCustomer(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result)
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 跳转询盘详情
     */
    updateEnquiry (row) {
      this.utility.openSite(`/site/${this.siteId}/enquiry/record/${row.id}`)
    }
  }
}
</script>
