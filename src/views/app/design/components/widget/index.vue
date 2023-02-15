<template>
  <div class="editor-section-item">
    <template v-if="schemeData.type === 'textarea'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <p>
        <el-input
          v-model="model[schemeData.field]"
          :placeholder="schemeData.placeholder && schemeData.placeholder[language] || schemeData.name[language]"
          type="textarea"
          :rows="6"></el-input>
      </p>
    </template>
    <template v-else-if="schemeData.type === 'divider'">
      <hr>
    </template>
    <template v-else-if="schemeData.type === 'switch'">
      <p>
        <el-switch
          v-model="model[schemeData.field]"
          :active-value="true"
          :inactive-value="false"
          active-color="#13ce66"
        >
        </el-switch>
        {{ schemeData.name[language] }}
      </p>
    </template>
    <template v-else-if="schemeData.type === 'select'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <p>
        <el-select
          v-model="model[schemeData.field]"
          :placeholder="$t('base.placeholder.select')"
          size="small"
          v-if="schemeData.group"
          filterable
          width="100%">
          <el-option-group
            v-for="g in groups"
            :key="g"
            :label="g">
            <el-option
              v-for="o in schemeData.options.filter((fo)=> { return fo.group === g })"
              :key="o.value"
              :label="o.name[language]"
              :value="o.value">
              {{ o.name[language] }}
            </el-option>
          </el-option-group>
        </el-select>
        <el-select
          v-model="model[schemeData.field]"
          :placeholder="$t('base.placeholder.select')"
          size="small"
          filterable
          v-else
          width="100%">
          <el-option
            v-for="o in schemeData.options"
            :key="o.value"
            :label="o.name[language]"
            :value="o.value">
            {{ o.name[language] }}
          </el-option>
        </el-select>

      </p>
    </template>
    <template v-else-if="schemeData.type === 'iconPicker'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <icon-picker
        v-model="model[schemeData.field]"
      >
      </icon-picker>
    </template>
    <template v-else-if="schemeData.type === 'imagePicker'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <image-picker
        :alt="this.imageAlt"
        :alt-button="displayAlt"
        :site-id="siteId"
        v-model="model[schemeData.field]"
        @updateAlt="updateAlt"
      >
      </image-picker>
      <!--      <fox-image-single-->
      <!--        v-model="model[schemeData.field]"-->
      <!--        :alt-visible="false"-->
      <!--        :alt="imageAlt"-->
      <!--        :size-limit="10"-->
      <!--        :oss-bucket="resource.ossBucket"-->
      <!--        :server-address="utility.uploadURL()"-->
      <!--        :file-folder="siteId"-->
      <!--        @updateAlt="updateAlt"-->
      <!--      ></fox-image-single>-->
    </template>
    <template v-else-if="schemeData.type === 'linkPicker'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <link-picker
        :site-type="siteModel.siteType.toString()"
        :width="220"
        size="small"
        v-model="model[schemeData.field]"
      ></link-picker>
    </template>
    <template v-else-if="schemeData.type === 'inquiryFormPicker'">
      <inquiry-form-picker
        :name="schemeData.name"
        :picker-type="schemeData.type"
        v-model="model"
      >
      </inquiry-form-picker>
    </template>
    <template v-else-if="schemeData.type === 'productCollectionPicker' || schemeData.type === 'articleCollectionPicker'">
      <collection-picker
        :name="schemeData.name"
        :picker-type="schemeData.type"
        v-model="model"
      >
      </collection-picker>
    </template>
    <template v-else-if="schemeData.type === 'colorPicker'">
      <p>
        <el-color-picker
          v-model="model[schemeData.field]"
          show-alpha></el-color-picker>
        {{ schemeData.name[language] }}
      </p>
    </template>
    <template v-else-if="schemeData.type === 'slider'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <p>
        <el-slider
          v-model="model[schemeData.field]"
          :min="schemeData.min"
          :max="schemeData.max"
          show-stops
          :step="schemeData.step">
        </el-slider>
      </p>
    </template>
    <template v-else-if="schemeData.type === 'positiveInteger'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <positive-integer
        v-model="model[schemeData.field]"
      ></positive-integer>
    </template>
    <template v-else-if="schemeData.type === 'richText'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <fox-editor
        model-type="simple"
        :height="500"
        v-model="model[schemeData.field]"
      ></fox-editor>
    </template>
    <template v-else-if="schemeData.type === 'googleMapPicker'">
      <!--      <h6>-->
      <!--        {{ schemeData.name[language] }}-->
      <!--      </h6>-->
      <google-map-picker
        v-model="model[schemeData.field]"
      ></google-map-picker>
    </template>
    <template v-else-if="schemeData.type === 'videoPicker'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <video-picker
        v-model="model[schemeData.field]"
      ></video-picker>
    </template>
    <template v-else-if="schemeData.type === 'positiveInteger'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <positive-integer
        v-model="model[schemeData.field]"
      ></positive-integer>
    </template>
    <template v-else-if="schemeData.type ==='svgIcon'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <p>
        <el-input
          size="small"
          v-model="model[schemeData.field]"
          type="textarea"
          :rows="8"
          @blur="filterSVG"
          :placeholder="schemeData.placeholder && schemeData.placeholder[language] || schemeData.name[language]"
        ></el-input>
      </p>
    </template>
    <template v-else-if="schemeData.type !=='hidden'">
      <h6>
        {{ schemeData.name[language] }}
      </h6>
      <p>
        <el-input
          size="small"
          v-model="model[schemeData.field]"
          :class="schemeData.type === 'textarea' ? 'is-textarea' : ''"
          type="textarea"
          @blur="elementBlur"
          :rows="3"
          :placeholder="schemeData.placeholder && schemeData.placeholder[language] || schemeData.name[language]"
        ></el-input>
      </p>
    </template>
    <h6 v-if="schemeData.info && schemeData.info[language] && schemeData.type === 'divider'">
      | {{ schemeData.info[language] }}
    </h6>
    <p
      class="editor-section-item-info"
      v-if="schemeData.info && schemeData.info[language] && schemeData.type !== 'divider'"
      v-html="schemeData.info[language]">
      <small>
        {{ schemeData.info[language] }}
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
import googleMapPicker from './google-map-picker'
import resource from '@/plugins/resource'
import extend from '@/plugins/page/base'
import richText from '@/assets/image/rich-text.jpg'

