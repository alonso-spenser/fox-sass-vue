<template>
  <main>
    <el-tabs
      v-model="searchConditions.activeName"
      class="opt-tabs">
      <template v-for="(item,index) in tabPane">
        <el-tab-pane
          :name="item.name"
          :label="item.label"
          :key="index"
          v-if="validSiteType(item.siteType)"></el-tab-pane>
      </template>
    </el-tabs>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :percentage="100"
    >
      <!--table-->
      <div class="section-neighbor">
        <el-form
          :model="dataset"
          :rules="formRules"
          ref="update"
          label-width="100px"
          label-position="top">
          <el-table
            v-loading="tableOptions.loading"
            :data="dataset.infoList"
            :expand-row-keys="expendKey"
            :row-key="getRowKeys"
            @expand-change="expandChange"
            class="optimize-table"
          >
            <template v-for="(column, index) in columns">
              <el-table-column
                :prop="column.prop"
                :width="column.width"
                :label="column.label"
                :key="index">
                <template slot-scope="scope">
                  <div
                    class="embed-responsive embed-responsive-4by3 el-button"
                    v-if="column.prop === 'coverImage'">
                    <img
                      class="embed-responsive-item"
                      :src="scope.row.coverImage || '/theme/img/placeholder.jpg'">
                  </div>
                  <div v-else>
                    <div
                      class="optimize-preview text-secondary text-truncate"
                      v-if="searchConditions.activeName !== 'commonPage'">
                      https://{{ siteModel.mainDomain }}
                      <i class="el-icon-arrow-right"></i>
                      {{ catalog }}
                      <i class="el-icon-arrow-right"></i>
                      {{ scope.row.seoUrl }}
                      <i class="el-icon-more rotate-90"></i>
                    </div>
                    <h4 class="text-blue mt-0 mb-2 text-truncate">
                      {{ scope.row.title }}
                    </h4>
                    <div class="text-secondary word-wrap text-description">
                      {{ scope.row.seoDescription }}
                    </div>
                  </div>
                </template>
              </el-table-column>
            </template>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form-item
                  :label="$t(`searchEngine.title.${activeName}.label`)"
                  :prop="`infoList.${scope.$index}.title`"
                  :rules="formRules.specKey"
                >
                  <el-input
                    size="small"
                    maxlength="127"
                    show-word-limit
                    :placeholder="$t(`searchEngine.title.${activeName}.placeholder`)"
                    v-model="scope.row.title"
                    @blur="setCapitalize"
                    :data-index="scope.$index"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  :label="`${$t('searchEngine.entity.seoTitle.label')} &lt;title&gt;`"
                  :prop="`infoList.${scope.$index}.seoTitle`"
                  :rules="formRules.specKey"
                >
                  <el-input
                    size="small"
                    :placeholder="$t('searchEngine.entity.seoTitle.placeholder')"
                    v-model="scope.row.seoTitle"
                    @blur="setCapitalize"
                    :data-index="scope.$index"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  :label="`${$t('searchEngine.entity.seoDesc.label')} &lt;meta name=&quot;description&quot;&gt;`"
                  :prop="`infoList.${scope.$index}.seoDescription`"
                  :rules="formRules.specKey"
                >
                  <el-input
                    size="small"
                    type="textarea"
                    autosize
                    maxlength="320"
                    show-word-limit
                    :placeholder="$t('searchEngine.entity.seoDesc.placeholder')"
                    v-model="scope.row.seoDescription"
                    @blur="setCapitalize"
                    :data-index="scope.$index"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  :label="`${$t('searchEngine.entity.seoKeywords.label')} &lt;meta name=&quot;keywords&quot;&gt;`"
                  :prop="`infoList.${scope.$index}.seoKeywords`"
                  :rules="formRules.specKey"
                >
                  <el-input
                    size="small"
                    type="textarea"
                    autosize
                    maxlength="320"
                    show-word-limit
                    :placeholder="$t('searchEngine.entity.seoKeywords.placeholder')"
                    v-model="scope.row.seoKeywords"
                    @blur="setCapitalize"
                    :data-index="scope.$index"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('searchEngine.entity.seoH1.label')"
                  :prop="`infoList.${scope.$index}.seoH1`"
                  :rules="formRules.specKey"
                >
                  <el-input
                    size="small"
                    type="textarea"
                    autosize
                    :placeholder="$t('searchEngine.entity.seoH1.placeholder')"
                    v-model="scope.row.seoH1"
                    @blur="setCapitalize"
                    :data-index="scope.$index"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  :label="$t('searchEngine.entity.seoUrl.label')"
                  :prop="`infoList.${scope.$index}.seoUrl`"
                  :rules="formRules.seoUrl"
                  v-if="searchConditions.activeName !== 'commonPage'"
                >
                  <el-input
                    size="small"
                    maxlength="200"
                    show-word-limit
                    :placeholder="$t('searchEngine.entity.seoUrl.placeholder')"
                    v-model="scope.row.seoUrl"
                  >
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div class="section-neighbor text-right">
        <el-pagination
          v-if="pagingOptions.recordCount"
          background
          :current-page="pagingOptions.pageIndex"
          :page-sizes="pagingOptions.pageSizes"
          :page-size="pagingOptions.pageSize"
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="pagingOptions.recordCount">
        </el-pagination>
      </div>
      <fo-fixed-unsaved
        :unsaved.sync="unsaved"
        @confirmed="update"
      >
      </fo-fixed-unsaved>
    </fo-page-loading>
  </main>
