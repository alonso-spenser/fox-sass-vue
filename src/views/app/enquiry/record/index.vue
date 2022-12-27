<template>
  <main>
    <fo-page-header></fo-page-header>
    <!--    <div class="filter-params">-->
    <!--      <div class="filter-params-element">-->
    <!--        11-->
    <!--      </div>-->
    <!--      <div class="filter-params-element">-->
    <!--        11-->
    <!--      </div>-->
    <!--    </div>-->
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :percentage="100"
    >
      <fo-paging-table
        :multiSelect="false"
        :columns="dataConfig.columns"
        :actions="dataConfig.actions"
        :dataset="pagingOptions.dataset"
        :loading="tableOptions.loading"
        :first-loading="pagingOptions.firstLoading"
        :page-index.sync="pagingOptions.pageIndex"
        :page-size.sync="pagingOptions.pageSize"
        :record-count="pagingOptions.recordCount"
        :rows-class-name="dataConfig.rowsClassName"
        @paging="getData(false)"
      >
        <template slot="header">
          <!--搜索-->
          <el-row
            class="mb-5 dataset-search"
            :gutter="20">
            <el-col :span="16">
              <el-row :gutter="20">
                <el-col :span="16">
                  <el-input
                    :placeholder="$t('base.placeholder.search')"
                    v-model="searchConditions.keyword"
                    clearable
                    @change="searchConditionChange"
                    class="input-with-select"
                  >
                    <el-select
                      v-model="searchConditions.searchType"
                      slot="prepend"
                      :placeholder="$t('base.placeholder.select')"
                    >
                      <el-option
                        v-for="{ label, value } in $t('enquiry.record.searchType')"
                        :key="value"
                        :label="label"
                        :value="value"
                      ></el-option>
                    </el-select>
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      :loading="loading"
                      @click="startSearch">
                    </el-button>
                  </el-input>
                </el-col>
                <el-col
                  :span="8"
                  v-if="pagingOptions.recordCount > 0">
                  <el-button
                    :loading="loading"
                    @click="exportData"
                  >
                    {{ $t("enquiry.export") }}
                  </el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col
              :span="8"
              class="text-right">
              <label>
                {{ $t("base.orderBy") }}
              </label>
              <el-select
                class="ml-2"
                v-model="searchConditions.orderBy"
                :placeholder="$t('base.placeholder.select')"
              >
                <el-option
                  v-for="{ label, value } in $t('enquiry.record.recordOrderBy')"
                  :key="value"
                  :label="label"
                  :value="value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <!--check-->
          <el-row
            class="mb-5"
            type="flex"
            :gutter="20">
            <el-col :span="2">
              <el-checkbox
                :indeterminate="searchConditions.isIndeterminate"
                v-model="searchConditions.checkAllState"
                @change="handleCheckAllChange"
              >{{ $t('enquiry.all') }}
              </el-checkbox
              >
            </el-col>
            <el-col :span="22">
              <el-checkbox-group
                @change="handleCheckedCitiesChange"
                v-model="searchConditions.states"
              >
                <el-checkbox
                  v-for="{ label, value } in $t('enquiry.record.recordState')"
                  :key="value"
                  :label="value"
                >{{ label }}
                </el-checkbox
                >
              </el-checkbox-group>
            </el-col>
          </el-row>
          <!--time and rest search condition-->
          <el-row
            :gutter="20"
            class="mt-5 mb-5">
            <el-col :span="8">
              <el-date-picker
                @change="getData(false)"
                v-model="searchConditions.dateRange"
                type="daterange"
                range-separator="-"
                value-format="timestamp"
                :default-time="['00:00:00', '23:59:59']"
                :start-placeholder="$t('base.placeholder.date')"
                :end-placeholder="$t('base.placeholder.date')"
              >
              </el-date-picker>
            </el-col>

            <!--设备-->
            <el-col :span="4">
              <el-select
                v-model="searchConditions.device"
                @change="getData(false)"
                :placeholder="$t('base.placeholder.select')"
              >
                <el-option
                  v-for="{ label, value, icon } in $t('enquiry.deviceTypeList')"
                  :key="value"
                  :label="label"
                  :value="value"
                >
                  <div class="select-option">
                    <i
                      class="mr-1"
                      :class="icon"
                      v-if="icon"></i>
                    <span>{{ label }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-button @click="clearSearchCondition">{{ $t("enquiry.record.clearAllFilter") }}</el-button>
            </el-col>
          </el-row>
        </template>
      </fo-paging-table>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchEnquiryRecordPaging, fetchEnquiryRecordExport } from '@/plugins/api/enquiry'

