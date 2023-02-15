<template>
  <main>
    <fox-page-loading
      :percentage="100"
    >
      <el-row class="data-center-tap section-neighbor">
        <el-col :span="12">
          <el-tabs v-model="searchConditions.activeName">
            <el-tab-pane
              v-for="(item,index) in $t('dashboard.analytics.tabPane')"
              :key="index"
              :label="item.label"
              :name="item.name">
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col
          :span="12"
          class="text-right">
          <el-button
            type="text"
            @click="redirectGA"
            class="mr-3">
            {{ $t('dashboard.ga.setting') }}
          </el-button>
          <el-date-picker
            v-model="searchConditions.daterange"
            type="daterange"
            size="small"
            :picker-options="pickerOptions"
            range-separator="-"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
            :start-placeholder="$t('base.placeholder.date')"
            :end-placeholder="$t('base.placeholder.date')"
          >
          </el-date-picker>
        </el-col>
      </el-row>
      <div class="disabled-container section-neighbor">
        <!--询盘-->
        <inquiry-temp
          v-if="searchConditions.activeName==='inquiry'"
          :daterange="searchConditions.daterange"
          :website-id="searchConditions.websiteId">
        </inquiry-temp>
        <!--流量-->
        <flow-temp
          v-if="searchConditions.activeName==='flow'"
          :daterange="searchConditions.daterange"
          :website-id="searchConditions.websiteId">
        </flow-temp>
        <!--访问-->
        <visit-temp
          v-if="searchConditions.activeName==='visit'"
          :daterange="searchConditions.daterange"
          :website-id="searchConditions.websiteId">
        </visit-temp>
      </div>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import flowTemp from '../components/flow'
import visitTemp from '../components/visit'
import inquiryTemp from '../components/inquiry'
import { mapState } from 'vuex'
import units from '@/plugins/utility'

export default {
  name: 'dataCenter',
  extends: extend,
  data () {
    return {
      daterange: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  components: {
    flowTemp,
    visitTemp,
    inquiryTemp
  },
  computed: {
    ...mapState(['siteModel'])
  },
  created () {
    if (!this.searchConditions.activeName) {
      this.$set(this.searchConditions, 'activeName', 'inquiry')
    }
    if (!this.searchConditions.daterange) {
      let startTime = units.getBeforeDayTimeString(30)
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
      this.$set(this.searchConditions, 'daterange', [startTime, endTime])
    }
    this.pagingCache((success) => {
      this.$set(this.searchConditions, 'websiteId', this.siteModel.id)
    })
  },
  methods: {
    /**
     * GA设置
     */
    redirectGA () {
      this.$router.push(`/site/${this.siteId}/analytics/ga`)
    },
    /**
     * 初始搜索时间* @param day 天数
     */
    initSearchTime (day = 30) {
      let nowDate = new Date()
      nowDate.setDate(nowDate.getDate() - day)
      return [nowDate.getTime(), new Date().getTime()]
    }
  }
}
</script>

<style lang="scss">
.data-center-tap {
  box-sizing: border-box;
  z-index: 1;
  border-bottom: solid 2px #E4E7ED;;
  margin-bottom: 10px;

  .el-tabs__header {
    margin: 0 !important;

    .el-tabs__nav-wrap::after {
      height: 0;
    }

    .el-tabs__nav {
      padding-bottom: 6px;
    }
  }
}
</style>
