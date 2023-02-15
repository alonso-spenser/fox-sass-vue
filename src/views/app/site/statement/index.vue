<template>
  <main>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :percentage="100"
    >
      <el-tabs
        v-model="activeName"
        :before-leave="beforeLeave">
        <template v-for="(item,index) in $t('statement.tabPane')">
          <el-tab-pane
            :key="index"
            :label="item['label']"
            v-if="index === 0 || (index > 0 && model.seoTarget.hasService)"
            :name="item['name']">
          </el-tab-pane>
        </template>
      </el-tabs>
      <div style="position: relative">
        <div style="position: absolute;right: 0;top: -55px;">
          <el-button
            type="text"
            v-if="false"
            @click="getReport">生成
          </el-button>
          <span class="mr-3 ml-3">月份</span>
          <el-date-picker
            v-model="searchConditions.dateRange"
            @change="changeFocus"
            type="month"
            size="small"
            value-format="yyyy/M"
            placeholder="选择月份"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
      <!--数据报告-->
      <data-report
        v-if="activeName==='overview'"
        :model="model"></data-report>
      <!--关键词排名-->
      <word-ranking
        v-if="activeName==='keyword'"
        :model="model"></word-ranking>
      <!--近期表现趋势-->
      <recent-trends
        v-if="activeName==='trend'"
        :model="model"></recent-trends>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import DataReport from '@/views/app/site/statement/components/data-report'
import WordRanking from '@/views/app/site/statement/components/word-ranking'
import RecentTrends from '@/views/app/site/statement/components/recent-trends'
import { fetchReportCheck, fetchSEOTarget, fetchReportGenerate } from '@/plugins/api/site'

export default {
  name: 'reportIndex',
  components: { RecentTrends, WordRanking, DataReport },
  extends: extend,
  data () {
    return {
      pickerOptions: {},
      pageLoading: false,
      activeName: localStorage.getItem('tableColumns') ? localStorage.getItem('tableColumns') : 'overview',
      model: {
        seoTarget: {
          hasService: false
        }
      },
      searchConditions: {
        dateRange: '',
        year: '',
        month: ''
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    /**
     * 时间改变触发
     */
    changeFocus (a) {
      this.searchConditions.year = a ? Number(a.split('/')[0]) : ''
      this.searchConditions.month = a ? Number(a.split('/')[1]) : ''
      this.getData()
    },
    /**
     * tap左右切换
     */
    beforeLeave (name) {
      localStorage.setItem('tableColumns', name)
    },
    getData () {
      this.pageLoading = true
      Promise.all([fetchReportCheck({
        id: this.siteId,
        year: this.searchConditions.year,
        month: this.searchConditions.month
      }), fetchSEOTarget({ siteId: this.siteId })]
      ).then(result => {
        this.pageValid()
        this.resultMessage(result[0], (success) => {
          if (result[0].data.year || result[0].data.month) {
            this.searchConditions.dateRange = result[0].data.year + '/' + result[0].data.month.toString()
          }
          this.model = result[0].data
          this.model.seoTarget = result[1].data
        })
      }).catch(error => {
        this.pageInvalid()
        this.networkMistake(error)
      }).finally(() => {
        this.pageLoading = false
      })
    },
    getReport () {
      this.changeFocus(this.searchConditions.dateRange)
      fetchReportGenerate({
        id: this.siteId,
        year: this.searchConditions.year,
        month: this.searchConditions.month
      }).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            this.getData()
          }
        })
      })
    }
  }
}
</script>
