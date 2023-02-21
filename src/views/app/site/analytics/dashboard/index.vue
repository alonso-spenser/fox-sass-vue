<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
    :percentage="100"
  >
    <!--顶部数据-->
    <el-row
      :gutter="20"
      type="flex"
      class="section-neighbor">
      <el-col :span="8">
        <fox-section
          class="dashboard-section cursor-pointer"
          v-on:click="jumpToEnquiry">
          <div v-on:click="jumpToEnquiry">
            <label class="text-secondary">{{ $t('dashboard.aggregate.inquiry.label') }}</label>
            <h3>{{ statistics.enquiryTotalNum }}</h3>
            <p>{{ $t('dashboard.aggregate.inquiry.currentMonth') }}{{ statistics.enquiryNum }}</p>
          </div>
        </fox-section>
      </el-col>
      <el-col
        :span="8"
        v-if="viewId">
        <fox-section class="dashboard-section">
          <label class="text-secondary">{{ $t('dashboard.aggregate.visit.label') }}</label>
          <h3>{{ statistics.totalPv }}</h3>
          <p>{{ $t('dashboard.aggregate.visit.currentMonth') }}{{ statistics.monthPv }}</p>
        </fox-section>
      </el-col>
      <el-col
        :span="8"
        v-if="viewId">
        <fox-section class="dashboard-section">
          <label class="text-secondary">{{ $t('dashboard.aggregate.visitor.label') }}</label>
          <h3>{{ statistics.totalIp }}</h3>
          <p>{{ $t('dashboard.aggregate.visitor.currentMonth') }}{{ statistics.monthIp }}</p>
        </fox-section>
      </el-col>
      <el-col
        :span="8"
        v-if="!viewId">
        <fox-section class="dashboard-section bound">
          <el-button
            type="primary"
            @click="jumpToGA">
            {{ $t('dashboard.ga.title') }}
          </el-button>
          <p class="text-secondary">
            {{ $t('dashboard.ga.tips') }}
          </p>
        </fox-section>
      </el-col>
    </el-row>
    <el-card
      shadow="hover"
      class="word-map section-neighbor"
      v-loading="dataMap.loading">
      <template slot="header">
        <!--顶部tab-->
        <el-row
          type="flex"
          align="center"
          class="tab-nav">
          <el-col>
            <el-tabs
              v-model="activeName"
              :before-leave="beforeLeave">
              <template v-for="(item,index) in $t('dashboard.tabPane')">
                <el-tab-pane
                  :key="index"
                  v-if="(hasViewId && index === 0) || index > 0"
                  :label="item.label"
                  :name="item.name">
                </el-tab-pane>
              </template>
            </el-tabs>
          </el-col>
          <el-col class="selected-time">
              <span
                v-for="(item,index) in dataMap.selectDay"
                :class="{'text-primary':item.active}"
                :key="index"
                @click="item.onClick">{{ item.name }}</span>
          </el-col>
        </el-row>
      </template>
      <!--询盘 && 流量-->
      <el-row>
        <el-col :span="19">
          <!-- 世界地图-->
          <div
            style="height: 620px;width: 100%"
            v-loading="dataMap.wordMap.loading">
            <word-echarts
              v-if="!dataMap.wordMap.loading"
              :radio-select="radioSelect"
              :setChina="setChina"
              :data-map="dataMap.wordMap.options"
              :radio-group="dataMap.wordMap.radioGroup">
            </word-echarts>
          </div>

        </el-col>
        <el-col
          :span="5"
          v-loading="dataMap.ranking.loading">
          <!--右侧排名-->
          <table-ranking
            :title="dataMap.ranking.title"
            :contentList="dataMap.ranking.listData"
            :rankingHeader="dataMap.ranking.header"></table-ranking>
        </el-col>
      </el-row>
    </el-card>
    <el-row
      :gutter="20"
      class="section-neighbor">
      <el-col :span="12">
        <!--流量趋势-->
        <line-echarts
          v-if="activeName==='flow' && hasViewId"
          :title="$t('dashboard.flow.trend')"
          :radio="trendConfig.radioLabel"
          :option="trendConfig.option"
          :loading="trendConfig.loading"
          :radio-group="trendConfig.radioGroup">
          <template v-slot:topRight>
            <div class="select-day-container">
                <span
                  v-for="(item,index) in trendConfig.selectDay"
                  @click="item.onClick"
                  :key="index"
                  :class="{'text-primary':item.active}">{{ item.name }}</span>
            </div>
          </template>
        </line-echarts>
        <!--询盘趋势-->
        <line-echarts
          :loading="enquiryTrend.loading"
          :option="enquiryTrend.option"
          :title="$t('dashboard.analytics.inquiry.trend.title')"
          v-if="activeName==='inquiry' || !hasViewId">
          <template v-slot:topRight>
            <div class="select-day-container">
                <span
                  v-for="(item,index) in trendConfig.selectDay"
                  @click="item.onClick"
                  :key="index"
                  :class="{'text-primary':item.active}">{{ item.name }}</span>
            </div>
          </template>
        </line-echarts>
      </el-col>
      <el-col :span="12">
        <!--流量来源-->
        <pie-echarts
          v-if="activeName==='flow' && hasViewId"
          :title="$t('dashboard.flow.source')"
          :option="sourceConfig.option"
          :loading="sourceConfig.loading"
        >
          <template v-slot:topRight>
            <div class="select-day-container">
                <span
                  v-for="(item,index) in sourceConfig.selectDay"
                  @click="item.onClick"
                  :key="index"
                  :class="{'text-primary':item.active}">{{ item.name }}</span>
            </div>
          </template>
        </pie-echarts>
        <!--询盘来源-->
        <pie-echarts
          v-if="activeName==='inquiry' || !hasViewId"
          :title="$t('dashboard.analytics.inquiry.source.title')"
          :option="enquirySource.option"
          :loading="enquirySource.loading"
        >
          <template v-slot:topRight>
            <div class="select-day-container">
                <span
                  v-for="(item,index) in sourceConfig.selectDay"
                  @click="item.onClick"
                  :key="index"
                  :class="{'text-primary':item.active}">{{ item.name }}</span>
            </div>
          </template>
        </pie-echarts>
      </el-col>
    </el-row>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import wordEcharts from '../components/echarts/word'
