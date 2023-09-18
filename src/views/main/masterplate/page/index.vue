<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    :percentage="100"
    google-style
  >
    <div class="neighbor fox-google-style percent-100" slot="header">
      <div class="fox-page-content">
        <div
          class="filter-params">
          <div class="filter-params-element" style="width: 150px">
            <fox-select
              v-model="siteTypeId"
              shrink
              @change="redirectFirstPage(getData)"
              filterable
              placeholder="网站类型">
              <el-option
                v-for="(o, index) in siteType"
                :key="`siteType${index}`"
                :label="o.label"
                :value="o.id"></el-option>
            </fox-select>
          </div>
          <div class="filter-params-element">
            <fox-input
              shrink
              :placeholder="$t('base.placeholder.label')"
              :description="$t('base.placeholder.search')"
              v-model="searchConditions.keyword"
              clearable
              @change="searchConditionChange"
              @clear="clearSearchCondition">
              <el-button
                slot="append"
                icon="el-icon-search"
                :loading="loading"
                @click="redirectFirstPage(getData)"
              ></el-button>
            </fox-input>
          </div>
          <div class="filter-params-element">
            <el-button
              icon="el-icon-plus"
              type="primary"
              plain
              class="el-material-button"
              @click="addPage"
            >
            </el-button>
          </div>
          <div class="filter-params-element">
            <el-button
              v-if="pagingOptions.dataset.length === 0 && false"
              class="el-material-button"
              icon="el-icon-plus"
              :loading="initLoading"
              :title="$t('app.refresher.button')"
              @click="initPage()"
            >
            </el-button>
            <el-button
              class="el-material-button"
              :loading="initLoading"
              @click="initSection()"
            >
              初始SECTION挂载
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <fox-paging-table
      :columns="dataConfig.columns"
      :actions="dataConfig.actions"
      :dataset="pagingOptions.dataset"
      :loading="tableOptions.loading"
      :first-loading="pagingOptions.firstLoading"
      :empty="dataConfig.empty"
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
      :multi-select="false"
      @paging="getData"
    >
    </fox-paging-table>
    <page-bind-section
      :visible.sync="bindVisible"
      v-model="bindModel"
    ></page-bind-section>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import * as http from '@/plugins/api/theme'
import pageBindSection from './components/page-bind-section'
import { themePageAppend } from '@/plugins/api/theme'

