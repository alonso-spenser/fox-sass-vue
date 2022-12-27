<template>
  <div>
    <div class="collection-picker">
      <h6>
        <router-link target="_blank" class="float-right" :to="getAddUrl()">
          {{ $t('inquiryFormPicker.edit') }}
          <i class="fo-export"></i>
        </router-link>
        {{ name[language] }}
      </h6>
      <div
        class="collection-picker-none"
        @click="displayExplore = true"
        v-if="entity.id === ''">
        <p class="text-center">
          <i class="fo-edit"></i>
          {{ $t('inquiryFormPicker.select') }}
        </p>
      </div>
      <div class="collection-picker-content" v-if="entity.id !== ''">
        <p class="form-name">
          {{ entity.title }}
        </p>
      </div>
      <el-button-group v-if="entity.id !== ''">
        <el-button @click="displayExplore = true">
          <i class="el-icon-edit"></i>
        </el-button>
        <el-button @click="clearData">
          <i class="el-icon-delete"></i>
        </el-button>
      </el-button-group>
    </div>
    <div v-if="displayExplore" class="editor-section picker">
      <h4 class="editor-section-title" @click="displayExplore=false">
        {{ $t('inquiryFormPicker.select') }}
      </h4>
      <div class="editor-section-content">
        <div class="center-link">
          <a
            :href="getAddUrl()"
            target="_blank"
            class="el-icon-plus"
          >
            {{ $t("base.operate.add") }}
          </a>
        </div>

        <template
          v-for="(o, index) in dataset"
        >
          <div
            :class="`editor-section-picker${sectionIndex === index ? ' active' : ''}`"
            :key="o.id"
            @click="addSection(index, o, false)"
          >
            {{ o.title }}
          </div>
        </template>
      </div>
      <div v-if="displaySelected" class="fo-setting-fixed-bottom">
        <p class="text-right w-100">
          <el-button
            @click="selected"
            type="primary"
            size="small">
            {{ $t("design.selected") }}
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<style lang='scss' src="@/assets/design.scss"></style>
<style lang="scss" >
  .form-name {
    display: flex;
    align-items: center;
  }
</style>
<script>
import {
  fetchLinkPicker
} from '@/plugins/api/assembler'
import extend from '@/plugins/page/base'

export default {
  name: 'inquiry-form-picker',
  extends: extend,
  data () {
    return {
      siteId: '',
      displaySelected: false,
      displayExplore: false,
      sectionIndex: -1,
      selectedItem: {},
      entity: {
        id: '',
        title: ''
      },
      dataset: []
    }
  },
  computed: {
    language: function () {
      return this.utility.getLanguage()
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          id: '',
          title: ''
        }
      }
    },
    name: {
      en: 'Collection',
      'zh-CN': '集合'
    },
    pickerType: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    displayExplore (value) {
      if (value) {
        this.displaySelected = false
        this.sectionIndex = -1
        this.selectedItem = {}
        this.getData()
      }
    }
  },
  created () {
    this.entity = this.value
    this.siteId = this.$route.params.siteId
  },
  methods: {
    /**
     * 添加地址
     */
    getAddUrl () {
      return `/site/${this.siteId}/enquiry/form`
    },
    /**
     * 返回上一级
     */
    closePicker () {
      this.$emit('close')
    },
    /**
     * 添加 section
     */
    addSection (index, data) {
      this.displaySelected = true
      this.sectionIndex = index
      this.selectedItem = data
    },
    /**
     * 清除数据
     */
    clearData () {
      this.entity = {
        id: '',
        title: '',
        image: ''
      }
      this.$emit('input', this.entity)
    },
    /**
     * 获取链接数据
     */
    getData () {
      this.dataset = []
      fetchLinkPicker({
        current: 1,
        size: 10,
        params: {
          siteId: this.siteId,
          region: this.regionCode,
          searchType: 6
        }
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data.records
            }
          })
        })
        .catch(error => {
          this.dataLoading = false
          this.networkMistake(error)
        })
    },
    /**
     * 选择
     */
    selected () {
      if (this.selectedItem) {
        this.entity = {
          id: this.selectedItem.id,
          title: this.selectedItem.title
        }
        this.displayExplore = false
        this.$emit('input', this.entity)
      }
    }
  }
}
</script>