import tableRanking from '../components/tableRanking'
import lineEcharts from '../components/echarts/line'
import pieEcharts from '../components/echarts/pie'
// 模拟数据
// import mockData from './mock'
import {
  fetchFlowDistribution,
  fetchEnquiryDistribution,
  fetchFlowTrend,
  fetchFlowSource,
  fetchEnquirySource,
  fetchEnquiryTrend,
  fetchGetViewId
} from '@/plugins/api/dashboard'
import { mapState } from 'vuex'
import units from '@/plugins/utility'

export default {
  name: 'index',
  extends: extend,
  data () {
    return {
      activeName: 'flow',
      viewId: null,
      /**
       * 数据统计
       */
      statistics: {
        enquiryNum: 0,
        enquiryTotalNum: 0,
        monthIp: 0,
        monthPv: 0,
        totalIp: 0,
        totalPv: 0
      },
      radioType: {
        flow: [{
          name: this.$t('dashboard.analytics.flow.radio.visitor'),
          label: 1,
          onChange: (row) => {
            this.dataMapSelectRio(row, () => {
              this.dataMapLoading(true, () => {
                this.getWordData()
              })
            })
          }
        }, {
          name: this.$t('dashboard.analytics.flow.radio.visits'),
          label: 2,
          onChange: (row) => {
            this.dataMapSelectRio(row, () => {
              this.dataMapLoading(true, () => {
                this.getWordData()
              })
            })
          }
        }],
        inquiry: [{
          name: this.$t('dashboard.analytics.inquiry.radio.pc'),
          label: 1,
          onChange: (row) => {
            this.dataMapSelectRio(row, () => {
              this.dataMapLoading(true, () => {
                this.getWordData()
              })
            })
          }
        }, {
          name: this.$t('dashboard.analytics.inquiry.radio.mobile'),
          label: 2,
          onChange: (row) => {
            this.dataMapSelectRio(row, () => {
              this.dataMapLoading(true, () => {
                this.getWordData()
              })
            })
          }
        }]
      },
      // 世界地图
      dataMap: {
        wordMap: {
          // data: mockData.wordEcharts,
          data: [],
          options: [],
          radioLabel: {
            flow: 1,
            inquiry: 1
          },
          loading: true,
          radioGroup: []
        },
        loading: true,
        day: 'seven',
        selectDay: [
          {
            label: 'seven',
            active: true,
            name: this.$t('dashboard.selectDay.seven'),
            onClick: () => {
              this.selectDay('dataMap', 0, () => {
                this.dataMapLoading(true, () => {
                  this.getWordData()
                })
              })
            }
          },
          {
            label: 'thirty',
            active: false,
            name: this.$t('dashboard.selectDay.thirty'),
            onClick: () => {
              this.selectDay('dataMap', 1, () => {
                this.dataMapLoading(true, () => {
                  this.getWordData()
                })
              })
            }
          }
        ],
        ranking: {
          loading: false,
          title: this.$t('dashboard.flow.title'),
          header: this.$t('dashboard.flow.ranking.header'),
          listData: []
        }
      },
      // 流量趋势
      trendConfig: {
        option: {
          columns: [],
          rows: []
        },
        day: 'seven',
        loading: false,
        radioLabel: 1,
        radioGroup: [{
          name: this.$t('dashboard.analytics.flow.radio.visitor'),
          label: 1,
          onChange: (row) => {
            this.selectRio('trendConfig', row, () => {
              this.getFlowTrend()
            })
          }
        }, {
          name: this.$t('dashboard.analytics.flow.radio.visits'),
          label: 2,
          onChange: (row) => {
            this.selectRio('trendConfig', row, () => {
              this.getFlowTrend()
            })
          }
        }],
        selectDay: [
          {
            label: 'seven',
            active: true,
            name: this.$t('dashboard.selectDay.seven'),
            onClick: () => {
              this.selectDay('trendConfig', 0, () => {
                this.getFlowTrend()
              })
            }
          },
          {
            label: 'thirty',
            active: false,
            name: this.$t('dashboard.selectDay.thirty'),
            onClick: () => {
              this.selectDay('trendConfig', 1, () => {
                this.getFlowTrend()
              })
            }
          }
        ]
      },
      // 流量来源
      sourceConfig: {
        option: {
          columns: [],
          rows: []
        },
        loading: false,
        day: 'seven',
        selectDay: [
          {
            label: 'seven',
            active: true,
            name: this.$t('dashboard.selectDay.seven'),
            onClick: () => {
              this.selectDay('sourceConfig', 0, () => {
                this.getFlowSource()
              })
            }
          },
          {
            label: 'thirty',
            active: false,
            name: this.$t('dashboard.selectDay.thirty'),
            onClick: () => {
              this.selectDay('sourceConfig', 1, () => {
                this.getFlowSource()
              })
            }
          }
        ]
      },
      // 询盘趋势
      enquiryTrend: {
        option: {
          columns: [],
          rows: []
        },
        loading: false,
        day: 'seven',
        selectDay: [
          {
            label: 'seven',
            active: true,
            name: this.$t('dashboard.selectDay.seven'),
            onClick: () => {
              this.selectDay('enquiryTrend', 0, () => {
                this.getEnquiryTrend()
              })
            }
          },
          {
            label: 'thirty',
            active: false,
            name: this.$t('dashboard.selectDay.thirty'),
            onClick: () => {
              this.selectDay('enquiryTrend', 1, () => {
                this.getEnquiryTrend()
              })
            }
          }
        ]
      },
      // 询盘来源
      enquirySource: {
        option: {
          columns: [],
          rows: []
        },
        loading: false,
        day: 'seven',
        selectDay: [
          {
            label: 'seven',
            active: true,
            name: this.$t('dashboard.selectDay.seven'),
            onClick: () => {
              this.selectDay('enquirySource', 0, () => {
                this.getEnquirySource('source')
              })
            }
          },
          {
            label: 'thirty',
            active: false,
            name: this.$t('dashboard.selectDay.thirty'),
            onClick: () => {
              this.selectDay('sourceConfig', 1, () => {
                this.getEnquirySource('source')
              })
            }
          }
        ]
      }
    }
  },
  components: {
    tableRanking,
    wordEcharts,
    lineEcharts,
    pieEcharts
  },
  computed: {
    ...mapState(['siteModel']),
    dataMapRadio () {
      return this.radioType[this.activeName]
    },
    setChina () {
      return this.activeName === 'inquiry'
    },
    radioSelect () {
      return this.dataMap.wordMap.radioLabel[this.activeName]
    },
    hasViewId () {
      return this.utility.isNotEmpty(this.viewId)
    }
  },
  watch: {
    activeName: {
      immediate: true,
      handler (val) {
        this.dataMap.wordMap.radioGroup = this.radioType[val]
        if (val === 'inquiry') {
          this.initEnquiryData()
        } else {
          this.getViewId((success) => {
            if (success) {
              this.initFlowData()
            }
          })
        }
      }
    }
  },
  created () {
    // if (this.siteModel && this.utility.isNotEmpty(this.siteModel.id)) {
    //   this.getViewId()
    // } else {
    //
    // }
  },
  methods: {
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
    closeLoading () {
      if (this.activeName === 'inquiry') {
        this.dataMap.loading = false
        this.trendConfig.loading = false
        this.sourceConfig.loading = false
      } else {
        this.enquirySource.loading = false
        this.enquiryTrend.loading = false
      }
    },
    /**
     * 初始获取流量相关数据
     */
    initFlowData () {
      if (this.utility.isEmpty(this.viewId)) {
        return false
      }
      let wp = this.getParams('dataMap')// 世界地图参数
      let fp = this.getParams('trendConfig') // 流量趋势参数
      let sp = this.getParams('sourceConfig') // 流量来源参数
      Promise.all([fetchFlowDistribution(wp), fetchFlowTrend(fp), fetchFlowSource(sp)])
        .then(([wordData, flowData, sourceData]) => {
          this.resultMessage(wordData, (success) => {
            if (success) {
              // 设置世界地图相关
              this.setWordData(wordData)
              this.setFlowTrendData(flowData)
              this.setFlowSourceData(sourceData)
            } else {
              this.dataMap.loading = false
              if (wordData['code'] === 12010005) {
                this.boundGA = false
              }
            }
          })
        }).catch((err) => {
          this.pageInvalid()
          this.networkMistake(err)
        })
    },

    /**
     * 初始获取询盘相关数据
     */
    initEnquiryData () {
      let wp = this.getParams('dataMap')// 世界地图参数
      let ep = this.getParams('enquiryTrend') // 询盘趋势参数
      let esp = this.getParams('enquirySource') // 询盘来源参数
      Promise.all([fetchEnquiryDistribution(wp), fetchEnquiryTrend(ep), fetchEnquirySource(esp)]).then(([wordData, enquiryTrendData, sourceData]) => {
        this.resultMessage(wordData, (success) => {
          if (success) {
            // 设置世界地图相关
            this.setWordData(wordData)
            // 设置询盘趋势数据
            this.enquiryTrend.loading = false
            this.enquiryTrend.option = enquiryTrendData.data.enquiryTrend
            // 设置询盘来源数据
            this.enquirySource.loading = false
            this.enquirySource.option = sourceData.data.enquirySource
          } else {
            this.$message.error(wordData.msg)
          }
        })
      }).catch((err) => {
        this.pageInvalid()
        this.networkMistake(err)
      })
    },
    /**
     * 设置世界地图相关数据
     */
    setWordData (wordData) {
      let isFlow = this.activeName === 'flow'
      if (isFlow) {
        this.statistics = { ...wordData.data }
        let radioType = this.dataMap.wordMap.radioLabel.flow
        // 1 ip 2 PV
        let res = radioType === 1 ? wordData.data.flowDistributionCountryIp : wordData.data.flowDistributionCountryPv
        this.deleteObjType(res.rows, 'type')
        this.dataMap.wordMap.options = res.rows // 世界地图数据
        this.dataMap.ranking.listData = wordData.data.flowCountryIp.rows // 排名数据
      } else {
        let radioType = this.dataMap.wordMap.radioLabel.inquiry
        // 1 pc 2 mobile
        let res = radioType === 1 ? wordData.data.pcWorldResult : wordData.data.moWorldResult
        this.dataMap.ranking.listData = radioType === 1 ? wordData.data.pcDistributionResult : wordData.data.moDistributionResult // 排名数据
        this.deleteObjType(res, 'type')
        this.dataMap.wordMap.options = res // 世界地图数据
      }
      this.dataMap.loading = false
      this.dataMapLoading(false)
    },

    /**
     * 设置流量趋势相关数据
     */
    setFlowTrendData (trendData) {
      let res = this.trendConfig.radioLabel === 1 ? trendData.data.flowTrendIp : trendData.data.flowTrendPv
      this.deleteObjType(res.columns, 'type')
      this.deleteObjType(res.rows, 'type')
      this.trendConfig.option = res
      this.trendConfig.loading = false
    },
    /**
     * 设置流量来源相关数据
     */
    setFlowSourceData (sourceData) {
      let res = sourceData.data.flowSourceIp
      this.deleteObjType(res.columns, 'type')
      this.deleteObjType(res.rows, 'type')
      this.sourceConfig.option = res
      this.sourceConfig.loading = false
    },

    init () {
      Promise.all([this.getFlowTrend(), this.getFlowSource()]).then(() => {
        this.pageValid()
      })
    },

    /**
     * dataMap loading 开始
     */
    dataMapLoading (res, callback) {
      this.dataMap.wordMap.loading = res
      this.dataMap.ranking.loading = res
      callback && callback.call(this)
    },
    /**
     * 获取世界地图
     */
    getWordData (callback) {
      let params = this.getParams('dataMap')
      let isFlow = this.activeName === 'flow'
      let request = isFlow ? fetchFlowDistribution : fetchEnquiryDistribution
      request(params).then(resource => {
        this.resultMessage(resource, (success) => {
          if (success) {
            this.setWordData(resource)
          }
        })
      }).catch(err => {
        this.pageInvalid()
        this.networkMistake(err)
      })
    },
    /**
     * 获取请求参数
     */
    getParams (configObj) {
      let startTime = this[configObj].day === 'seven' ? units.getBeforeDayTimeString(7) : units.getBeforeDayTimeString(30)
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
      let siteId = this.siteId ? this.siteId : this.siteModel.id
      return {
        startTime,
        endTime,
        siteId: siteId
      }
    },
    /**
     * 删除不要的属性
     */
    deleteObjType (data, typeName) {
      data.forEach((item, index) => {
        if (typeof item === 'object') {
          if (item.hasOwnProperty(typeName)) {
            delete item[typeName]
          }
        } else {
          if (item === typeName) {
            data.splice(index, 1)
          }
        }
      })
    },
    /**
     * 获取流量趋势折线图
     */
    getFlowTrend (callback) {
      this.trendConfig.loading = true
      let params = this.getParams('trendConfig')
      fetchFlowTrend(params).then(resource => {
        this.resultMessage(resource, (success) => {
          if (success) {
            this.setFlowTrendData(resource)
          }
        })
      }).catch(err => {
        this.pageInvalid()
        this.networkMistake(err)
      })
    },
    /**
     * 获取流量来源饼图
     */
    getFlowSource (callback) {
      this.sourceConfig.loading = true
      let params = this.getParams('sourceConfig')
      fetchFlowSource(params).then(resource => {
        this.resultMessage(resource, (success) => {
          if (success) {
            this.setFlowSourceData(resource)
          }
        })
      }).catch(err => {
        this.pageInvalid()
        this.networkMistake(err)
      })
    },

    /**
     * 获取询盘来源饼图
     */
    getEnquirySource () {
      this.enquirySource.loading = true
      let params = this.getParams('enquirySource')
      fetchEnquirySource(params).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            this.enquirySource.loading = false
            this.enquirySource.option = result.data.enquirySource
          }
        })
      }).catch(err => {
        this.pageInvalid()
        this.networkMistake(err)
      })
    },

    /**
     * 获取询盘来源趋势折线图
     */
    getEnquiryTrend () {
      this.enquiryTrend.loading = true
      let params = this.getParams('enquiryTrend')
      fetchEnquiryTrend(params).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            this.enquiryTrend.loading = false
            this.enquiryTrend.option = result.data.enquiryTrend
          }
        })
      }).catch(err => {
        this.pageInvalid()
        this.networkMistake(err)
      })
    },
    /**
     * tap左右切换
     */
    beforeLeave (name) {
      const { dataMap } = this
      dataMap.wordMap.loading = true
      dataMap.ranking.loading = true
      dataMap.ranking.title = name === 'flow' ? this.$t('dashboard.flow.title') : this.$t('dashboard.inquiry.title')
      dataMap.ranking.header = name === 'flow' ? this.$t('dashboard.flow.ranking.header') : this.$t('dashboard.inquiry.ranking.header')
    },
    /**
     *  时间选择
     * @param selectDayObj 选择对象
     * @param index 对象数组索引
     * @param callBack 回调函数
     */
    selectDay (selectDayObj, index, callBack) {
      if (this[selectDayObj].selectDay[index].active) {
        return
      }
      this[selectDayObj].day = this[selectDayObj].selectDay[index].label
      this[selectDayObj].selectDay.forEach((item, i) => {
        item.active = i === index
      })
      callBack && callBack.call(this)
    },
    /**
     * 单项选择切换
     * selectDayObj 选择对
     * data 选择的值
     */
    selectRio (selectDayObj, data, callback) {
      this[selectDayObj].radioLabel = data
      callback && callback.call(this)
    },
    /**
     * 世界地图单项切换
     */
    dataMapSelectRio (data, callback) {
      this.dataMap.wordMap.radioLabel[this.activeName] = data
      callback && callback.call(this)
    },
    /**
     * 询盘跳转
     */
    jumpToEnquiry () {
      this.$router.push(`/site/${this.siteModel.id}/enquiry`)
    },
    /**
     * GA绑定跳转
     */
    jumpToGA () {
      console.log('ga')
      this.$router.push(`/site/${this.siteModel.id}/analytics/ga`)
    }
  }
}
</script>

<style lang="scss">
.word-map {
  .el-card__header {
    padding-bottom: 0;
    padding-top: 15px;
  }
}

.dashboard-section {
  height: 100%;

  .el-card {
    height: 100%;
  }

  &.bound {

    .el-card {
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
    }
  }

  h3 {
    font-size: 30px;
    padding-bottom: 10px;
    margin-top: 5px;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #EBEEF5;
    }

    &:before {
      left: -50%;
    }

    &:after {
      right: -50%;
    }

    & + p {
      margin-bottom: 0;
    }
  }
}

.tab-nav {
  .el-tabs__nav-wrap:after {
    background: none;
  }

  .selected-time {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    span {
      cursor: pointer;

      &:first-child {
        margin-right: 20px;
      }
    }
  }

  > .el-col {
    > .el-tabs--top {
      > .el-tabs__header {
        margin: 0 0 0 0 !important;
      }
    }
  }
}

.select-day-container {
  span {
    cursor: pointer;

    &:first-child {
      margin-right: 16px;
    }
  }
}

</style>
