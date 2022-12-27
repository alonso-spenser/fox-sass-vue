<template>
  <fo-page-loading
    :loading="pageLoading"
    :invalid="pageIsValid"
  >
    <fo-page-header
      :dropActions="[
        // {
        //   label: $t('base.addition.button'),
        //   icon: 'el-icon-plus',
        //   type: 'primary',
        //   visible: batchActions,
        //   click: () => {
        //     // this.addLang()
        //   }
        // }
      ]"
      :actions="[
        {
          label: $t('base.addition.button'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.addLang()
          }
        }
      ]"
    >
    </fo-page-header>
    <paging-table
      :heading="$t('base.lang.paging.heading')"
      :subheading="$t('base.lang.paging.subheading')"
      :columns="dataConfig.columns"
      :actions="dataConfig.actions"
      :empty="dataConfig.empty"
      :rows-class-name="dataConfig.rowsClassName"
      :options="tableOptions"
      :pagination="pagingOptions"
      @paging="getData"
    >
      <template slot="header">
        <el-row
          class="dataset-search"
          :gutter="20">
          <el-col :span="14">
            <el-input
              :placeholder="$t('base.placeholder.search')"
              v-model="searchConditions.keyword"
              clearable
              @change="searchConditionChange"
              @clear="clearSearchCondition"
              class="input-with-select">
              <el-button
                slot="append"
                icon="el-icon-search"
                :loading="loading"
                @click="getData(false)"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
      </template>
    </paging-table>
  </fo-page-loading>
</template>

<script>
import extend from '@/plugins/page/paging'
import * as http from '@/plugins/api/core'

export default {
  name: 'baseLang',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateLang(row)
            }
          },
          delete: {
            icon: 'el-icon-delete',
            label: this.$t('base.delete.button'),
            onClick: (rows) => {
              this.deleteLang(rows)
            }
          }
        },
        columns: [

          {
            prop: 'code',
            label: this.$t('base.lang.paging.tableHeader.code')
          },
          {
            prop: 'icon',
            label: this.$t('base.lang.paging.tableHeader.icon')
          },
          {
            prop: 'name',
            label: this.$t('base.lang.paging.tableHeader.name')
          },
          {
            prop: 'state',
            label: this.$t('base.lang.paging.tableHeader.state')
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('base.lang.paging.empty.content'),
          buttonLabel: this.$t('base.lang.paging.empty.buttonLabel'),
          onClick: () => {
            this.addLang()
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
      }
    }
  },
  created () {
    this.pagingCache((success) => {
      this.getData(success)
    })
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
     * @param first 首次加载
     */
    getData (first) {
      http.fetchBaseLanguage()
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              // this.pagingOptions.recordCount = result.data.total
              this.pagingOptions.dataset = result.data
              this.tableOptions.loading = false
              // if (result.data.records.length > 0) {
              //   this.pagingOptions.firstLoading = !first
              // }
              // this.batchActions = !(this.pagingOptions.dataset.length === 0 && this.pagingOptions.firstLoading)
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
    addLang () {
      this.$router.push('/base/lang/connect')
    },
    /**
     * 修改跳转
     */
    updateLang (row) {
      this.$router.push(`/base/lang/update/${row.id}`)
    },
    /**
     * 删除
     */
    deleteLang (rows) {
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
              http.baseLangDelete({
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
