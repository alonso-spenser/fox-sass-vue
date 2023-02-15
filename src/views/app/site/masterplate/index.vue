<template>
  <main>
    <fox-page-header
      :drop-actions="dropAction"
      :actions="crumbAction"
    >
    </fox-page-header>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <fox-page-section
        v-if="false"
        :content="$t('site.theme.current.subheading')"
      >
      </fox-page-section>
      <div class="site-theme">
        <div class="site-theme-web">
          <div class="screenShot-container scaled">
            <div class="screenShot-content">
              <div class="screenShot-wrapper">
                <iframe
                  class="screenShot-iframe"
                  :src="`${siteProtocol}${siteModel.mainDomain}`"></iframe>
              </div>
            </div>
          </div>
        </div>
        <div class="site-theme-app">
          <div class="screenShot-container scaled">
            <div class="screenShot-content">
              <div class="screenShot-wrapper screenShot-wrapper-mobile">
                <iframe
                  class="screenShot-iframe"
                  :src="`${siteProtocol}${siteModel.mainDomain}`"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <fox-page-section
        :heading="$t('site.theme.owned.heading')"
        :content="$t('site.theme.owned.subheading')"
      >
        <template
          slot="header"
          v-if="false">
          <el-button
            @click="exploreVisible = true"
            size="small"
            class="float-right mt-2">
            {{ $t("site.theme.get") }}
          </el-button>
        </template>
      </fox-page-section>

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
        :multi-select="false"
        :rows-class-name="dataConfig.rowsClassName"
        @paging="getData"
      >
      </fox-paging-table>

    </fox-page-loading>
  </main>
</template>
<script>
import extend from '@/plugins/page/paging'
import {
  mapState
} from 'vuex'
import {
  fetchSiteThemeList,
  fetchSiteUpdateName,
  fetchSitePublish
} from '@/plugins/api/site'

export default {
  name: 'siteTheme',
  extends: extend,
  computed: {
    ...mapState(['siteModel']),
    siteProtocol () {
      return 'development|test'.indexOf(process.env.NODE_ENV) !== -1 ? 'http://' : 'https://'
    },
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('site.theme.design'),
          type: 'primary',
          visible: true,
          click: () => {
            if (this.entity && this.entity.id) {
              this.design(this.entity.id)
            }
          }
        }
      ]
    },
    dropAction () {
      return [
        {
          label: this.$t('site.theme.preview'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.previewSite()
          }
        },
        {
          label: this.$t('site.theme.publish.title'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.publishTheme()
          }
        }
      ]
    }
  },
  data () {
    return {
      entity: {
        id: ''
      },
      themes: [],
      themeId: '',
      updateVisible: false,
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.renameTheme(row)
            }
          }
        },
        columns: [
          {
            prop: 'name',
            label: this.$t('site.theme.paging.tableHeader.name'),
            render: (row) => {
              return (
                <p class="text-truncate">
                  {row.name}
                  {row.state === 0 ? <el-tag
                    size="small"
                    class="ml-2">{this.$t('site.theme.active')}</el-tag> : ''}
                </p>
              )
            }
          },
          {
            prop: 'version',
            width: 100,
            label: this.$t('site.theme.paging.tableHeader.version')
          },
          {
            button: true,
            label: '',
            width: 150,
            align: 'right',
            group: [
              {
                circle: true,
                type: 'text',
                name: this.$t('site.theme.preview'),
                disabled: false,
                onClick: (row) => {
                  this.previewSite(row)
                }
              },
              {
                circle: true,
                type: 'text',
                name: this.$t('site.theme.design'),
                disabled: false,
                onClick: (row) => {
                  this.design(row.id)
                }
              }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    /**
     * 设计
     */
    designSite () {
      if (this.entity && this.entity.id) {
        this.design(this.entity.id)
      }
    },
    /**
     * 设计网页
     */
    design (id) {
      localStorage.removeItem('customPageClone')
      this.utility.openSite(`/design/${this.siteId}/${id}`)
    },
    /**
     * 发布主题
     */
    publishTheme () {
      this.$confirm(this.$t('site.theme.publish.content').toString(), this.$t('site.theme.publish.title').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            fetchSitePublish({
              id: this.entity.id,
              siteId: this.siteId
            })
              .then(result => {
                result.options = {
                  success: this.$t('site.theme.publish.success')
                }
                this.resultMessage(result, () => {
                  done()
                  instance.confirmButtonLoading = false
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
    /**
     * 修改模版名称
     */
    renameTheme (data) {
      this.$prompt(this.$t('site.theme.rename.content').toString(), this.$t('site.theme.rename.title').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        inputValue: data.name,
        inputPattern: /^.{0,32}$/,
        inputPlaceholder: this.$t('site.theme.rename.placeholder'),
        inputErrorMessage: this.$t('site.theme.rename.error')
      }).then(({ value }) => {
        fetchSiteUpdateName({
          id: data.id,
          siteId: data.siteId,
          name: value
        })
          .then(result => {
            result.options = {
              action: this.actionType.update,
              formName: 'update'
            }
            this.resultMessage(result, success => {
              if (success) {
                this.getData()
              }
            })
          })
          .catch(error => {
            this.networkMistake(error)
          })
      })
    },
    /**
     * 数据请求
     */
    getData () {
      this.tableOptions.multiSelect = false
      fetchSiteThemeList({
        siteId: this.siteId,
        region: this.regionCode
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.pagingOptions.recordCount = 0
              this.pagingOptions.dataset = result.data
              this.tableOptions.loading = false
              this.themes = result.data
              let df = result.data.filter((o) => {
                return o.state === 0
              })
              if (df.length > 0) {
                this.entity = df[0]
              }
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 预览网站
     */
    previewSite () {
      this.utility.openSite(`https://${this.siteModel.mainDomain}`)
    },
    /**
     * 打开网站
     * @param url
     */
    openSite (url) {
      this.utility.openSite(url)
    }
  }
}
</script>
