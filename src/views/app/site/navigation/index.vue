<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
  >
    <div class="neighbor fox-google-style percent-100" slot="header">
      <div class="fox-page-content text-right">
        <neighbor-action
          :actions="crumbAction"
        ></neighbor-action>
      </div>
    </div>
    <fox-paging-table
      :multiSelect="false"
      :actions="dataConfig.actions"
      :columns="dataConfig.columns"
      :dataset="pagingOptions.dataset"
      :loading="tableOptions.loading"
      :first-loading="pagingOptions.firstLoading"
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
    >
    </fox-paging-table>
    <navigation-update
      :visible.sync="updateVisible"
      v-model="updateModel"
    ></navigation-update>
  </fox-layout-main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchAsyncNavigation } from '@/plugins/api/assembler'
import navigationUpdate from './components/update'

export default {
  name: 'siteNavigation',
  extends: extend,
  components: {
    navigationUpdate
  },
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateNavigation(row)
            }
          }
        },
        columns: [
          {
            prop: 'title',
            label: this.$t('navigation.paging.tableHeader.title')
          },
          {
            prop: 'describe',
            label: this.$t('navigation.paging.tableHeader.describe')
          }
          // {
          //   prop: 'title',
          //   width: 100,
          //   align: 'right',
          //   label: '',
          //   render: (row, index) => {
          //     return (<label>{this.$t('base.update.button')}</label>)
          //   }
          // }
        ]
      },
      updateVisible: false,
      updateModel: {}
    }
  },
  computed: {
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('navigation.async'),
          icon: 'el-icon-refresh',
          type: 'primary',
          visible: true,
          click: () => {
            this.asyncNavigation()
          }
        }
      ]
    }
  },
  created () {
    this.pagingOptions.dataset = this.$t('navigation.menuType')
    this.pageValid()
    this.tableOptions.loading = false
  },
  methods: {
    /**
     * 修改跳转
     */
    updateNavigation (row) {
      this.updateModel = row
      this.updateVisible = true
    },
    /**
     * 同步菜单
     */
    asyncNavigation () {
      fetchAsyncNavigation({
        siteId: this.siteId
      })
        .then((result) => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.$message({
                type: 'success',
                message: this.$t('navigation.asyncTips')
              })
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
