<template>
  <div>
    <div class="section-image-block">
      <div
        class="section-image-block-none"
        v-if="imageURL === ''">
        <p
          class="text-center"
          @click="displayExplore=true"
          v-if="imageURL === ''">
          <i class="el-icon-upload"></i>
        </p>
      </div>
      <div
        class="section-image-block-img"
        @click="displayExplore=true"
        v-if="imageURL !== ''">
        <div class="embed-responsive embed-responsive-1by1">
          <img
            class="embed-responsive-item"
            :src="imageURL">
        </div>
      </div>
      <el-button-group v-if="imageURL !== ''">
        <el-button
          @click="displayExplore=true"
          v-if="changeButton">
          <i class="el-icon-edit"></i>
        </el-button>
        <el-button
          v-if="altButton"
          @click="loadAltDialog">
          <label :class="`${imageAlt ? ' text-success' : ''}`">ALT</label>
        </el-button>
        <el-button
          v-if="removeButton"
          @click="removeImage">
          <i class="el-icon-delete"></i>
        </el-button>
      </el-button-group>
    </div>
    <div
      v-if="displayExplore"
      class="editor-explore editor-explore-image">
      <h4
        class="editor-explore-title"
        @click="displayExplore=false">
        {{ $t("design.imageBlock.heading") }}
      </h4>
      <div class="editor-explore-content">
        <el-row :gutter="10">
          <el-col
            class="text-center"
            :span="2">
            <el-upload
              multiple
              :action="utility.uploadURL()"
              :show-file-list="false"
              :limit="100"
              v-loading="fileUploading"
              :accept="'image/*'"
              :headers="headers"
              :data="aliyunOSS"
              :on-progress="uploadProgress"
              :on-success="uploadSuccess"
              :before-upload="uploadBefore">
              <div class="embed-responsive embed-responsive-1by1">
                <div class="embed-responsive-item">
                  <i class="el-icon-upload"></i>
                </div>
              </div>
            </el-upload>
          </el-col>
          <el-col
            v-for="(o, index) in imageList"
            :key="o.url + index"
            :span="2">
            <div
              v-if="!isManaged"
              @click="imageChecked($event, o)"
              class="embed-responsive embed-responsive-1by1 editor-explore-img"
            >
              <img
                class="embed-responsive-item"
                :src="getImage(o.url)">
              <label></label>
            </div>
            <div
              v-else
              @click="manageChecked($event, o)"
              class="embed-responsive embed-responsive-1by1 editor-explore-img"
            >
              <img
                class="embed-responsive-item"
                :src="getImage(o.url)">
              <label></label>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="editor-explore-bottom">
        <div class="container-fluid">
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
              <template v-else>&nbsp;</template>
            </el-col>
            <el-col
              :span="6"
              class="text-right">
              <el-button
                @click="deleteImage"
                circle
                icon="el-icon-delete"
                class="mr-4"
                type="danger"
                v-if="imageList.length > 0 && removeList.length > 0"
                size="small">
              </el-button>
              <el-button
                @click="changeManage"
                v-if="imageList.length > 0"
                :type="isManaged ? 'warning' : 'default'"
                size="small">
                {{ isManaged ? $t("design.cancelManage") : $t("design.manage") }}
              </el-button>
              <el-button
                @click="displayExplore = false"
                plain
                size="small">
                {{ $t("base.operate.cancel") }}
              </el-button>
              <el-button
                @click="selected"
                v-if="displaySelected && !isManaged"
                type="primary"
                size="small">
                {{ $t("design.imageBlock.selected") }}
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div
      class="editor-explore-mask"
      v-if="displayExplore"></div>
  </div>
</template>
<style
  lang='scss'
  src="@/assets/design.scss"></style>
<style
  lang='scss'
  src="@/assets/embed.scss"></style>
<script>
import extend from '@/plugins/page/unsaved'
import {
  resourcePaging,
  resourceUpdate,
  resourceDelete
} from '@/plugins/api/resource'

