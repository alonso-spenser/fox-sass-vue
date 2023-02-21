<template>
  <div v-if="model.id">
    <fox-section
      v-if="model.seoTarget.hasService"
      :heading="(model.seoTarget.merchantName ?  model.seoTarget.merchantName :'公司')+': 合同目标'">
      <el-row class="data-list">
        <el-col :span="7">
          <!-- 接单总数 -->
          <span>合作日期 ：</span>
          <h3> {{ $moment(model.seoTarget.startTime).format('YYYY/MM/DD') }} -
               {{ $moment(model.seoTarget.finishTime).format('YYYY/MM/DD') }} </h3>
        </el-col>
        <el-col :span="7">
          <!-- 接单总数 -->
          <span>前两页关键字数 ：</span>
          <h3>{{ model.seoTarget['seoHomeKeywords'] }} </h3>
        </el-col>
        <el-col :span="7">
          <!-- 接单总数 -->
          <span>共优化关键字数 ：</span>
          <h3>{{ model.seoTarget['seoKeywords'] }} </h3>
        </el-col>
      </el-row>
    </fox-section>
    <fox-section
      :heading="heading"
      v-if="model.seoTarget.hasService"
    >
      <el-row class="data-list">
        <el-col :span="4">
          <small> 首页关键字 </small>
          <h4>{{ model.surveyData.homePageKeywords }}</h4>
        </el-col>
        <el-col :span="4">
          <small> 前2页关键字数 </small>
          <h4> {{ model.surveyData.top2PagesKeywords }} </h4>
        </el-col>
        <el-col :span="4">
          <small> 前5页关键字数 </small>
          <h4> {{ model.surveyData.top5PagesKeywords }} </h4>
        </el-col>
        <el-col :span="4">
          <small> 前10页关键字数 </small>
          <h4> {{ model.surveyData.top10PagesKeywords }} </h4>
        </el-col>
        <el-col :span="4">
          <small>本月询盘数 </small>
          <h4>{{ model.surveyData.inquiryNum }}</h4>
        </el-col>
        <el-col :span="4">
          <small>总询盘数 </small>
          <h4>{{ model.surveyData.inquiryQuantity }}</h4>
        </el-col>
        <el-col
          :span="4"
          v-if="false">
          <small> 会话数 </small>
          <h4> {{ model.surveyData.hit }} </h4>
        </el-col>
        <el-col
          :span="3"
          v-if="false">
          <small> 独立IP数 </small>
          <h4>{{ model.surveyData.ipnum }} </h4>
        </el-col>
      </el-row>
    </fox-section>
    <el-row
      type="flex"
      justify="space-between"
      :gutter="20">
      <el-col>
        <lineTemp
          :optio="model.surveyFigure"
          :legends="model.surveyData"
          :loading="model.loading"
          title="用户趋势"
        ></lineTemp>
      </el-col>
    </el-row>
    <fox-section
      heading="您的用户身处何地"
      class="mt-5">
      <el-row>
        <el-col :span="12">
          <div style="width: 100%;">
            <div style="margin-top: 50px">
              <el-table
                :data="model.placeData"
                style="width:100%;height: 100%;"
                height="480"
              >
                <el-table-column
                  prop="country"
                  label="国家/地区"
                  width="130">
                </el-table-column>
                <el-table-column
                  prop="users"
                  label="用户"
                >
                </el-table-column>
                <el-table-column
                  prop="hit"
                  label="会话数">
                </el-table-column>
                <el-table-column
                  prop="exitRate"
                  label="跳出率">
                </el-table-column>
                <el-table-column
                  prop="avgSessionDuration"
                  label="平均会话时长(秒)"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="inquiryNum"
                  label="询盘">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <!-- 世界地图-->
          <div style="height: 400px;width: 100%">
            <wordTemp
              :dataMap="model.placeData"
            ></wordTemp>
          </div>
        </el-col>
      </el-row>
    </fox-section>
    <fox-section heading="您的用户经常访问哪些页面">
      <el-row
        :gutter="20"
        class="section-neighbor">
        <el-col>
          <el-table
            :data="model.pageData"
            class="w-100"
          >
            <el-table-column
              prop="pagePath"
              label="网页"
              width="330">
              <template slot-scope="scope">
                {{ getPath(scope.row['pagePath']) }}
              </template>
            </el-table-column>
            <el-table-column
              prop="users"
              label="网页浏览量"
            >
            </el-table-column>
            <el-table-column
              prop="avgTimeOnPage"
              label="平均页面停留时间 (秒) ">
            </el-table-column>
            <el-table-column
              prop="exitRate"
              label="跳出率 (%) ">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
    </fox-section>
    <el-row
      type="flex"
      justify="space-between"
      :gutter="20"
      class="section-neighbor">
      <el-col :span="12">
        <pie-temp
          :optio="model.deviceFigure"
          :equipment="model.deviceData"
          :radio="1"
          :loading="model.loading"
          title="按设备划分的会话数"
        ></pie-temp>
        <!--              :radioGroup="trendConfig.radioGroup"-->
      </el-col>
      <el-col :span="12">
        <fox-section>
          <el-table
            :data="model.deviceData"
            style="width:100%;"
            height="500"
          >
            <el-table-column
              label="设备类别"
            >
              <template slot-scope="scope">
                <span>{{ $t('statement.equipment')[scope.row.deviceCategory] }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="users"
              label="新用户"
            >
            </el-table-column>
            <el-table-column
              prop="hit"
              label="会话数">
            </el-table-column>
            <!--            <el-table-column-->
            <!--              prop="exitRate"-->
            <!--              label="跳出率(%)">-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--              prop="avgSessionDuration"-->
            <!--              label="平均会话时长(秒)"-->
            <!--              width="140">-->
            <!--            </el-table-column>-->
            <!--            <el-table-column-->
            <!--              prop="inquiryNum"-->
            <!--              label="询盘">-->
            <!--            </el-table-column>-->
          </el-table>
        </fox-section>
      </el-col>
    </el-row>
  </div>
  <el-empty
    description="暂无数据"
    v-else></el-empty>
</template>

<script>
import extend from '@/plugins/page/paging'
import wordTemp from './echarts/word'
import lineTemp from './echarts/line'
import pieTemp from './echarts/pie'

export default {
  extends: extend,
  name: 'data-report',
  components: { wordTemp, lineTemp, pieTemp },
  props: {
    model: {
      type: Object,
      default: () => {
        return {
          contractTarget: '', // 合作目标
          surveyData: [], // 概览
          placeData: [], // 用户身处地
          pageData: [], // 您的用户经常访问哪些页面
          deviceData: [], // 设备
          deviceFigure: [],
          month: '',
          year: ''
        }
      }
    }
  },
  computed: {
    heading () {
      return `${this.model.year}年${this.model.month}月份数据报告`
    }
  },
  data () {
    return {
      userTrends: '', // 用户趋势
      // 询盘趋势配置
      trendConfig: {
        // 单选
        radio: 1, // 初始默认选择
        radioGroup: [{
          name: this.$t('dashboard.analytics.inquiry.radio.pc'),
          label: 1,
          onChange: (row) => {
            this.radioChange('model', row, (res) => {
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
        }, {
          name: '平板端',
          label: 3,
          onChange: (row) => {
            this.radioChange('trendConfig', row, (res) => {
              if (res) {
                this.trendConfig.options = this.totalData.moEnquiryTrend
              }
            })
          }
        }
        ],
        // 图形数据配置
        options: {
          columns: [],
          rows: []
        }
      },
      tableOptions: { loading: false }
    }
  },
  methods: {
    getPath (path) {
      return path === '/' ? '首页' : path
    }
  }
}
</script>

<style
  lang="scss"
  scoped>

.data-list {
  .el-col {
    text-align: center;

    small {
      margin-bottom: 5px;
      color: #909399;
    }

    h3 {
      display: inline-block;
    }
  }
}
</style>