export default {
  name: 'section-widget',
  extends: extend,
  components: {
    ImagePicker,
    VideoPicker,
    PositiveInteger,
    InquiryFormPicker,
    CollectionPicker,
    iconPicker,
    googleMapPicker
  },
  data () {
    return {
      resource,
      imageAlt: '',
      displayAlt: false,
      model: {},
      groups: [],
      schemeData: {},
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
        this.fixModel(val)
      }
    },
    schema: {
      deep: true,
      handler (val) {
        this.fixSchema(val)
      }
    }
  },
  created () {
    this.model = this.value
    this.fixSchema()
  },
  methods: {
    fixModel (val) {
      this.model = val
      if (this.model[this.schemeData.field] === undefined) {
        this.model[this.schemeData.field] = this.schemeData.default
      }
    },
    fixSchema (val) {
      this.schemeData = val || this.schema
      if (this.schemeData.type === 'imagePicker') {
        if (this.schemeData.altFiled) {
          let field = this.schemeData.altFiled
          let value = this.model[field]
          if (field && !value) {
            this.model[field] = ''
          }
          if (value !== undefined && value !== null) {
            this.imageAlt = value
            this.displayAlt = true
          }
        }
      } else if (this.schemeData.type === 'slider') {
        if (!this.schemeData.max) {
          this.schemeData.max = 100
        }
        if (!this.schemeData.min) {
          this.schemeData.min = 0
        }
        if (!this.schemeData.step) {
          this.schemeData.step = 5
        }
        this.schemeData.max = parseInt(this.schemeData.max)
        this.schemeData.min = parseInt(this.schemeData.min)
        this.schemeData.step = parseInt(this.schemeData.step)
      } else if (this.schemeData.type === 'select' && this.schemeData.group) {
        this.schemeData.options.forEach((o) => {
          if (o.group && this.groups.indexOf(o.group) === -1) {
            this.groups.push(o.group)
          }
        })
      }
    },
    filterSVG () {
      this.model[this.schemeData.field] = this.utility.filterHTML(this.model[this.schemeData.field], 'svg', 'width|height|class|fill')
      this.model[this.schemeData.field] = this.utility.filterHTML(this.model[this.schemeData.field], 'path', 'class|fill')
    },
    /**
     * 更新ALT
     * @param value
     */
    updateAlt (value) {
      if (this.schemeData.type === 'imagePicker') {
        if (this.schemeData.altFiled) {
          let altFiled = this.schemeData.altFiled
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

<style lang='scss'>
$color-info: rgba(255, 255, 255, .7);
.editor-section-item {
  .editor-section-link {
    color: $color-info !important;

    &:visited {
      color: $color-info !important;
    }
  }

  .el-input__inner, .el-textarea__inner {
    border: 0;
    padding: 0 8px !important;
  }

  .el-color-picker {
    .el-color-picker__trigger {
      width: 30px;
      height: 30px;
      border: 0;
      padding: 0;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
}
</style>
