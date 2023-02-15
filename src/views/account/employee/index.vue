<template>
  <main class="editable">
    <div class="fox-page-header-editable">
      <section class="global-page-container">
        <section class="global-page-content">
          <section class="global-page-main">
            <fox-page-header
              :actions="crumbAction"
              :drop-actions="crumbDropAction"></fox-page-header>
          </section>
        </section>
      </section>
    </div>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <fox-paging-table
        :multi-select="false"
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
      </fox-paging-table>
      <edit-employee
        :visible.sync="visible"
        :employee-id="currentId"
        @save="getData"></edit-employee>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/paging'
import { fetchEmployeePaging, fetchEmployeeState } from '@/plugins/api/merchant'
import editEmployee from './components/employeeDialog'
import {
  mapState
} from 'vuex'

export default {
  name: 'account-employee',
  extends: extend,
  components: {
    editEmployee
  },
  data () {
    return {
      currentId: null,
      visible: false,
      stateList: [],
      dataConfig: {
        actions: {},
        columns: [
          {
            prop: 'name',
            width: 120,
            label: this.$t('merchant.employee.paging.tableHeader.name')
          },
          // {
          //   prop: 'mobile',
          //   width: 150,
          //   label: this.$t('merchant.employee.paging.tableHeader.mobile'),
          //   render: (row) => {
          //     return (
          //       <div>
          //         <div>{ row.mobile }</div>
          //         <div>{ row.phone }</div>
          //       </div>
          //     )
          //   }
          // },
          {
            prop: 'account',
            label: this.$t('merchant.employee.paging.tableHeader.account')
          },
          {
            prop: 'roleName',
            width: 110,
            label: this.$t('merchant.employee.paging.tableHeader.roleName')
          },
          {
            button: true,
            label: '',
            width: 80,
            group: [
              {
                type: 'text',
                size: 'medium',
                name: this.$t('base.operate.view'),
                onClick: (row) => {
                  this.updateEmployee(row)
                }
              }
            ]
          },
          {
            prop: 'state',
            label: '',
            align: 'right',
            width: 50,
            render: (row) => {
              return (
                <div
                  class={row.state === 1 ? 'el-button el-button--text text-danger' : 'el-button text-info el-button--text'}
                  onClick={e => this.updateBubblePlug(e, row)}>
                  {this.utility.getDicType(this.stateList, row.state)}
                </div>
              )
            }
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
    this.pagingCache((success) => {
      this.getData(success)
    })
    this.stateList = this.$t('merchant.employeeState')
  },
  computed: {
    ...mapState(['merchantModel']),
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('merchant.role.title'),
          type: 'primary',
          icon: 'el-icon-user',
          visible: true,
          click: () => {
            this.$router.push('/account/role')
          }
        },
        {
          label: this.$t('base.operate.add'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.handleCreate()
          }
        }
      ]
    },
    /**
     * 面包屑下拉操作
     */
    crumbDropAction () {
      return []
    }
  },
  methods: {
    /**
     * 修改跳转
     */
    updateBubblePlug (e, row) {
      e.cancelBubble = true
      e.stopPropagation()
      if (row.owner === 1) {
        this.employeeState([row.id], row.state === 0 ? 1 : 0, true)
      }
    },
    /**
     * 文章状态
     * @param ids
     * @param state
     * @param load 是否再次加载数据
     */
    employeeState (ids, state, load) {
      fetchEmployeeState({
        ids: ids,
        state: state
      })
        .then(result => {
          this.resultMessage(result, success => {
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
      fetchEmployeePaging({
        current: this.pagingOptions.pageIndex,
        size: this.pagingOptions.pageSize,
        params: {
          q: this.searchConditions.keyword
        }
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
     * 添加用户弹窗
     */
    handleCreate () {
      this.currentId = null
      this.visible = true
    },
    /**
     * 更改用户弹窗
     */
    updateEmployee (row) {
      this.currentId = row.id
      this.visible = true
    }
  }
}
</script>
