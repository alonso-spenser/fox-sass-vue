<template>
  <div
    v-loading="pageLoading"
  >
    <!--顶部-->
    <aggregate-top
      :aggregate="aggregate"
      class="section-neighbor"></aggregate-top>
    <el-row
      type="flex"
      justify="space-between"
      :gutter="20"
      class="section-neighbor">
      <el-col :span="12">
        <!--询盘分布-->
        <pie-temp
          :title="$t('dashboard.analytics.inquiry.distribution.title')"
          :radio="distributionConfig.radio"
          :radioGroup="distributionConfig.radioGroup"
          :loading="distributionConfig.loading"
          :option="distributionConfig.options"
        >
        </pie-temp>
      </el-col>
      <el-col :span="12">
        <!--询盘来源-->
        <pie-temp
          :title="$t('dashboard.analytics.inquiry.source.title')"
          :radio="sourceConfig.radio"
          :radioGroup="sourceConfig.radioGroup"
          :loading="sourceConfig.loading"
          :option="sourceConfig.options"
        >
        </pie-temp>
      </el-col>
    </el-row>
    <el-row class="section-neighbor">
      <el-col>
        <!--询盘趋势-->
        <line-temp
          :title="$t('dashboard.analytics.inquiry.trend.title')"
          :radio="trendConfig.radio"
          :radioGroup="trendConfig.radioGroup"
          :loading="trendConfig.loading"
          :option="trendConfig.options"
        ></line-temp>
      </el-col>
    </el-row>
    <!--终端占比-->
    <el-row class="section-neighbor">
      <pie-and-histogram
        :loading="terminalConfig.loading"
        :pieOptions="terminalConfig.pieOptions"
        :histogramOptions="terminalConfig.histogramOptions"
        :radio="terminalConfig.radio"
        :title="$t('dashboard.analytics.inquiry.terminal.title')"
      ></pie-and-histogram>
    </el-row>
  </div>
</template>

<script>
import aggregateTop from './aggregate'
import extend from '@/plugins/page/paging'
import pieTemp from './echarts/pie'
import lineTemp from './echarts/line'
import pieAndHistogram from './echarts/pieAndHistogram'
import { fetchEnquiry } from '@/plugins/api/dashboard'