export default {
  name: 'themePage',
  extends: extend,
  components: {
    pageBindSection
  },
  data () {
    return {
      dataConfig: {
        actions: {},
        columns: [
          {
            prop: 'title',
            label: this.$t('theme.page.paging.tableHeader.title')
          },
          {
            prop: 'pageType',
            label: this.$t('theme.page.paging.tableHeader.pageType')
          },
          {
            prop: 'siteType',
            label: this.$t('theme.page.paging.tableHeader.siteType'),
            width: 80,
            render: (row) => {
              return (
                this.getSiteType(row.siteType).map((value) => {
                  return (
                    <div>{value}</div>
                  )
                })
              )
            }
          },
          {
            prop: 'addSection',
            label: this.$t('theme.page.paging.tableHeader.addSection'),
            width: 100,
            align: 'center',
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.updateField(row.id, 'addSection', row.addSection)
            }
          },
          {
            prop: 'bindSection',
            label: this.$t('theme.page.paging.tableHeader.bindSection'),
            width: 100,
            align: 'center',
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.updateField(row.id, 'bindSection', row.bindSection)
            }
          },
          {
            prop: 'hasFloatMenu',
            label: this.$t('theme.page.paging.tableHeader.hasFloatMenu'),
            width: 100,
            align: 'center',
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.updateField(row.id, 'hasFloatMenu', row.hasFloatMenu)
            }
          },
          {
            prop: 'hasFooter',
            label: this.$t('theme.page.paging.tableHeader.hasFooter'),
            width: 100,
            align: 'center',
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.updateField(row.id, 'hasFooter', row.hasFooter)
            }
          },
          {
            prop: 'hasHeader',
            label: this.$t('theme.page.paging.tableHeader.hasHeader'),
            width: 100,
            align: 'center',
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.updateField(row.id, 'hasHeader', row.hasHeader)
            }
          },
          {
            prop: 'menuVisible',
            label: this.$t('theme.page.paging.tableHeader.menuVisible'),
            width: 100,
            align: 'center',
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: row => {
              this.updateField(row.id, 'menuVisible', row.menuVisible)
            }
          },
          {
            button: true,
            label: '',
            width: 240,
            fixed: 'right',
            group: [
              {
                size: 'small',
                name: 'SECTION',
                disabled: false,
                onClick: (row) => {
                  this.bindVisible = true
                  this.bindModel = row
                }
              },
              {
                size: 'small',
                // name: 'APPEND',
                icon: 'el-icon-refresh',
                circle: true,
                disabled: false,
                onClick: (row) => {
                  this.appendPage(row)
                }
              },
              {
                icon: 'el-icon-delete',
                size: 'medium',
                circle: true,
                name: null,
                disabled: false,
                onClick: (row) => {
                  this.deletePage([row])
                }
              }
            ]
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('theme.page.paging.empty.content'),
          buttonLabel: this.$t('theme.page.paging.empty.buttonLabel'),
          onClick: () => {
            this.addPage()
          }
        },
        /**
         * 行高亮
         * @param row 行数据
         */
        rowsClassName: (row) => {
          // return row.state === 0 ? 'row-text-enable' : ''
          return ''
        }
      },
      siteType: [],
      initLoading: false,
      bindVisible: false,
      bindModel: {},
      siteTypeId: null
    }
  },
  created () {
    this.pagingCache((success) => {
      this.getData(success)
    })
    this.siteType = this.$t('enumerate.siteType')

    // let pages = this.$t('pageType')
    // let s = []
    // pages.forEach((o) => {
    //   s.push(`    /**
    //  * ${o.title}
    //  */`)
    //   s.push(`${o.pageType.replace(/( |^)[a-z]/g, (l) => l.toUpperCase())}("${o.pageType}", \n"${o.siteType.join(',')}", \n"", \n"/{region}", \n"", \n""\n),`)
    // })
    // console.log(s.join('\n'))
  },
  methods: {
    /**
     * 追加组件
     * @param row
     */
    appendPage (row) {
      themePageAppend({
        id: row.id
      })
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              // this.getData(success)
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
      console.log('appendPage', row.id, row.pageType)
    },
    /**
     * 站点类型
     */
    getSiteType (index) {
      let label = []
      this.siteType.forEach((o) => {
        if (index.indexOf(o.id) !== -1) {
          label.push(o.label)
        }
      })
      return label
    },
    /**
     * 更新字段
     */
    updateField (id, name, value) {
      let data = {
        id: id
      }
      data[name] = value
      http.themePageUpdate(data)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 清空搜索条件
     */
    clearSearchCondition () {
      this.siteTypeId = null
      this.searchConditions.keyword = ''
      this.clearCondition(() => {
        this.getData(true)
      })
    },
    /**
     * 分页
     */
    getData () {
      this.tableOptions.loading = true
      let d = {
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          title: this.searchConditions.keyword
        }
      }
      if (this.siteTypeId !== null) {
        d.params.siteType = this.siteTypeId
      }
      http.themePagePaging(d)
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.pagingOptions.recordCount = result.data.total
              this.pagingOptions.dataset = result.data['records']
              this.tableOptions.loading = false
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 添加跳转
     */
    addPage () {
      this.$router.push('/main/masterplate/page/add')
    },
    /**
     * 修改跳转
     */
    updatePage (row) {
      this.$router.push(`/masterplate/page/update/${row.id}`)
    },
    /**
     * 初始页面类型
     */
    initPage () {
      let pages = this.$t('pageType')
      pages.forEach((o) => {
        o.siteType = o.siteType.join(',')
      })

      http.themePageInit(pages)
        .then(result => {
          result.options = {
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getData(true)
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    initSection () {
      http.themePageInitSection()
        .then(result => {
          result.options = {
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getData(true)
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 删除
     */
    deletePage (rows) {
      const ids = []
      rows.forEach((o) => {
        ids.push(o.id)
      })
      this.$confirm(this.$t('base.delete.multiple').toString().replace('{0}', ids.length.toString()),
        this.$t('base.delete.heading').toString(), {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          closeOnClickModal: false,
          type: 'error',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              http.themePageDelete({
                ids: ids
              })
                .then(result => {
                  result.options = {
                    action: this.actionType.delete
                  }
                  this.resultMessage(result, (success) => {
                    done()
                    instance.confirmButtonLoading = false
                    if (success) {
                      this.getData(true)
                    }
                  })
                })
                .catch(error => {
                  this.networkMistake(error)
                  done()
                  instance.confirmButtonLoading = false
                })
            } else {
              instance.confirmButtonLoading = false
              done()
            }
          }
        })
    }
  }
}
</script>
