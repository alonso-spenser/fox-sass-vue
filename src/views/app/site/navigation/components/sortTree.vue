<template>
  <fo-page-section :heading="heading" :content="subheading">
    <el-tree
      :data="dataset"
      :props="defaultProps"
      node-key="id"
      draggable
      v-loading="loading"
      @node-drop="dragSort"
      default-expand-all
    >
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <div class="float-right">
          <el-button
            icon="el-icon-plus"
            circle
            size="mini"
            v-if="node.level < limit"
            @click="() => addDialog(data.id)">
          </el-button>
          <el-button
            icon="el-icon-rank"
            size="mini"
            circle
          >
          </el-button>
          <el-button
            icon="el-icon-edit"
            circle
            size="mini"
            @click="() => updateDialog(data)">
          </el-button>
          <el-button
            icon="el-icon-delete"
            circle
            size="mini"
            @click="() => deleteNavigation(node, data)">
          </el-button>
        </div>
        <span>{{ node.label }}</span>
      </div>
    </el-tree>
    <!--弹窗-->
    <el-dialog
      :before-close="closeDialog"
      :title="$t('navigation.update.dialog.heading')"
      :visible.sync="isDialogShow"
      :show-close="true"
      :close-on-click-modal="false"
      width="600px">
      <el-form :model="entity" :rules="formRules" ref="update" label-width="100px" label-position="top">
        <el-form-item prop="title" :label="$t('navigation.update.entity.title.label')">
          <el-input
            :maxlength="100"
            show-word-limit
            v-model="entity.title"
            :placeholder="$t('navigation.update.entity.title.placeholder')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="link" :label="$t('navigation.update.entity.link.label')">
          <link-picker
            ref="linkPicker"
            :width="560"
            :site-type="siteModel.siteType.toString()"
            v-model="entity.link"
            @update="linkAsync"
          ></link-picker>
        </el-form-item>
        <!-- 导航方式-->
        <el-form-item prop="target" :label="$t('navigation.update.entity.target.label')">
          <el-select
            class="w-100"
            v-model="entity.target"
            :placeholder="$t('navigation.update.entity.target.placeholder')">
            <el-option
              v-for="(value, key) in $t('navigation.navigationUpdate.target')"
              :key="`target-${key}`"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="avatar">
          <template slot="label">
            {{$t('navigation.update.entity.avatar.label')}}
            <label class="text-primary cursor-pointer" @click="loadGallery('coverImage')" :title="$t('resourceSelector.lib')">
              <i class="el-icon-picture-outline-round"></i>
            </label>
          </template>
          <fo-image-single
            v-model="entity.avatar"
            :width="180"
            :size-limit="10"
            :oss-bucket="resource.ossBucket"
            :server-address="resource.serviceAddress"
            :file-folder="siteId"
          ></fo-image-single>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">
          {{ this.$t('base.operate.cancel') }}
        </el-button>
        <el-button size="small" :loading="loading" type="primary" @click="formValidation">
          {{ this.$t('base.operate.save') }}
        </el-button>
      </div>
    </el-dialog>
    <resource-selector :visible.sync="gallery.visible" @close="resourceSelector" :info-type="0"></resource-selector>
  </fo-page-section>
</template>

<script>
import extend from '@/plugins/page/base'
import ResourceSelector from '../../goods/components/resource-selector'

