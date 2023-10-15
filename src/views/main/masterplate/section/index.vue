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
          <div class="filter-params-element">
            <fox-select
              shrink
              v-model="searchConditions.sectionGroup"
              @change="getData(false)"
              :placeholder="$t('theme.page.update.entity.pageType.placeholder')"
            >
              <el-option
                :key="-1"
                label="全部"
                :value="-1"
              ></el-option>
              <el-option
                v-for="item in sectionGroup"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
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
              @clear="clearSearchCondition"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                :loading="loading"
                @click="getData(false)"
              ></el-button>
            </fox-input>
          </div>
          <div class="filter-params-element">
            <el-button
              icon="el-icon-plus"
              plain
              class="el-material-button"
              @click="addSection"
            >
            </el-button>
          </div>
          <div class="filter-params-element">
          </div>
        </div>
      </div>
    </div>
    <fox-paging-table
      :columns="dataConfig.columns"
      :actions="dataConfig.actions"
      :dataset="pagingOptions.dataset"
      :loading="tableOptions.loading"
      :first-loading="false"
      :empty="dataConfig.empty"
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
      @paging="getData"
    >
    </fox-paging-table>
    <schema-editor
      :visible.sync="schemaData.visible"
      :dataset="schemaData.editor"
      :data-id="schemaData.entity.id"
      :salt="schemaData.entity.salt"
      @close="schemaUpdate"
    ></schema-editor>
    <lang-editor
      :visible.sync="regionData.visible"
      :section-id="regionData.sectionId"
      @close="schemaUpdate"
    ></lang-editor>
    <section-page-type
      @update="updateSiteType"
      :visible.sync="multiSection.visible"></section-page-type>
    <section-tag-selector
      @update="updateSectionTag"
      :visible.sync="multiSectionTag.visible"></section-tag-selector>
  </fox-layout-main>
</template>
<script>
import extend from '@/plugins/page/paging'
import * as http from '@/plugins/api/theme'
import schemaEditor from '../components/schema-editor'
import langEditor from '../components/lang-editor'
import sectionPageType from '../components/page-type'
import sectionTagSelector from '../components/section-tag-selector'
import { fetchThemeSectionUpdateSiteType, fetchThemeSectionUpdateTag } from '@/plugins/api/theme'

