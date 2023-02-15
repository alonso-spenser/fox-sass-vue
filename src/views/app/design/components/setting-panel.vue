<template>
  <div class="editor-sidebar">
    <div class="editor-settings active">
      <div class="editor-settings-heading">
        <router-link :to="`/site/${siteModel.id}/masterplate`">
          <i class="el-icon-arrow-left"></i>
        </router-link>
        {{ model.globalConfig.name }}
      </div>
      <ul class="editor-settings-type">
        <li
          :class="displaySection ? 'active' : ''"
          @click="displaySection=true">
          {{ $t('design.section.title') }}
        </li>
        <li
          :class="!displaySection ? 'active' : ''"
          @click="displaySection=false">
          {{ $t('design.settings') }}
        </li>
      </ul>
      <div
        v-show="displaySection"
        v-loading="pageLoading"
        class="fox-section-panel"
        element-loading-background="#535366"
      >
        <!-- header -->
        <template
          v-if="hasGlobalSection('header')"
        >
          <section-item
            key="section-global-header"
            :display-visible="true"
            :section-data="getGlobalSection('header')"
            @change="changeSection"
            @display="loadSettingPanel"
            @message="sendMessage"
          >
          </section-item>
        </template>
        <template
          v-if="hasGlobalSection('floatMenu')"
        >
          <section-item
            key="section-global-floatMenu"
            :display-visible="true"
            :section-data="getGlobalSection('floatMenu')"
            @change="changeSection"
            @display="loadSettingPanel"
            @message="sendMessage"
          >
          </section-item>
        </template>
        <!-- page module list -->
        <draggable
          :list="model.sectionList"
          :move="draggableMoving"
          handle=".fox-section-move"
          @end="draggableEnd"
          @start="draggableStart"
        >
          <template v-for="(o, index) in model.sectionList">
            <section-item
              :key="o.id"
              :display-visible="true"
              :ref-id="refId"
              :section-data="o"
              :section-index="index"
              :sorting="true"
              @change="changeSection"
              @display="loadSettingPanel"
              @message="sendMessage"
              @clone="sectionChange"
              @remove="removeSection"
              @visible="sectionVisible"
            >
            </section-item>
          </template>
        </draggable>
        <!-- 添加新的 -->
        <section-item
          v-if="model.addSection === 0 && configSection.addition !== undefined"
          :paste-visible="sectionPasteVisible"
          :section-data="configSection.addition"
          @add="loadAddSection"
          @clipboard="pasteFormClipboard"
        ></section-item>
        <!-- 整页复制 -->
        <clone-page
          v-if="model.isCustom === 0"
          :paste-visible="pagePasteVisible"
          @clone="clonePage"
          @paste="pastePageFormClipboard"
        ></clone-page>
        <section-item
          v-if="hasGlobalSection('footer')"
          key="section-global-footer"
          :display-visible="true"
          :section-data="getGlobalSection('footer')"
          @change="changeSection"
          @display="loadSettingPanel"
          @message="sendMessage"
        >
        </section-item>
      </div>
      <div
        v-show="!displaySection"
        class="fox-section-panel">
        <template v-for="(o) in configSection.global">
          <section-item
            :key="o.sectionType"
            :display-visible="true"
            :section-data="o"
            @display="loadSettingPanel"
            @message="sendMessage"
          >
          </section-item>
        </template>
        <div
          v-if="false"
          v-loading="clearSchemaLoading"
          class="fox-section mt-3"
          @click="clearSchema">
          <div class="el-row">
            <div class="el-col el-col-3 el-col-offset-1">
              &nbsp;
            </div>
            <div class="text-truncate el-col el-col-13">
              清理全局参数
            </div>
          </div>
        </div>
      </div>
    </div>
    <section-selector
      :page-section-list="model.sectionList"
      :section-group="sectionSelectorData.sectionGroup"
      :section-id="sectionSelectorData.sectionId"
      :section-type="sectionSelectorData.sectionType"
      :theme-section-id="sectionSelectorData.themeSectionId"
      :visible.sync="sectionSelectorData.visible"
      @change="sectionMount"
    ></section-selector>
    <section-editor
      ref="sectionEditor"
      :ref-id="refId"
      :lang-code="model.region"
      :section-data.sync="sectionEditorData.sectionData"
      :unsaved-status.sync="unsavedStatus"
      :visible.sync="sectionEditorData.visible"
      @anchor="updateAnchorNavigation"
      @change="sectionChange"
      @message="sendMessage"
      @remove="removeSection"
    ></section-editor>
  </div>
