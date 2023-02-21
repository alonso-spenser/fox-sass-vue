<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <div class="neighbor fox-google-style percent-100" slot="header">
      <div class="fox-page-content">
        <div
          class="filter-params">
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
          <div class="filter-params-element ml-7">
            <el-button
              icon="el-icon-plus"
              type="primary"
              plain
              class="el-material-button"
              :title="$t('customizePage.paging.addButton')"
              @click="addPages"
            >
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
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
      @paging="getData"
    >
    </fox-paging-table>
    <page-update
      :visible.sync="updateVisible"
      @success="getData"
      :page-id="pageId"></page-update>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import pageUpdate from './components/update'
import { fetchPagesPaging, fetchChangePageState, fetchDeletePage } from '@/plugins/api/customizePage'

export default {
  name: 'siteCustomizePage',
  extends: extend,
  components: {
    pageUpdate
  },
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updatePages(row)
            }
          },
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deletePages(rows)
            }
          }
        },
        columns: [
          {
            prop: 'title',
            label: this.$t('customizePage.tableHeader.title'),
            sortable: true,
            batchHeader: true
          },
          {
            prop: 'createTime',
            label: this.$t('customizePage.tableHeader.createTime'),
            sortable: true,
            width: 150,
            dataType: 'datetime',
            dataFormat: 'yyyy-MM-dd hh:mm'
          },
          {
            prop: 'state',
            label: this.$t('customizePage.tableHeader.state'),
            width: 100,
            switch: true,
            switchActive: 0,
            switchInactive: 1,
            onClick: (row) => {
              this.updateState(row)
            }
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('customizePage.paging.empty.content'),
          buttonLabel: this.$t('customizePage.paging.empty.buttonLabel'),
          onClick: () => {
            this.addPages()
          }
        },
        /**
         * 行高亮
         * @param row 行数据
         */
        rowsClassName: (row) => {
          return row.state === 0 ? 'row-text-enable' : ''
        }
      },
      updateVisible: false,
      pageId: ''
    }
  },
  created () {
    // this.pageValid()
    // this.tableOptions.loading = false
    this.pagingCache((success) => {
      this.getData(success)
    })
    // let s = '1415214542514532354|/pages/aluminium-sheet-plate-foil.html|/pages/aluminium-sheet.html,1415214542514532355|/articles/detail/having-your-new-produced.html|/articles/collections/news.html,1415214542543892482|/products/detail/aluminium-fencing.html|/products/detail/aluminium-fence.html,1415214542543892483|/products/detail/household-aluminium-foil-manufacturer-chal.html|/pages/finished-aluminium-products.html,1415214542543892484|/products/detail/aluminium-extruded-tube.html|/products/detail/extruded-aluminium-tube.html,1415214542543892485|/articles/detail/chal-s-net-profit-for-semi-annual-of-2019-increased-by-24-5.html|/articles/collections/news.html,1415214542543892486|/articles/detail/lightweight-design-driven-by-new-material.html|/articles/collections/news.html,1415214542543892487|/products/detail/aluminum-die-casting.html|/products/detail/aluminium-die-casting.html,1415214542543892488|/products/detail/aluminium-turn-and-tilt-window-supplier-chal.html|/products/detail/aluminium-turn-and-tilt-window.html,1415214542543892489|/products/detail/3003-aluminium-alloy-coil-supplier-chal.html|/products/detail/3003-aluminium-coil.html,1415214542543892490|/pages/aluminum-drawn-tubes.html|/pages/drawn-aluminium-tube.html,1415214542543892491|/products/detail/aluminum-microchannel-tube-manufacturer-chal.html|/products/detail/aluminium-micro-channel-tube.html,1415214542543892492|/products/detail/aluminium-battery-case-for-new-energy-automotive.html|/pages/aluminium-high-frequency-welded-tube.html,1415214542543892493|/products/detail/aluminium-strips-manufacturer-in-china-chal.html|/products/detail/aluminium-strips.html,1415214542543892494|/articles/detail/notice-of-postponement-of-aluminium-china-lightweight-asia-2020.html|/articles/collections/news.html,1415214542548086785|/products/detail/aluminium-fiber-1.html|/products/detail/aluminium-fiber.html,1415214542548086786|/products/detail/6005-aluminum-sheet.html|/products/detail/6005-aluminium-sheet.html,1415214542548086787|/pages/aluminum-high-frequency-welded-tube.html|/pages/aluminium-high-frequency-welded-tube.html,1415214542548086788|/products/detail/aluminium-flat-oval-welded-tube-for-radiators.html|/products/detail/aluminium-flat-oval-welded-tube.html,1415214542548086789|/products/detail/composite-aluminium-tube-al-al-composite-tube-chal.html|/products/detail/composite-aluminium-tube.html,1415214542548086790|/products/detail/composite-aluminum-tube-al-al-composite-tube-chal.html|/products/detail/composite-aluminium-tube.html,1415214542548086791|/products/detail/3003-aluminium-foil-supplier-chal.html|/products/detail/3003-aluminium-foil.html,1415214542548086792|/products/detail/5086-marine-grade-aluminium-sheet.html|/products/detail/5086-aluminium-sheet.html,1415214542548086793|/products/detail/aluminium-condenser-header-pipe-wholesale.html|/products/detail/aluminium-condenser-header-pipe.html,1415214542548086794|/products/detail/aluminium-circles-discs-manufacturer-in-china-chal.html|/products/detail/aluminium-circles-discs.html,1415214542548086795|/products/detail/aluminum-fiber.html|/products/detail/aluminium-fiber.html,1415214542548086796|/products/detail/seamless-extruded-aluminium-tube-manufacturer-chal.html|/products/detail/seamless-aluminium-tube.html,1415214542548086797|/products/detail/battery-aluminium-foil-supplier-chal.html|/pages/aluminium-high-frequency-welded-tube.html,1415214542548086798|/products/detail/aluminum-extruded-tube.html|/products/detail/extruded-aluminium-tube.html,1415214542548086799|/articles/detail/why-is-aluminium-tube-better-than-steel-tube.html|/articles/detail/why-do-manufacturers-in-these-industries-prefer-to-choose-aluminium-tubes.html,1415214542548086800|/products/detail/5754-aluminium-sheet-supplier-chal.html|/products/detail/5754-aluminium-sheet.html,1415214542548086801|/articles/detail/trump-reimposes-tariffs-on-raw-canadian-aluminum-canada-promises-retaliation.html|/articles/collections/news.html,1415214542548086802|/products/detail/aluminum-cable-wire.html|/products/detail/aluminium-cable-wire.html,1415214542548086803|/articles/detail/what-are-the-processing-techniques-of-aluminum-alloy.html|/articles/detail/what-are-the-processing-techniques-of-aluminium-alloy.html,1415214542548086804|/products/collections/aluminium-tube-pipe.html|/pages/aluminium-tube.html,1415214542548086805|/articles/detail/china-s-primary-aluminum-imports-surge-in-july.html|/articles/collections/news.html,1415214542548086806|/products/detail/1235-aluminum-foil.html|/products/detail/1235-aluminium-foil.html,1415214542548086807|/products/detail/aluminium-folding-window-supplier-chal.html|/products/detail/aluminium-folding-window.html,1415214542548086808|/products/detail/aluminium-operation-desktable.html|/products/detail/aluminium-operation-desk-table.html,1415214542548086809|/products/collections/aluminium-drawn-tubes.html|/pages/drawn-aluminium-tube.html,1415214542548086810|/products/detail/aluminum-foil-made-honeycomb-core-chal-1.html|/products/detail/aluminium-foil-made-honeycomb-core.html,1415214542548086811|/products/detail/6005-a-aluminum-sheet.html|/products/detail/6005-aluminium-sheet.html,1415214542548086812|/products/detail/5a03-aluminium-sheet-for-construction-application.html|/products/detail/5a03-aluminium-sheet.html,1415214542548086813|/products/detail/residential-and-commercial-aluminium-fencing-supplier-chal.html|/products/detail/aluminium-fence.html,1415214542548086814|/articles/collections/industry-news.html|/articles/collections/products-news.html,1415214542548086815|/products/detail/round-d-type-aluminium-welded-tubes-for-condenser-collectors.html|/products/detail/round-aluminium-drawn-tube.html,1415214542552281090|/products/detail/aluminium-cast-plate-5a83-supplier-chal.html|/products/detail/5083-aluminium-alloy-plate-sheet.html,1415214542552281091|/articles/collections/cases.html|/articles/collections/news.html,1415214542552281092|/pages/aluminium-drawn-tubes.html|/pages/drawn-aluminium-tube.html,1415214542552281093|/products/detail/2024-aluminium-plate-supplier-chal.html|/products/detail/2024-aluminium-plate.html,1415214542552281094|/pages/partners.html|/,1415214542552281095|/products/detail/aluminium-sheet-5052.html|/products/detail/5052-aluminium-sheet.html,1415214542552281096|/products/detail/aluminum-flat-wire.html|/products/detail/aluminium-flat-wire.html,1415214542552281097|/products/detail/5182-aluminium-sheet-with-excellent-corrosion.html|/products/detail/5182-aluminium-sheet.html,1415214542552281098|/products/detail/5052-marine-grade-aluminium-sheet.html|/products/detail/5052-aluminium-sheet.html,1415214542552281099|/products/detail/8011-aluminium-foil-supplier-chal.html|/products/detail/8011-aluminium-foil-with-high-plasticity.html,1415214542552281100|/products/detail/aluminuim-flat-wire.html|/products/detail/aluminium-flat-wire.html,1415214542552281101|/products/detail/5052-aluminium-coil-supplier-chal.html|/products/detail/5052-aluminium-coil.html,1415214542552281102|/products/detail/aluminium-drier.html|/products/detail/aluminium-condenser-drier.html,1415214542552281103|/products/detail/outward-swing-aluminium-window-supplier-chal.html|/products/detail/outward-swing-aluminium-window.html,1415214542552281104|/products/detail/aluminium-winding-window-supplier-chal.html|/products/detail/aluminium-winding-window.html,1415214542552281105|/products/detail/packaging-aluminium-foil-manufacturer-chal.html|/products/detail/packaging-aluminium-foil.html,1415214542552281106|/products/detail/1100-aluminium-plate-supplier-chal.html|/products/detail/1100-aluminium-plate.html,1415214542552281107|/products/detail/7a09-aluminium-sheet-for-high-strength-application.html|/products/detail/7a09-aluminium-sheet.html,1415214542552281108|/products/detail/aluminium-sheet-5052-supplier-chal.html|/products/detail/5052-aluminium-sheet.html,1415214542552281109|/products/detail/aluminium-drawn-profiles-plate-and-bar-profiles.html|/pages/aluminium-profiles.html,1415214542552281110|/products/detail/8011-aluminium-sheet-for-closure-applications.html|/products/detail/8011-aluminium-sheet.html,1415214542552281111|/products/detail/5052-aluminium-foil-supplier-chal.html|/products/detail/5052-aluminium-foil.html,1415214542552281112|/articles/detail/this-is-a-default-article-3.html|/articles/collections/news.html,1415214542552281113|/pages/aluminum-tube.html|/pages/aluminium-tube.html,1415214542552281114|/products/detail/aluminum-stamping-parts.html|/products/detail/aluminium-stamping-parts.html,1415214542552281115|/products/detail/aluminium-checker-plate-supplier-chal.html|/pages/aluminium-plate.html,1415214542552281116|/products/detail/aluminium-foil-container-manufacturer-chal.html|/products/detail/aluminium-foil-for-air-conditioner.html'
    // let ro = []
    // s.split(',').forEach((o) => {
    //   let m = o.split('|')
    //   let v = `INSERT INTO \`site_route\` VALUES ('${m[0]}', '1259731065136898050', '${m[1]}', '${m[2]}');`
    //   ro.push(v)
    // })
    // console.log(ro.join('\n'))
  },
  methods: {
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
     */
    getData () {
      this.loading = true
      this.tableOptions.loading = true
      fetchPagesPaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          q: this.searchConditions.keyword,
          siteId: this.siteId,
          region: this.regionCode
        }
      })
        .then(result => {
          this.pageValid()
          this.tableOptions.loading = false
          this.resultMessage(result, (success) => {
            if (success) {
              this.pagingOptions.recordCount = result.data.total
              this.pagingOptions.dataset = result.data['records']
            }
          })
        })
        .catch(error => {
          this.tableOptions.loading = false
          this.pageInvalid(error)
        })
    },
    /**
     * 添加页面
     */
    addPages () {
      this.pageId = ''
      this.updateVisible = true
      // console.log('===>')
      // this.$router.push(`/site/${this.siteId}/pages/add`)
    },
    /**
     * 修改页面
     */
    updatePages (row) {
      this.pageId = row.id
      this.updateVisible = true
      // this.$router.push(`/site/${this.siteId}/pages/${row.id}`)
    },
    /**
     * 修改状态
     */
    updateState (row) {
      console.log(row)
      fetchChangePageState({
        ids: [row.id],
        state: row.state
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            // this.getData()
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 删除页面
     */
    deletePages (rows) {
      const ids = []
      rows.forEach((o) => {
        ids.push(o.id)
      })
      this.$confirm(this.$t('base.delete.multiple').replaceAll('{0}', ids.length), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            fetchDeletePage({
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
                    this.pagingOptions.pageIndex = 1
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
