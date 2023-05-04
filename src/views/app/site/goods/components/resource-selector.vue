<template>
  <el-dialog
    :title="$t('resourceSelector.heading')"
    :visible.sync="visible"
    :show-close="true"
    :append-to-body="true"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="800px">
    <el-row
      :gutter="6">
      <el-col :span="18">
        <el-input
          :placeholder="$t('base.placeholder.search')"
          v-model="searchCondition.q"
          clearable
          @change="searchConditionChange"
          @clear="clearSearchCondition"
          class="input-with-select">
          <el-select
            v-model="searchCondition.infoType"
            slot="prepend"
            style="width: 100px"
            @change="infoTypeChange"
            :placeholder="$t('base.placeholder.search')"
          >
            <el-option
              :label="$t('resourceSelector.infoType.article')"
              :value="1"
            ></el-option>
            <el-option
              :label="$t('resourceSelector.infoType.goods')"
              :value="2"
            ></el-option>
            <el-option
              :label="$t('resourceSelector.infoType.design')"
              :value="0"
            ></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            :loading="loading"
            @click="searchData()"
          ></el-button>
        </el-input>
      </el-col>
      <el-col
        :span="6"
        v-if="searchCondition.infoType===0">
        <el-upload
          multiple
          :action="utility.uploadURL()"
          :show-file-list="false"
          :limit="100"
          :accept="'image/*'"
          :headers="headers"
          :data="aliyunOSS"
          :on-progress="uploadProgress"
          :on-success="uploadSuccess"
          :before-upload="uploadBefore">
          <el-button
            icon="el-icon-upload"
            v-loading="fileUploading"></el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row
      :gutter="6"
      class="mt-3">
      <el-col
        v-for="(o, index) in imageList"
        :key="o.url + index"
        :span="4">
        <div
          @click="imageChecked($event, o)"
          class="embed-responsive embed-responsive-1by1 embed-responsive-cover resource-selector"
        >
          <img
            class="embed-responsive-item"
            :src="getImage(o.url)"
            :alt="o.alt">
        </div>
      </el-col>
    </el-row>
    <div
      slot="footer"
      class="dialog-footer">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-pagination
            v-if="recordCount > pageSize"
            @current-change="pageChange"
            :current-page="pageIndex"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="recordCount">
          </el-pagination>
          <label v-else>&nbsp;</label>
        </el-col>
        <el-col
          :span="6"
          class="text-right">
          <el-button
            size="small"
            @click="dialogClose">
            {{ $t("base.operate.cancel") }}
          </el-button>
          <el-button
            size="small"
            :loading="loading"
            type="primary"
            @click="saveData">
            {{ $t("base.operate.confirm") }}
          </el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<style
  lang='scss'
  src="@/assets/embed.scss"></style>
<script>
import extend from '@/plugins/page/base'
import {
  fetchResourceSelector
} from '@/plugins/api/assembler'
import { resourceUpdate } from '@/plugins/api/resource'

/**
 * 图片选择器
 */
