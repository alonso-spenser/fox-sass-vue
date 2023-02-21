<template>
  <div v-if="this.model.id">
    <fox-section>
      <div>
        <el-table
          :data="model.trendData"
          style="width:100%;">
          <el-table-column
            label="年/月"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.year + '年' + scope.row.month + '月' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="homePageKeywords"
            label="首页关键字"
          >
          </el-table-column>
          <el-table-column
            prop="top2PagesKeywords"
            label="前2页关键字">
          </el-table-column>
          <el-table-column
            prop="top5PagesKeywords"
            label="前5页关键字">
          </el-table-column>
          <el-table-column
            prop="top10PagesKeywords"
            label="前10页关键字">
          </el-table-column>
          <el-table-column
            prop="hit"
            label=" 会话数">
          </el-table-column>
          <el-table-column
            prop="iPNum"
            label="独立IP个数">
          </el-table-column>
          <el-table-column
            v-if="false"
            prop="includedNum"
            label=" 网站收录量">
          </el-table-column>
          <el-table-column
            v-if="false"
            prop="highQualityNum"
            label="高质量访客数 ">
          </el-table-column>
          <el-table-column
            v-if="false"
            prop="multiplePageNum"
            label="多页面访问数 ">
          </el-table-column>
        </el-table>
      </div>
      <div style="margin: 50px 0">
        <xianXing :optio="model.trendFigure"></xianXing>
      </div>
    </fox-section>
  </div>
  <el-empty
    description="暂无数据"
    v-else></el-empty>
</template>

<script>
import xianXing from './echarts/xianXing'

export default {
  name: 'recent-trends',
  components: { xianXing },
  props: {
    model: {
      type: Object,
      default: () => {
        return {
          trendData: [],
          trendFigure: {}
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