</template>
<style
  lang='scss'
  src="@/assets/design.scss"></style>

<script>
import extend from '@/plugins/page/paging'
import Draggable from 'vuedraggable'
import sectionItem from './section-item'
import sectionSelector from './section-selector'
import sectionEditor from './section-editor'
import clonePage from './clone-page'
import {
  fetchPageInfo,
  fetchSectionClone,
  fetchSectionMount,
  fetchSectionSorting,
  fetchClonePage,
  fetchSectionAnchor,
  fetchClearSchema
} from '@/plugins/api/assembler'
import {
  mapState
} from 'vuex'

export default {
  name: 'setting-panel',
  extends: extend,
  components: {
    Draggable,
    sectionItem,
    sectionSelector,
    sectionEditor,
    clonePage
  },
  data () {
    return {
      pageLoading: true,
      displaySection: true,
      /**
       * section 临时ID
       */
      sectionTemplateId: '',
      /**
       * 组件粘贴
       */
      sectionPasteVisible: false,
      /**
       * 页面组件复制
       */
      pagePasteVisible: false,
      themeId: '',
      pageId: '',
      model: {
        id: '',
        title: '',
        addSection: 1,
        sectionList: [],
        supportCustom: false,
        globalSectionList: [],
        globalConfig: {
          id: '',
          globalColorsData: {},
          globalFaviconData: {},
          globalGeneralData: {},
          globalSocialData: {},
          globalTypographyData: {},
          name: 'Default',
          version: '0.0.1'
        }
      },
      configSection: {},
      sectionSelectorData: {
        visible: false,
        sectionType: '',
        sectionGroup: 3000,
        sectionId: '',
        themeSectionId: ''
      },
      sectionEditorData: {
        visible: false,
        sectionData: {}
      },
      unsavedStatus: false,
      /**
       * 数据ID
       * 文章 | 产品 | 集合 | TAG
       */
      refId: '',
      /**
       * 客户端回调数据
       */
      designCallData: {
        pageType: '',
        pageId: '',
        dataId: '',
        collectionId: '',
        refId: ''
      },
      clonePageCacheKey: 'customPageClone',
      clearSchemaLoading: false
    }
  },
  computed: {
    ...mapState(['siteModel'])
  },
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    unsaved: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    overrideUnsaved: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    targetOrigin: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.pageId = val
      },
      immediate: true,
      deep: true
    },
    pageId: {
      handler (val, newVal) {
        if (this.utility.isNotEmpty(val) && val !== newVal) {
          this.pageLoading = true
          // this.getPageSection(val)
        }
      },
      immediate: true,
      deep: true
    },
    unsaved (val) {
      this.unsavedStatus = val
    },
    unsavedStatus (val) {
      this.$emit('update:unsaved', val)
      // this.$emit('update:overrideUnsaved', val && this.model.supportCustom && this.utility.isNotEmpty(this.collectionId))
    }
  },
  created () {
    this.unsavedStatus = this.unsaved
    this.themeId = this.$route.params.themeId
    this.pageId = this.value
    this.configSection = this.$t('design.section')
    this.getPagePasteState()
    window.addEventListener('message', (e) => {
      this.clientCallMessage(e)
    }, false)
  },
  methods: {
    /**
     * 清理全局
     */
    clearSchema () {
      this.clearSchemaLoading = true
      fetchClearSchema({
        siteId: this.siteId
      }).then(result => {
        this.clearSchemaLoading = false
        this.$message({
          type: 'success',
          message: 'Completed'
        })
      })
        .catch(() => {
          this.clearSchemaLoading = false
        })
    },
    /**
     * 整页复制
     */
    clonePage () {
      if (this.utility.isNotEmpty(this.pageId)) {
        localStorage.setItem(this.clonePageCacheKey, this.pageId)
        this.getPagePasteState()
        this.$message({
          type: 'success',
          message: this.$t('design.clonePage.tips')
        })
      }
    },
    getPagePasteState () {
      let pageId = localStorage.getItem(this.clonePageCacheKey)
      if (this.model.isCustom === 0 && this.utility.isNotEmpty(pageId) && pageId !== this.pageId) {
        this.pagePasteVisible = true
      } else {
        this.pagePasteVisible = false
      }
    },
    /**
     * 从剪贴板中复制组件
     */
    pastePageFormClipboard () {
      let pageId = localStorage.getItem(this.clonePageCacheKey)
      if (pageId === this.pageId) {
        this.$message({
          type: 'success',
          message: this.$t('design.clonePage.same')
        })
        return false
      }
      fetchClonePage({
        siteId: this.siteId,
        originalPageId: pageId,
        pageId: this.pageId
      }).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            localStorage.removeItem(this.clonePageCacheKey)
            this.getPageSection(this.model.id)
            setTimeout(() => {
              this.sendMessage({
                action: 'reload',
                data: {}
              })
            }, 500)
          }
        })
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 关闭设置面板
     */
    closeSettingPanel () {
      this.sectionSelectorData.sectionId = ''
      this.sectionSelectorData.themeSectionId = ''
      this.sectionEditorData.visible = false
    },
    /**
     * 关闭SECTION选择面板
     */
    closeSectionPanel () {
      this.sectionSelectorData.visible = false
      this.sectionSelectorData.sectionType = ''
      this.sectionSelectorData.sectionGroup = 3000
      this.sectionSelectorData.sectionId = ''
      this.sectionSelectorData.themeSectionId = ''
    },
    /**
     * 获取页面Section
     * @param pageId 页面ID
     * @param sectionId 新增加的SECTION ID
     * @param fun 回调
     */
    getPageSection (pageId, sectionId, fun) {
      this.themeId = this.themeId || this.$route.params.themeId
      this.closeSettingPanel()
      this.closeSectionPanel()
      fetchPageInfo({
        pageId,
        themeId: this.themeId,
        siteId: this.siteModel.id,
        refId: this.refId
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              let dataset = result.data
              dataset.globalConfig.globalColorsData = JSON.parse(dataset.globalConfig.globalColorsData)
              dataset.globalConfig.globalFaviconData = JSON.parse(dataset.globalConfig.globalFaviconData)
              dataset.globalConfig.globalGeneralData = JSON.parse(dataset.globalConfig.globalGeneralData)
              dataset.globalConfig.globalSocialData = JSON.parse(dataset.globalConfig.globalSocialData)
              dataset.globalConfig.globalTypographyData = JSON.parse(dataset.globalConfig.globalTypographyData)
              if (this.utility.isNotEmpty(sectionId)) {
                let preS = dataset.sectionList.filter((o) => {
                  return o.id === sectionId
                })
                dataset.globalSectionList.forEach((o) => {
                  o.sectionData = JSON.parse(o.sectionData)
                })
                if (fun && typeof fun === 'function') {
                  fun.call(this, preS.length > 0 ? preS[0] : null)
                }
              }
              this.sendMessage({
                action: 'config',
                data: {
                  ...dataset.globalConfig
                }
              })
              this.pageLoading = false
              this.model = dataset
              this.getClipboardState()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 设置组件
     */
    hasConfigSection (sectionType) {
      return this.configSection.global.filter((o) => {
        return o.sectionType === sectionType
      }).length > 0
    },
    /**
     * 全局组件
     */
    hasGlobalSection (sectionType) {
      return this.model.globalSectionList.filter((o) => {
        return o.sectionType === sectionType
      }).length > 0
    },
    /**
     * 全局组件
     */
    getGlobalSection (sectionType) {
      let s = this.model.globalSectionList.filter((o) => {
        return o.sectionType === sectionType
      })
      return s.length > 0 ? s[0] : null
    },
    /**
     * 剪贴板状态
     */
    getClipboardState () {
      let clip = localStorage.getItem('sectionClip')
      this.sectionPasteVisible = clip != null && clip !== undefined
      this.getPagePasteState()
    },
    /**
     * 从剪贴板中粘贴
     */
    pasteFormClipboard () {
      let sectionCache = localStorage.getItem('sectionClip')
      if (sectionCache) {
        let data = JSON.parse(sectionCache)
        fetchSectionClone({
          ...data,
          pageId: this.model.id,
          refId: this.refId
        }).then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              localStorage.removeItem('sectionClip')
              this.getPageSection(this.model.id, result.data.id, (section) => {
                this.previewSection({
                  ...section,
                  sectionData: result.data.sectionData
                })
                // this.loadSettingPanel({
                //   siteId: this.siteId,
                //   themeId: this.themeId,
                //   isGlobal: 1,
                //   pageType: this.model.pageType || '',
                //   region: this.regionCode,
                //   id: result.data.id,
                //   refresh: true,
                //   sectionData: result.data.sectionData,
                //   sectionType: section.sectionType
                // })
              })
            }
          })
        })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    },
    /**
     * 开始拖动
     * @param evt
     */
    draggableStart: function (evt) {
      document.querySelector('.editor-container').classList.add('scaled')
      this.sendMessage({
        action: 'draggableStart',
        data: {
          dragged: evt.item.dataset.id
        }
      })
    },
    /**
     * 拖完
     * @param evt
     */
    draggableEnd: function (evt) {
      this.sectionSorting()
      document.querySelector('.editor-container').classList.remove('scaled')
      this.sendMessage({
        action: 'draggableEnd',
        data: {
          dragged: evt.clone.dataset.id
        }
      })
    },
    /**
     * 拖动中
     * @param evt
     */
    draggableMoving: function (evt) {
      this.sendMessage({
        action: 'draggableMoving',
        data: {
          dragged: evt.draggedContext.element.id,
          related: evt.relatedContext.element.id,
          after: evt.willInsertAfter
        }
      })
    },
    /**
     * 获取编辑器
     * @returns {null|Window}
     */
    getEditor () {
      let editor = document.getElementById('editor')
      if (editor && editor.contentWindow) {
        return editor.contentWindow
      }
      return null
    },
    /**
     * 组件显示状态
     * @param data
     */
    sectionVisible (data) {
      this.sendMessage({
        action: 'visible',
        data: data
      })
    },
    /**
     * 发送post message通知
     * @param data
     */
    sendMessage (data) {
      if (data.action && data.action === 'update') {
        if (this.designCallData.dataId.indexOf('?') > -1) {
          this.designCallData.dataId = this.designCallData.dataId.split('?')[0]
        }
        data.data = {
          ...data.data,
          pageId: this.pageId,
          dataId: this.designCallData.dataId,
          pageType: this.model.pageType || ''
        }
      }
      if (data.action === 'update' && data.data.sectionType === 'anchorPin') {
        this.anchorNavigation(data.data)
      }
      let editor = this.getEditor()
      if (editor) {
        editor.postMessage(data, '*')
      }
    },
    /**
     * 更新锚钉
     * 保存锚点更新的时候，顺手更新锚钉导航
     */
    updateAnchorNavigation (id, title) {
      let pins = []
      let sectionId = ''
      this.model.sectionList.forEach((o, index) => {
        if (o.sectionType === 'anchorPin') {
          let dt = JSON.parse(o.sectionData)
          pins.push({
            id: o.id,
            title: o.id === id ? title : dt.title
          })
        }
        if (o.sectionType === 'anchorNavigation') {
          sectionId = o.id
        }
      })
      if (this.utility.isNotEmpty(sectionId)) {
        fetchSectionAnchor({
          menuList: JSON.stringify({
            data: pins,
            type: 'normal'
          }),
          sectionId
        })
      }
    },
    /**
     * 锚钉导航菜单数据
     */
    anchorNavigation (data) {
      let pins = []
      let sectionId = ''
      let sectionData = {}
      this.model.sectionList.forEach((o, index) => {
        if (o.sectionType === 'anchorPin') {
          let dt = JSON.parse(o.sectionData)
          pins.push({
            id: o.id,
            title: data.id === o.id ? data.sectionData.title : dt.title
          })
        }
        if (o.sectionType === 'anchorNavigation') {
          sectionId = o.id
          sectionData = o
        }
      })
      if (this.utility.isNotEmpty(sectionId)) {
        sectionData.sectionData = JSON.parse(sectionData.sectionData)
        sectionData.sectionData.dataset.menuList = {
          data: pins,
          type: 'normal'
        }
        this.sendMessage({
          action: 'update',
          data: {
            id: sectionId,
            siteId: this.siteId,
            themeId: this.themeId,
            region: this.regionCode,
            sectionType: sectionData.sectionType,
            isGlobal: 1,
            sectionData: sectionData.sectionData
          }
        })
      }
    },
    /**
     * 删除Section [通知客户端]
     * @param id
     */
    removeSection (id) {
      this.sendMessage({
        action: 'removeSection',
        data: {
          id: id
        }
      })
    },
    /**
     * 删除Section [客户端删除成功回调执行]
     * @param result
     */
    removeSectionExecute (result) {
      this.getPageSection(this.model.id)
    },
    /**
     * 客户端执行后回调通知
     */
    clientCallMessage (e) {
      if (e.data['fomille']) {
        this.messageStatus = e.data.message
        switch (e.data.message.action) {
          case 'addSection':
            // this.addSectionExecute(e.data.message)
            break
          case 'removeSection':
            this.removeSectionExecute(e.data.message)
            break
          case 'design':
            this.designCallData.dataId = e.data.message.dataId
            this.refId = e.data.message.refId
            this.designCallData = e.data.message
            this.getPageSection(e.data.message.pageId)
            this.$emit('design', e.data.message)
            break
          case 'screenShot':
            // this.saveScreenShot(e.data.message.data)
            break
        }
      }
    },
    /**
     * 显示对应的设置参数
     * @param data
     */
    loadSettingPanel (data) {
      this.sectionEditorData.visible = true
      this.sectionSelectorData.visible = false
      if (this.hasConfigSection(data.sectionType)) {
        this.sectionEditorData.sectionData = {
          global: true,
          data
        }
      } else {
        this.sectionEditorData.sectionData = {
          global: false,
          data
        }
      }
      // this.panelId = id
      // this.utility.animateCSS('.editor-settings', 'slideOutLeft', () => {
      //   document.querySelector('.editor-settings').classList.remove('active')
      //   document.querySelector('.editor-section-panel').classList.add('active')
      //   this.utility.animateCSS('.editor-section-panel', 'slideInRight', () => {})
      // })
    },
    /**
     * 更改SECTION
     */
    changeSection (data) {
      if (!this.hasConfigSection(data.sectionType)) {
        this.sectionSelectorData.visible = true
        this.sectionSelectorData.sectionType = data.sectionType
        this.sectionSelectorData.sectionGroup = data.sectionGroup
        this.sectionSelectorData.sectionId = data.id
        this.sectionSelectorData.themeSectionId = data.sectionId
        this.sectionEditorData.visible = false
      }
    },
    /**
     * 添加组件
     */
    loadAddSection () {
      this.sectionSelectorData.visible = true
      this.sectionSelectorData.sectionType = ''
      this.sectionSelectorData.sectionGroup = 3000
      this.sectionSelectorData.sectionId = ''
      this.sectionSelectorData.themeSectionId = ''
      this.sectionEditorData.visible = false

      // this.utility.animateCSS('.editor-section-panel', 'slideOutRight', () => {
      //   document.querySelector('.editor-section-panel').classList.remove('active')
      //   document.querySelector('.editor-settings').classList.add('active')
      //   this.utility.animateCSS('.editor-settings', 'slideInLeft')
      // })
    },
    /**
     * 添加 & 修改SECTION
     * @param data
     */
    sectionMount (data) {
      fetchSectionMount({
        ...data,
        pageId: this.model.id,
        themeId: this.themeId,
        refId: this.refId
      }).then(result => {
        this.pageValid()
        this.resultMessage(result, (success) => {
          if (success) {
            this.getPageSection(this.model.id, result.data.id, (section) => {
              this.previewSection({
                ...section,
                sectionData: result.data.sectionData
              })
              // this.loadSettingPanel({
              //   siteId: this.siteId,
              //   themeId: this.themeId,
              //   isGlobal: 1,
              //   pageType: this.model.pageType || '',
              //   region: this.regionCode,
              //   id: result.data.id,
              //   refresh: true,
              //   sectionData: result.data.sectionData,
              //   sectionType: section.sectionType
              // })
            })
          }
        })
      })
        .catch(error => {
          this.sectionLoading = false
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * SECTION CHANGED (REMOVE & COPY & CLONE)
     * SECTION RELOAD
     * @param data
     */
    sectionChange (data) {
      this.getPageSection(this.model.id, data.id, (section) => {
        this.previewSection({
          ...section,
          sectionData: data.sectionData
        })
      })
    },
    /**
     * SECTION排序
     */
    sectionSorting () {
      let list = []
      this.model.sectionList.forEach((o, index) => {
        list.push({
          id: o.id,
          sortIndex: index + 1,
          siteId: this.siteId
        })
      })
      fetchSectionSorting({
        sectionList: list,
        pageId: this.model.id,
        siteId: this.siteId
      }).then(result => {
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
     * 子组件套娃事件
     */
    matryoshkaEvent () {
      this.$refs.sectionEditor.formValidation()
    },
    /**
     * 子组件套娃事件（覆盖）
     */
    overrideMatryoshkaEvent () {
      this.$refs.sectionEditor.overrideFormValidation()
    },
    /**
     * 预览SECTION
     */
    previewSection (data) {
      this.sendMessage({
        action: 'update',
        data: {
          ...data,
          region: this.regionCode,
          siteId: this.siteId,
          themeId: this.themeId,
          isGlobal: 1
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
