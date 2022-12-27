<template>
  <div v-if="model.id">
    <el-row
      type="flex"
      justify="space-between"
      :gutter="20">
      <el-col>
        <pieTemp
          title="排名情况报告"
          :optio="model.rankingFigure"
          :keyWords="model.surveyData"></pieTemp>
      </el-col>
    </el-row>
    <fo-page-section
      class="mt-5"
      heading="情况表"
    >
      <el-row
        type="flex"
        justify="space-between"
        :gutter="20">
        <el-col>
          <el-table
            :data="model.rankingData"
            style="width:100%;"
            height="600">
            <el-table-column
              prop="keyWord"
              label="关键字"
              width="330">
            </el-table-column>
            <el-table-column
              prop="position"
              width="80"
              label="排名位置"
            >
            </el-table-column>
            <el-table-column
              prop="search"
              width="120"
              v-if="false"
              label="平均月搜索量">
            </el-table-column>
            <el-table-column
              prop="url"
              label="排名页面">
              <template slot-scope="scope">
                <a
                  :href="scope.row.url"
                  target="_blank"
                  class="text-secondary">
                  {{ scope.row.url }}
                </a>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </fo-page-section>
  </div>
  <el-empty
    description="暂无数据"
    v-else></el-empty>
</template>
<script>
import pieTemp from './echarts/pie'
import extend from '@/plugins/page/paging'

export default {
  extends: extend,
  name: 'word-ranking',
  components: { pieTemp },
  props: {
    model: {
      type: Object,
      default: () => {
        return {
          rankingData: [],
          surveyData: [],
          rankingFigure: {}
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
