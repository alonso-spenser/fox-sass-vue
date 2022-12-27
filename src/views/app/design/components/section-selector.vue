<template>
  <div
    v-if="visible"
    class="editor-section">
    <h3
      :class="`editor-section-title${sectionName ? ' has-sub' : ''}`"
      @click="dialogClose">
      {{ title }} <small v-if="sectionName">{{ sectionName }}</small>
    </h3>
    <div
      class="editor-section-tag"
      v-if="sectionGroup === 3000">
      <div
        :class="`fo-tag ${ item.id === tagId ? 'active' : ''}`"
        v-for="item in tagList"
        :key="item.id"
        @click="tagChange(item.id)">
        {{ item.tagName }}
      </div>
    </div>
    <div class="editor-section-content">
      <template v-for="item in sectionList">
        <el-popover
          placement="left"
          width="500"
          :title="item.sectionName"
          trigger="hover"
          :key="item.id"
          popper-class="preview-big-img"
          v-if="hasOnce(item)"
        >
          <div
            class="section-item"
            slot="reference"
            @click="changeSection(item)">
            <small class="section-item-label">
              {{ item.sectionName }}
            </small>
            <img :src="item.sectionImage || resource.image.placeholder">
            <div :class="`section-item-mask ${sectionId ? 'el-icon-refresh' : 'el-icon-plus'}`">
              <small>{{
                  sectionId ? $t('design.sectionSelector.action.change') : $t('design.sectionSelector.action.add')
                     }}</small>
            </div>
          </div>
          <template slot>
            <img
              class="preview-big-img"
              :src="item.sectionImage || resource.image.placeholder">
          </template>
        </el-popover>
      </template>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import resource from '@/plugins/resource'
import extend from '@/plugins/page/paging'
import {
  fetchSection,
  fetchSectionTag
} from '@/plugins/api/assembler'

export default {
  name: 'section-selector',
  extends: extend,
  data () {
    return {
      resource,
      tagId: '',
      tagList: [],
      heading: this.$t('design.sectionSelector.title'),
      changeTitle: this.$t('design.sectionSelector.change'),
      tagVisible: false,
      sectionLoading: true,
      presetSection: {},
      sectionList: [],
      title: '',
      sectionName: ''
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    sectionType: {
      type: String,
      default: () => {
        return ''
      }
    },
    sectionId: {
      type: String,
      default: () => {
        return ''
      }
    },
    sectionGroup: {
      type: Number,
      default: () => {
        return 3000
      }
    },
    themeSectionId: {
      type: String,
      default: () => {
        return ''
      }
    },
    pageSectionList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.getTitle()
        this.getData()
        this.getTag()
      }
    }
  },
  computed: {
    ...mapState(['siteModel'])
  },
  created () {
    this.presetSection = this.$t('design.presetSection')
  },
  methods: {
    hasOnce (item) {
      let s = this.pageSectionList.filter((o) => {
        return o.sectionId === item.id && item.once === 0
      })
      return s.length === 0
    },
    /**
     * 标题
     */
    getTitle () {
      if (this.utility.isEmpty(this.sectionType)) {
        this.tagVisible = true
        this.sectionName = ''
        this.title = this.heading
      } else {
        let section = this.presetSection[this.sectionType]
        this.tagVisible = false
        this.sectionName = section || ''
        this.title = section ? this.changeTitle : this.heading
      }
    },
    /**
     * 关闭窗体
     */
    dialogClose () {
      this.$emit('update:visible', false)
    },
    /**
     * 获取SECTION数据
     */
    getData () {
      this.sectionLoading = true
      this.sectionList = []
      fetchSection({
        current: this.pagingOptions.pageIndex,
        // size: this.pagingOptions.pageSize,
        size: 1000,
        params: {
          sectionGroup: this.sectionGroup,
          sectionType: this.sectionType,
          sectionId: this.themeSectionId,
          tagId: this.tagId || '',
          siteType: this.siteModel.siteType
        }
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            this.sectionLoading = false
            if (success) {
              this.sectionList = result.data.records
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
     * GET TAG
     */
    getTag () {
      if (this.tagList.length === 0) {
        fetchSectionTag({
          siteType: this.siteModel.siteType
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              this.tagList = [
                {
                  'id': '',
                  'sortIndex': 0,
                  'tagName': '全部'
                },
                ...result.data
              ]
            })
          })
          .catch(error => {
            this.networkMistake(error)
          })
      }
    },
    /**
     * 标签选择
     * @param id
     */
    tagChange (id) {
      this.tagId = id
      this.getData()
    },
    /**
     * 更换SECTION
     * @param data
     */
    changeSection (data) {
      this.$emit('change', {
        newSectionId: data.id,
        sectionId: this.sectionId,
        sectionType: this.sectionType,
        themeSectionId: this.themeSectionId
      })
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style
  lang='scss'
  src="@/assets/design.scss"></style>
<style lang="scss">
.preview-big-img {
  img {
    max-height: 80vh;
    width: 100%;
    object-fit: cover;
    object-position: top;
  }
}

.section-item {
  overflow: hidden;
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;

  .section-item-label {
    color: #fff;
    opacity: 0.5;
    display: inline-block;
    margin-bottom: 2px;
  }

  img {
    width: 100%;
    transition: all 0.3s;
  }

  .section-item-mask {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.3s;

    display: flex;
    align-items: center;
    justify-content: center;

    &:before {
      transition: all 0.3s;
      font-size: 30px;
      opacity: 0;
      color: #fff
    }

    small {
      position: absolute;
      right: 8px;
      bottom: 8px;
      font-size: 10px;
      color: #fff;
      opacity: 0;
      transition: all 0.3s;
    }
  }

  &:hover {
    img {
      opacity: 0.6;
    }

    .section-item-mask {
      background-color: rgba(0, 0, 0, .6);

      small,
      &:before {
        opacity: 1;
      }
    }
  }
}
</style>