export default {
  name: 'section-image-picker',
  extends: extend,
  data () {
    return {
      displaySelected: false,
      displayExplore: false,
      displayAlt: false,
      fileUploading: false,
      imageURL: '',
      isManaged: false,
      selectedItem: {},
      imageList: [],
      fileLimit: 30,
      imageAlt: '',
      aliyunOSS: {
        rename: true,
        dir: ''
      },
      headers: {
        token: ''
      },
      pageIndex: 1,
      pageSize: 23,
      pageCount: 0,
      recordCount: 0,
      uploadFileList: [],
      joinPages: [],
      removeList: []
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    alt: {
      type: String,
      default: () => ''
    },
    changeButton: {
      type: Boolean,
      default: () => true
    },
    altButton: {
      type: Boolean,
      default: () => false
    },
    removeButton: {
      type: Boolean,
      default: () => true
    }
  },
  watch: {
    imageURL (val) {
      this.$emit('input', val)
    },
    displayExplore (val) {
      if (val) {
        this.pageIndex = 1
        this.joinPages = []
        this.imageList = []
        this.displaySelected = false
        this.fileUploading = false
        this.isManaged = false
        this.removeList = []
        this.getData()
      }
    }
  },
  created () {
    this.imageURL = this.value
    this.imageAlt = this.alt
    this.aliyunOSS.dir = this.siteId
  },
  methods: {
    getImage (url) {
      if (this.utility.isEmpty(url)) {
        return ''
      }
      return url + url.toLowerCase().indexOf('.svg') > -1 ? '' : '!1'
    },
    removeImage () {
      this.imageURL = ''
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
    getData () {
      if (!this.joinPages.includes(this.pageIndex)) {
        this.loading = true
        this.pageSize = 23
        resourcePaging({
          current: this.pageIndex,
          size: this.pageSize,
          orderBy: '',
          params: {
            siteId: this.siteId,
            fileType: 1,
            refId: '',
            refType: 4,
            region: this.regionCode
          }
        })
          .then(result => {
            this.loading = false
            this.resultMessage(result, (success) => {
              if (success) {
                this.imageList = this.imageList.concat(result.data.records)
                this.joinPages.push(this.pageIndex)
                this.pageCount = result.data.pages
                this.recordCount = result.data.total
              }
            })
          })
          .catch(error => {
            this.loading = false
            this.networkMistake(error)
          })
      }
    },
    /**
     * 将图片置为选择状态
     */
    imageChecked (o, row) {
      document.querySelectorAll('.editor-explore-img').forEach((o) => {
        o.classList.remove('active')
        o.classList.remove('checked')
      })
      o.currentTarget.classList.add('active')
      this.displaySelected = true
      this.selectedItem = row
    },
    /**
     * 切换到管理模式
     */
    changeManage () {
      document.querySelectorAll('.editor-explore-img').forEach((o) => {
        o.classList.remove('active')
        o.classList.remove('checked')
      })
      this.removeList = []
      this.displaySelected = false
      this.isManaged = !this.isManaged
    },
    /**
     * 管理选中
     */
    manageChecked (o, row) {
      o.currentTarget.classList.remove('active')
      if (o.currentTarget.classList.contains('checked')) {
        o.currentTarget.classList.remove('checked')
        this.removeList.forEach((o, index) => {
          if (o.id === row.id) {
            this.removeList.splice(index, 1)
          }
        })
      } else {
        o.currentTarget.classList.add('checked')
        this.removeList.push(row)
      }
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
    },
    /**
     * 选择图片
     */
    selected () {
      if (this.selectedItem) {
        this.imageURL = this.selectedItem.url
        let alt = this.selectedItem.title
        if (this.utility.isNotEmpty(alt)) {
          alt = alt.replace(/-/ig, ' ')
        }
        this.imageAlt = alt
      }
      this.displayExplore = false
    },
    /**
     * 删除图片
     */
    deleteImage () {
      let ids = []
      this.removeList.forEach((o) => {
        ids.push(o.id)
      })
      if (ids.length > 0) {
        this.$confirm(
          this.$t('base.delete.subheading').toString(),
          this.$t('base.delete.heading').toString(),
          {
            confirmButtonText: this.$t('base.operate.confirm'),
            cancelButtonText: this.$t('base.operate.cancel'),
            type: 'error',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                resourceDelete({
                  siteId: this.siteId,
                  ids: ids
                })
                  .then(result => {
                    result.options = {
                      action: this.actionType.delete
                    }
                    this.resultMessage(result, (success) => {
                      done()
                      instance.confirmButtonLoading = false
                      if (success) {
                        this.imageList = []
                        this.joinPages = []
                        this.getData()
                        this.displaySelected = false
                      }
                    })
                  })
                  .catch(error => {
                    this.networkMistake(error)
                    done()
                    instance.confirmButtonLoading = false
                  })
              } else {
                instance.confirmButtonLoading = false
                done()
              }
            }
          }
        )
      }
    },
    /**
     * 修改alt
     */
    editAlt () {
      this.displayAlt = false
      this.imageAlt = this.imageAlt.replace(/(^\s*)|(\s*$)/g, '')
    },
    /**
     * 修改ALT弹窗
     */
    loadAltDialog () {
      const h = this.$createElement
      this.$msgbox({
        customClass: 'el-message-dialog',
        title: this.$t('imageAlt.heading'),
        message: h('div', { 'class': 'el-row', style: 'margin-left: -10px; margin-right: -10px;' }, [
          h('div', { 'class': 'el-col el-col-6', style: 'padding-left: 10px; padding-right: 10px;' }, [
            h('img', {
              'class': 'w-100',
              attrs: {
                src: this.imageURL
              }
            })
          ]),
          h('div', { 'class': 'el-col el-col-18', style: 'padding-left: 10px; padding-right: 10px;' }, [
            h('p', null, 'ALT'),
            h('div', {
              'class': 'el-input'
            }, [
              h('input', {
                'class': 'el-input__inner border',
                attrs: {
                  placeholder: this.$t('imageAlt.entity.alt.placeholder'),
                  'data-alt': '0'
                },
                domProps: {
                  value: this.imageAlt
                }
              })
            ]),
            h('p', {
              'style': 'margin-top:10px;'
            }, this.$t('imageAlt.subheading').toString())
          ])
        ]),
        closeOnClickModal: false,
        showCancelButton: true,
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.imageAlt = document.querySelector('[data-alt]').value
            this.$emit('updateAlt', this.imageAlt)
            done()
          } else {
            done()
          }
        }
      })
    }
  }
}
</script>
<style lang='scss'>
.el-message-dialog {
  width: 660px !important;
}

.section-image-block-more {
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  line-height: 40px;
  transition: all 0.25s;
  color: #fff;

  &:hover {
    color: rgba(255, 255, 255, .5);
  }
}
</style>
