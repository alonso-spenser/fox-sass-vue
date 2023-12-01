<template>
  <fox-layout-main
      :loading="pageLoading"
      :offset="200"
      :percentage="100"
      google-style
  >
    <div class="neighbor fox-google-style percent-100" slot="header">
      <div class="fox-page-content">
        <div class="filter-params">
          <div class="filter-params-element">
            <fox-input
                shrink
                :placeholder="$t('base.placeholder.label')"
                :description="$t('base.placeholder.search')"
                v-model="searchConditions.keyword"
                clearable
                @change="searchConditionChange"
                @clear="clearSearchCondition"
            >
              <el-button
                  slot="append"
                  icon="el-icon-search"
                  :loading="loading"
                  @click="getData(false)"
              ></el-button>
            </fox-input>
          </div>
          <div class="filter-params-element">
            <!--            <el-button-->
            <!--              icon="el-icon-plus"-->
            <!--              type="primary"-->
            <!--              plain-->
            <!--              class="el-material-button"-->
            <!--              @click="addMerchant"-->
            <!--            >-->
            <!--            </el-button>-->
          </div>
          <div class="filter-params-element">
          </div>
        </div>
      </div>
    </div>
    <fox-paging-table
        :columns="dataConfig.columns"
        :actions="dataConfig.actions"
        :dataset="pagingOptions.dataset"
        :loading="tableOptions.loading"
        :first-loading="pagingOptions.firstLoading"
        :empty="dataConfig.empty"
        :page-index.sync="pagingOptions.pageIndex"
        :page-size.sync="pagingOptions.pageSize"
        :record-count="pagingOptions.recordCount"
        :rows-class-name="dataConfig.rowsClassName"
        @paging="getData"
    >
    </fox-paging-table>

    <el-dialog
        title="更改管理员密码"
        :visible.sync="updateData.visible"
        width="400px"
    >
      <fox-form
          :model="updateModel"
          :rules="formRules"
          ref="ruleForm">
        <h4 class="text-info">{{ updateData.data.name }}</h4>
        <fox-form-item style="margin-top:10px" prop="password">
          <fox-input
              shrink
              maxlength="30"
              v-model="updateModel.password"
              :placeholder="$t('passport.register.entity.password.label')"
              :description="$t('passport.register.entity.password.placeholder')"
              auto-complete="off">
          </fox-input>
        </fox-form-item>
        <fox-form-item prop="confirmPassword">
          <fox-input
              shrink
              maxlength="30"
              type="password"
              v-model="updateModel.confirmPassword"
              :placeholder="$t('passport.register.entity.confirmPassword.label')"
              :description="$t('passport.register.entity.confirmPassword.placeholder')"
              auto-complete="off">
          </fox-input>
        </fox-form-item>
      </fox-form>
      <div
          slot="footer"
          class="dialog-footer">
        <el-button
            size="small"
            @click="updateData.visible = false">{{ $t("base.cancel") }}
        </el-button>
        <el-button
            size="small"
            type="primary"
            @click="changePassport">{{ $t("base.save") }}
        </el-button>
      </div>
    </el-dialog>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import {
  fetchOpsMerchantPaging,
  fetchOpsAdminPassword
} from '@/plugins/api/merchant'
import { fetchAuthorizedLogin } from '@/plugins/api/main/site'

export default {
  name: 'Merchant',
  extends: extend,
  data () {
    let rePassword = (rule, value, callback) => {
      if (this.utility.isNotEmpty(value) && value === this.updateModel.password) {
        callback()
      } else {
        callback(new Error(this.$t('passport.register.entity.confirmPassword.custom')))
      }
    }
    return {
      dataConfig: {
        actions: {
          rowClick: (row, column) => {
            this.columnEvents(row, column)
          }
        },
        columns: [
          {
            prop: 'name',
            label: this.$t('merchant.paging.tableHeader.name')
          },
          {
            prop: 'shortForm',
            label: this.$t('merchant.paging.tableHeader.shortForm')
          },
          {
            prop: 'contact',
            label: this.$t('merchant.paging.tableHeader.contact')
          },
          {
            prop: 'createTime',
            label: this.$t('merchant.paging.tableHeader.createTime')
          },
          {
            prop: 'email',
            label: this.$t('merchant.paging.tableHeader.email')
          },
          {
            prop: 'mobile',
            label: this.$t('merchant.paging.tableHeader.mobile')
          },
          {
            prop: 'webQuantity',
            label: this.$t('merchant.paging.tableHeader.webQuantity')
          },
          {
            button: true,
            label: '',
            width: 200,
            align: 'right',
            group: [
              {
                icon: 'el-icon-unlock',
                circle: true,
                name: null,
                disabled: false,
                onClick: (row) => {
                  this.updateData.data = row
                  this.updateData.visible = true
                  setTimeout(() => {
                    this.resetForm('ruleForm')
                  }, 500)
                }
              },
              {
                icon: 'el-icon-setting',
                circle: true,
                name: null,
                disabled: false,
                onClick: (row) => {
                  this.authorizedLogin(row.merchantId)
                }
              }
            ]
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('merchant.paging.empty.content'),
          buttonLabel: this.$t('merchant.paging.empty.buttonLabel'),
          onClick: () => {
            // this.addMerchant()
          }
        },
        /**
         * 行高亮
         * @param row 行数据
         */
        rowsClassName: (row) => {
          // return row.state === 0 ? 'row-text-enable' : ''
          return ''
        }
      },
      updateData: {
        visible: false,
        data: {}
      },
      updateModel: {
        password: '',
        confirmPassword: ''
      },
      formRules: {
        password: [
          {
            required: true,
            message: this.$t('passport.register.entity.password.required'),
            trigger: 'blur'
          },
          {
            pattern: /^[A-Za-z0-9~!@#\\$%^&\\*]{6,20}$/,
            message: this.$t('passport.register.entity.password.custom'),
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: this.$t('passport.register.entity.confirmPassword.required'),
            trigger: 'blur'
          },
          {
            validator: rePassword,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.pagingCache((success) => {
      this.getData(success)
    })
  },
  methods: {
    /**
     * 行点击事件
     * @param row       行数据
     * @param column    列属性
     */
    columnEvents (row, column) {
      // this.updateMerchant(row)
    },
    /**
     * 清空搜索条件
     */
    clearSearchCondition () {
      this.clearCondition(() => {
        this.getData(true)
      })
    },
    /**
     * 分页
     * @param first 首次加载
     */
    getData (first) {
      this.tableOptions.loading = true
      this.pagingOptions.firstLoading = first
      fetchOpsMerchantPaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          q: this.searchConditions.keyword
        }
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.pagingOptions.recordCount = result.data.total
              this.pagingOptions.dataset = result.data['records']
              this.tableOptions.loading = false
              if (result.data.records.length > 0) {
                this.pagingOptions.firstLoading = !first
              }
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 授权登录
     * @param id 商户ID
     */
    authorizedLogin (id) {
      if (this.utility.isEmpty(id)) {
        return
      }
      fetchAuthorizedLogin({
        id
      }).then(result => {
        this.resultMessage(result, (success) => {
          if (success && this.utility.isNotEmpty(result.data.url)) {
            this.utility.openSite(result.data.url)
          }
        })
      }).finally(() => {
      })
    },
    changePassport () {
      const formName = 'ruleForm'
      this.formValidate(formName, (valid) => {
        if (valid) {
          fetchOpsAdminPassword({
            password: this.updateModel.password,
            merchantId: this.updateData.data.merchantId
          }).then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
              }
            })
          }).finally(() => {
            this.updateData.visible = false
          })
        }
      })
    }
  }
}
</script>
