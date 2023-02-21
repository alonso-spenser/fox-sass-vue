<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
    :percentage="100"
  >
    <fox-paging-table
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
    >
      <template slot="header">
        <el-row
          class="mb-4 dataset-search"
          :gutter="20">
          <el-col :span="14">
            <el-input
              :placeholder="$t('base.placeholder.search')"
              v-model.trim="searchConditions.keyword"
              clearable
              @clear="getData"
              @keyup.enter.native="getData"
            >
              <el-select
                v-model="searchConditions.searchType"
                slot="prepend"
                :placeholder="$t('base.placeholder.select')"
              >
                <el-option
                  :label="$t('client.searchType.email')"
                  :value="1"
                ></el-option>
                <el-option
                  :label="$t('client.searchType.mobile')"
                  :value="2"
                ></el-option>
                <el-option
                  :label="$t('client.searchType.enquiry')"
                  :value="3"
                ></el-option>
                <el-option
                  :label="$t('client.searchType.lastName')"
                  :value="5"
                ></el-option>
                <el-option
                  :label="$t('client.searchType.firstName')"
                  :value="4"
                ></el-option>
              </el-select>
              <el-button
                slot="append"
                icon="el-icon-search"
                :loading="loading"
                @click="getData"
              ></el-button>
            </el-input>
          </el-col>
          <el-col
            :span="10"
            class="text-right">
            <label>
              {{ $t("base.orderBy") }}
            </label>
            <el-select
              class="ml-2"
              v-model="searchConditions.orderBy"
              :placeholder="$t('base.placeholder.select')"
              @change="getData"
            >
              <el-option
                :label="$t('client.orderBy.createTimeDESC')"
                value="createTime-DESC"
              ></el-option>
              <el-option
                :label="$t('client.orderBy.createTimeASC')"
                value="createTime-ASC"
              ></el-option>
              <el-option
                :label="$t('client.orderBy.lastNameASC')"
                value="lastName-ASC"
              ></el-option>
              <el-option
                :label="$t('client.orderBy.lastNameDESC')"
                value="lastName-DESC"
              ></el-option>
              <el-option
                :label="$t('client.orderBy.firstNameASC')"
                value="firstName-ASC"
              ></el-option>
              <el-option
                :label="$t('client.orderBy.firstNameDESC')"
                value="firstName-DESC"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </template>
    </fox-paging-table>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchCustomerList } from '@/plugins/api/customer'

export default {
  name: 'siteCustomer',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: row => {
              this.updateMember(row)
            }
          }
        },
        columns: [
          {
            prop: 'avatar',
            label: '',
            width: 100,
            render: row => {
              return row.avatar ? (
                <el-avatar
                  size={32}
                  style="background: #73B6FD">
                  {row.avatar}
                </el-avatar>
              ) : (
                <el-avatar
                  icon="el-icon-user-solid"
                  size={32}
                  style="background: #FFCC01"
                />
              )
            }
          },
          {
            prop: 'name',
            label: this.$t('client.tableHeader.name')
          },
          {
            prop: 'remark',
            label: this.$t('client.tableHeader.remark')
          },
          {
            prop: 'number',
            width: 100,
            align: 'center',
            label: this.$t('client.tableHeader.enquires')
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
    this.pagingCache((success) => {
      this.getData(success)
    })
  },
  methods: {
    /**
     * 分页
     * @param first 首次加载
     */
    getData (first = false) {
      const { searchConditions, siteId, tableOptions, pagingOptions } = this
      tableOptions.loading = true
      pagingOptions.firstLoading = first
      fetchCustomerList({
        orderBy: searchConditions.orderBy, // 排序
        current: pagingOptions.pageIndex,
        size: pagingOptions.pageSize,
        params: {
          q: searchConditions.keyword,
          searchType: searchConditions.searchType,
          siteId: siteId
        }
      }).then(result => {
        this.pageValid()
        this.resultMessage(result, (success) => {
          if (success) {
            pagingOptions.recordCount = result.data.total
            pagingOptions.dataset = result.data['records']
            tableOptions.loading = false
            if (result.data.records.length > 0) {
              pagingOptions.firstLoading = !first
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
    updateMember (row) {
      // console.log(row, '==》')
      this.$router.push(`/site/${this.siteId}/client/update/${row.id}`)
    }
  }
}
</script>
