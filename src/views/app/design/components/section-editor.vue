<template>
  <div
    v-if="visible"
    class="editor-section"
  >
    <h3
      class="editor-section-title"
      @click="dialogClose">
      {{ dataset.schemeData.name[language] }}
    </h3>
    <div
      class="editor-section-content"
      v-loading="schemaLoading"
      element-loading-background="#424242"
    >
      <div
        class="editor-section-item"
        v-if="sectionNameVisible">
        <h6>
          {{ $t('design.sectionAlias.heading') }}
        </h6>
        <p>
          <el-input
            size="small"
            @blur="updateSectionName"
            class="change-section-name"
            v-model="sectionData.data.sectionName"
            :placeholder="$t('design.sectionAlias.placeholder')"
          >
          </el-input>
        </p>
      </div>
      <el-collapse
        v-model="activeName"
        accordion
        class="fox-section-collapse">
        <template v-for="(o, index) in dataset.schemeData.group">
          <el-collapse-item
            :title="o.name[language]"
            :name="`element-${index}`"
            :key="`collapse-item-${index}`"
            class="fox-section-item"
          >
            <div class="editor-section-item" v-if="o.tips[language]">
              <h6>
                | {{ o.tips[language] }}
              </h6>
            </div>
            <template v-if="o.multiple === 0">
              <template v-for="(el, elIndex) in o.elements">
                <template v-if="el.type === 'productCollectionPicker' || el.type === 'articleCollectionPicker'">
                  <section-widget
                    :key="`collapse-widget-${index}-${elIndex}`"
                    :schema="el"
                    v-model="dataset.sectionData.dataset[el.field].data[0]"
                  >
                  </section-widget>
                  <!--显示单个集合下的（文章/商品），限制数量-->
                  <div
                    class="editor-section-item"
                    :key="`quantity-${index}-${elIndex}`">
                    <h6>
                      {{ $t(`design.${el.type}.name['${language}']`) }}
                    </h6>
                    <p>
                      <el-input-number
                        size="small"
                        class="w-100"
                        :min="1"
                        :max="99"
                        v-model="dataset.sectionData.dataset[el.field].quantity"
                        :placeholder="$t(`design.${el.type}.placeholder['${language}']`)"
                      ></el-input-number>
                    </p>
                  </div>
                </template>
                <template v-else-if="el.type === 'inquiryFormPicker'">
                  <section-widget
                    :key="`collapse-widget-${index}-${elIndex}`"
                    :schema="el"
                    v-model="dataset.sectionData.dataset[el.field].data[0]"
                  >
                  </section-widget>
                </template>
                <section-widget
                  v-else
                  :schema="el"
                  :key="`collapse-widget-${index}-${elIndex}`"
                  v-model="dataset.sectionData"
                >
                </section-widget>
              </template>
            </template>
            <template v-else>
              <template
                v-if="o.multiple === 2 && o.elements.length === 1 && (o.elements[0].type === 'productCollectionPicker' || o.elements[0].type === 'articleCollectionPicker')">
                <div
                  class="editor-section-item"
                  :key="`multiple-collection-${index}`"
                >
                  <h6>
                    {{ $t(`design.productCollectionPicker.name['${language}']`) }}
                  </h6>
                  <p>
                    <el-input-number
                      size="small"
                      class="w-100"
                      :min="1"
                      :max="99"
                      v-model="dataset.sectionData.dataset[o.tag].quantity"
                      :placeholder="$t(`design.productCollectionPicker.placeholder['${language}']`)"
                    ></el-input-number>
                  </p>
                </div>
              </template>
              <template slot="title">
                {{ o.name[language] }}
                <sub
                  class="ml-3"
                  v-if="dataset.sectionData.dataset[o.tag].data.length > 0">
                  {{ dataset.sectionData.dataset[o.tag].data.length }}
                </sub>
              </template>
              <div
                class="sub-item text-right cursor-pointer"
                @click="loadBatchImage(o.tag)"
                v-if="getBatchImage(o)">
                <el-button
                  type="text"
                  icon="el-icon-picture-outline-round">
                  图片选择
                </el-button>
              </div>
              <el-collapse
                v-model="subActiveName"
                accordion
                class="fox-section-sub-collapse">
                <draggable
                  handle=".fox-section-sub-move"
                  :list="dataset.sectionData.dataset[o.tag].data"
                >
                  <template v-for="(sub, subIndex) in dataset.sectionData.dataset[o.tag].data">
                    <el-collapse-item
                      :title="o.name[language]"
                      :name="`element-${index}-${subIndex}`"
                      :key="`collapse-item-${index}-${subIndex}`"
                      class="fox-section-sub-item"
                    >
                      <template slot="title">
                        <div
                          class="fox-section-sub-title"
                          v-html="getPlaceholder(o.elements, sub, o.placeholder[language])"></div>
                        <div class="fox-section-sub-move el-icon-rank">
                        </div>
                      </template>
                      <template v-for="(el, elIndex) in o.elements">
                        <section-widget
                          :schema="el"
                          :key="`collapse-widget-${index}-${elIndex}-${subIndex}`"
                          v-model="dataset.sectionData.dataset[o.tag].data[subIndex]"
                        >
                        </section-widget>
                      </template>
                      <!--复制、删除项-->
                      <div class="editor-section-bottom">
                        <el-button
                          size="small"
                          type="danger"
                          @click="removeSlide(o, subIndex)"
                          class="mr-4"
                          plain>
                          {{ $t('base.operate.remove') }}
                        </el-button>
                        <el-button
                          v-if="dataset.sectionData.dataset[o.tag] && dataset.sectionData.dataset[o.tag].data.length < o.max"
                          size="small"
                          @click="copySlide(o, subIndex)"
                          plain>
                          {{ $t('design.copyItem') }}
                        </el-button>
                      </div>
                    </el-collapse-item>
                  </template>
                </draggable>
              </el-collapse>
              <div
                :key="`addSlide-${index}`"
                @click="addSlide(o)"
                v-if="dataset.sectionData.dataset[o.tag] && dataset.sectionData.dataset[o.tag].data.length < o.max"
                class="fox-slide-add">
                <i class="el-icon-plus"></i>
                {{ $t('base.operate.add') }}
              </div>
              <div
                :key="`clearSlide-${index}`"
                @click="clearSlide(o)"
                class="fox-slide-add">
                <i class="el-icon-refresh"></i>
                {{ $t('design.clear') }}
              </div>
            </template>
          </el-collapse-item>
        </template>
      </el-collapse>
      <div
        class="editor-section-bottom"
        v-if="dataset.schemeData.removable">
        <p>
          <el-button
            v-if="dataset.schemeData.removable"
            size="small"
            class="w-100"
            @click="copySection"
          >
            {{ $t('design.copy') }}
          </el-button>
        </p>

        <p>
          <el-button
            v-if="dataset.schemeData.removable"
            size="small"
            class="w-100"
            @click="copyToClip"
          >
            {{ $t('design.copyToClip') }}
          </el-button>
        </p>
        <el-button
          v-if="dataset.schemeData.removable"
          size="small"
          type="warning"
          class="w-100"
          v-loading="removeLoading"
          @click="removeSection"
        >
          {{ $t('design.remove') }}
        </el-button>
      </div>
    </div>
    <resource-selector
      :visible.sync="batchImage.visible"
      @close="resourceSelector"
      :info-type="0"></resource-selector>
  </div>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import sectionWidget from './widget/index'
