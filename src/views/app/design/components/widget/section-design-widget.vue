<template>
  <div class="editor-section-item">
    <template v-if="schema.type === 'textarea'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <p>
        <el-input
          v-model="model[schema.field]"
          :placeholder="schema.placeholder && schema.placeholder[language] || schema.name[language]"
          type="textarea"
          :rows="6"></el-input>
      </p>
    </template>
    <template v-else-if="schema.type === 'divider'">
      <hr>
    </template>
    <template v-else-if="schema.type === 'switch'">
      <p>
        <el-switch
          v-model="model[schema.field]"
          :active-value="true"
          :inactive-value="false"
          active-color="#13ce66"
        >
        </el-switch>
        {{ schema.name[language] }}
      </p>
    </template>
    <template v-else-if="schema.type === 'select'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <p>
        <el-select
          v-model="model[schema.field]"
          :placeholder="$t('base.placeholder.select')"
          size="small"
          v-if="schema.group"
          filterable
          width="100%">
          <el-option-group
            v-for="g in groups"
            :key="g"
            :label="g">
            <el-option
              v-for="o in schema.options.filter((fo)=> { return fo.group === g })"
              :key="o.value"
              :label="o.name[language]"
              :value="o.value">
              {{ o.name[language] }}
            </el-option>
          </el-option-group>
        </el-select>
        <el-select
          v-model="model[schema.field]"
          :placeholder="$t('base.placeholder.select')"
          size="small"
          filterable
          v-else
          width="100%">
          <el-option
            v-for="o in schema.options"
            :key="o.value"
            :label="o.name[language]"
            :value="o.value">
            {{ o.name[language] }}
          </el-option>
        </el-select>

      </p>
    </template>
    <template v-else-if="schema.type === 'iconPicker'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <icon-picker
        v-model="model[schema.field]"
      >
      </icon-picker>
    </template>
    <template v-else-if="schema.type === 'imagePicker'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <image-picker
        :alt="this.imageAlt"
        :alt-button="displayAlt"
        :site-id="siteId"
        v-model="model[schema.field]"
        @updateAlt="updateAlt"
      >
      </image-picker>
      <!--      <fox-image-single-->
      <!--        v-model="model[schema.field]"-->
      <!--        :alt-visible="false"-->
      <!--        :alt="imageAlt"-->
      <!--        :size-limit="10"-->
      <!--        :oss-bucket="resource.ossBucket"-->
      <!--        :server-address="utility.uploadURL()"-->
      <!--        :file-folder="siteId"-->
      <!--        @updateAlt="updateAlt"-->
      <!--      ></fox-image-single>-->
    </template>
    <template v-else-if="schema.type === 'linkPicker'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <link-picker
        :site-type="siteModel.siteType.toString()"
        :width="220"
        size="small"
        v-model="model[schema.field]"
      ></link-picker>
    </template>
    <template v-else-if="schema.type === 'inquiryFormPicker'">
      <inquiry-form-picker
        :name="schema.name"
        :picker-type="schema.type"
        v-model="model"
      >
      </inquiry-form-picker>
    </template>
    <template v-else-if="schema.type === 'productCollectionPicker' || schema.type === 'articleCollectionPicker'">
      <collection-picker
        :name="schema.name"
        :picker-type="schema.type"
        v-model="model"
      >
      </collection-picker>
    </template>
    <template v-else-if="schema.type === 'colorPicker'">
      <p>
        <el-color-picker
          v-model="model[schema.field]"
          show-alpha></el-color-picker>
        {{ schema.name[language] }}
      </p>
    </template>
    <template v-else-if="schema.type === 'slider'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <p>
        <el-slider
          v-model="model[schema.field]"
          :min="schema.min"
          :max="schema.max"
          show-stops
          :step="schema.step">
        </el-slider>
      </p>
    </template>
    <template v-else-if="schema.type === 'positiveInteger'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <positive-integer
        v-model="model[schema.field]"
      ></positive-integer>
    </template>
    <template v-else-if="schema.type === 'richText'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <fox-editor
        model-type="simple"
        :height="500"
        v-model="model[schema.field]"
      ></fox-editor>
    </template>
    <template v-else-if="schema.type === 'videoPicker'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <video-picker
        v-model="model[schema.field]"
      ></video-picker>
    </template>
    <template v-else-if="schema.type === 'positiveInteger'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <positive-integer
        v-model="model[schema.field]"
      ></positive-integer>
    </template>
    <template v-else-if="schema.type ==='svgIcon'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <p>
        <el-input
          size="small"
          v-model="model[schema.field]"
          type="textarea"
          :rows="8"
          @blur="filterSVG"
          :placeholder="schema.placeholder && schema.placeholder[language] || schema.name[language]"
        ></el-input>
      </p>
    </template>
    <template v-else-if="schema.type !=='hidden'">
      <h6>
        {{ schema.name[language] }}
      </h6>
      <p>
        <el-input
          size="small"
          v-model="model[schema.field]"
          :class="schema.type === 'textarea' ? 'is-textarea' : ''"
          type="textarea"
          @blur="elementBlur"
          :rows="3"
          :placeholder="schema.placeholder && schema.placeholder[language] || schema.name[language]"
        ></el-input>
      </p>
    </template>
    <h6 v-if="schema.info && schema.info[language] && schema.type === 'divider'">
      | {{ schema.info[language] }}
    </h6>
    <p
      class="section-design-info"
      v-if="schema.info && schema.info[language] && schema.type !== 'divider'"
      v-html="schema.info[language]">
      <small>
        {{ schema.info[language] }}
      </small>
    </p>
  </div>
