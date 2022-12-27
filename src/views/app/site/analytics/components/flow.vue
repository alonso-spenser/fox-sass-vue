<template>
  <div
    v-loading="pageLoading"
    v-if="viewId">
    <!--顶部-->
    <aggregate-top
      :aggregate="aggregate"
      class="section-neighbor"></aggregate-top>
    <el-row
      type="flex"
      justify="space-between"
      :gutter="40"
      class="section-neighbor">
      <el-col :span="12">
        <!--流量来源-->
        <pie-temp
          :title="$t('dashboard.analytics.flow.source.title')"
          :radio="sourceConfig.radio"
          :radioGroup="sourceConfig.radioGroup"
          :loading="sourceConfig.loading"
          :option="sourceConfig.options"
        >
        </pie-temp>
      </el-col>
      <el-col :span="12">
        <!--流量分布-->
        <pie-temp
          :title="$t('dashboard.analytics.flow.distribution.title')"
          :radio="distributionConfig.radio"
          :radioGroup="distributionConfig.radioGroup"
          :loading="distributionConfig.loading"
          :option="distributionConfig.options"
        >
        </pie-temp>
      </el-col>
    </el-row>
    <el-row class="section-neighbor">
      <el-col>
        <!--流量趋势-->
        <line-temp
          :title="$t('dashboard.analytics.flow.trend.title')"
          :radio="trendConfig.radio"
          :radio-group="trendConfig.radioGroup"
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
        :radio-group="terminalConfig.radioGroup"
        :title="$t('dashboard.analytics.flow.terminal.title')"
      ></pie-and-histogram>
    </el-row>
  </div>
  <div v-else>
    <el-button
      type="primary"
      @click="jumpToGA">
      {{ $t('dashboard.ga.title') }}
    </el-button>
    <p class="text-secondary">
      {{ $t('dashboard.ga.tips') }}
    </p>
  </div>
</template>

<script>
import aggregateTop from './aggregate'
import extend from '@/plugins/page/paging'
import pieTemp from './echarts/pie'
import lineTemp from './echarts/line'
import pieAndHistogram from './echarts/pieAndHistogram'
import { fetchFlowAnalysis, fetchGetViewId } from '@/plugins/api/dashboard'

