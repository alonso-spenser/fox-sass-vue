<template>
  <main class="editable">
    <div class="fo-page-header-editable">
      <section class="global-page-container">
        <section class="global-page-content">
          <fo-page-header :actions="crumbAction"></fo-page-header>
        </section>
      </section>
    </div>
    <fo-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <el-card shadow="hover">
        <div class="fo-table">
          <div class="fo-table-content">
            <el-table :data="pagingOptions.dataset" stripe v-loading="tableOptions.loading">
              <el-table-column prop="roleName" :label="$t('merchant.role.paging.tableHeader.roleName')" min-width="120"></el-table-column>
              <!--        v-if="$checkPermission(['security-role-detail'])"-->
              <el-table-column width="120" align="right">
                <template slot-scope="scope">
                  <el-button type="text" @click.native="updateRole(scope.row)">
                    {{ scope.row.roleCode !== 'ROLE_SUPER' ? $t('base.update.button') : $t('base.operate.view')}}
                  </el-button>
                  <el-button type="text" @click.native="roleDelete(scope.row, scope.$index)" v-if="scope.row.roleCode !== 'ROLE_SUPER'">
                    {{ $t('base.delete.button') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
      <role-dialog :visible.sync="visible" :appType="1000" :role-info="roleInfo" @save="getData"  @close="closeDialog"></role-dialog>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchRoleList, fetchRoleDelete } from '@/plugins/api/merchant'
import roleDialog from './components/roleDialog'
export default {
  name: 'account-role',
  extends: extend,
  components: {
    roleDialog
  },
  computed: {
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('base.addition.button'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.addRole()
          }
        }
      ]
    },
    /**
     * 面包屑下拉操作
     */
    crumbDropAction () {
      return [
      ]
    }
  },
  data () {
    return {
      visible: false,
      roleInfo: {
        id: ''
      },
      dataConfig: {
        actions: {
          update: {
            icon: 'el-icon-edit',
            label: this.$t('base.update.button'),
            onClick: (row) => {
              this.updateRole(row)
            }
          }
        },
        columns: [
          {
            prop: 'roleName',
            label: this.$t('merchant.role.paging.tableHeader.roleName')
          },
          {
            prop: 'roleRemark',
            label: this.$t('merchant.role.paging.tableHeader.roleRemark')
          }
        ],
        /**
         * 数据为空文案
         */
        empty: {
          content: this.$t('merchant.role.paging.empty.content'),
          buttonLabel: this.$t('merchant.role.paging.empty.buttonLabel'),
          onClick: () => {
            this.addRole()
          }
        },
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
    this.pageValid()
    this.tableOptions.loading = false
    this.pagingCache((success) => {
      this.getData(success)
    })
  },
  methods: {
    /**
     * 分页
     * @param first 首次加载
     */
    getData (first) {
      this.tableOptions.loading = true
      this.pagingOptions.firstLoading = first
      fetchRoleList().then(result => {
        this.pageValid()
        this.resultMessage(result, (success) => {
          if (success) {
            this.pagingOptions.dataset = result.data
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
     * 添加弹窗
     */
    addRole () {
      this.visible = true
    },
    /**
     * 修改弹窗
     */
    updateRole (row) {
      this.visible = true
      this.roleInfo = row
    },
    /**
     * 删除角色
     * @param row
     * @param index
     */
    roleDelete (row, index) {
      const { id, roleName } = row
      this.$confirm(`删除角色 ${roleName} ，将导致关联的员工无法登录，确定删除吗`, '提示', {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            const result = await fetchRoleDelete({ id })
            instance.confirmButtonLoading = false
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
          } else {
            done()
          }
        }
      })
        .then(() => {})
        .catch(() => {})
    },
    /**
     * 关闭弹窗
     */
    closeDialog () {
      this.visible = false
      this.roleInfo = {
        id: ''
      }
    }
  }
}
</script>
