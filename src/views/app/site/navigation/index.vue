<template>
 <main>
   <fo-page-header :actions="crumbAction"></fo-page-header>
   <fo-page-loading
     :loading="pageLoading"
     :invalid="pageIsValid"
     :percentage="100"
   >
     <fo-paging-table
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
     </fo-paging-table>
   </fo-page-loading>
 </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchAsyncNavigation } from '@/plugins/api/assembler'

export default {
  name: 'siteNavigation',
  extends: extend,
  data () {
    return {
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateCertificate(row)
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
          },
          {
            prop: 'title',
            width: 100,
            align: 'right',
            render: (row, index) => {
              return (<label>{this.$t('base.update.button')}</label>)
            }
          }
        ]

      }
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
    updateCertificate (row) {
      this.$router.push(`/site/${this.siteId}/navigation/${row.value}/update`)
    },
    /**
     * 同步菜单
     */
    asyncNavigation () {
      fetchAsyncNavigation({
        siteId: this.siteId
      })
        .then(result => {
          this.resultMessage(result, success => {
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