export default {
  name: 'inquiry',
  extends: extend,
  data () {
    return {
      aggregate: [
        {
          icon: 'fo-ico-xiaoxi',
          span: 8,
          monthNumber: true,
          color: '#3F9EFF',
          name: this.$t('dashboard.analytics.inquiry.aggregate.nowMonth'),
          data: 100
        },
        {
          icon: 'fo-ico-xiaoxi',
          span: 8,
          lastMonthNumber: true,
          color: '#13C2C2',
          name: this.$t('dashboard.analytics.inquiry.aggregate.previousMonth'),
          data: 100
        }, {
          totalCont: true,
          icon: 'fo-ico-xiaoxi',
          span: 8,
          color: '#597EF7',
          name: this.$t('dashboard.analytics.inquiry.aggregate.total'),
          data: 100
        }
      ],
      // 询盘分布配置
      distributionConfig: {
        // 单选
        radio: 1, // 初始默认选择
        radioGroup: [{
          name: this.$t('dashboard.analytics.inquiry.radio.pc'),
          label: 1,
          onChange: (row) => {
            this.radioChange('distributionConfig', row, (res) => {
              if (res) {
                this.distributionConfig.options = this.totalData.pcEnquiryDistribution
              }
            })
          }
        }, {
          name: this.$t('dashboard.analytics.inquiry.radio.mobile'),
          label: 2,
          onChange: (row) => {
            this.radioChange('distributionConfig', row, (res) => {
              if (res) {
                this.distributionConfig.options = this.totalData.moEnquiryDistribution
              }
            })
          }
        }],
        // 图形配置
        options: {
          columns: [],
          rows: []
        }
      },
      // 询盘来源配置
      sourceConfig: {
        // 单选
        radio: 1, // 初始默认选择
        radioGroup: [{
          name: this.$t('dashboard.analytics.inquiry.radio.pc'),
          label: 1,
          onChange: (row) => {
            this.radioChange('sourceConfig', row, (res) => {
              if (res) {
                this.sourceConfig.options = this.totalData.pcEnquirySource
              }
            })
          }
        }, {
          name: this.$t('dashboard.analytics.inquiry.radio.mobile'),
          label: 2,
          onChange: (row) => {
            this.radioChange('sourceConfig', row, (res) => {
              if (res) {
                console.log(this.totalData.moEnquirySource)
                this.sourceConfig.options = this.totalData.moEnquirySource
              }
            })
          }
        }],
        // 图形数据配置
        options: {
          columns: [],
          rows: []
        }
      },
      // 询盘趋势配置
      trendConfig: {
        // 单选
        radio: 1, // 初始默认选择
        radioGroup: [{
          name: this.$t('dashboard.analytics.inquiry.radio.pc'),
          label: 1,
          onChange: (row) => {
            this.radioChange('sourceConfig', row, (res) => {
              if (res) {
                this.trendConfig.options = this.totalData.pcEnquiryTrend
              }
            })
          }
        }, {
          name: this.$t('dashboard.analytics.inquiry.radio.mobile'),
          label: 2,
          onChange: (row) => {
            this.radioChange('trendConfig', row, (res) => {
              if (res) {
                this.trendConfig.options = this.totalData.moEnquiryTrend
              }
            })
          }
        }],
        // 图形数据配置
        options: {
          columns: [],
          rows: []
        }
      },
      // 终端配置
      terminalConfig: {
        loading: true,
        // 饼状图形数据配置
        pieOptions: {
          columns: [],
          rows: []
        },
        // 柱状图
        histogramOptions: {
          columns: [],
          rows: []
        }

      }
    }
  },
  created () {
    this.getDate()
  },
  components: {
    pieAndHistogram,
    pieTemp,
    lineTemp,
    aggregateTop
  },
  props: {
    daterange: {
      type: Array,
      default: () => {
        return []
      }
    },
    websiteId: {
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    daterange: {
      deep: true,
      handler () {
        this.getDate()
      }
    }
  },
  methods: {
    getDate () {
      this.pageLoading = true
      this.setLoadingState(true)
      let params = {
        'startTime': this.daterange[0],
        'endTime': this.daterange[1],
        'siteId': this.websiteId
      }
      fetchEnquiry(params).then(res => {
        this.resultMessage(res, (success) => {
          if (success) {
            this.totalData = res.data
            this.aggregate.forEach((item, index) => {
              if (item.hasOwnProperty('monthNumber')) {
                item.data = res.data.monthNumber
              }
              if (item.hasOwnProperty('lastMonthNumber')) {
                item.data = res.data.lastMonthNumber
              }
              if (item.hasOwnProperty('totalCont')) {
                item.data = res.data.totalCont
              }
            })
            // 1 PC 2 mobile 询盘分布
            this.distributionConfig.options = this.distributionConfig.radio === 1 ? res.data.pcEnquiryDistribution : res.data.moEnquiryDistribution
            // 1 PC 2 mobile 询盘来源
            this.sourceConfig.options = this.sourceConfig.radio === 1 ? res.data.pcEnquirySource : res.data.moEnquirySource
            // 1 PC 2 mobile 询盘趋势
            this.trendConfig.options = this.trendConfig.radio === 1 ? res.data.pcEnquiryTrend : res.data.moEnquiryTrend
            // 终端占比饼图
            this.terminalConfig.pieOptions = res.data.enquiryPercent
            // 终端占比柱图
            this.terminalConfig.histogramOptions = res.data.enquiryFormDevice
          } else {
            this.$message.error(res.msg)
          }
          this.setLoadingState(false)
        })
      }).catch((err) => {
        this.pageInvalid()
        this.networkMistake(err)
      })
    },
    /**
     * Pv IP 切换
     * @param sourceObj
     * @param data
     * @param callback
     */
    radioChange (sourceObj, data, callback) {
      this[sourceObj].radio = data
      if (this.totalData) {
        callback && callback.call(this, true)
      } else {
        this.pageLoading = true
        this.getDate()
        callback && callback.call(this, false)
      }
    },
    setLoadingState (state) {
      this.sourceConfig.loading = state
      this.distributionConfig.loading = state
      this.trendConfig.loading = state
      this.terminalConfig.loading = state
    }
    //
  }
}
</script>

<style
  scoped
  lang="scss">
.inquiry-top {
  .inquiry-top-col {
    padding: 20px 0;

    .icon {
      font-size: 14px;
      margin-right: 6px;
    }

    .text {
      font-size: 16px;
    }

    .data {
      font-size: 18px;
      font-weight: bold;
      margin-left: 6px;
    }
  }
}

</style>
