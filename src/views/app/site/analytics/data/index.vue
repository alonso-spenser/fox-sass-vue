<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
    :percentage="100"
  >
    <el-row
      class="data-center-tap"
      slot="header">
      <el-col :span="12">
        <el-tabs v-model="activeName">
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
          v-model="timeRange"
          type="daterange"
          size="small"
          :picker-options="pickerOptions"
          range-separator="-"
          unlink-panels
          @change="dateChange"
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
        v-if="activeName==='inquiry'"
        :daterange="timeRange"
        :website-id="siteId">
      </inquiry-temp>
      <!--流量-->
      <flow-temp
        v-if="activeName==='flow'"
        :daterange="timeRange"
        :website-id="siteId">
      </flow-temp>
      <!--访问-->
      <visit-temp
        v-if="activeName==='visit'"
        :daterange="timeRange"
        :website-id="siteId">
      </visit-temp>
    </div>
  </fox-layout-main>
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
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      activeName: 'inquiry',
      timeRange: null
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
    this.pageLoading = false
    this.getRecently()
  },
  methods: {
    dateChange (value) {
      if (value === null) {

      }
    },
    getRecently () {
      let startTime = units.getBeforeDayTimeString(30)
      let endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime()
      this.timeRange = [startTime, endTime]
    },
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
  padding: 5px 16px 0 16px;
  border-bottom: solid 1px #E4E7ED;;

  .el-tabs__header {
    margin: 0;

    .el-tabs__nav-wrap::after {
      height: 0;
    }

    .el-tabs__nav {
      padding-bottom: 6px;
    }
  }
}
</style>