export default {
  name: 'flow',
  extends: extend,
  data () {
    return {
      totalData: null,
      viewId: null,
      aggregate: [{
        icon: 'fo-ico-fangke',
        span: 6,
        color: '#FAAD14',
        monthIp: true,
        name: this.$t('dashboard.analytics.flow.aggregate.nowMonthVisit'),
        data: ''
      }, {
        icon: 'fo-ico-shuju',
        span: 6,
        monthPv: true,
        color: '#FAAD14',
        name: this.$t('dashboard.analytics.flow.aggregate.nowMonthVisitNumber'),
        data: ''
      }, {
        icon: 'fo-ico-fangke',
        span: 6,
        totalIp: true,
        color: '#13C2C2',
        name: this.$t('dashboard.analytics.flow.aggregate.totalPeopleVisit'),
        data: ''
      }, {
        totalPv: true,
        icon: 'fo-ico-shuju',
        span: 6,
        color: '#13C2C2',
        name: this.$t('dashboard.analytics.flow.aggregate.totalVisitNumber'),
        data: ''
      }],
      // 流量分布配置
      distributionConfig: {
        // 单选
        radio: 1, // 初始默认选择
        loading: true,
        radioGroup: [{
          name: this.$t('dashboard.analytics.flow.radio.visitor'),
          label: 1,
          onChange: (row) => {
            this.radioChange('distributionConfig', row, (res) => {
              if (res) {
                this.distributionConfig.options = this.totalData.flowCountryIp
              }
            })
          }
        }, {
          name: this.$t('dashboard.analytics.flow.radio.visits'),
          label: 2,
          onChange: (row) => {
            this.radioChange('distributionConfig', row, (res) => {
              if (res) {
                this.distributionConfig.options = this.totalData.flowCountryPv
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
      // 流量来源配置
      sourceConfig: {
        // 单选
        radio: 1, // 初始默认选择
        loading: true,
        radioGroup: [{
          name: this.$t('dashboard.analytics.flow.radio.visitor'),
          label: 1,
          onChange: (row) => {
            this.radioChange('sourceConfig', row, (res) => {
              if (res) {
                this.sourceConfig.options = this.totalData['flowSourceIp']
              }
            })
          }
        }, {
          name: this.$t('dashboard.analytics.flow.radio.visits'),
          label: 2,
          onChange: (row) => {
            this.radioChange('sourceConfig', row, (res) => {
              if (res) {
                this.sourceConfig.options = this.totalData['flowSourcePv']
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
      // 流量趋势配置
      trendConfig: {
        // 单选
        radio: 1, // 初始默认选择
        loading: true,
        radioGroup: [{
          name: this.$t('dashboard.analytics.flow.radio.visitor'),
          label: 1,
          onChange: (row) => {
            this.radioChange('trendConfig', row, (res) => {
              if (res) {
                this.trendConfig.options = this.totalData['flowTrendIp']
              }
            })
          }
        }, {
          name: this.$t('dashboard.analytics.flow.radio.visits'),
          label: 2,
          onChange: (row) => {
            this.radioChange('trendConfig', row, (res) => {
              if (res) {
                this.trendConfig.options = this.totalData.flowTrendPv
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
        radio: 1, // 初始默认选择
        loading: true,
        radioGroup: [{
          name: this.$t('dashboard.analytics.flow.radio.visitor'),
          label: 1,
          onChange: (row) => {
            this.radioChange('terminalConfig', row, (res) => {
              if (res) {
                this.terminalConfig.pieOptions = this.totalData.deviceIp
                this.terminalConfig.histogramOptions = this.totalData.monthIpMap
              }
            })
          }
        }, {
          name: this.$t('dashboard.analytics.flow.radio.visits'),
          label: 2,
          onChange: (row) => {
            this.radioChange('terminalConfig', row, (res) => {
              if (res) {
                // 1 IP 2 PV 终端占比饼图
                this.terminalConfig.pieOptions = this.totalData.devicePv
                // 终端占比柱图
                this.terminalConfig.histogramOptions = this.totalData.monthPvMap
              }
            })
          }
        }],
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
    this.getViewId((success) => {
      if (success) {
        this.getDate()
      }
    })
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
        this.getViewId((success) => {
          if (success) {
            this.getDate()
          }
        })
      }
    }
  },
  methods: {
    /**
     * GA绑定跳转
     */
    jumpToGA () {
      console.log('ga')
      this.$router.push(`/site/${this.siteModel.id}/analytics/ga`)
    },
    /**
     * GET VIEW ID
     */
    getViewId (fun) {
      if (this.utility.isNotEmpty(this.viewId) && fun && typeof (fun) === 'function') {
        fun.call(this, true)
      } else if (this.viewId === null) {
        fetchGetViewId({
          siteId: this.siteModel.id
        })
          .then(result => {
            this.pageValid()
            this.resultMessage(result, success => {
              if (success) {
                this.viewId = result.data && result.data.viewId
                if (this.utility.isNotEmpty(this.viewId) && fun && typeof (fun) === 'function') {
                  fun.call(this, true)
                }
                if (this.utility.isEmpty(this.viewId)) {
                  this.activeName = 'inquiry'
                }
              }
            })
          })
          .catch(error => {
            this.pageInvalid(error)
          })
      }
    },
    /**
     * 获取数据
     */
    getDate () {
      if (this.utility.isEmpty(this.viewId)) {
        this.pageValid()
        return false
      }
      this.pageLoading = true
      this.setLoadingState(true)
      let data = {
        'startTime': this.daterange[0],
        'endTime': this.daterange[1],
        'siteId': this.websiteId
      }
      fetchFlowAnalysis(data).then(res => {
        this.resultMessage(res, (success) => {
          if (success) {
            this.totalData = res.data
            this.aggregate.forEach((item, index) => {
              if (item.hasOwnProperty('monthIp')) {
                item.data = res.data.monthIp
              }
              if (item.hasOwnProperty('monthPv')) {
                item.data = res.data.monthPv
              }
              if (item.hasOwnProperty('totalIp')) {
                item.data = res.data.totalIp
              }
              if (item.hasOwnProperty('totalPv')) {
                item.data = res.data.totalPv
              }
            })
            // 1 IP 2 PV 流量来源
            this.sourceConfig.options = this.sourceConfig.radio === 1 ? res.data.flowSourceIp : res.data.flowSourcePv
            // 1 IP 2 PV 流量分布
            this.distributionConfig.options = this.distributionConfig.radio === 1 ? res.data.flowCountryIp : res.data.flowCountryPv
            // 1 IP 2 PV 流量趋势
            this.trendConfig.options = this.trendConfig.radio === 1 ? res.data.flowTrendIp : res.data.flowTrendPv
            // 1 IP 2 PV 终端占比饼图
            this.terminalConfig.pieOptions = this.terminalConfig.radio === 1 ? res.data.deviceIp : res.data.devicePv
            // 终端占比柱图
            this.terminalConfig.histogramOptions = this.terminalConfig.radio === 1 ? res.data.monthIpMap : res.data.monthPvMap
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
