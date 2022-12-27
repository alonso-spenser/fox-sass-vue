<template>
  <main>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :percentage="100"
    >
      <el-row
        :gutter="40"
        class="ranking-list-wrapper section-neighbor">
        <el-col
          :span="12"
          v-for="(item,index) in rankingList"
          :key="index">
          <el-card shadow="hover">
            <div class="list">
              <i
                :class="item.icon"
                class="icon iconfont"
                :style="{color:item.color}"></i>
              <h3>{{ item.name }}<span>{{ item.data }}</span></h3>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <fo-paging-table
        class="section-neighbor"
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
          <el-row
            class="dataset-search"
            :gutter="10">
            <el-col :span="6">
              <el-input
                :placeholder="$t('base.placeholder.search')"
                v-model="searchConditions.keyword"
                clearable
                @change="searchConditionChange"
                @clear="clearSearchCondition"
                class="input-with-select">
              </el-input>
            </el-col>
            <el-col :span="18">
              <el-col
                :span="10"
                class="date-picker-wrapper">
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
                <el-button
                  type="primary"
                  @click="getData"
                  style="display: inline-block">{{ $t('base.operate.lookup') }}
                </el-button>
              </el-col>
            </el-col>
          </el-row>
        </template>
      </fo-paging-table>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchRankingList } from '@/plugins/api/dashboard'
import units from '@/plugins/utility'

export default {
  name: 'appRankingIndex',
  extends: extend,
  data () {
    return {
      rankingList: [
        {
          icon: 'fo-ico-guanjun',
          data: '',
          color: '#FAAD14',
          name: this.$t('app.ranking.rankingList.firstPage')
        },
        {
          icon: 'fo-ico-guanjun',
          color: '#13C2C2',
          data: '',
          name: this.$t('app.ranking.rankingList.elevenPage')
        }
      ],
      pickerOptions: {
        disabledDate (time) {
          let nowDate = new Date()
          let overTime = nowDate.setDate(nowDate.getDate() + 1)
          return time.getTime() > overTime.toString()
        }
      },

      dataConfig: {
        columns: [
          {
            prop: 'keyword',
            label: this.$t('app.ranking.tableHeader.keywords')
          },
          {
            prop: 'positionFlag',
            label: this.$t('app.ranking.tableHeader.ranking')

          },
          {
            prop: 'url',
            label: this.$t('app.ranking.tableHeader.pageUrl')
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
    this.$set(this.searchConditions, 'daterange', [])
    this.pagingCache((success) => {
      let startTime = units.getBeforeDayTimeString(7)
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
      this.searchConditions.daterange = [startTime, endTime]
      this.getData(success)
    })
  },
  methods: {
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
      fetchRankingList({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          startTime: this.searchConditions.daterange[0],
          endTime: this.searchConditions.daterange[1],
          q: this.searchConditions.keyword,
          siteId: this.siteId
        }
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.pagingOptions.recordCount = result.data.searchConsoleList.total
              this.pagingOptions.dataset = result.data.searchConsoleList['records']
              this.rankingList[0].data = result.data.googlePage1
              this.rankingList[1].data = result.data.googlePage10
              this.tableOptions.loading = false
              if (result.data.searchConsoleList['records'].length > 0) {
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
    }
  }
}
</script>

<style lang="scss">
.ranking-list-wrapper {
  .list {
    padding: 20px 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 36px;
      margin-right: 6px;
    }
  }
}

.date-picker-wrapper {
  display: flex;

  .el-date-editor {
    width: 300px;
    margin-right: 16px;
  }
}
</style>