</template>

<script>
import ImagePicker from './image-picker'
import VideoPicker from './video-picker'
import InquiryFormPicker from './inquiry-form-picker'
import CollectionPicker from './collection-picker'
import iconPicker from './icon-picker'
import PositiveInteger from './positive-integer'
import resource from '@/plugins/resource'
import extend from '@/plugins/page/base'
import richText from '@/assets/image/rich-text.jpg'

export default {
  name: 'section-design-widget',
  extends: extend,
  components: {
    ImagePicker,
    VideoPicker,
    PositiveInteger,
    InquiryFormPicker,
    CollectionPicker,
    iconPicker
  },
  data () {
    return {
      resource,
      imageAlt: '',
      displayAlt: false,
      model: {},
      groups: [],
      richTextImage: richText,
      limitQuantity: 0
    }
  },
  computed: {
    /**
     * 站点信息
     */
    siteModel () {
      return this.$store.state.siteModel
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * 值
     */
    schema: {
      type: Object,
      default: () => {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  watch: {
    model: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    },
    value: {
      deep: true,
      handler (val) {
        this.model = val
      }
    }
  },
  created () {
    this.model = this.value
    // console.log('value', JSON.stringify(this.value))
    // console.log('schema', JSON.stringify(this.schema))
    if (this.model[this.schema.field] === undefined) {
      this.model[this.schema.field] = this.schema.default
    }
    if (this.schema.type === 'imagePicker') {
      if (this.schema.altFiled) {
        let field = this.schema.altFiled
        let value = this.model[field]
        if (field && !value) {
          this.model[field] = ''
        }
        if (value !== undefined && value !== null) {
          this.imageAlt = value
          this.displayAlt = true
        }
      }
    } else if (this.schema.type === 'slider') {
      if (!this.schema.max) {
        this.schema.max = 100
      }
      if (!this.schema.min) {
        this.schema.min = 0
      }
      if (!this.schema.step) {
        this.schema.step = 5
      }
      this.schema.max = parseInt(this.schema.max)
      this.schema.min = parseInt(this.schema.min)
      this.schema.step = parseInt(this.schema.step)
    } else if (this.schema.type === 'select' && this.schema.group) {
      this.schema.options.forEach((o) => {
        if (o.group && this.groups.indexOf(o.group) === -1) {
          this.groups.push(o.group)
        }
      })
    }
  },
  methods: {
    filterSVG () {
      this.model[this.schema.field] = this.utility.filterHTML(this.model[this.schema.field], 'svg', 'width|height|class|fill')
      this.model[this.schema.field] = this.utility.filterHTML(this.model[this.schema.field], 'path', 'class|fill')
    },
    /**
     * 更新ALT
     * @param value
     */
    updateAlt (value) {
      if (this.schema.type === 'imagePicker') {
        if (this.schema.altFiled) {
          let altFiled = this.schema.altFiled
          let oldValue = this.model[altFiled]
          if (oldValue !== undefined && oldValue !== null) {
            this.model[altFiled] = value
          }
        }
      }
    },
    elementBlur (e) {
      if (!e.target.classList.contains('is-textarea')) {
        e.target.value = e.target.value.trim().replace(/\n/ig, '').replace(/\r/ig, '')
      }
    }
  }
}
</script>
