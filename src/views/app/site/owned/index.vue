<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    google-style
    :percentage="100"
  >
    <div class="sites-items section-neighbor">
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="o in siteList"
          :key="o.id">
          <el-card
            shadow="hover"
            :class="o.id === siteModel.id ? 'active' : ''">
            <div class="sites-items-cover">
              <img :src="o.thumbnail || '/css/img/web.webp'" />
              <div class="sites-items-cover-mask">
                <p class="text-center">
                  <label>
                    {{ o.currencyName }}
                  </label>
                  {{ o.langName }}
                  <label>
                    {{ siteType[o.siteType] }}
                  </label>
                </p>
                <p class="text-center">
                  <el-button
                    type="primary"
                    round
                    @click="manageSite(o)">
                    {{ $t("site.dashboard.editButton") }}
                  </el-button>
                </p>
              </div>
            </div>
            <dl v-if="$checkPermission(['startup-clone-site'])">
              <dt>
                <el-dropdown
                  class="float-right"
                  @command="dropEvent">
                  <label class="el-dropdown-link">
                    <i class="el-icon-more"></i>
                  </label>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-if="false"
                      :command="{action: 'server', data: o}">变更服务器
                    </el-dropdown-item>
                    <el-dropdown-item :command="{action: 'clone', data: o}">
                      {{ $t('site.dashboard.clone') }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      :command="{action: 'remove', data: o}"
                      divided
                      v-if="o.isExpired || o.payMonth === 0"
                    >
                      {{ $t('site.dashboard.remove.label') }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                {{ o.siteName }}
              </dt>
              <dd>
                <a
                  class="text-primary"
                  :href="`https://${o.systemDomain}`"
                  target="_blank">
                  {{ o.systemDomain }}
                </a>
              </dd>
              <dd>
                <div class="float-right">
                  <time class="mr-2 text-gray">
                    {{ utility.timestampToDate(o.expiryTime) }}
                  </time>
                  <el-button
                    v-if="o.payMonth === 0 && o.isExpired && o.freeRenewal < 5"
                    class="site-action el-button--warning"
                    @click="trialSite(o)"
                  >
                    {{ $t('site.dashboard.trial.label') }}
                  </el-button>
                  <el-button
                    v-if="(o.payMonth > 0 && o.isExpired) || (o.payMonth === 0 && o.isExpired && o.freeRenewal >= 5)"
                    class="site-action el-button--danger"
                    @click="renewSite(o)"
                  >
                    {{ $t('site.dashboard.subscription') }}
                  </el-button>
                </div>
                <label class="sites-items-status">
                  <template v-if="o.isExpired">
                    <i class="el-button--info"></i>
                    <label class="text-info">
                      {{ $t("site.dashboard.expired") }}
                    </label>
                  </template>
                  <template v-else>
                    <i :class="o.state === 2 ? 'el-button--warning' : o.state === 0 ? 'el-button--success' : 'el-button--info'"></i>
                    <label :class="o.state === 2 ? 'text-warning' : o.state === 0? 'text-success' : 'text-info'">
                      {{ $t("siteStatus")[o.state.toString()] }}
                    </label>
                  </template>
                </label>
              </dd>
            </dl>
          </el-card>
        </el-col>
        <el-col
          :span="6"
          v-if="$checkPermission(['startup-create-site'])">
          <el-card
            shadow="hover"
            class="creation"
            @click.native="createSite">
            <i class="el-icon-plus"></i>
            <p>
              {{ $t("site.dashboard.createNew") }}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!--统计-->
    <el-row
      :gutter="20"
      class="section-neighbor">
      <el-col :span="6">
        <el-card
          class="text-center trans-lang"
          shadow="hover">
          <div class="trans-label">
            <h3 class="mb-3">{{ $t('site.dashboard.statistics.languageType') }}</h3>
            {{ $t('site.dashboard.statistics.online') }}
            <label class="mr-3">
              <b class="text-success">{{ siteInfo.keepLang }}</b>
            </label>

            <label
              class="text-info"
              v-if="siteInfo.surplusLang > 0">
              {{ $t('site.dashboard.statistics.usable') }}
            </label>
            <label
              v-if="siteInfo.surplusLang > 0"
              class="text-info">
              <b class="text-warning">{{ siteInfo.surplusLang }}</b>
            </label>
          </div>
          <div
            class="trans-lang-action el-icon-arrow-right"
            v-if="siteInfo.surplusLang > 0"
            @click="addLanguage"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          class="text-center"
          shadow="hover">
          <h3 class="mb-3">{{ $t('site.dashboard.statistics.inquiry') }}</h3>
          <span>
              {{ siteInfo.formQuantity }}
            </span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          class="text-center"
          shadow="hover">
          <h3 class="mb-3">{{ $t('site.dashboard.statistics.products') }}</h3>
          <span>
              {{ siteInfo.goodsQuantity }}
            </span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card
          class="text-center"
          shadow="hover">
          <h3 class="mb-3">{{ $t('site.dashboard.statistics.articles') }}</h3>
          <span>
              {{ siteInfo.articleQuantity }}
            </span>
        </el-card>
      </el-col>
    </el-row>
    <fox-paging-table
      class="section-neighbor"
      :columns="dataConfig.columns"
      :actions="dataConfig.actions"
      :dataset="pagingOptions.dataset"
      :loading="false"
      :multi-select="false"
      :index-number="false"
      :stripe="false"
      :first-loading="pagingOptions.firstLoading"
      :page-index.sync="pagingOptions.pageIndex"
      :page-size.sync="pagingOptions.pageSize"
      :record-count="pagingOptions.recordCount"
      :rows-class-name="dataConfig.rowsClassName"
      @paging="getData"
    >
    </fox-paging-table>
    <language-dialog
      @translate="asyncTranslate"
      :dialog-visible.sync="dialogVisible"
      :site-info="siteInfo"></language-dialog>
  </fox-layout-main>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'
import extend from '@/plugins/page/paging'
import { fetchSiteInfo, fetchSiteTrial, fetchSiteRemove, fetchSiteLanguageState } from '@/plugins/api/site'
import languageDialog from './components/languageDialog'

export default {
  name: 'site-owned',
  extends: extend,
  components: {
    languageDialog
  },
  computed: {
    ...mapState(['agentModel', 'siteModel', 'globalRegionModel']),
    dataConfig () {
      return {
        actions: {
          // update: {
          //   label: this.$t('base.update.button'),
          //   invisible: true,
          //   onClick: row => {
          //     this.designSite(row)
          //   }
          // }
        },
        columns: [
          {
            prop: 'languageName',
            label: this.$t('site.dashboard.tableHeader.languageName'),
            render: (row, index) => {
              return (
                <div>
                  {row.languageName}
                  <small class="ml-3 text-primary">{row.isDefault === 0 ? '主语言' : ''}</small>
                </div>
              )
            }
          },
          {
            prop: 'nativeName',
            label: this.$t('site.dashboard.tableHeader.nativeName')
          },
          {
            prop: 'state',
            label: this.$t('site.dashboard.tableHeader.state'),
            width: 60,
            render: (row, index, ctx, createElement) => {
              if (row.isDefault === 1) {
                return createElement('el-switch', {
                  props: {
                    value: row.state,
                    'active-value': 0,
                    'inactive-value': 1,
                    'active-color': '#13ce66',
                    'inactive-color': '#909399'
                  },
                  on: {
                    change: (value) => {
                      row.state = row.state === 1 ? 0 : 1
                      this.languageState(row)
                    }
                  }
                })
              }
            }
          },
          {
            button: true,
            label: '',
            width: 200,
            align: 'right',
            group: [
              {
                name: this.$t('site.theme.edit'),
                disabled: false,
                onClick: (row) => {
                  this.contentManage(row)
                }
              },
              {
                name: this.$t('site.theme.design'),
                disabled: false,
                onClick: (row) => {
                  this.designSite(row)
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
          return row.code === this.globalRegionModel.code ? 'row-tex-success' : ''
        }
      }
    }
  },
  data () {
    return {
      dataset: [
        {
          isExpired: true,
          thumbnail: '',
          expiryTime: 0,
          payMonth: 0,
          freeRenewal: 0
        }
      ],
      dialogVisible: false,
      defaultCover: 'https://theme.fomillesite.com/img/web.jpg',
      siteType: {},
      siteInfo: {
        languageList: [],
        keepLang: 0,
        articleQuantity: 0,
        goodsQuantity: 0,
        formQuantity: 0,
        surplusLang: 0
      },
      siteList: []
    }
  },
  created () {
    this.siteType = this.$t('siteType')
    this.pageValid()
    this.getOwnedSite()
  },
  methods: {
    ...mapMutations(['setSiteModel', 'setMySite', 'setGlobalRegionModel']),
    getOwnedSite () {
      this.getMySite((data) => {
        this.siteList = data
        if (data.length > 0) {
          this.getData()
        } else {
          this.$router.push({
            path: '/startup/create-site'
          })
        }
      })
    },
    asyncTranslate () {
      this.getData()
    },
    /**
     * 获取已有语言列表
     */
    getData () {
      fetchSiteInfo({
        siteId: this.siteModel.id
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.siteInfo = result.data
              this.pagingOptions.dataset = result.data.languageList
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    },
    /**
     * 跳转到创建网站流程
     */
    createSite () {
      let keep = this.siteList.filter((o) => {
        return !(o.payMonth > 0 && !o.isExpired)
      })
      if (keep.length > 0) {
        this.$message({
          type: 'warning',
          message: this.$t('site.dashboard.trial.keep').toString()
        })
      } else {
        this.$router.push({
          path: '/startup/create-site'
        })
      }
    },
    /**
     * 设计网页
     */
    designSite (row) {
      this.setGlobalRegionModel(row)
      this.utility.openSite(`/site/${this.siteModel.id}/masterplate`)
    },
    /**
     * 复制网站
     */
    copySite (row) {
      console.log('co')
    },
    /**
     * 添加网站
     */
    addSite () {
      this.$router.push({
        path: '/startup/create-site'
      })
    },
    /**
     * 添加语言
     */
    addLanguage () {
      this.dialogVisible = true
    },
    /**
     * 延长试用
     */
    trialSite (o) {
      this.$confirm(this.$t('site.dashboard.trial.tips').toString(),
        this.$t('base.delete.heading').toString(), {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          closeOnClickModal: false,
          type: 'info',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              fetchSiteTrial({
                siteId: o.id
              })
                .then(result => {
                  result.options = {
                    action: this.actionType.update
                  }
                  this.resultMessage(result, (success) => {
                    done()
                    instance.confirmButtonLoading = false
                    if (success) {
                      this.mySite(true)
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
    /**
     * 语言状态
     */
    languageState (o) {
      fetchSiteLanguageState({
        id: o.id,
        state: o.state,
        siteId: o.siteId
      })
        .then(result => {
          result.options = {
            action: this.actionType.update,
            formName: 'update'
          }
          this.resultMessage(result, (success) => {
            if (success) {
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 续费网站
     */
    renewSite (o) {

    },
    /**
     * 网站事件
     */
    dropEvent (command) {
      switch (command.action) {
        case 'clone':
          this.$router.push({
            path: '/startup/clone/' + command.data.id
          })
          break
        case 'remove':
          this.removeSite(command.data.id)
          break
      }
    },
    /**
     * 预览网站
     */
    contentManage (row) {
      this.setGlobalRegionModel(row)
      location.href = '/dashboard'
    },
    /**
     * 跳转网站编辑
     * @param item
     */
    manageSite (item) {
      this.setSiteModel(item)
      if (item.langList.length > 0) {
        this.setGlobalRegionModel(item.langList[0])
      }
      this.$router.push({
        path: '/dashboard'
      })
    },
    /**
     * 删除网站
     * @param id 网站ID
     */
    removeSite (id) {
      this.$confirm(this.$t('site.dashboard.remove.tips').toString(),
        this.$t('base.delete.heading').toString(), {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          closeOnClickModal: false,
          type: 'error',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              fetchSiteRemove({
                siteId: id
              })
                .then(result => {
                  result.options = {
                    action: this.actionType.delete
                  }
                  this.resultMessage(result, (success) => {
                    done()
                    instance.confirmButtonLoading = false
                    if (success) {
                      this.clearCache()
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
    clearCache () {
      let siteId = this.siteModel.id
      this.getMySite((data) => {
        this.siteList = data
        if (data.length > 0) {
          let s = data.filter((o) => {
            return o.id === siteId
          })
          if (s.length === 0) {
            this.setSiteModel(data[0])
          }
          this.setMySite(data)
        } else {
          this.setSiteModel({
            id: '',
            createTime: 1625018655524,
            expiryTime: 1629114091117,
            langCode: 'en',
            langName: '',
            logo: '',
            siteName: '',
            thumbnail: '',
            siteType: 3,
            state: 0,
            systemDomain: '',
            mainDomain: '',
            freeRenewal: 0,
            firstOnline: 1625018655524,
            payMonth: 0,
            isExpired: false,
            bindDomain: false
          })
          this.setMySite([])
          this.$router.push({
            path: '/startup/create-site'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
$themeColor: #46a0fc;
.sites-items {
  .el-row {
    display: flex;
    flex-wrap: wrap;;

    .el-col {
      margin-bottom: 20px;

      .el-card {
        width: 100%;
        height: 100%;
        overflow: hidden;

        &.creation {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          color: #606266;
          cursor: pointer;
          min-height: 280px;

          i {
            font-size: 30px;
          }
        }

        .el-card__body {
          overflow: hidden;
          padding: 0;
          margin: 0;

          .sites-items-copy {
            float: right;

            i {
              font-size: 25px;
              color: #7f7f7f;
            }

            button {
              padding-top: 0;
              padding-bottom: 0;
            }
          }

          .sites-items-cover {
            height: 180px;
            overflow: hidden;
            position: relative;

            img {
              width: 100%;
            }

            .sites-items-cover-mask {
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              opacity: 0;
              background-color: rgba(22, 45, 61, .8);
              transition: all 0.5s;

              p {
                color: #fff;
                margin-right: 15px;
                margin-left: 15px;
                position: relative;

                label {
                  position: absolute;
                  top: 0;

                  &:first-child {
                    left: 0;
                  }

                  &:last-child {
                    right: 0;
                  }
                }
              }

              button {
                margin-top: 30px;
              }
            }
          }

          dl {
            padding: 15px;

            a {
              text-decoration: none;
            }

            dt {
              margin-bottom: 10px !important;
            }

            dd {
              margin: 8px 0 0 0;
              overflow: hidden;
              font-size: 12px;

              .site-action {
                color: #fff;
                font-size: 10px;
                display: inline-block;
                padding: 5px 5px 5px 5px;

                & + .site-action {
                  margin-left: 5px;
                }
              }

              .sites-items-status {
                float: left;
                margin-top: 5px;

                i {
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  border-radius: 100%;
                }

                &:before {
                  content: '';
                }
              }
            }
          }
        }

        &:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .25);
          transition: all 0.5s;
          transform: translateY(-10px);

          .sites-items-cover {
            .sites-items-cover-mask {
              opacity: 1;
            }
          }
        }

        &.active {
          border-color: #c2e7b0;
          background-color: #f0f9eb;
        }
      }
    }
  }
}

.trans-lang {
  .el-card__body {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .trans-label {
    flex: 1;
  }

  &-action {
    width: 4rem;
    cursor: pointer;
    text-align: right;
    font-size: 20px;
    line-height: 45px;

    &:hover {
      color: $themeColor;
    }
  }
}
</style>
