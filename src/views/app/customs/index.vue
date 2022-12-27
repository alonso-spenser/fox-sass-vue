<template>
  <fo-page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
  >
    <fo-page-header
      :left="140"
      :actions="[
        {
          label: $t('base.operate.export'),
          icon: 'el-icon-download',
          type: 'primary',
          visible: true,
          click: () => {
            this.exportFile()
          }
        }
      ]"></fo-page-header>
    <div>
      <h3>交易信息</h3>
    </div>
    <fo-paging-table
      :columns="dataConfig.columns"
      :actions="dataConfig.actions"
      :dataset="pagingOptions.dataset"
      :loading="tableOptions.loading"
      :multi-select="false"
      :index-number="false"
      :stripe="false"
      :first-loading="pagingOptions.firstLoading"
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
      @paging="getData"
    >
      <template slot="header">
        <el-row :gutter="40">
          <el-col :span="5">
            <span class="search-title">{{$t('customs.search.describe.name')}}</span>
            <el-input :placeholder="$t('customs.search.describe.placeholder')" v-model="searchConditions.describe"></el-input>
          </el-col>
          <el-col :span="5">
            <span class="search-title">{{$t('customs.search.HS.name')}}</span>
            <el-input :placeholder="$t('customs.search.HS.placeholder')" v-model="searchConditions.HS"></el-input>
          </el-col>
          <el-col :span="5">
            <span class="search-title">{{$t('customs.search.supplier.name')}}</span>
            <el-input :placeholder="$t('customs.search.supplier.placeholder')" v-model="searchConditions.supplier"></el-input>
          </el-col>
          <el-col :span="5">
            <span class="search-title">{{$t('customs.search.purchasers.name')}}</span>
            <el-input :placeholder="$t('customs.search.purchasers.placeholder')" v-model="searchConditions.purchasers"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="40" style="margin-top: 40px" type="flex">
          <el-col :span="5">
            <span class="search-title">{{$t('customs.search.source.name')}}</span>
            <el-select style="width: 100%" :placeholder="$t('customs.search.source.placeholder')" v-model="searchConditions.source">
              <el-option value="1" label="全部"></el-option>
            </el-select>
          </el-col>
          <el-col :span="19">
            <span class="search-title">{{$t('customs.search.date.name')}}</span>
            <div class="left">
              <el-date-picker
                v-model="searchConditions.daterange"
                type="daterange"
                :picker-options="pickerOptions"
                range-separator="-"
                value-format="timestamp"
                :default-time="['00:00:00', '23:59:59']"
                :start-placeholder="$t('base.placeholder.date')"
                :end-placeholder="$t('base.placeholder.date')"
              >
              </el-date-picker>
            </div>

            <div class="left" style="margin-left: 16px">
              <el-button type="primary" >{{$t('base.operate.lookup')}}</el-button>
              <el-button @click="clearSearchCondition">{{$t('base.operate.reset')}}</el-button>
            </div>

          </el-col>
        </el-row>
      </template>
    </fo-paging-table>
  </fo-page-loading>
</template>

<script>
import extend from '@/plugins/page/paging'
export default {
  name: 'customsIndex',
  extends: extend,
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      dataConfig: {
        columns: [
          {
            prop: 'supplier',
            label: this.$t('customs.tableHeader.supplier')
          },
          {
            prop: 'purchasers',
            label: this.$t('customs.tableHeader.purchasers')
            // width: 100
          },
          {
            prop: 'describe',
            label: this.$t('customs.tableHeader.describe')
          },
          {
            prop: 'origin',
            label: this.$t('customs.tableHeader.origin')
            // align: 'center'
          },
          {
            prop: 'objective',
            label: this.$t('customs.tableHeader.objective')
            // align: 'center'
          },
          {
            prop: 'source',
            label: this.$t('customs.tableHeader.source')
            // align: 'center'
          },
          {
            prop: 'date',
            dataType: 'date',
            label: this.$t('customs.tableHeader.date')
            // align: 'center'
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
    this.pagingOptions.recordCount = 20
    this.pagingOptions.dataset = [{
      supplier: '供应商1',
      purchasers: '采购商',
      describe: '产品描述',
      origin: 'china',
      objective: '英国',
      source: '中国',
      date: 1624439621734
    }]
    this.pageValid()
    this.tableOptions.loading = false
    this.searchConditions.source = '1'
    // this.pagingCache(() => {
    //   // this.getData(true)
    // })
  },
  methods: {
    /**
     * 清空搜索条件
     */
    clearSearchCondition () {
      this.restSearch(() => {
        // this.getData(true)
      })
    },
    restSearch (callback) {
      const { searchConditions } = this
      searchConditions.describe = ''
      searchConditions.HS = ''
      searchConditions.supplier = ''
      searchConditions.purchasers = ''
      searchConditions.source = '1'
      searchConditions.daterange = null
      callback()
    },
    /**
     * 分页
     * @param first 首次加载
     */
    getData (first) {
      this.tableOptions.loading = true
      this.pagingOptions.firstLoading = first

      fetchRankingList({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          ...this.searchConditions,
          siteId: this.siteId

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
     * 导出文件
     */
    exportFile () {

    }
  }
}
</script>

<style scoped lang="scss">
    .search-title{
      display: block;
      margin-bottom: 16px;
    }
    .left{
      float: left;
    }
</style>
