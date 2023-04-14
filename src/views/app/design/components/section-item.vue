<template>
  <div
    :class="`fox-section ${model.sectionType}`"
    :data-id="model && model.id ? model.id : ''"
  >
    <el-row>
      <el-col
        :span="3"
        :offset="1"
        @click.native="displaySetting"
      >
        <div
          v-html="model.sectionIcon"
          v-if="model.sectionIcon && model.sectionIcon.indexOf('/css') === -1"></div>
        <img
          class="element-icon-img"
          v-else
          :src="model.sectionIcon">
      </el-col>
      <el-col
        @click.native="displaySetting"
        class="text-truncate"
        :span="model.sectionType === 'anchorPin' ? 16 : 13">
        <template v-if="model.sectionGroup === 2000">
          {{ regionCode === 'en' ? model.sectionEnName || model.sectionName : model.sectionName }}
        </template>
        <template v-else>
          {{ model.sectionName }}
        </template>
      </el-col>
      <el-col
        :span="3"
        :offset="sorting ? 0 : 3"
        class="fox-section-refresh"
        v-if="model.sectionGroup === 1000 || model.sectionGroup === 2000"
        @click.native="sectionChange"
        :title="$t('design.changeSection')"
      >
        <el-icon name="refresh"></el-icon>
      </el-col>
      <el-col
        :span="3"
        v-if="(model.sectionType !== 'anchorPin' && model.sectionGroup === 3000)"
      >
        <el-dropdown @command="sectionEvent">
          <label class="el-dropdown-link">
            <img
              class="element-icon-img"
              v-if="model.visible === 0"
              src="@/assets/svg/eye-open.svg">
            <img
              class="element-icon-img"
              v-else
              src="@/assets/svg/eye-close.svg">
          </label>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              command="scope"
              icon="el-icon-house"
              v-if="privatelySection">
              {{ hasRefId ? `${$t('design.apply.current')}${textTips}` : `${$t('design.apply.all')}${textTips}` }}
            </el-dropdown-item>
            <el-dropdown-item
              :divided="privatelySection "
              icon="el-icon-view"
              command="visible">
              {{ model.visible === 0 ? $t('design.hide') : $t('design.visible') }}
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-plus"
              command="copy">{{ $t('design.copy') }}
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-document-copy"
              command="clip">{{ $t('design.copyToClip') }}
            </el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-delete"
              divided
              command="remove">{{ $t('design.remove') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col
        :span="4"
        v-if="sorting"
        class="fox-section-move"
      >
        <img
          class="element-icon-img"
          src="@/assets/svg/move.svg">
      </el-col>
      <el-col
        class="text-center"
        :span="6"
        @click.native="pasteFormClipboard"
        v-if="model.sectionType === 'globalAddition' && pasteVisible"
      >
        <el-button
          size="small"
          round
          type="primary"
          plain>{{ $t('base.operate.paste') }}
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import resource from '@/plugins/resource'
import extend from '@/plugins/page/base'
import {
  fetchSectionClone, fetchSectionRemove,
  fetchSectionScope,
  fetchSectionState
} from '@/plugins/api/assembler'
import {
  mapState
} from 'vuex'

export default {
  name: 'setting-list',
  extends: extend,
  data () {
    return {
      resource,
      model: {},
      siteId: '',
      themeId: '',
      presetSection: {},
      scopeTips: {
        productDetailPage: '产品',
        articleDetailPage: '文章',
        productPaginationPage: '产品集合',
        articlePaginationPage: '文章集合',
        downloadPaginationPage: '下载集合'
      }
    }
  },
  props: {
    /**
     * 值
     */
    sectionData: {
      type: Object,
      default: () => {
      }
    },
    /**
     * 排序
     */
    sorting: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    refId: {
      type: String,
      default: () => {
        return ''
      }
    },
    /**
     * 粘贴状态
     */
    pasteVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    ...mapState(['siteModel']),
    /**
     * 修改SECTION NAME
     */
    changeSectionVisible () {
      return this.presetSection[this.model.data.sectionType]
    },
    hasRefId () {
      return this.utility.isNotEmpty(this.model.refId) && this.model.refId !== '0'
    },
    textTips () {
      return this.scopeTips[this.model.pageType]
    },
    /**
     * 是否为私有组件
     */
    privatelySection () {
      return (this.model.pageType === 'productDetailPage' ||
          this.model.pageType === 'articleDetailPage' ||
          this.model.pageType === 'productPaginationPage' ||
          this.model.pageType === 'downloadPaginationPage' ||
          this.model.pageType === 'articlePaginationPage'
      ) &&
        this.model.sectionGroup === 3000
    }
  },
  created () {
    this.model = this.sectionData
    this.presetSection = this.$t('design.presetSection')
    this.siteId = this.$route.params.siteId
    this.themeId = this.$route.params.themeId
  },
  methods: {
    /**
     * SECTION事件
     */
    sectionEvent (op) {
      if (op === 'visible') {
        this.sectionVisible()
      } else if (op === 'copy') {
        this.copySection()
      } else if (op === 'clip') {
        this.copyToClip()
      } else if (op === 'scope') {
        this.sectionScope()
      } else if (op === 'remove') {
        this.$confirm(`你确定要删除 [ ${this.model.sectionName} ] 吗？`, 'Oops', {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.removeSection(() => {
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
    },
    /**
     * 关闭窗体
     */
    parentChange (data) {
      this.$emit('update:visible', false)
      this.$emit('clone', data)
    },
    /**
     * COPY SECTION
     */
    copySection () {
      fetchSectionClone({
        id: this.model.id,
        siteId: this.siteId,
        pageId: this.model.pageId
      }).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            this.parentChange({
              id: result.data.id,
              sectionData: result.data.sectionData
            })
          }
        })
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * COPY TO CLIP
     */
    copyToClip () {
      localStorage.setItem('sectionClip', JSON.stringify({
        id: this.model.id,
        siteId: this.siteId
      }))
      this.$message({
        type: 'success',
        message: this.$t('design.copySucceeded').toString()
      })
    },
    /**
     * REMOVE SECTION
     */
    removeSection (fun) {
      fetchSectionRemove({
        id: this.model.id,
        siteId: this.siteId
      }).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            this.$emit('update:visible', false)
            this.$emit('remove', this.model.id)
          }
        })
      })
        .catch(error => {
          this.networkMistake(error)
        }).finally(() => {
          if (fun && typeof fun === 'function') {
            fun.call(this)
          }
        })
    },
    /**
     * 显示设置参数
     */
    displaySetting () {
      if (this.model.sectionType === 'globalAddition') {
        this.$emit('add')
      } else {
        this.$emit('display', this.sectionData)
        if (this.model.id) {
          // this.scrollSection(this.model.id)
        }
      }
    },
    /**
     * 从剪贴板中粘贴
     */
    pasteFormClipboard () {
      this.$emit('clipboard')
    },
    /**
     * 滚动 section
     * @param id
     */
    scrollSection (id) {
      this.$emit('message', {
        action: 'scroll',
        data: id
      })
    },
    /**
     * 更换组件
     */
    sectionChange () {
      this.$emit('change', this.sectionData)
    },
    /**
     * 设置组件范畴
     */
    sectionScope () {
      if (this.privatelySection) {
        let refId = this.model.refId === '0' ? this.refId : '0'
        fetchSectionScope({
          siteId: this.siteId,
          refId: refId,
          id: this.model.id
        }).then(result => {
          result.options = {
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.model.refId = refId
            }
          })
        })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    },
    /**
     * 组件显示状态
     */
    sectionVisible () {
      if (this.model && this.model.id) {
        let visible = this.model.visible === 0 ? 1 : 0
        fetchSectionState({
          siteId: this.siteId,
          state: visible,
          ids: [this.model.id]
        }).then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.model.visible = visible
              this.$emit('visible', {
                id: this.model.id,
                siteId: this.siteId,
                themeId: this.themeId,
                region: this.regionCode,
                sectionType: this.model.sectionType,
                isGlobal: 1,
                sectionData: this.model.sectionData,
                sortIndex: this.model.sortIndex,
                visible: this.model.visible
              })
              this.$emit('unsaved')
            }
          })
        })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.el-popconfirm__action {
  text-align: left;
}
</style>