export default {
  name: 'resource-selector',
  extends: extend,
  data () {
    return {
      fileUploading: false,
      aliyunOSS: {
        rename: true,
        dir: ''
      },
      headers: {
        token: ''
      },
      imageList: [],
      pageIndex: 1,
      pageSize: 23,
      pageCount: 0,
      selectedItem: [],
      recordCount: 0,
      searchCondition: {
        q: '',
        infoType: 2,
        refType: 1
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    infoType: {
      type: Number,
      default: 2
    }
  },
  watch: {
    infoType (value) {
      this.searchCondition.infoType = value
    },
    /**
     * 监控窗口显示状态
     */
    visible (val) {
      if (val) {
        this.searchCondition.refType = this.searchCondition.infoType === 0 ? 4 : 1
        this.clearSearchCondition()
      }
    }
  },
  created () {
    this.searchCondition.infoType = this.infoType
  },
  methods: {
    getImage (url) {
      if (this.utility.isEmpty(url)) {
        return ''
      }
      return url + (url.toLowerCase().indexOf('.svg') > -1 ? '' : '!1')
    },
    /**
     * 搜索焦点
     */
    searchConditionChange () {
      this.getData()
    },
    infoTypeChange (value) {
      this.searchCondition.refType = value === 0 ? 4 : 1
      this.getData()
    },
    /**
     * 清空条件
     */
    clearSearchCondition () {
      document.querySelectorAll('.resource-selector').forEach((o) => {
        o.classList.remove('active')
      })
      this.pageIndex = 1
      this.searchCondition.q = ''
      this.searchCondition.infoType = this.infoType
      this.getData()
    },
    /**
     * 下一页
     */
    nextPage () {
      if (this.pageIndex < this.pageCount) {
        this.pageIndex++
        this.getData()
      }
    },
    /**
     * 分页
     * @param index
     */
    pageChange (index) {
      this.pageIndex = index
      this.getData()
    },
    /**
     * 调用父级关闭事件，关闭窗体
     */
    dialogClose () {
      this.$emit('update:visible', false)
    },
    /**
     * 保存
     */
    saveData () {
      this.$emit('close', this.selectedItem)
      this.$emit('update:visible', false)
    },
    /**
     * 将图片置为选择状态
     */
    imageChecked (o, row) {
      if (o.currentTarget.classList.contains('active')) {
        o.currentTarget.classList.remove('active')
      } else {
        o.currentTarget.classList.add('active')
      }
      this.displaySelected = true
      let s = this.selectedItem.filter((o) => {
        return o.url === row.url
      })
      if (s.length === 0) {
        this.selectedItem.push(row)
      } else {
        this.selectedItem.forEach((o, index) => {
          this.selectedItem.splice(index, 1)
        })
      }
    },
    searchData () {
      this.pageIndex = 1
      this.getData()
    },
    getData () {
      this.loading = true
      this.pageSize = 24
      this.selectedItem = []
      fetchResourceSelector({
        current: this.pageIndex,
        size: this.pageSize,
        orderBy: '',
        params: {
          siteId: this.siteId,
          refType: this.searchCondition.refType,
          q: this.searchCondition.q,
          infoType: this.searchCondition.infoType,
          region: this.regionCode
        }
      })
        .then(result => {
          this.loading = false
          this.resultMessage(result, (success) => {
            if (success) {
              this.imageList = result.data.records
              this.pageCount = result.data.pages
              this.recordCount = result.data.total
            }
          })
        })
        .catch(error => {
          this.loading = false
          this.networkMistake(error)
        })
    },
    uploadProgress () {
      this.fileUploading = true
    },
    /**
     * 上传完成
     * @param result
     * @param file
     * @param fileList
     */
    uploadSuccess (result, file, fileList) {
      if (result.success) {
        let fileName = this.utility.fileName(file.name).replace(/-/ig, ' ')
        let entity = {
          title: fileName,
          url: result.data.url,
          needPass: this.downPass ? 1 : 0,
          refType: 4,
          refId: this.refId,
          siteId: this.siteId,
          fileType: this.utility.fileType(file.name),
          suffix: this.utility.suffix(file.name),
          description: '',
          region: this.regionCode
        }
        resourceUpdate(entity)
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                this.fileUploading = false
                entity.id = result.data.id
                this.imageList.splice(0, 0, entity)
              }
            })
          })
          .catch(error => {
            this.fileUploading = false
            this.networkMistake(error)
          })
      }
    },
    /**
     * 上传前处理
     * @param file
     * @returns {boolean}
     */
    uploadBefore (file) {
      const isLt2M = file.size < 1024 * 1024 * 5
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 5M')
      }
      return isLt2M
    }
  }
}
</script>

<style
  lang="scss"
  scoped>
.embed-responsive-cover {
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-top: 3px;
  margin-bottom: 3px;

  &.active {
    border-color: #46a0fc;
    background-color: #46a0fc;

    img {
      opacity: 0.6;
    }
  }
}
</style>
