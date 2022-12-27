<template>
  <div
    v-title="$t('design.title')"
    v-loading="pageLoading"
    :class="`editor-container ${toolbarPosition}`"
  >
    <setting-panel
      v-model="pageId"
      ref="settingPanel"
      :target-origin="pageGroup.targetOrigin"
      :unsaved.sync="unsaved"
      :override-unsaved.sync="overrideUnsaved"
      @design="designModel"
    ></setting-panel>
    <div class="editor-preview-container">
      <div class="editor-preview-navigation">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-dropdown
              placement="bottom-start"
              class="page-navigation"
              @command="changePage">
              <label class="el-dropdown-link">
                {{ pageData.title }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </label>
              <el-dropdown-menu
                class="page-list"
                slot="dropdown">
                <el-dropdown-item
                  v-for="o in pageGroup.pageList"
                  :key="o.id"
                  :command="o.id"
                >
                  {{ o.title }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-for="(o, index) in pageGroup.customList"
                  :key="o.id"
                  :command="o.id"
                  :divided="index === 0"
                >
                  {{ o.title }}
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  v-if="siteModel.siteType === 3"
                  key="fo-add-custom-page"
                  command="fo-add-custom-page"
                >
                  <i class="el-icon-plus"></i>
                  {{ $t('design.addPage') }}
                </el-dropdown-item>
              </el-dropdown-menu>

            </el-dropdown>
          </el-col>
          <el-col :span="8">
            <ul class="editor-nav-action">
              <li @click="editSize(0, 'editor-preview-wrapper-mobile')">
                <svg
                  t="1625542363760"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M341.333333 896H256V128h512v768H341.333333z m0-85.333333h341.333334V213.333333H341.333333v597.333334z m85.333334-42.666667v-85.333333h170.666666v85.333333h-170.666666z"
                    p-id="98246"></path>
                </svg>
              </li>
              <li
                @click="editSize(1, 'desktop')"
                class="active">
                <svg
                  t="1625542121152"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M554.666667 682.666667v42.666666h85.333333v85.333334H384v-85.333334h85.333333v-42.666666H170.666667V213.333333h682.666666v469.333334h-298.666666z m0-85.333334h213.333333V298.666667H256v298.666666h298.666667z"
                    p-id="98115"></path>
                </svg>
              </li>
              <li @click="editSize(2, 'full-screen')">
                <svg
                  t="1625542401154"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M358.4 768H426.666667v85.333333H213.333333v-213.333333h85.333334v68.266667l128-128 59.733333 59.733333-128 128z m345.6 0l-128-128 59.733333-59.733333 132.266667 132.266666V640h85.333333v213.333333h-213.333333v-85.333333h64zM358.4 298.666667l128 128-59.733333 59.733333-128-128V426.666667H213.333333V213.333333h213.333334v85.333334H358.4z m345.6 0H640V213.333333h213.333333v213.333334h-85.333333V354.133333l-132.266667 132.266667-59.733333-59.733333 128-128z"
                    p-id="98377"></path>
                </svg>
              </li>
            </ul>
          </el-col>
          <el-col
            :span="4"
            v-if="siteModel.langList.length > 1">
            <el-dropdown
              placement="bottom-start"
              class="page-navigation"
              @command="changeRegion">
              <label class="el-dropdown-link">
                {{ currentRegion.languageName }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </label>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="o in myThemeList"
                  :key="o.themeId"
                  :disabled="o.themeId === themeId"
                  :command="o"
                >
                  {{ o.languageName }}
                </el-dropdown-item>
              </el-dropdown-menu>

            </el-dropdown>
          </el-col>
          <el-col :span="siteModel.langList.length > 1 ? 4 : 8">
            <el-button
              @click="saveOverrideChanges"
              size="small"
              class="m-0"
              plain
              v-show="overrideUnsaved"
              type="primary"
            >{{ $t('design.override') }}
            </el-button>
            <el-button
              @click="saveChanges"
              size="small"
              type="primary"
              v-show="unsaved"
            >{{ $t('base.operate.save') }}
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="editor-preview-content">
        <div class="editor-preview-wrapper">
          <iframe
            class="editor-preview-iframe"
            :src="pageURL"
            id="editor"></iframe>
          <!--          <iframe class="editor-preview-iframe" :src="`http://127.0.0.1:8306/site/${siteId}/${pageURL}`" id="editor"></iframe>-->
        </div>
      </div>
    </div>
  </div>
</template>
<style
  lang='scss'
  src="@/assets/design.scss"></style>
<style lang="scss">
.page-list {
  max-height: 335px;
  overflow-x: hidden;
  overflow-y: auto;

  .el-dropdown-menu__item {
    max-width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: rgba(0, 0, 0, .8);
  }
}

.page-navigation {
  .el-dropdown-selfdefine {
    position: relative;

    max-width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 20px !important;

    .el-icon--right {
      position: absolute;
      right: 0;
      top: 15px;
    }
  }
}
</style>
<script>
import extend from '@/plugins/page/base'
import settingPanel from './components/setting-panel'
import {
  fetchPageGroup,
  fetchMyTheme
} from '@/plugins/api/assembler'
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'design-web',
  extends: extend,
  components: {
    settingPanel
  },
  data () {
    return {
      toolbarPosition: 'right',
      unionPages: [],
      pageData: {},
      pageId: '',
      pageURL: '',
      updateScreenShot: false,
      nodeEnv: '',
      unsaved: false,
      overrideUnsaved: false,
      themeId: '',
      pageGroup: {
        targetOrigin: '',
        customList: [],
        pageList: []
      },
      myThemeList: [],
      currentRegion: {}
    }
  },
  created () {
    this.nodeEnv = process.env.NODE_ENV
    this.themeId = this.$route.params.themeId
    this.getData()
    let toolbar = localStorage.getItem('toolbar')
    if (toolbar) {
      this.toolbarPosition = toolbar
    }
  },
  computed: {
    ...mapState(['siteModel'])
  },
  mounted () {
    document.body.classList.add('overflow')
  },
  beforeRouteLeave (to, from, next) {
    document.body.classList.remove('overflow')
    next()
  },
  methods: {
    /**
     * 切换页面
     * @param id 页面ID
     * @param design 是不是C端界面推送的
     */
    changePage (id, design) {
      if (id === 'fo-add-custom-page') {
        this.utility.openSite(`/site/${this.siteId}/pages`)
      } else {
        let pages = this.unionPages.filter((o) => {
          return o.id === id
        })
        if (pages.length > 0) {
          this.pageData = pages[0]
          this.pageId = this.pageData.id
          if (design !== 1) {
            this.pageURL = this.pageData.seoUrl
          }
        }
      }
    },
    ...mapMutations(['setSiteModel', 'setMySite', 'setGlobalRegionModel']),
    /**
     * 切换语言
     * @param item
     */
    changeRegion (item) {
      let s = this.siteModel.langList.filter((o) => {
        return o.code === item.code
      })
      if (s.length > 0) {
        this.setGlobalRegionModel({
          ...s[0],
          siteId: this.siteModel.id,
          url: s[0].url
        })
        location.href = item.designURL
        this.currentRegion = item
      }
    },
    /**
     * 设置编辑区域尺寸
     * @param value
     * @param index 第一个元素
     */
    editSize (index, value) {
      document.querySelectorAll('.editor-nav-action li').forEach((o, i) => {
        if (i === index) {
          o.classList.add('active')
        } else {
          o.classList.remove('active')
        }
      })
      if (value === 'full-screen') {
        document.querySelector('.editor-container').classList.add('full-screen')
      } else {
        document.querySelector('.editor-container').classList.remove('full-screen')
      }
      let el = document.querySelector('.editor-preview-wrapper')
      el.className = 'editor-preview-wrapper ' + value
    },
    /**
     * 获取页面
     */
    getData () {
      fetchPageGroup({
        siteId: this.siteModel.id,
        themeId: this.themeId,
        region: this.regionCode
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.getPageData(result.data)
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
      fetchMyTheme({
        siteId: this.siteModel.id
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.myThemeList = result.data
              let s = result.data.filter((o) => {
                return o.themeId === this.themeId
              })
              if (s.length > 0) {
                this.currentRegion = s[0]
              }
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 获取页面
     */
    getPageData (data) {
      this.pageGroup = data
      this.unionPages = this.unionPages.concat(data.pageList, data.customList)
      if (data.pageList && data.pageList.length > 0) {
        this.pageData = data.pageList[0]
        this.pageURL = this.pageData.seoUrl
        this.pageId = this.pageData.id
      }
      this.fixedUnsaved()
    },
    /**
     * 子组件套娃事件
     */
    saveChanges () {
      this.$refs.settingPanel.matryoshkaEvent()
      this.unsaved = false
      this.overrideUnsaved = false
    },
    /**
     * 子组件套娃事件
     */
    saveOverrideChanges () {
      this.$refs.settingPanel.overrideMatryoshkaEvent()
      this.unsaved = false
      this.overrideUnsaved = false
    },
    /**
     * 保存更新
     */
    fixedUnsaved () {
      this.$nextTick(() => {
        this.unsaved = false
        this.overrideUnsaved = false
      })
    },
    /**
     * 跟据浏览器URL切换页面和配置
     * @param data
     */
    designModel (data) {
      if (!(data.pageType === this.pageData.pageType && data.pageId === this.pageData.id)) {
        this.pageDesignStatus = true
        this.changePage(data.pageId, 1)
      }
    }
  }
}
</script>
