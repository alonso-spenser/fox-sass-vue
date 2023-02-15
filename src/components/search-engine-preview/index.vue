<template>
  <fox-page-section
    :heading="$t('searchEngine.heading')"
    :content="$t('searchEngine.tips')"
    class="search-engine-section"
  >
    <h3 class="mt-0 mb-4">
      <small
        @click="seoVisible = true"
        v-show="!seoVisible"
        class="text-primary float-right pointer">
        {{ $t("searchEngine.edit") }}
      </small>
      {{ $t("searchEngine.engine") }}
    </h3>
    <p v-show="previewVisible">
      {{ $t("searchEngine.visible") }}
    </p>
    <div
      class="over seo-preview"
      v-if="!previewVisible">
      <div class="optimize-preview text-secondary text-truncate">
        {{ globalRegionModel.url }}
        <i class="el-icon-arrow-right"></i>
        {{ catalog }}
        <i class="el-icon-arrow-right"></i>
        {{ entity.url || placeholder.url }}
        <i class="el-icon-more rotate-90"></i>
      </div>
      <h4 class="text-blue mt-0 mb-2 text-truncate">
        {{ entity.title || placeholder.title }}
      </h4>
      <div class="text-secondary word-wrap text-description">
        {{ entity.description || placeholder.description }}
      </div>
    </div>
    <div
      v-show="seoVisible"
      class="mt-6">
      <div class="el-form-item">
        <div class="el-form-item__content">
          <fox-input
            v-model="entity.url"
            shrink
            maxlength="255"
            show-word-limit
            @blur="setCapitalize"
            type="textarea"
            :rows="3"
            :placeholder="$t('searchEngine.entity.seoUrl.label')"
            :description="placeholder.url"
          >
            <template slot="prepend">{{ previewDomain }}</template>
          </fox-input>
        </div>
      </div>
      <div class="el-form-item">
        <label class="el-form-item__label">
          &lt;title&gt;
          <small class="ml-2 text-secondary">
            {{ $t("searchEngine.entity.seoTitle.description") }}
          </small>
        </label>
        <div class="el-form-item__content">
          <fox-input
            v-model="entity.title"
            maxlength="127"
            shrink
            :placeholder="$t('searchEngine.entity.seoTitle.label')"
            type="textarea"
            :rows="3"
            show-word-limit
            @blur="setCapitalize"
            :description="placeholder.title"
          ></fox-input>
        </div>
      </div>
      <div class="el-form-item">
        <label class="el-form-item__label">
          &lt;meta name=&quot;description&quot;&gt;
          <small class="ml-2 text-secondary">
            {{ $t("searchEngine.entity.seoDesc.description") }}
          </small>
        </label>
        <div class="el-form-item__content">
          <fox-input
            v-model="entity.description"
            :placeholder="$t('searchEngine.entity.seoDesc.label')"
            shrink
            type="textarea"
            :rows="5"
            :maxlength="maxlength"
            resize="none"
            show-word-limit
            @blur="setCapitalize"
            :description="placeholder.description"
          ></fox-input>
        </div>
      </div>
      <div class="el-form-item">
        <label class="el-form-item__label">
          {{ $t("searchEngine.entity.seoH1.label") }} &lt;h1&gt;
          <small class="ml-2 text-secondary">
            {{ $t("searchEngine.entity.seoH1.description") }}
          </small>
        </label>
        <div class="el-form-item__content">
          <fox-input
            v-model="entity.heading"
            shrink
            maxlength="127"
            type="textarea"
            :rows="3"
            :placeholder="$t('searchEngine.entity.seoH1.label')"
            show-word-limit
            @blur="setCapitalize"
            :description="placeholder.heading"
          ></fox-input>
        </div>
      </div>
      <div class="el-form-item">
        <label class="el-form-item__label">
          {{ $t("searchEngine.entity.seoKeywords.label") }}
          <small class="ml-2 text-secondary">
            {{ $t("searchEngine.entity.seoKeywords.description") }}
          </small>
        </label>
        <div class="el-form-item__content">
          <el-tag
            :key="tag"
            v-for="tag in entity.keywords"
            closable
            type="info"
            effect="plain"
            @close="removeTag(tag)">
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            style="width: 200px"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="addTag"
            :placeholder="$t('searchEngine.entity.seoKeywords.placeholder')"
            @blur="addTag"
          >
          </el-input>
          <el-button
            v-if="!inputVisible"
            class="button-new-tag"
            size="small"
            @click="showInput">
            {{ $t("searchEngine.entity.seoKeywords.addTag") }}
          </el-button>
        </div>
      </div>
    </div>
  </fox-page-section>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'search-engine-preview',
  data () {
    return {
      seoVisible: false,
      previewVisible: true,
      entity: {
        description: '',
        keywords: [],
        title: '',
        url: '',
        heading: ''
      },
      placeholder: {
        url: '',
        description: '',
        title: '',
        heading: ''
      },
      inputVisible: false,
      inputValue: '',
      requestProtocol: 'https://'
    }
  },
  computed: {
    ...mapState(['siteModel', 'globalRegionModel']),
    /**
     * 面包屑操作
     */
    previewDomain () {
      return `https://${this.defaultDomain}`
    }
  },
  props: {
    tempTitle: {
      type: String,
      default: () => {
        return ''
      }
    },
    catalog: {
      type: String,
      default: () => {
        return ''
      }
    },
    maxlength: {
      type: Number,
      default: () => {
        return 165
      }
    },
    tempDesc: {
      type: String,
      default: () => {
        return ''
      }
    },
    value: {
      type: Object,
      default: () => {
        return {
          description: '',
          keywords: [],
          title: '',
          url: '',
          heading: ''
        }
      }
    }
  },
  watch: {
    value: {
      deep: true,
      handler () {
        this.entity = this.value
      }
    },
    entity: {
      deep: true,
      immediate: true,
      handler () {
        this.getStatus()
      }
    },
    placeholder: {
      deep: true,
      immediate: true,
      handler () {
        this.updateResult()
      }
    },
    tempTitle () {
      this.urlAndTitlePlaceholder()
    },
    tempDesc () {
      this.descriptionPlaceholder()
    }
  },
  created () {
    this.descriptionPlaceholder()
    this.urlAndTitlePlaceholder()
    this.entity = this.value
    this.getStatus()
  },
  methods: {
    /**
     * 更新预览状态
     */
    getStatus () {
      let title = this.utility.clearLineSymbolAndCapitalize(this.entity.title || this.placeholder.title)
      let heading = this.utility.clearLineSymbolAndCapitalize(this.entity.heading || this.placeholder.heading)
      let desc = this.utility.clearLineSymbolAndCapitalize(this.entity.description || this.placeholder.description)
      let url = this.entity.url || this.placeholder.url
      if (title || desc) {
        this.previewVisible = false
      }
      if (title || desc || url || heading || this.entity.keywords.length > 0) {
        this.$emit('input', this.entity)
        this.updateResult()
      }
    },
    /**
     * 删除tag
     * @param tag
     */
    removeTag (tag) {
      this.entity.keywords.splice(this.entity.keywords.indexOf(tag), 1)
    },
    /**
     * 显示标签输入框
     */
    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    /**
     * 新增tag
     */
    addTag () {
      let s = this.inputValue.replace(/，/ig, ',').replace(/\s+/gi, ' ').split(',')
      s.forEach((o) => {
        let label = o.trim()
        if (!this.utility.isEmpty(label) && this.entity.keywords.indexOf(label) === -1) {
          this.entity.keywords.push(label)
        }
      })
      // label = this.utility.extractText(label)
      // if (!this.utility.isEmpty(label) && this.entity.keywords.indexOf(label) === -1) {
      //   this.entity.keywords.push(label)
      // }
      this.inputVisible = false
      this.inputValue = ''
    },
    /**
     * meta description 占位
     */
    descriptionPlaceholder () {
      this.placeholder.description = this.utility.clearLineSymbolAndCapitalize(this.utility.extractText(this.tempDesc, this.maxlength))
      this.getStatus()
    },
    /**
     * url & title description 占位
     */
    urlAndTitlePlaceholder () {
      this.placeholder.url = this.utility.urlFilter(this.tempTitle)
      this.placeholder.title = this.tempTitle
      this.placeholder.heading = this.tempTitle
      this.getStatus()
    },
    /**
     * URL blur 事件
     */
    setCapitalize () {
      this.entity.url = this.utility.urlFilter(this.entity.url)
      this.entity.title = this.utility.clearLineSymbolAndCapitalize(this.entity.title)
      this.entity.heading = this.utility.clearLineSymbolAndCapitalize(this.entity.heading)
      this.entity.description = this.utility.clearLineSymbolAndCapitalize(this.utility.extractText(this.entity.description, this.maxlength))
    },
    /**
     * 同步实际结果
     */
    updateResult () {
      this.$emit('update', {
        description: this.utility.clearLineSymbolAndCapitalize(this.entity.description || this.placeholder.description),
        keywords: this.utility.clearLineSymbol(this.entity.keywords.join(',')),
        title: this.utility.clearLineSymbolAndCapitalize(this.entity.title || this.placeholder.title),
        url: this.entity.url || this.placeholder.url,
        heading: this.utility.clearLineSymbolAndCapitalize(this.entity.heading || this.placeholder.heading)
      })
    }
  }
}
</script>

<style lang="scss">
.seo-preview {
  .optimize-preview {
    position: relative;
    padding-right: 15px;
    margin-bottom: 5px;

    .rotate-90 {
      position: absolute;
      right: -4px;
      top: calc(50% - 5px);
    }
  }

  .text-description {
    line-height: 1.5;
    font-size: 12px;
    color: #909399;
  }
}

.search-engine-section {
  .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .button-new-tag {
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .el-input-group__prepend {
    padding: 0 10px;
  }

  .input-new-tag {
    width: 90px;
    margin-right: 10px;
    margin-bottom: 10px;
    vertical-align: top;
  }
}
</style>
