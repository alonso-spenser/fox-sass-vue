<template>
  <div class="editor-section">
    <h3 class="editor-section-title">
      {{ schemeData.name[language] }}
    </h3>
    <div
      class="editor-section-content"
      element-loading-background="#535366"
    >
      <el-collapse
        v-model="activeName"
        accordion
        class="fo-section-collapse">
        <template v-for="(o, index) in schemeData.group">
          <el-collapse-item
            :title="o.name[language]"
            :name="`element-${index}`"
            :key="`collapse-item-${index}`"
            class="fo-section-item"
          >
            <template v-if="o.multiple === 0">
              <template v-for="(el, elIndex) in o.elements">
                <template v-if="el.type === 'productCollectionPicker' || el.type === 'articleCollectionPicker'">
                  <section-widget
                    :key="`collapse-widget-${index}-${elIndex}`"
                    :schema="el"
                    v-model="model.dataset[el.field].data[0]"
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
                        v-model="model.dataset[el.field].quantity"
                        :placeholder="$t(`design.${el.type}.placeholder['${language}']`)"
                      ></el-input-number>
                    </p>
                  </div>
                </template>
                <template v-else-if="el.type === 'inquiryFormPicker'">
                  <section-widget
                    :key="`collapse-widget-${index}-${elIndex}`"
                    :schema="el"
                    v-model="model.dataset[el.field].data[0]"
                  >
                  </section-widget>
                </template>
                <section-widget
                  v-else
                  :schema="el"
                  :key="`collapse-widget-${index}-${elIndex}`"
                  v-model="model"
                >
                </section-widget>
              </template>
            </template>
            <template v-else>
              <template v-if="o.multiple === 2 && o.elements.length === 1 && (o.elements[0].type === 'productCollectionPicker' || o.elements[0].type === 'articleCollectionPicker')">
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
                      v-model="model.dataset[o.tag].quantity"
                      :placeholder="$t(`design.productCollectionPicker.placeholder['${language}']`)"
                    ></el-input-number>
                  </p>
                </div>
              </template>

              <el-collapse
                v-model="subActiveName"
                accordion
                class="fo-section-sub-collapse">
                <draggable
                  handle=".fo-section-sub-move"
                  :list="model.dataset[o.tag].data"
                >
                  <template v-for="(sub, subIndex) in model.dataset[o.tag].data">
                    <el-collapse-item
                      :title="o.name[language]"
                      :name="`element-${index}-${subIndex}`"
                      :key="`collapse-item-${index}-${subIndex}`"
                      class="fo-section-sub-item"
                    >
                      <template slot="title">
                        <div
                          class="fo-section-sub-title"
                          v-html="getPlaceholder(o.elements, sub, o.placeholder[language])"></div>
                        <div class="fo-section-sub-move el-icon-rank">
                        </div>
                      </template>
                      <template v-for="(el, elIndex) in o.elements">
                        <section-widget
                          :schema="el"
                          :key="`collapse-widget-${index}-${elIndex}-${subIndex}`"
                          v-model="model.dataset[o.tag].data[subIndex]"
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
                          v-if="model.dataset[o.tag] && model.dataset[o.tag].data.length < o.max"
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
                v-if="model.dataset[o.tag] && model.dataset[o.tag].data.length < o.max"
                class="fo-slide-add">
                <i class="el-icon-plus"></i>
                {{ $t('base.operate.add') }}
              </div>
              <div
                :key="`clearSlide-${index}`"
                @click="clearSlide(o)"
                class="fo-slide-add">
                <i class="el-icon-refresh"></i>
                {{ $t('design.clear') }}
              </div>
            </template>
          </el-collapse-item>
        </template>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import resource from '@/plugins/resource'
import extend from '@/plugins/page/unsaved'
import sectionWidget from '../widget/index'
import Draggable from 'vuedraggable'
import loda from 'lodash'
import schemeData from '../js/design'

export default {
  name: 'design-section-editor',
  extends: extend,
  components: {
    Draggable,
    sectionWidget
  },
  data() {
    return {
      resource,
      model: {},
      activeName: 'element-0',
      subActiveName: 'element-0-0',
      firstLoading: true,
      presetSection: {},
      /**
       * 消息状态
       */
      funcStatus: {
        loading: false,
        data: {}
      },
      schemeData: {
        group: []
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
    unsavedStatus: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    sectionData: {
      handler(val) {
        this.model = val
      },
      immediate: true,
      deep: true
    },
    model: {
      handler() {
        this.fixedUnsaved(true)
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.model = this.sectionData
    this.schemeData = schemeData.designSection
    this.presetSection = this.$t('design.presetSection')
    this.debouncedUpdateView = loda.debounce(this.valueChanged, 1000)
  },
  methods: {
    /**
     * 参数变更,发送通知给 iframe进行同步参数
     */
    valueChanged() {
      this.$emit('change', this.model)
    },
    /**
     * 数据保存
     */
    fixedUnsaved() {
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
    getPlaceholder(fields, data, defaultValue) {
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
     * 添加
     * @param o
     */
    addSlide(o) {
      if (o.tag && this.model.dataset[o.tag] && this.schemeData.default.dataset[o.tag] && this.schemeData.default.dataset[o.tag].data) {
        let max = parseFloat((o.max || '99'))
        if (max > 0 && this.model.dataset[o.tag].data.length < max) {
          this.model.dataset[o.tag].data.push(JSON.parse(JSON.stringify(this.schemeData.default.dataset[o.tag].data[0])))
          this.slideIndex = this.model.dataset[o.tag].data.length - 1
        }
      }
    },
    /**
     * clear slides
     */
    clearSlide(o) {
      this.$confirm(this.$t('design.clearTips').toString(), this.$t('design.clearHeading').toString(), {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.model.dataset[o.tag].data = []
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
    removeSlide(o, index) {
      if (o.tag && this.model.dataset[o.tag]) {
        this.model.dataset[o.tag].data.splice(index, 1)
      }
    },
    /**
     * copy slide
     */
    copySlide(o, index) {
      if (o.tag && this.model.dataset[o.tag] && this.model.dataset[o.tag]) {
        this.model.dataset[o.tag].data.push(
          JSON.parse(JSON.stringify(this.model.dataset[o.tag].data[index]))
        )
      }
    }
  }
}
</script>