import resourceSelector from '@/views/app/site/goods/components/resource-selector'

import draggable from 'vuedraggable'
import loda from 'lodash'

import {
  fetchSectionSchema,
  fetchSectionRename,
  fetchSectionUpdate,
  fetchSectionRemove,
  fetchSectionClone
} from '@/plugins/api/assembler'
import {
  mapState
} from 'vuex'

export default {
  name: 'design-section-editor',
  extends: extend,
  components: {
    draggable,
    sectionWidget,
    resourceSelector
  },
  data () {
    return {
      siteId: '',
      themeId: '',
      schemaLoading: true,
      activeName: 'element-0',
      subActiveName: 'element-0-0',
      removeLoading: false,
      firstLoading: true,
      dataset: {
        id: '',
        sectionType: '',
        isGlobal: 1,
        schemeData: {
          group: [],
          name: {
            'en': '',
            'zh-CN': ''
          }
        },
        sectionData: {}
      },
      presetSection: {},
      saveStatus: false,
      /**
       * 消息状态
       */
      funcStatus: {
        loading: false,
        data: {}
      },
      batchImage: {
        tag: '',
        visible: false
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
        return {
          global: true,
          data: {
            id: ''
          }
        }
      }
    },
    visible: {
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
    langCode: {
      type: String,
      default: () => {
        return ''
      }
    },
    unsavedStatus: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.removeLoading = false
        this.getData()
      }
    },
    'dataset.sectionData': {
      handler () {
        this.fixedUnsaved(true)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    ...mapState(['siteModel']),
    /**
     * 修改SECTION NAME
     */
    sectionNameVisible () {
      return !this.sectionData.global && 'footer|header|floatMenu'.indexOf(this.sectionData.data.sectionType) === -1
    },
    /**
     * 修改SECTION NAME
     */
    changeVisible () {
      return this.presetSection[this.sectionData.data.sectionType]
    }
  },
  created () {
    this.themeId = this.$route.params.themeId
    this.siteId = this.$route.params.siteId
    this.presetSection = this.$t('design.presetSection')
    this.debouncedUpdateView = loda.debounce(this.valueChanged, 1000)
  },
  methods: {
    /**
     * 图片选择结果
     * @param list 图片
     */
    resourceSelector (list) {
      let tag = this.batchImage.tag
      if (tag && this.dataset.sectionData.dataset[tag] && this.dataset.schemeData.default.dataset[tag]) {
        let s = this.dataset.schemeData.group.filter((row) => {
          return row.tag === tag
        })
        if (s.length === 0) {
          return false
        }
        let field = s[0].elements.filter((row) => {
          return row.type === 'imagePicker'
        })
        if (field.length === 0) {
          return false
        }
        let fieldName = field[0].field
        let altFiled = field[0].altFiled || ''
        list.forEach((o) => {
          let row = JSON.parse(JSON.stringify(this.dataset.schemeData.default.dataset[tag].data[0]))
          row[fieldName] = o.url
          if (altFiled) {
            row[altFiled] = o.alt
          }
          this.dataset.sectionData.dataset[tag].data.push(row)
        })
        this.slideIndex = this.dataset.sectionData.dataset[tag].data.length - 1
      }
    },
    /**
     * 批量选图
     */
    loadBatchImage (tag) {
      this.batchImage.visible = true
      this.batchImage.tag = tag
    },
    /**
     * 判断能否批量选图
     * @param o
     * @returns {boolean}
     */
    getBatchImage (o) {
      let s = this.dataset.schemeData.group.filter((row) => {
        return row.tag === o.tag
      })
      if (s.length === 0) {
        return false
      }
      return s[0].elements.filter((row) => {
        return row.type === 'imagePicker'
      }).length > 0
    },
    /**
     * 参数变更,发送通知给 iframe进行同步参数
     */
    valueChanged () {
      if (!this.firstLoading) {
        this.$emit('update:unsavedStatus', this.saveStatus)
        this.funcStatus.loading = true
        this.$emit('message', {
          action: 'update',
          data: {
            id: this.dataset.id,
            siteId: this.siteId,
            themeId: this.themeId,
            region: this.regionCode,
            sectionType: this.dataset.sectionType,
            isGlobal: this.dataset.isGlobal,
            sectionData: this.dataset.sectionData
          }
        })
      } else {
        this.firstLoading = false
      }
    },
    /**
     * 关闭窗体
     */
    dialogClose () {
      this.$emit('update:visible', false)
      this.fixedUnsaved(false)
    },
    /**
     * 关闭窗体
     */
    parentChange (data) {
      this.$emit('update:visible', false)
      this.$emit('change', data)
      this.fixedUnsaved(false)
    },
    /**
     * 数据保存
     */
    fixedUnsaved (status) {
      this.saveStatus = status
      if (this.debouncedUpdateView) {
        this.debouncedUpdateView()
      }
    },
    /**
     * 占位文字
     * @param fields 节点
     * @param data 数据
     * @param defaultValue
     */
    getPlaceholder (fields, data, defaultValue) {
      let image = ''
      let heading = ''
      let icon = ''
      fields.forEach((o) => {
        // eslint-disable-next-line no-mixed-operators
        if (o.type === 'text' || o.type === 'textarea' && data[o.field]) {
          heading = heading || data[o.field]
        } else if (o.type === 'imagePicker') {
          if (this.utility.isEmpty(image)) {
            image = data[o.field] || o.default
          }
        } else if (o.type === 'iconPicker') {
          if (this.utility.isEmpty(icon)) {
            icon = data[o.field] || o.default
          }
        } else if (o.type === 'productCollectionPicker' || o.type === 'articleCollectionPicker') {
          image = image || data.image
          heading = heading || data.title
        }
      })
      let s = []
      if (this.utility.isNotEmpty(icon)) {
        s.push(`<i class="${icon}"></i>`)
      }
      if (this.utility.isNotEmpty(image)) {
        s.push(`<img src="${image}">`)
      }
      if (this.utility.isEmpty(icon) && this.utility.isEmpty(image)) {
      }
      s.push(heading || defaultValue)
      return s.join('')
    },
    /**
     * 获取数据
     */
    getData () {
      this.dataset = {
        id: '',
        sectionType: '',
        isGlobal: 1,
        schemeData: {
          group: [],
          name: {
            'en': '',
            'zh-CN': ''
          }
        },
        sectionData: {}
      }
      // console.log(JSON.stringify(this.sectionData.data))
      this.schemaLoading = true
      this.activeName = 'element-0'
      this.themeId = this.themeId || this.$route.params.themeId
      this.siteId = this.siteId || this.$route.params.siteId
      fetchSectionSchema({
        siteId: this.siteId,
        themeId: this.themeId,
        isGlobal: this.sectionData.global ? 0 : 1,
        refId: this.refId,
        pageType: this.sectionData.data.pageType,
        region: this.langCode,
        sectionId: this.sectionData.global ? '' : this.sectionData.data.id,
        sectionType: this.sectionData.data.sectionType
      }).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            this.dataValidation(result.data)
            setTimeout(() => {
              this.schemaLoading = false
              if (this.sectionData.data.refresh === true) {
                this.firstLoading = false
                this.valueChanged()
              }
            }, 1000)
          }
        })
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 数据校验
     * @param dt
     */
    dataValidation (dt) {
      let nextTicks = true
      dt.schemeData.group.forEach((o) => {
        if (o.multiple !== 0 && !dt.sectionData.dataset[o.tag]) {
          dt.sectionData.dataset[o.tag] = JSON.parse(JSON.stringify(dt.schemeData.default.dataset[o.tag]))
          nextTicks = false
        }
        if (o.multiple === 0) {
          o.elements.forEach((sb) => {
            if (this.utility.isNotEmpty(sb.field) && dt.sectionData[sb.field] === undefined && dt.schemeData.default[sb.field] !== undefined) {
              dt.sectionData[sb.field] = dt.schemeData.default[sb.field]
              nextTicks = false
            }
          })
        }
      })
      this.dataset = dt
      if (nextTicks) {
        this.firstLoading = true
        this.$nextTick(() => {
          this.fixedUnsaved(false)
        })
      }
    },
    /**
     * SECTION更名
     */
    updateSectionName () {
      fetchSectionRename({
        siteId: this.siteId,
        themeId: this.themeId,
        sectionId: this.sectionData.data.id,
        sectionName: this.sectionData.data.sectionName
      }).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            // this.fixedUnsaved(false)
          }
        })
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 数据保存
     */
    overrideFormValidation () {
      this.updateSectionData(0)
    },
    /**
     * 数据保存
     */
    formValidation () {
      this.updateSectionData(1)
    },
    /**
     * 更新内容
     * @param overrideDefault 是否覆盖默认值
     */
    updateSectionData (overrideDefault) {
      fetchSectionUpdate({
        id: this.dataset.id,
        siteId: this.siteId,
        themeId: this.themeId,
        sectionType: this.dataset.sectionType,
        isGlobal: this.dataset.isGlobal,
        refId: this.refId,
        pageType: this.sectionData.pageType,
        pageId: this.sectionData.pageId,
        region: this.langCode,
        sectionData: JSON.stringify(this.dataset.sectionData),
        overrideDefault
      }).then(result => {
        result.options = {
          formName: 'update',
          action: this.actionType.update
        }
        this.resultMessage(result, (success) => {
          if (success) {
            // 保存锚点更新的时候，顺手更新锚钉导航
            if (this.dataset.sectionType === 'anchorPin') {
              this.$emit('anchor', this.dataset.id, this.dataset.sectionData.title)
            }
            // this.fixedUnsaved(false)
          }
        })
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 添加
     * @param o
     */
    addSlide (o) {
      // console.log('addSlide', o.tag, this.dataset.sectionData.dataset[o.tag] && this.dataset.schemeData.default.dataset[o.tag], this.dataset.schemeData.default.dataset[o.tag].data)
      // console.log(JSON.stringify(this.dataset.sectionData.dataset[o.tag]))
      if (o.tag && this.dataset.sectionData.dataset[o.tag] && this.dataset.schemeData.default.dataset[o.tag] && this.dataset.schemeData.default.dataset[o.tag].data) {
        let max = parseFloat((o.max || '99'))
        if (max > 0 && this.dataset.sectionData.dataset[o.tag].data.length < max) {
          this.dataset.sectionData.dataset[o.tag].data.push(JSON.parse(JSON.stringify(this.dataset.schemeData.default.dataset[o.tag].data[0])))
          this.slideIndex = this.dataset.sectionData.dataset[o.tag].data.length - 1
        }
      }
    },
    /**
     * clear slides
     */
    clearSlide (o) {
      this.$confirm(this.$t('design.clearTips').toString(), this.$t('design.clearHeading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.dataset.sectionData.dataset[o.tag].data = []
            done()
          } else {
            done()
          }
        }
      })
    },
    /**
     * remove slide
     * @param index
     */
    removeSlide (o, index) {
      if (o.tag && this.dataset.sectionData.dataset[o.tag]) {
        this.dataset.sectionData.dataset[o.tag].data.splice(index, 1)
      }
    },
    /**
     * copy slide
     */
    copySlide (o, index) {
      if (o.tag && this.dataset.sectionData.dataset[o.tag] && this.dataset.sectionData.dataset[o.tag]) {
        this.dataset.sectionData.dataset[o.tag].data.push(
          JSON.parse(JSON.stringify(this.dataset.sectionData.dataset[o.tag].data[index]))
        )
      }
    },
    /**
     * COPY SECTION
     */
    copySection () {
      fetchSectionClone({
        id: this.dataset.id,
        siteId: this.siteId,
        pageId: this.dataset.pageId
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
          this.sectionLoading = false
          this.removeLoading = false
          this.networkMistake(error)
        })
    },
    /**
     * COPY TO CLIP
     */
    copyToClip () {
      localStorage.setItem('sectionClip', JSON.stringify({
        id: this.dataset.id,
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
    removeSection () {
      this.$confirm('你确定要删除此组件吗？', 'Oops', {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.removeLoading = true
            fetchSectionRemove({
              id: this.dataset.id,
              siteId: this.siteId
            }).then(result => {
              this.removeLoading = false
              this.resultMessage(result, (success) => {
                if (success) {
                  this.$emit('update:visible', false)
                  this.$emit('remove', this.dataset.id)
                  this.fixedUnsaved(false)
                }
              })
            })
              .catch(error => {
                this.sectionLoading = false
                this.removeLoading = false
                this.networkMistake(error)
              }).finally(() => {
                instance.confirmButtonLoading = false
                done()
              })
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
