<template>
  <div>
    <div
      v-if="privateLink"
      :class="`link-picker-has ${size} clearfix`">
      <el-button
        size="small"
        class="float-right"
        circle
        icon="el-icon-close"
        @click="clearValue"
      ></el-button>
      <p class="text-truncate">
        {{ linkTitle }}
      </p>
    </div>
    <!--    :width="width-26"-->
    <el-popover
      placement="top"
      trigger="click"
      v-model="visible"
      ref="linkPicker"
      popper-class="link-picker-content"
      v-if="!privateLink"
    >
      <el-input
        :size="size"
        class="link-picker-input"
        v-model="linkTitle"
        @blur="linkChange"
        :placeholder="$t('navigation.navigationUpdate.linkPicker.placeholder')"
        slot="reference"></el-input>
      <div class="link-picker">
        <dl
          v-show="menuVisible"
          class="link-picker-menu">
          <dd
            v-for="(o, index) in $t('navigation.navigationUpdate.linkPicker.menu')[siteType]"
            :class="o.sub ? 'has-sub' : ''"
            :key="index"
            @click="getLinKPicker(o)"
          >
            {{ o.label }}
          </dd>
        </dl>
        <dl
          v-show="contentVisible"
          class="link-picker-menu">
          <dt>
            <label
              v-if="dataset.length > 0"
              class="float-right">
              {{ dataset.length }}{{ $t('navigation.navigationUpdate.linkPicker.records') }}
            </label>
            <el-button
              type="text"
              @click="previous">
              < {{ $t('base.operate.back') }}
            </el-button>
          </dt>
          <dd class="search-row">
            <el-input
              size="small"
              placeholder="keywords"
              @clear="searchData"
              :clearable="true"
              @keyup.enter.native="searchData"
              v-model="searchKeyword"
              class="input-with-select">
              <el-button
                slot="append"
                @click="searchData"
                icon="el-icon-search"></el-button>
            </el-input>
          </dd>
        </dl>
        <div
          v-show="contentVisible"
          class="data-content">
          <div
            class="link-picker-loading"
            v-loading="dataLoading">
            <dl class="link-picker-menu">
              <div
                class="empty-result"
                v-if="dataset.length === 0">
                No Data
              </div>
              <dd
                v-else
                v-for="(o, index) in dataset"
                :key="index"
                @click="setData(o)"
                class="link-picker-item"
              >
                <img
                  v-if="o.image"
                  :src="o.image">
                <div>
                  {{ o.title }}
                </div>
              </dd>
            </dl>
          </div>
        </div>
        <el-row
          class="link-picker-page"
          v-if="totalPage > 1 && !dataLoading">
          <el-col :span="12">
            <el-button
              @click="jumpPage(0)"
              size="small"
              type="text"
              icon="el-icon-arrow-left"
              v-if="currentPage > 1">Previous
            </el-button>
            <label v-else>&nbsp;</label>
          </el-col>
          <el-col
            :span="12"
            class="text-right">
            <el-button
              @click="jumpPage(1)"
              size="small"
              type="text"
              v-if="currentPage < totalPage">
              Next
              <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
            <label v-else>&nbsp;</label>
          </el-col>
        </el-row>
      </div>
    </el-popover>
  </div>
</template>

<script>
import extend from '@/plugins/page/base'
import { fetchLinkPicker } from '@/plugins/api/navigation'

/**
 * 链接选择器
 */