export default {
  name: 'enquiryForm',
  extends: extend,
  data () {
    return {
      allState: [],
      deviceList: [],
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateForm(row)
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
            dataType: 'date',
            prop: 'createTime',
            label: this.$t('enquiry.record.tableHeader.createTime')
          },
          {
            prop: 'country',
            label: this.$t('enquiry.record.tableHeader.country')
          },
          {
            prop: 'clientName',
            label: this.$t('enquiry.record.tableHeader.Name')
          },
          {
            prop: 'mobile',
            label: this.$t('enquiry.record.tableHeader.phone')
          },
          {
            prop: 'email',
            label: this.$t('enquiry.record.tableHeader.email')
          },
          {
            width: 150,
            label: '附件',
            prop: 'hasAnnex',
            render: (row) => {
              return (
                <div
                  class={row['hasAnnex'] ? 'el-icon-paperclip' : ''}
                  onClick={(e) => {
                    e.stopPropagation()
                    this.downloadAnnex(row)
                  }}
                >
                </div>
              )
            }
          },
          {
            prop: 'state',
            label: this.$t('enquiry.record.tableHeader.state'),
            width: 100,
            align: 'center',
            render: (row) => {
              return (
                <el-tag
                  size="medium"
                  type={this.utility.getDicType(
                    this.$t('enquiry.record.recordState'),
                    row['state'],
                    'type'
                  )}
                >
                  {this.utility.getDicType(this.$t('enquiry.record.recordState'), row.state)}
                </el-tag>
              )
            }
          }
        ],
        /**
         * 行高亮
         * @param row 行数据
         */
        rowsClassName: (row) => {
          return ''
        }
      }
    }
  },
  created () {
    this.siteId = this.$route.params.siteId
    this.deviceList = this.$t('enquiry.deviceTypeList')
    // 状态
    const allState = []
    this.$t('enquiry.record.recordState').map(({ value }) => allState.push(value))
    this.allState = allState
    const { searchConditions } = this
    this.$set(searchConditions, 'states', allState)
    // 初始化全选
    this.$set(searchConditions, 'checkAllState', true)
    this.$set(searchConditions, 'isIndeterminate', false)
    // 初始选择搜索类型
    this.$set(searchConditions, 'searchType', 1)
    // 初始时间
    this.$set(searchConditions, 'dateRange', null)
    // 初始设备
    this.$set(searchConditions, 'device', '')
    this.pagingCache((success) => {
      this.getData(success)
    })
  },
  methods: {
    /**
     * 清空搜索条件
     */
    clearSearchCondition () {
      this.clearCondition(() => {
        this.ResetFilter(() => {
          this.getData(true)
        })
      })
    },
    /**
     * 下载附件
     * @param row
     */
    downloadAnnex (row) {
      this.utility.openSite(row.annex)
    },
    /**
     * 分页
     * @param first 首次加载
     */
    getData (first = false) {
      this.tableOptions.loading = true
      this.pagingOptions.firstLoading = first
      const { searchConditions, siteId } = this
      fetchEnquiryRecordPaging({
        orderBy: searchConditions.orderBy, // 排序
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          createTimeStart: searchConditions.dateRange ? searchConditions.dateRange[0] : '', // 开始时间
          createTimeLimit: searchConditions.dateRange ? searchConditions.dateRange[1] : '', // 结束时间
          device: searchConditions.device, // 设备
          q: searchConditions.keyword, // 关键词
          searchType: searchConditions.searchType, // 搜索类型
          siteId: siteId, // 当前网站下的ID
          states: searchConditions.states// 选择状态
        }
      }).then(result => {
        this.pageValid()
        this.resultMessage(result, (success) => {
          if (success) {
            this.pagingOptions.recordCount = result.data.total
            this.pagingOptions.dataset = result.data['records']
            this.tableOptions.loading = false
            if (result.data.records.length > 0) {
              this.pagingOptions.firstLoading = !first
            }
            this.batchActions = !(this.pagingOptions.dataset.length === 0 && this.pagingOptions.firstLoading)
          }
        })
      })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 修改跳转
     */
    updateForm (row) {
      this.$router.push(`/site/${this.siteId}/enquiry/record/${row.id}`)
    },
    /***
     * 导出
     */
    exportData () {
      const { searchConditions, siteId } = this
      let params = {
        createTimeStart: searchConditions.dateRange ? searchConditions.dateRange[0] : '',
        createTimeLimit: searchConditions.dateRange ? searchConditions.dateRange[1] : '',
        device: searchConditions.device,
        q: searchConditions.keyword,
        searchType: searchConditions.searchType,
        siteId: siteId,
        states: searchConditions.states
      }
      fetchEnquiryRecordExport(params)
        .then((result) => {
          const link = document.createElement('a')
          let blob = new Blob([result], { type: 'application/vnd.ms-excel' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', '询盘 ' + this.utility.timestampToDatetime(new Date().getTime()) + '.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     *  清空当前页独有搜索数据
     */
    ResetFilter (callback) {
      // state
      this.searchConditions.checkAllState = true
      this.searchConditions.isIndeterminate = false
      // 时间
      this.searchConditions.dateRange = null
      // 设备
      this.searchConditions.device = ''
      // 选中状态
      this.searchConditions.states = this.allState
      if (callback && typeof (callback)) {
        callback.call(this)
      }
    },
    /**
     *  state 切换
     * @param value
     */
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.searchConditions.checkAllState = checkedCount === this.allState.length
      this.searchConditions.isIndeterminate = checkedCount > 0 && checkedCount < this.allState.length
    },
    /**
     *  全选
     * @param val
     */
    handleCheckAllChange (val) {
      this.searchConditions.states = val ? this.allState : []
      this.stateList = val ? this.allState : []
      this.searchConditions.isIndeterminate = false
    },
    /**
     * 搜索
     */
    startSearch () {
      this.pagingOptions.pageIndex = 1
      this.getData(false)
    }

  }
}
</script>
