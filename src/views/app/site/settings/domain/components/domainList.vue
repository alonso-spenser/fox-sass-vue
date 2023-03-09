<template>
  <div>
    <fox-section
      :heading="heading"
      :content="subheading">
      <template
        slot="header"
        v-if="domainType === 0">
        <el-button
          size="mini"
          type="text"
          @click="bindDomain"
        >
          {{ $t('settings.domain.add') }}
        </el-button>
      </template>
      <fox-paging-table
        :heading="heading"
        :multiSelect="false"
        :columns="dataConfig.columns"
        :actions="dataConfig.actions"
        :dataset="dataset"
        :loading="tableOptions.loading"
        :first-loading="pagingOptions.firstLoading"
        :empty="dataConfig.empty"
        :page-index.sync="pagingOptions.pageIndex"
        :page-size.sync="pagingOptions.pageSize"
        :record-count="pagingOptions.recordCount"
        :rows-class-name="dataConfig.rowsClassName"
        :border="false"
        :card-style="false"
      >
      </fox-paging-table>
    </fox-section>
    <!--弹窗-->
    <el-dialog
      :title="$t('settings.domain.change.heading')"
      :visible="changeVisible"
      :show-close="true"
      @close="dialogClose"
      width="40%">
      {{ $t('settings.domain.change.content') }}
      <div>
        <el-radio-group
          v-loading="domainLoading"
          @change="changeDomain"
          class="el-radio-block mt-5"
          v-model="domainId">
          <el-radio
            :label="item.id"
            v-for="(item, index) in domains"
            :key="index">{{ item.domain }}
          </el-radio>
        </el-radio-group>
      </div>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          :disabled="loading"
          @click="changeVisible = false">{{ this.$t('base.operate.cancel') }}
        </el-button>
        <el-button
          size="small"
          :loading="loading"
          @click="setDefault"
          type="primary">{{ this.$t('base.operate.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import extend from '@/plugins/page/paging'
import {
  fetchDomainDefault,
  fetchDomainDelete,
  fetchDomainNormalList,
  fetchDomainReconnect
} from '@/plugins/api/settings'
import {
  mapState
} from 'vuex'

export default {
  name: 'domainList',
  extends: extend,
  computed: {
    ...mapState(['siteModel'])
  },
  data () {
    return {
      changeVisible: false,
      domainLoading: false,
      domainId: '',
      domains: [],
      dataConfig: {
        columns: [
          {
            prop: 'domain',
            label: this.$t('settings.domain.tableHeader.name')
          },
          {
            prop: 'connected',
            label: this.$t('settings.domain.tableHeader.status'),
            width: 100,
            align: 'center',
            render: (row) => {
              return (
                <label
                  class={row['connected'] === 0 ? 'text-success' : 'text-danger'}
                >
                  {row['connected'] === 0 ? this.$t('settings.domain.status.connected') : this.$t('settings.domain.status.unconnected')}
                </label>
              )
            }
          },
          {
            prop: 'https',
            label: this.$t('settings.domain.tableHeader.ssl'),
            width: 100,
            align: 'center',
            render: (row) => {
              return (
                <i
                  class="el-icon-check"
                  class={row['https'] === 0 ? 'check-success el-icon-check' : 'el-icon-check'}></i>
              )
            }
          },
          {
            prop: 'createTime',
            label: this.$t('settings.domain.tableHeader.date'),
            width: 120,
            dataType: 'date'
          }
        ]
      }
    }
  },
  props: {
    heading: {
      type: String,
      default: ''
    },
    subheading: {
      type: String,
      default: ''
    },
    domainType: {
      type: Number,
      default: () => {
        return 0
      }
    },
    dataset: {
      type: Array,
      default: () => {
        return [
          {
            connected: 0,
            https: 0
          }
        ]
      }
    }
  },
  created () {
    this.buttonGroup()
    this.tableOptions.loading = false
  },
  methods: {
    /**
     * 关闭更换域名弹窗
     */
    dialogClose () {
      this.changeVisible = false
      this.loading = false
    },
    /**
     * 初始添加按钮选项
     */
    buttonGroup () {
      let that = this
      if (that.domainType === 0) {
        this.dataConfig.columns.push({
          button: true,
          width: 130,
          label: '',
          group: [{
            name: this.$t('settings.domain.change.button'),
            type: 'text',
            onClick: () => {
              this.loadNormalDomain()
            }
          }]
        })
      } else if (this.domainType === 1) {
        this.dataConfig.columns.push(
          {
            prop: '',
            label: '',
            width: 130
          }
        )
      }
      if (that.domainType === 2) {
        that.dataConfig.columns.push(
          {
            prop: '',
            label: '',
            width: 80,
            render: (row, index, ctx, createElement) => {
              return createElement('span', {
                class: ['render-span-com-sty', 'text-danger'],
                domProps: {
                  innerHTML: that.$t('base.delete.button')
                },
                on: {
                  click: (evt) => {
                    evt.stopPropagation()
                    that.removeDomain(row)
                  }
                }
              })
            }
          },
          {
            prop: '',
            label: '',
            width: 50,
            render: (row, index, ctx, createElement) => {
              if (row['connected'] === 1) {
                return createElement('span', {
                  class: ['render-span-com-sty', 'default-color'],
                  domProps: {
                    innerHTML: that.$t('settings.domain.reConnect')
                  },
                  on: {
                    click: (evt) => {
                      evt.stopPropagation()
                      this.reconnect(row)
                    }
                  }
                })
              }
            }
          }
        )
      }
    },
    /**
     * 加载已连接域名列表
     */
    loadNormalDomain () {
      this.domainLoading = true
      this.changeVisible = true
      fetchDomainNormalList({
        siteId: this.siteId
      })
        .then(result => {
          if (result.success) {
            this.domains = result.data
            this.domainLoading = false
          } else {
            this.errorMessage(result)
          }
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 换域名
     * @param value
     */
    changeDomain (value) {
      this.domainId = value
    },
    /**
     * 删除域名
     * @param index
     * @param row
     */
    removeDomain (row) {
      this.$confirm(this.$t('settings.domain.delete.content').toString(), this.$t('settings.domain.delete.heading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            fetchDomainDelete({
              domainId: row.id
            })
              .then(result => {
                this.resultMessage(result, (success) => {
                  if (success) {
                    this.$emit('refresh')
                  }
                  instance.confirmButtonLoading = false
                  done()
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
     * 域名解析重连
     */
    reconnect (row) {
      fetchDomainReconnect({
        id: row.id
      }).then(result => {
        result.options = {
          action: this.actionType.addition,
          success: this.$t('settings.domain.connect.reconnectSuccess'),
          error: this.$t('settings.domain.connect.reconnectFailed'),
          formName: 'update'
        }
        this.resultMessage(result, (success) => {
          if (success) {
            this.$emit('refresh')
          }
        })
      })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 设置主域名
     */
    setDefault () {
      if (this.domainId !== '') {
        this.loading = true
        fetchDomainDefault({
          domainId: this.domainId
        })
          .then(result => {
            this.loading = false
            this.changeVisible = false
            result.options = {
              action: this.actionType.update,
              formName: 'update'
            }
            this.resultMessage(result, (success) => {
              if (success) {
                this.$emit('refresh')
              }
            })
          })
          .catch(error => {
            this.changeVisible = false
            this.pageInvalid(error)
          })
      }
    },
    /**
     * 新增域名
     */
    bindDomain () {
      this.$emit('bind')
    }
  }
}
</script>
<style>

.check-success {
  color: #67C23A;
}

.el-icon-check {
  font-size: 18px;
}

.render-span-com-sty {
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
}

.default-color {
  color: #46a0fc;
}

.pointer {
}

</style>
