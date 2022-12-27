<template>
  <div
    class="section-design"
    v-if="visible"
  >
    <goods-personalized
      ref="sectionEditor"
      :visible.sync="visible"
      :section-data="sectionData"
      @change="sectionChange"
    ></goods-personalized>
    <div class="section-design-content">
      <goods-preview :dataset="dataset"></goods-preview>
    </div>
    <div class="section-design-footer">
      <el-button type="primary" @click="updateSection">
        {{ $t('goods.update.design.save') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import goodsPreview from './goods/preview'
import goodsPersonalized from './goods/goods-personalized'

export default {
  name: 'section-design-editor',
  extends: extend,
  components: {
    goodsPreview,
    goodsPersonalized
  },
  data () {
    return {
      dataset: {},
      sectionData: {
        'sectionAlias': '设计详情',
        'imagePercentage': '6',
        'wideScreen': true,
        'sectionSalt': 'FvyQV3',
        'firstLayout': 'left',
        'imageScale': '21by9',
        'dataset': {
          'imageList': {
            'data': [],
            'type': 'normal'
          }
        }
      },
      defaultData: {
        'sectionAlias': '设计详情',
        'imagePercentage': '6',
        'wideScreen': true,
        'sectionSalt': 'FvyQV3',
        'firstLayout': 'left',
        'imageScale': '21by9',
        'dataset': {
          'imageList': {
            'data': [],
            'type': 'normal'
          }
        }
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    goodsId: {
      type: String,
      default: () => {
        return ''
      }
    },
    value: {
      type: Object,
      default: () => {
        return {
          'sectionAlias': '设计详情',
          'imagePercentage': '6',
          'wideScreen': true,
          'sectionSalt': 'FvyQV3',
          'firstLayout': 'left',
          'imageScale': '21by9',
          'dataset': {
            'imageList': {
              'data': [],
              'type': 'normal'
            }
          }
        }
      }
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.validValue()
      }
    }
  },
  created () {
    this.validValue()
  },
  methods: {
    validValue () {
      if (this.value.dataset === undefined) {
        this.sectionData = this.defaultData
      } else {
        this.sectionData = this.value
      }
    },
    sectionChange (data) {
      data.sectionSalt = 'FvyQV3'
      data.articleId = this.utility.isEmpty(this.goodsId) ? ((new Date()).getTime()).toString() : this.goodsId
      this.dataset = data
    },
    updateSection () {
      this.$emit('update', this.dataset)
    }
  }
}
</script>