export default {
  name: 'link-picker',
  extends: extend,
  data () {
    return {
      searchKeyword: '',
      menuVisible: true,
      contentVisible: false,
      dataset: [],
      visible: false,
      privateLink: '',
      linkTitle: '',
      dataLoading: true,
      currentPage: 1,
      totalPage: 0,
      currentRow: {},
      linkData: {
        refType: 0,
        refId: ''
      }
    }
  },
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    width: {
      type: Number,
      default: () => {
        return 500
      }
    },
    size: {
      type: String,
      default: () => {
        return 'medium'
      }
    },
    siteType: {
      type: String,
      default: () => {
        return '3'
      }
    }
  },
  watch: {
    privateLink (val) {
      this.$emit('input', val)
      this.$emit('update', {
        ...this.linkData,
        link: this.privateLink,
        title: this.linkTitle
      })
    },
    visible (value) {
      if (value) {
        this.menuVisible = true
        this.contentVisible = false
        this.linkData = {
          refType: 0,
          refId: ''
        }
        this.linkTitle = ''
        setTimeout(() => {
          this.setLinkPickerPosition()
        }, 50)
      }
    },
    value () {
      this.privateLink = this.filterQuotation(this.value)
      this.getTitle()
    }
  },
  created () {
    this.privateLink = this.filterQuotation(this.value)
    this.getTitle()
  },
  methods: {
    /**
     * 返回
     */
    previous () {
      this.menuVisible = true
      this.currentPage = 1
      this.totalPage = 0
      this.contentVisible = false
      this.searchKeyword = ''
      this.clearSearchKey()
      this.linkData = {
        refType: 0,
        refId: ''
      }
      document.querySelector('.link-picker-input').focus()
      setTimeout(() => {
        this.setLinkPickerPosition()
      }, 50)
    },
    jumpPage (next) {
      this.currentPage = next === 1 ? this.currentPage + 1 : this.currentPage - 1
      this.currentPage = this.currentPage < 1 ? 1 : this.currentPage > this.totalPage ? this.totalPage : this.currentPage
      this.getLinKPicker(this.currentRow)
    },
    searchData () {
      this.currentPage = 1
      this.getLinKPicker(this.currentRow)
    },
    clearSearchKey () {
      this.searchKeyword = ''
    },
    /**
     *  获取链接数据新
     */
    getLinKPicker (row) {
      this.currentRow = row
      this.linkData.refType = row.id
      if (row.sub) {
        this.dataset = []
        this.menuVisible = false
        this.contentVisible = true
        let p = {
          current: this.currentPage,
          size: 10,
          params: {
            siteId: this.siteId,
            region: this.regionCode,
            searchType: row.id,
            keyword: this.searchKeyword
          }
        }
        this.dataLoading = true
        fetchLinkPicker(p)
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                if (row.all) {
                  this.dataset = [row.all].concat(result.data.records)
                } else {
                  this.dataset = result.data.records
                }
                this.totalPage = result.data.pages
                setTimeout(() => {
                  this.setLinkPickerPosition()
                }, 50)
              }
            })
          })
          .catch(error => {
            this.dataLoading = false
            this.networkMistake(error)
          })
      } else if (row.id === 0) {
        this.visible = false
        this.linkTitle = this.$t('navigation.navigationUpdate.linkPicker.menu')[this.siteType][row.id].label
        this.privateLink = `/#${this.linkTitle}`
      } else if (row.id === 99) {
        this.visible = false
        this.$t('navigation.navigationUpdate.linkPicker.menu')[this.siteType].forEach((o) => {
          if (o.id === row.id) {
            this.linkTitle = o.label
            this.privateLink = `javascript:void(0);#${this.linkTitle}`
          }
        })
      }
    },
    setLinkPickerPosition () {
      let pos = this.utility.getPos(this.$refs.linkPicker.$refs.wrapper)
      let popper = this.$refs.linkPicker.$refs.popper
      let height = document.getElementById(popper.id).offsetHeight
      height = height > pos.top ? pos.top : height
      popper.style.top = (pos.top - height - pos.height) + 'px'
      this.dataLoading = false
    },
    /**
     * 设置数据
     * @param row
     */
    setData (row) {
      this.privateLink = this.filterQuotation(row.url)
      this.linkTitle = row.title
      this.visible = false
      this.linkData.refId = row.id
    },
    /**
     * 清空值
     */
    clearValue () {
      // alert(this.privateLink)
      this.privateLink = ''
      this.linkTitle = ''
      this.clearSearchKey()
      this.linkData = {
        refType: 0,
        refId: ''
      }
      setTimeout(() => {
        this.previous()
      }, 150)
    },
    /**
     * 分拆标题
     */
    getTitle () {
      if (!this.utility.isEmpty(this.privateLink)) {
        let m = this.privateLink.split('#')
        m.splice(0, 1)
        this.linkTitle = m.length > 0 ? m.join('#') : this.privateLink
      }
    },
    linkChange (e) {
      if (e.target.value && (e.target.value.indexOf('http://') > -1 || e.target.value.indexOf('https://') > -1)) {
        this.privateLink = e.target.value
        this.linkTitle = e.target.value
        this.visible = false
        this.clearSearchKey()
      }
    },
    filterQuotation (value) {
      // eslint-disable-next-line no-useless-escape
      return value.replace(/(\'*)/g, '')
    }
  }
}
</script>
<style lang='scss'>
$themeColor: #46a0fc;
.el-message-dialog {
  width: 660px !important;
}

.link-picker {
  max-height: 311px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: -11px -12px;

  .el-input-group__append, .el-input-group__prepend {
    padding: 0 10px;
  }

  .link-picker-menu {
    overflow: hidden;
    padding: 0;
    border-radius: 3px;
    margin: 0;
    width: 230px;

    dd {
      margin: 0;
      cursor: pointer;
      list-style-type: none;
      transition: all 0.5s;

      &:not(.search-row) {
        padding: 6px 15px;

        &:hover {
          background-color: $themeColor;
          color: #fff;
        }
      }

      &.has-sub {
        &:after {
          float: right;
          color: #c2c2c2;
          content: ">";
        }
      }

      &:not(:last-child) {
        border-bottom: 1px solid #e9ecef;
      }

      img {
        height: 40px;
        margin-right: 6px;
        vertical-align: middle;
      }
    }

    .search-row {
      padding: 6px 10px;
    }

    dt {
      line-height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid #e9ecef;
    }
  }
}

.link-picker-has {
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  height: 38px;
  line-height: 38px;
  background-color: #fff;

  p {
    margin: 0 !important;
    padding: 0 15px !important;
  }

  .el-button {
    padding: 5px;
    margin: 7px 8px 0 0;
  }

  &.small {
    height: 32px;
    line-height: 32px;

    p {
      padding: 0 8px !important;
    }

    .el-button {
      padding: 3px;
      margin: 6px 8px 0 0;
    }
  }
}

.link-picker-page {
  border-top: 1px solid #e9ecef;
  padding: 0 15px;
}

.el-input__inner {
  /*border: 0 !important;*/
}

.link-picker-item {
  display: flex;
  max-height: 52px;
  overflow: hidden;

  div {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    font-size: 12px;
    line-height: 20px;
    -webkit-box-orient: vertical;
    flex: 1;
  }
}

.empty-result {
  padding: 20px;
  color: #ccc;
  text-align: center;
}

.data-content {
  min-height: 225px;

  .el-loading-parent--relative {
    position: relative;
    height: 225px;
    overflow: hidden;
  }
}
</style>
