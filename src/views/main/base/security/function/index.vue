<template>
  <main>
    <fox-page-header></fox-page-header>
      <fox-page-loading :percentage="100">
        <fox-paging-table
          :multiSelect="false"
          :loading="tableOptions.loading"
          :columns="dataConfig.columns"
          :actions="dataConfig.actions"
          :dataset="pagingOptions.dataset"
        >
          </fox-paging-table>
          </fox-page-loading>
          <role-dialog
            :visible.sync="roleVisible"
            :appType="appType"
            :roleInfo="roleInfo"
            @closeDialog="closeRoleDialog"></role-dialog>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import roleDialog from './components/roleDialog'
import { fetchRoleInitSuper } from '@/plugins/api/core'

export default {
  name: 'merchantEmployee',
  extends: extend,
  components: {
    roleDialog
  },
  data () {
    return {
      currentId: null,
      roleVisible: false,
      roleInfo: null,
      appType: 1000,
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateFunction(row)
            }
          }
        },
        columns: [
          {
            prop: 'name',
            label: this.$t('core.security.function.tableHeader.name')
          },
          {
            prop: 'label',
            width: 120,
            label: this.$t('core.security.function.tableHeader.type')
          },
          {
            prop: 'type',
            width: 120,
            align: 'center',
            label: this.$t('core.security.function.tableHeader.typeCode')
          },
          {
            label: this.$t('core.security.function.tableHeader.role'),
            width: 240,
            button: true,
            align: 'right',
            group: [
              {
                name: '初始所有商户',
                plain: true,
                onClick: (row) => {
                  this.initSuperRole(row)
                }
              }
            ]
          }
        ],
        /**
         * 行高亮
         * @param row 行数据
         */
        rowsClassName: (row) => {
          return ''
        }
      }
    }
  },
  created () {
    this.pagingOptions.dataset = this.$t('core.appTypeList')
    this.tableOptions.loading = false
  },
  methods: {
    /**
     * 添加弹窗
     */
    addRole (row) {
      this.appType = row.type
      this.roleVisible = true
    },
    /**
     * 关闭弹窗
     */
    closeRoleDialog () {
      this.roleVisible = false
      this.roleInfo = null
    },
    /**
     *  跳转详情
     * @param row
     */
    updateFunction (row) {
      this.$router.push({
        path: `/main/base/security/function/${row.type}`
      })
    },
    /**
     * 初始超级权限
     * @param row
     */
    initSuperRole (row) {
      fetchRoleInitSuper({
        appType: row.type
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.$message({
                type: 'success',
                message: '完成'
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
