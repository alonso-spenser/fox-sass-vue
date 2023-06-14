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
            <fox-date-picker
              v-model="filterParams.dateTime"
              shrink
              type="month"
              @change="getData"
              :placeholder="$t('main.site.paging.expiration')">
            </fox-date-picker>
          </div>
          <div class="filter-params-element" style="width: 150px">
            <fox-select
              v-model="filterParams.production"
              shrink
              @change="getData"
              filterable
              placeholder="付费状态">
              <el-option
                label="全部"
                :value="0"></el-option>
              <el-option
                label="已付费"
                :value="1"></el-option>
              <el-option
                label="未付费"
                :value="2"></el-option>
              <el-option
                label="赠送"
                :value="9"></el-option>
            </fox-select>
          </div>
          <div class="filter-params-element" style="width: 300px">
            <fox-input
              shrink
              :placeholder="$t('base.placeholder.label')"
              :description="$t('main.site.paging.placeholder')"
              v-model="filterParams.q"
              clearable
              @change="searchConditionChange"
              @clear="clearSearchCondition"
              @keyup.enter.native="getData"
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
            <el-button
              class="el-material-button"
              icon="el-icon-brush"
              @click="clearSearchCondition"
            >
            </el-button>
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
      :multi-select="false"
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
      @paging="getData"
    >
    </fox-paging-table>
    <el-dialog
      title="设置"
      :visible.sync="updateData.visible"
      width="800px"
    >
      <el-form
        :model="updateData.entity"
        :rules="formRules"
        ref="updateForm"
        label-width="150px">
        <p>
          <label
            class="el-form-item__label"
            style="width: 150px;">网站ID</label>
          {{ updateData.entity.id }}
        </p>
        <p>
          <label
            class="el-form-item__label"
            style="width: 150px;">默认域名</label>
          <a
            class="text-primary"
            :href="`https://${updateData.entity.mainDomain}`"
            target="_blank">{{ updateData.entity.mainDomain }}</a>
        </p>
        <el-form-item
          prop="state"
          label="网站状态">
          <el-select
            v-model="updateData.entity.state"
          >
            <el-option
              v-for="item in siteState"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="payMonth"
          label="支付时长(月)">
          <el-slider
            v-model="updateData.entity.payMonth"
            :step="12"
            show-stops
            :min="0"
            :max="60">
          </el-slider>
        </el-form-item>
        <el-form-item
          prop="expiryTime"
          label="到期时间">
          <el-date-picker
            class="date-picker"
            v-model="updateData.entity.expiryTime"
            type="date"
            size="small"
            placeholder="选择到期时间"
            format="yyyy-MM-dd"
            value-format="timestamp"
            :clearable="false"
          ></el-date-picker>
        </el-form-item>

        <el-form-item
          prop="maxLang"
          label="语言数量">
          <el-input
            v-model="updateData.entity.maxLang"
            placeholder="请输入语言数量"
          ></el-input>
        </el-form-item>
      </el-form>
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
          @click="updateSiteInfo">{{ $t("base.save") }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="语言删除"
      :visible.sync="removeData.visible"
      width="800px"
    >
      <el-form
        :model="removeData.entity"
        :rules="formRules"
        ref="updateForm"
        label-width="150px">
        <p>
          <label
            class="el-form-item__label"
            style="width: 150px;">网站ID</label>
          {{ removeData.siteData.siteName }}
          <small class="ml-5">{{ removeData.siteData.id }}</small>
        </p>
        <div style="margin-top: 16px;padding-bottom: 16px">
          <el-checkbox-group
            class="lang-group"
            v-model="removeData.entity.regionList"
            size="small">
            <template v-for="o in removeData.langList">
              <el-checkbox
                :label="o.id"
                border
                :key="o.id"
                :value="o.id"
                v-if="o.isDefault === 1">
                {{ o.languageName }}
              </el-checkbox>
            </template>
          </el-checkbox-group>
        </div>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          @click="removeData.visible = false">{{ $t("base.cancel") }}
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="removeSiteRegion">{{ $t("base.save") }}
        </el-button>
      </div>
    </el-dialog>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import {
  fetchSiteDelete,
  fetchSitePaging,
  fetchAuthorizedLogin,
  fetchSiteUpdate,
  fetchSiteRegion,
  fetchSiteRemoveRegion
} from '@/plugins/api/main/site'

export default {
  name: 'Site',
  extends: extend,
  data () {
    return {
      siteType: [],
      siteState: [],
      filterParams: {
        q: '',
        dateTime: '',
        production: 0
      },
      dataConfig: {
        actions: {
          rowClick: (row, column) => {
            this.columnEvents(row, column)
          }
        },
        columns: [
          {
            prop: 'articleQuantity',
            label: this.$t('main.site.paging.tableHeader.siteName'),
            render: (row) => {
              return (
                <div>
                  {row['siteName']}
                  <div>
                    {row['id']}
                  </div>
                </div>
              )
            }
          },
          {
            prop: 'mainDomain',
            label: this.$t('main.site.paging.tableHeader.mainDomain'),
            render: (row) => {
              return (
                <div>
                  {row['systemDomain']}
                  <div>{row['mainDomain']}</div>
                </div>
              )
            }
          },
          {
            prop: 'createTime',
            label: this.$t('main.site.paging.tableHeader.time'),
            width: 150,
            render: (row) => {
              return (
                <div>
                  {this.$t('main.site.paging.tableHeader.create')} {this.$moment(row['createTime']).format('YYYY-MM-DD')}
                  <div>
                    {this.$t('main.site.paging.tableHeader.firstOnline')} {this.$moment(row['firstOnline']).format('YYYY-MM-DD')}
                  </div>
                  <div class="text-primary">
                    {this.$t('main.site.paging.tableHeader.expiryTime')} {this.$moment(row['expiryTime']).format('YYYY-MM-DD')}
                  </div>
                </div>
              )
            }
          },
          {
            prop: 'langName',
            label: this.$t('main.site.paging.tableHeader.langName'),
            width: 120,
            render: (row) => {
              return (
                <div>
                  {row['keepLang']} / {row['maxLang']}
                </div>
              )
            }
          },
          {
            prop: 'formQuantity',
            width: 120,
            label: this.$t('main.site.paging.tableHeader.formQuantity'),
            align: 'center'
          },
          {
            prop: 'payMonth',
            label: this.$t('main.site.paging.tableHeader.payMonth'),
            align: 'center',
            width: 120
          },
          {
            prop: 'siteType',
            label: this.$t('main.site.paging.tableHeader.siteType'),
            width: 120,
            render: (row) => {
              return (
                <div>
                  {this.getSiteType(row['siteType'])}
                </div>
              )
            }
          },
          {
            prop: 'state',
            label: this.$t('main.site.paging.tableHeader.state'),
            width: 80,
            // render: (row) => {
            //   return (
            //     <div>
            //       {this.utility.getDicType(this.siteState, row['state'])}
            //     </div>
            //   )
            // }
            render: (row, index, ctx, h) => {
              return h('el-button', {
                props: {
                  type: 'text'
                },
                class: 'text-primary',
                on: {
                  click: (e) => {
                    console.log(JSON.stringify(row))
                    e.stopPropagation()
                  }
                }
              }, this.utility.getDicType(this.siteState, row['state']))
            }
          },
          {
            button: true,
            label: '',
            width: 200,
            group: [
              {
                icon: 'el-icon-location',
                circle: true,
                name: null,
                disabled: false,
                onClick: (row) => {
                  this.removeRegion(row)
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
              },
              {
                icon: 'el-icon-delete',
                circle: true,
                name: null,
                disabled: false,
                onClick: (row) => {
                  this.removeSite(row)
                }
              },
              {
                icon: 'el-icon-edit',
                circle: true,
                name: null,
                disabled: false,
                onClick: (row) => {
                  this.updateData.entity = row
                  this.updateData.visible = true
                }
              }
            ]
          }
        ],
        /**
         * 行高亮
         * @param row 行数据
         */
        rowsClassName: (row) => {
          // return row.state === 0 ? 'row-text-enable' : ''
          return ''
        }
      },
      formRules: {
        expiryTime: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'blur'
          }
        ],
        maxLang: [
          {
            required: true,
            message: '请输入语言数量',
            trigger: 'blur'
          }
        ]
      },
      updateData: {
        visible: false,
        entity: {
          'addDomain': false,
          'agentName': '',
          'company': '',
          'domain': '',
          'id': '',
          'production': 0,
          'publishTime': 0,
          'state': 0,
          'title': '',
          'visible': true,
          maxLang: 1,
          payMonth: 12
        }
      },
      removeData: {
        visible: false,
        siteData: {},
        langList: [],
        entity: {
          siteId: '',
          regionList: []
        }
      }
    }
  },
  created () {
    this.siteType = this.$t('enumerate.siteType')
    this.siteState = this.$t('enumerate.siteState')
    this.pagingCache((success) => {
      this.getData(success)
    })
  },
  methods: {
    /**
     * 站点类型
     */
    getSiteType (index) {
      let s = this.siteType.filter((o) => {
        return o.id === index
      })
      return s.length > 0 ? s[0].label : ''
    },
    /**
     * 行点击事件
     * @param row       行数据
     * @param column    列属性
     */
    columnEvents (row, column) {
      this.updateSite(row)
    },
    /**
     * 清空搜索条件
     */
    clearSearchCondition () {
      this.filterParams = {
        q: '',
        dateTime: '',
        production: 0
      }
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
      if (this.filterParams.dateTime) {
        let month = this.utility.getMonthStartAndEndByTimespan(this.filterParams.dateTime)
        this.filterParams.start = month.first.timespan
        this.filterParams.deadline = month.last.timespan
      } else {
        this.filterParams.start = 0
        this.filterParams.deadline = 0
      }
      fetchSitePaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          ...this.filterParams
        }
      })
        .then(result => {
          this.pageValid()
          this.resultMessage((result), (success) => {
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
     * 添加跳转
     */
    addSite () {
      this.redirectURL('/main/site/add')
    },
    /**
     * 修改跳转
     */
    updateSite (row) {
      this.redirectURL(`/main/site/update/${row.id}`)
    },
    /**
     * 保存网站数据
     */
    updateSiteInfo () {
      this.$refs['updateForm'].validate((valid) => {
        if (valid) {
          fetchSiteUpdate({
            siteId: this.updateData.entity.id,
            expiryTime: this.updateData.entity.expiryTime,
            state: this.updateData.entity.state,
            payMonth: this.updateData.entity.payMonth,
            maxLang: this.updateData.entity.maxLang
          }).then(res => {
            if (res.success) {
              this.getData()
            }
          })
          this.updateData.visible = false
        }
      })
    },
    /**
     * 删除语言
     * @param row
     */
    removeRegion (row) {
      if (row.maxLang === 1) {
        return false
      }
      this.removeData.visible = false
      fetchSiteRegion({
        siteId: row.id
      })
        .then(res => {
          if (res.success) {
            if (res.data.length > 1) {
              this.removeData.siteData = row
              this.removeData.entity.siteId = row.id
              this.removeData.langList = res.data
              this.removeData.visible = true
            }
          }
        })
        .catch(error => console.log(error))
    },
    /**
     * 删除语言
     */
    removeSiteRegion () {
      if (this.removeData.entity.regionList.length < 1) {
        this.$message({
          type: 'error',
          message: '请至少选择一个语言'
        })
      } else {
        this.removeData.visible = false
        this.$confirm(`你确定要删除这 ${this.removeData.entity.regionList.length} 种语言吗`, '提示', {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          type: 'warning',
          beforeClose: async (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              const result = await fetchSiteRemoveRegion(this.removeData.entity)
              instance.confirmButtonLoading = false
              result.options = {
                action: this.actionType.delete
              }
              this.resultMessage(result, (success) => {
                done()
                this.removeData.langList = []
                this.removeData.entity.regionList = []
                instance.confirmButtonLoading = false
              })
            } else {
              done()
            }
          }
        })
          .then(() => {
          })
          .catch(() => {
          })
      }
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
    /**
     * 授权登录
     */
    removeSite (row) {
      this.$confirm(`确定要删除 ${row.mainDomain} 这个网站吗？`,
        this.$t('base.delete.heading').toString(), {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          closeOnClickModal: false,
          type: 'error',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              fetchSiteDelete({
                siteId: row.id
              }).then(result => {
                result.options = {
                  action: this.actionType.delete
                }
                this.resultMessage(result, (success) => {
                  done()
                  instance.confirmButtonLoading = false
                  if (success) {
                    this.getData(true)
                  }
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