export default {
  name: 'themeSection',
  extends: extend,
  components: {
    schemaEditor,
    langEditor,
    sectionPageType,
    sectionTagSelector
  },
  data () {
    return {
      dataConfig: {
        actions: {
          setType: {
            label: '适应网站类型',
            onClick: (rows) => {
              this.multiSection.ids = []
              rows.forEach((row) => {
                this.multiSection.ids.push(row.id)
                this.multiSection.visible = true
              })
            }
          },
          tag: {
            label: 'TAG设置',
            onClick: (rows) => {
              this.multiSection.ids = []
              rows.forEach((row) => {
                this.multiSectionTag.ids.push(row.id)
                this.multiSectionTag.visible = true
              })
            }
          }
        },
        columns: [
          {
            prop: 'sectionImage',
            label: this.$t('theme.section.paging.tableHeader.sectionImage'),
            image: true,
            width: 80
          },
          {
            prop: 'sectionIcon',
            label: this.$t('theme.section.paging.tableHeader.sectionIcon'),
            svg: true,
            width: 80
          },
          {
            prop: 'sectionName',
            label: this.$t('theme.section.paging.tableHeader.sectionName')
          },
          {
            prop: 'sectionType',
            label: this.$t('theme.section.paging.tableHeader.sectionType'),
            render: (row) => {
              return (
                <div>
                  <div>{row['sectionType']}</div>
                  <small className="tab-tag-list">{row['salt']}</small>
                </div>
              )
            }
          },
          {
            prop: 'dynamic',
            label: this.$t('theme.section.paging.tableHeader.dynamic'),
            width: 100,
            align: 'center',
            render: (row) => {
              return (<label class={row['dynamic'] === 0 ? 'el-icon-check' : 'el-icon-close'}></label>)
            }
          },
          {
            prop: 'dynamic',
            label: '仅1次',
            width: 60,
            align: 'center',
            render: (row) => {
              return (<label class={row['once'] === 0 ? 'el-icon-check' : ''}></label>)
            }
          },
          {
            label: this.$t('theme.section.paging.tableHeader.tag'),
            width: 120,
            render: (row) => {
              return (
                row.tagList.map((o) => {
                  return (
                    <small class="tab-tag-list">{o.tagName}</small>
                  )
                })
              )
            }
          },
          {
            label: '网站类型',
            width: 120,
            render: (row) => {
              return (
                this.getSiteType(row['siteType']).map((value) => {
                  return (
                    <div>{value}</div>
                  )
                })
              )
            }
          },
          {
            prop: 'sectionGroup',
            label: this.$t('theme.section.paging.tableHeader.sectionGroup'),
            width: 80,
            align: 'center',
            render: (row) => {
              return (
                <p class="text-truncate">
                  {this.getSectionGroup(row.sectionGroup)}
                </p>
              )
            }
          },
          {
            button: true,
            label: '',
            align: 'center',
            width: 130,
            group: [
              {
                name: '',
                icon: 'el-icon-refresh',
                circle: true,
                onClick: (row) => {
                  this.appendSection(row, true)
                }
              },
              {
                name: '',
                circle: true,
                icon: 'el-icon-location-outline',
                onClick: (row) => {
                  this.regionData.sectionId = row.id
                  this.regionData.visible = true
                }
              },
              {
                name: '',
                icon: 'el-icon-cpu',
                circle: true,
                onClick: (row) => {
                  this.loadSchemeEditor(row, true)
                }
              }
            ]
          },
          {
            button: true,
            label: '',
            width: 130,
            group: [
              {
                icon: 'el-icon-edit',
                circle: true,
                name: null,
                disabled: false,
                onClick: (row) => {
                  this.updateSection(row)
                }
              },
              {
                icon: 'el-icon-copy-document',
                circle: true,
                name: null,
                disabled: false,
                onClick: (row) => {
                  this.copySection(row)
                }
              },
              {
                icon: 'el-icon-delete',
                circle: true,
                name: null,
                disabled: false,
                onClick: (row) => {
                  this.deleteSection([row])
                }
              }
            ]
          },
          {
            button: true,
            label: '',
            fixed: 'right',
            align: 'right',
            width: 70,
            group: [{
              name: '预览',
              className: 'el-button-table',
              type: 'text',
              onClick: (row) => {
                this.designSection(row)
              }
            }]
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('theme.section.paging.empty.content'),
          buttonLabel: this.$t('theme.section.paging.empty.buttonLabel'),
          onClick: () => {
            this.addSection()
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
      sectionGroup: [],
      regionData: {
        sectionId: '',
        visible: false
      },
      /**
       * SCHEMA
       */
      schemaData: {
        entity: {},
        visible: false,
        editor: {
          sectionSchema: {},
          sectionData: {}
        }
      },
      searchConditions: {
        ...this.searchConditions,
        sectionGroup: '',
        sectionType: '',
        dynamic: ''
      },
      multiSection: {
        visible: false,
        ids: []
      },
      multiSectionTag: {
        visible: false,
        ids: []
      },
      siteTypeList: []
    }
  },
  created () {
    this.sectionGroup = this.$t('enumerate.sectionGroup')
    this.siteType = this.$t('enumerate.siteType')
    this.pagingCache((success) => {
      this.getData(success)
    })
  },
  methods: {
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
    updateSiteType (siteType) {
      this.multiSection.visible = false
      fetchThemeSectionUpdateSiteType({
        siteType: siteType.join(','),
        ids: this.multiSection.ids
      })
        .then(result => {
          result.options = {
            formName: 'update',
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
    updateSectionTag (tagList) {
      this.multiSectionTag.visible = false
      fetchThemeSectionUpdateTag({
        tagList,
        sectionList: this.multiSectionTag.ids
      })
        .then(result => {
          result.options = {
            formName: 'update',
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
    getSectionGroup (value) {
      let s = this.sectionGroup.filter((o) => {
        return o.id === value
      })
      return s.length > 0 ? s[0].label : ''
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
     * 分页
     * @param first 首次加载
     */
    getData (first) {
      this.tableOptions.loading = true
      this.pagingOptions.firstLoading = first
      let params = {}
      if (this.searchConditions.sectionGroup > -1) {
        params.sectionGroup = this.searchConditions.sectionGroup
      }
      if (this.searchConditions.keyword) {
        params.sectionName = this.searchConditions.keyword
      }
      http.themeSectionPaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: params
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.pagingOptions.recordCount = result.data.total
              this.pagingOptions.dataset = result.data['records']
              this.tableOptions.loading = false
              if (result.data.records.length > 0) {
                this.pagingOptions.firstLoading = !first
              } else if (this.pagingOptions.pageIndex > 1) {
                this.pagingOptions.pageIndex = 1
                this.pagingOptions.firstLoading = true
              }
              this.batchActions = !(this.pagingOptions.dataset.length === 0 && this.pagingOptions.firstLoading)
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
    addSection () {
      this.$router.push('/main/masterplate/element/add')
    },
    /**
     * 修改跳转
     */
    updateSection (row) {
      this.$router.push(`/main/masterplate/element/update/${row.id}`)
    },
    /**
     * 复制跳转
     */
    copySection (row) {
      this.$confirm('确定要复制此组件吗？',
        'Oops', {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          closeOnClickModal: false,
          type: 'info',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              http.themeSectionClone({
                id: row.id
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
                }).finally(() => {
                  done()
                  instance.confirmButtonLoading = false
                })
            } else {
              instance.confirmButtonLoading = false
              done()
            }
          }
        })
    },
    /**
     * 删除
     */
    deleteSection (rows) {
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
              http.themeSectionDelete({
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
    },
    designSection (row) {
      this.utility.openSite(`http://www.theme.com/section/${row.sectionType}/${row.salt}`)
    },
    /**
     * 加载schema编辑器
     */
    loadSchemeEditor (row) {
      this.schemaData.visible = false
      this.schemaDefaultVisible = false
      http.themeSectionDetail({
        id: row.id
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.schemaData.entity = result.data
              this.schemaData.editor.sectionData = JSON.parse(result.data.sectionData)
              this.schemaData.editor.sectionSchema = JSON.parse(result.data.sectionSchema)
              this.schemaData.editor.sectionSchema.type = result.data.sectionType
              this.schemaData.visible = true
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 追加组件
     * @param row
     */
    appendSection (row) {
      if (row.sectionGroup !== 1000) {
        return false
      }
      http.themePageSectionAppend({
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
      console.log('appendSection', row.id, row.sectionType)
    },
    /**
     * 更新 schema
     * @param save 是否保存
     */
    schemaUpdate (data) {
      if (data === null) {
        return false
      }
      http.themeSectionUpdate(data)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getData(success)
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>
<style lang="scss">
.tab-tag-list {
  font-size: 9px;
  margin: 3px;
  border: 1px solid #f2dede;
  padding: 3px;
  border-radius: 3px;
  white-space: nowrap;
}
</style>
