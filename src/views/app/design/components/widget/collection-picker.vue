<template>
  <div>
    <div class="collection-picker">
      <h6>
        <router-link target="_blank" class="float-right el-icon-edit" :to="getAddUrl()">
          {{ $t('collectionPicker.edit') }}
        </router-link>
        {{ name[language] }}
      </h6>
      <div class="collection-picker-none"
           @click="displayExplore=true"
           v-if="!entity.id">
        <p class="text-center">
          <i class="fo-edit"></i>
          {{ $t('collectionPicker.select') }}
        </p>
      </div>
      <div class="collection-picker-content" v-if="entity.id">
        <img :src="entity.image === '' ? resource.image.placeholder : entity.image">
        <p>
          {{ entity.title }}
        </p>
      </div>
      <el-button-group v-if="entity.id">
        <el-button @click="displayExplore=true">
          <i class="el-icon-edit"></i>
        </el-button>
        <el-button @click="clearData">
          <i class="el-icon-delete"></i>
        </el-button>
      </el-button-group>
    </div>
    <div v-if="displayExplore" class="editor-section picker">
      <h4 class="editor-section-title" @click="displayExplore=false">
        {{ $t('collectionPicker.select') }}
      </h4>
      <div class="editor-section-content"  v-loading="dataLoading">
        <div class="center-link">
          <a
            :href="getAddUrl()"
            target="_blank"
            class="el-icon-plus"
          >
            {{ $t("base.operate.add") }}
          </a>
        </div>
        <div style="padding: 6px 10px;">
          <el-input size="small" placeholder="keywords" @clear="searchData" :clearable="true" @keyup.enter.native="searchData" v-model="searchKeyword" class="input-with-select">
            <el-button slot="append" @click="searchData" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <template
          v-for="(o, index) in dataset"
        >
          <div
            :class="`editor-section-picker${sectionIndex === index ? ' active' : ''}`"
            :key="o.id"
            @click="addSection(index, o, false)"
          >
            <div class="editor-section-picker-item">
              <img v-if="o.image" :src="o.image">
              {{ o.title }}
            </div>
          </div>
        </template>
      </div>
      <div class="fo-setting-fixed-bottom">
        <el-row class=" w-100">
          <el-col :span="8" v-if="totalPage > 1 && !dataLoading">
            <el-button @click="jumpPage(0)" size="small" type="text" icon="el-icon-arrow-left" v-if="currentPage > 1">Prev</el-button>
            <label v-else>&nbsp;</label>
          </el-col>
          <el-col :span="8"  v-if="totalPage > 1 && !dataLoading">
            <el-button @click="jumpPage(1)" size="small" type="text" v-if="currentPage < totalPage">
              Next
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
            <label v-else>&nbsp;</label>
          </el-col>
          <el-col :span="totalPage > 1 && !dataLoading ? 8 : 24" class="text-right">
            <el-button
              @click="selected"
              v-if="displaySelected"
              type="primary"
              size="small">
              {{ $t("design.selected") }}
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style lang='scss' src="@/assets/design.scss"></style>
<script>
import extend from '@/plugins/page/base'
import {
  fetchLinkPicker
} from '@/plugins/api/assembler'
export default {
  name: 'collection-picker',
  extends: extend,
  data () {
    return {
      siteId: '',
      displaySelected: false,
      displayExplore: false,
      sectionIndex: -1,
      selectedItem: {},
      searchKeyword: '',
      entity: {
        id: '',
        title: '',
        image: ''
      },
      dataset: [],
      currentPage: 1,
      totalPage: 0,
      dataLoading: true
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
          title: '',
          image: ''
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
     * 返回
     */
    previous () {
      this.currentPage = 1
      this.totalPage = 0
      this.searchKeyword = ''
      this.clearSearchKey()
    },
    jumpPage (next) {
      this.currentPage = next === 1 ? this.currentPage + 1 : this.currentPage - 1
      this.currentPage = this.currentPage < 1 ? 1 : this.currentPage > this.totalPage ? this.totalPage : this.currentPage
      this.getData()
    },
    searchData () {
      this.currentPage = 1
      this.getData()
    },
    /**
     * 添加地址
     */
    getAddUrl () {
      return `/site/${this.siteId}/${this.pickerType === 'productCollectionPicker' ? 'goods' : 'article'}/collection`
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
      this.dataLoading = true
      fetchLinkPicker({
        current: this.currentPage,
        size: 10,
        params: {
          siteId: this.siteId,
          region: this.regionCode,
          searchType: this.pickerType === 'productCollectionPicker' ? 2 : 4,
          keyword: this.searchKeyword
        }
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data.records
              this.totalPage = result.data.pages
            }
          })
          this.dataLoading = false
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
          title: this.selectedItem.title,
          image: this.selectedItem.image
        }
        this.displayExplore = false
        this.$emit('input', this.entity)
      }
    }
  }
}
</script>