import {
  fetchDeleteSiteNavigationTree, fetchSiteNavigationSort,
  fetchSiteNavigationTreeData,
  fetchSiteNavigationUpdate
} from '@/plugins/api/navigation'
export default {
  name: 'sort-tree',
  extends: extend,
  components: {
    ResourceSelector
  },
  data () {
    return {
      loading: false,
      dataset: [],
      defaultProps: {
        children: 'subList',
        label: 'title'
      },
      formRules: {
        title: [
          {
            required: true,
            message: this.$t('navigation.update.entity.title.required'),
            trigger: 'blur'
          }
        ]
      },
      entity: {
        parentId: '',
        navType: 1,
        link: '',
        title: '',
        target: '',
        refId: '',
        refType: 0,
        avatar: ''
      },
      visible: false,
      gallery: {
        visible: false,
        field: ''
      }
    }
  },
  props: {
    navType: {
      type: Number,
      default: () => {
        return 1
      }
    },
    isDialogShow: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    limit: {
      type: Number,
      default: () => {
        return 1
      }
    },
    heading: {
      type: String,
      default: ''
    },
    subheading: {
      type: String,
      default: ''
    }
  },
  watch: {
    isDialogShow (val) {
      if (!val) {
        this.$refs.linkPicker.clearSearchKey()
      } else {
        // 新建一级菜单
        if (!this.entity.parentId) {
          this.restEntity()
        }
      }
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
  created () {
    this.getData()
  },
  methods: {
    /**
     * 加载图库
     */
    loadGallery (field) {
      this.gallery.field = field
      this.gallery.visible = true
    },
    /**
     * 图片选择结果
     * @param list 图片
     */
    resourceSelector (list) {
      if (list.length > 0) {
        this.entity.avatar = list[0].url
      }
    },
    /**
     * 链接选择器异步推送数据
     */
    linkAsync (data) {
      if (this.utility.isNotEmpty(data.refId)) {
        this.entity.refId = data.refId
        this.entity.refType = data.refType
      }
    },
    /**
     * 分页
     */
    getData () {
      fetchSiteNavigationTreeData({
        navType: this.navType,
        siteId: this.siteId,
        region: this.regionCode
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.dataset = result.data
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 拖动排序
     * @param draggingNode 拖的节点
     * @param dropNode 新的父节点
     * @param dropType
     */
    dragSort (draggingNode, dropNode, dropType) {
      if (dropType === 'inner' && this.navType === 2) {
        this.getData()
        return false
      }
      let parentId = ''
      let ids = []
      if (dropType === 'inner') {
        parentId = dropNode.data.id
        dropNode.data.subList.forEach((o) => {
          ids.push(o.id)
        })
      } else {
        parentId = dropNode.data.parentId
        if (dropNode.parent && parentId !== '0') {
          dropNode.parent.data.subList.forEach((o) => {
            ids.push(o.id)
          })
        }
      }
      if (parentId === '0') {
        this.dataset.forEach((o) => {
          ids.push(o.id)
        })
      }
      if (parentId && ids.length) {
        this.loading = true
        fetchSiteNavigationSort({
          ids: ids,
          siteId: this.siteId,
          navType: this.navType,
          parentId: parentId
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                this.getData(1)
              }
            })
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            this.networkMistake(error)
          })
      }
    },
    /**
     * 删除
     * @param node
     * @param data
     */
    deleteNavigation (node, data) {
      if (node.childNodes.length > 0) {
        this.$message({
          type: 'error',
          message: this.$t('navigation.errorCode.1507002').toString()
        })
      } else {
        this.$confirm(this.$t('base.delete.subheading').toString(), this.$t('base.delete.heading').toString(), {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          type: 'error',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              fetchDeleteSiteNavigationTree({
                id: data.id,
                siteId: this.siteId
              })
                .then(result => {
                  result.options = {
                    action: this.actionType.delete
                  }
                  this.resultMessage(result, () => {
                    done()
                    this.getData(this.entity.navType)
                    instance.confirmButtonLoading = false
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
        })
      }
    },
    /**
     * 显示添加 & 修改弹窗
     * @param parentId
     */
    addDialog (parentId) {
      this.clearValidate('update')
      this.resetForm('update')
      this.restEntity(() => {
        this.$emit('openDialog')
      }, parentId)
    },
    /**
     * 显示添加 & 修改弹窗
     * @param entity
     */
    updateDialog (entity) {
      this.entity = JSON.parse(JSON.stringify(entity))
      this.$emit('openDialog')
      // this.clearValidate('update')
    },
    /**
     * 重置输入
     */
    restEntity (callback, parentId = 0) {
      this.entity.navType = this.navType
      this.entity.parentId = parentId
      this.entity.link = ''
      this.entity.target = ''
      this.entity.title = ''
      delete this.entity.id
      callback && callback.call(this)
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveChanges()
        }
      })
    },
    /**
     * 更新数据
     */
    saveChanges () {
      this.entity.siteId = this.siteId
      this.entity.region = this.regionCode
      this.entity.navType = this.navType
      this.loading = true
      fetchSiteNavigationUpdate(this.entity)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.entity.parentId !== '0' ? this.actionType.update : this.actionType.addition,
            updateId: false
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getData(this.entity.navType)
            }
          })
          this.closeDialog()
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          this.closeDialog()
          this.networkMistake(error)
        })
    },

    /**
     * 关闭弹窗
     */
    closeDialog () {
      this.restEntity(() => {
        this.$emit('update:isDialogShow', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree-node__content {
  padding: 0;
  margin: 0;
  height: 32px;

  .custom-tree-node {
    padding: 0;
    margin: 0;
    height: 32px;
    width: 100%;
    line-height: 32px;
    font-size: 14px;
    border-bottom: 1px solid #e9ecef;

    .el-button {
      border: 0;
    }
  }
}
</style>