</template>

<script>
import {
  mapState
} from 'vuex'
import extend from '@/plugins/page/unsaved'
import {
  fetchOptimizePaging,
  fetchOptimizeUpdate
} from '@/plugins/api/optimize'

export default {
  name: 'appSeoIndex',
  extends: extend,
  computed: {
    ...mapState(['siteModel'])
  },
  data () {
    /**
     * URL清理
     * @param rule
     * @param value
     * @param callback
     */
    let validateURL = (rule, value, callback) => {
      let field = rule.field.split('.')
      let isValid = false
      if (field.length > 1) {
        let index = parseInt(field[1])
        value = this.utility.urlFilter(value)
        if (this.utility.isEmpty(value)) {
          value = this.utility.urlFilter(this.dataset.infoList[index].title || this.dataset.infoList[index].seoTitle)
        }
        let m = this.dataset.infoList.filter((o, fieldIndex) => {
          return o.seoUrl === value && index !== fieldIndex
        })
        if (m.length === 0) {
          isValid = true
          this.dataset.infoList[index].seoUrl = value
        }
      }
      if (isValid) {
        callback()
      } else {
        callback(new Error(''))
      }
    }
    return {
      columns: [],
      step: [
        {
          icon: 'el-icon-thumb',
          title: this.$t('seo.step.one')
        },
        {
          icon: 'el-icon-edit',
          title: this.$t('seo.step.two')
        },
        {
          icon: 'el-icon-plus',
          title: this.$t('seo.step.three')
        }
      ],
      tabPane: [
        {
          label: this.$t('seo.tabPane.goods'),
          name: 'goods',
          infoType: 2,
          image: true,
          catalog: 'item',
          title: this.$t('searchEngine.title.goods'),
          siteType: [3, 4]
        },
        {
          label: this.$t('seo.tabPane.goodsCollect'),
          name: 'goodsCollection',
          infoType: 4,
          image: true,
          catalog: 'collection',
          title: this.$t('searchEngine.title.goodsCollection.label'),
          siteType: [3, 4]
        },
        {
          label: this.$t('seo.tabPane.article'),
          name: 'article',
          infoType: 1,
          image: true,
          catalog: 'item',
          siteType: [3, 4]
        },
        {
          label: this.$t('seo.tabPane.articleCollection'),
          name: 'articleCollection',
          infoType: 3,
          image: true,
          catalog: 'collection',
          siteType: [3, 4]
        },
        {
          label: this.$t('seo.tabPane.customPage'),
          name: 'customPage',
          infoType: 9,
          image: false,
          catalog: 'pages',
          siteType: [2, 3, 4]
        },
        {
          label: this.$t('seo.tabPane.page'),
          name: 'commonPage',
          infoType: 10,
          catalog: '',
          image: false,
          siteType: [3, 4]
        }
      ],
      formRules: {
        title: [
          {
            required: true,
            message: this.$t('goods.update.entity.title.required'),
            trigger: 'blur'
          }
        ],
        specKey: [
          {
            required: true,
            message: '',
            trigger: 'blur'
          }
        ],
        specValue: [
          {
            required: true,
            message: ' ',
            trigger: 'blur'
          }
        ],
        seoUrl: [
          {
            validator: validateURL,
            trigger: 'blur'
          }
        ]
      },
      dataset: {
        infoType: 1,
        infoList: []
      },
      expendKey: [],
      catalog: '',
      activeName: '',
      hasImage: false
    }
  },
  created () {
    this.$set(this.searchConditions, 'activeName', 'goods')
    this.pagingCache((success) => {
      // this.getData(success)
    })
  },
  watch: {
    dataset: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    },
    'searchConditions.activeName': {
      handler (value) {
        this.activeName = value
        this.pagingOptions.pageIndex = 1
        this.getData()
      }
    }
  },
  methods: {
    /**
     * 不同网站类型，对应不同菜单项
     */
    validSiteType (role = []) {
      return role.indexOf(this.siteModel.siteType) > -1
    },
    /**
     * 首字大写
     */
    setCapitalize (e) {
      let index = parseInt(e.target.getAttribute('data-index'))
      if (this.dataset.infoList[index]) {
        this.dataset.infoList[index].seoDescription = this.utility.charAtToUpperCase(this.dataset.infoList[index].seoDescription)
        this.dataset.infoList[index].seoH1 = this.utility.charAtToUpperCase(this.dataset.infoList[index].seoH1)
        this.dataset.infoList[index].seoTitle = this.utility.charAtToUpperCase(this.dataset.infoList[index].seoTitle)
      }
    },
    /**
     * 清空搜索条件
     */
    clearSearchCondition () {
      this.clearCondition(() => {
        this.getData(true)
      })
    },
    /**
     * 搜索
     */
    search () {
      this.pagingOptions.pageIndex = 1
      this.getData()
    },
    /**
     * 获取展开ID
     */
    getRowKeys (row) {
      return row.id
    },
    /**
     * 扩展
     */
    expandChange (row) {
      this.expendKey = this.expendKey.length > 0 && this.expendKey[0].id === row.id ? [] : [row.id]
    },
    /**
     * 分页
     * @param index
     */
    pageChange (index) {
      this.pagingOptions.pageIndex = index
      this.getData(false)
    },
    /**
     * 加载数据
     */
    getData (first) {
      this.pagingOptions.firstLoading = first
      this.tableOptions.loading = true
      let infoType = this.getInfoType()
      fetchOptimizePaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          siteId: this.siteId,
          infoType: infoType,
          q: this.searchConditions.keyword,
          region: this.regionCode
        }
      })
        .then(result => {
          this.pageValid()
          this.tableOptions.loading = false
          this.pagingOptions.firstLoading = first
          this.resultMessage(result, (success) => {
            this.pageValid()
            if (success) {
              this.pagingOptions.recordCount = result.data.total
              this.dataset.infoList = result.data.records || result.data
              this.$nextTick(() => {
                this.unsaved = false
                this.tableOptions.loading = false
              })
            }
          })
        })
        .catch(error => {
          this.tableOptions.loading = false
          this.pageInvalid(error)
        })
    },

    /**
     * 更新
     */
    update () {
      let infoType = this.getInfoType()
      fetchOptimizeUpdate({
        infoType,
        infoList: this.dataset.infoList
      }).then(result => {
        result.options = {
          formName: 'update',
          action: this.actionType.update
        }
        this.resultMessage(result, (success) => {
          if (success) {
            this.getData()
          }
        })
      })
    },
    /**
     * 获取InfoType
     */
    getInfoType () {
      let activeName = this.searchConditions.activeName
      let arr = this.tabPane.filter((item) => item.name === activeName)
      if (arr.length > 0) {
        this.catalog = arr[0].catalog
        this.hasImage = arr[0].image
      }
      this.columns = []
      if (this.hasImage) {
        this.columns.push({
          prop: 'coverImage',
          label: this.$t('seo.tableHeader.coverImage'),
          width: 100
        })
      }
      this.columns.push({
        prop: 'title',
        label: this.$t('seo.tableHeader.preview')
      })
      return arr.length > 0 ? arr[0].infoType : ''
    }
  },
  components: {}
}
</script>

<style lang="scss">
.optimize-table {
  .el-form-item {
    &:not(:last-child) {
      margin-bottom: 10px;
    }

    .el-form-item__label {
      margin: 0;
      padding: 0;
      font-size: 12px;

      &:before {
        display: none;
      }
    }

    &:after,
    &:before {
      display: none;
    }

    .el-form-item__error {
      display: none;
    }

    .el-input {
      margin: 0;
      padding: 0;
      display: flex;
    }

    .el-form-item__content {
      display: flex;
      padding: 0;
      margin: 0;

      &:after,
      &:before {
        display: none;
      }
    }
  }

  .text-description {
    line-height: 1.5;
    font-size: 12px;
    color: #909399;
  }

  .el-table__expanded-cell {
    border: 1px solid #eceef4;
    border-top: 0;
    padding: 20px 30px;
    //background-color: #f5f7fa;
  }

  .optimize-preview {
    position: relative;
    padding-right: 15px;

    .rotate-90 {
      position: absolute;
      right: -4px;
      top: calc(50% - 5px);
    }
  }
}

.opt-tabs {
  .el-tabs__nav {
    margin-left: 20px;
  }
}
</style>
