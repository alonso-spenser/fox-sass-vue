<template>
  <fox-layout-main
    :loading="pageLoading"
    :offset="200"
    :percentage="100"
    google-style
  >
    <el-row
      :gutter="20"
      class="support-page">
      <el-col :span="5">
        <div class="support-tree">
          <el-tree
            :data="supportTreeData"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            draggable
            v-loading="treeLoading"
            :allow-drop="nodeAllowDrop"
            @node-drop="dropSupport"
          >
              <span
                class="custom-tree-node"
                :class="{ active: data.id === currentNodeKey }"
                slot-scope="{ node, data }"
              >
                <span
                  class="custom-tree-label ellipsis"
                  @click.stop.prevent="nodeClick(data)"
                >{{ node.label }}</span
                >
                <span class="custom-tree-action">
                  <i
                    class="el-icon-delete"
                    @click.stop.prevent="deleteSupport(data.id)"
                  ></i>
                </span>
              </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="19">
        <div
          v-loading="detailLoading"
          v-if="supportTreeData.length"
          class="support-content"
        >
          <fox-form
            :model="entity"
            :rules="formRules"
            :borderless="false"
            ref="supportForm"
          >
            <el-row :gutter="20">
              <el-col :span="20">
                <fox-form-item
                  :show-message="false"
                  prop="title">
                  <fox-input
                    shrink
                    :maxlength="64"
                    show-word-limit
                    v-model="entity.title"
                    placeholder="标题"
                    description="文章名称"
                  ></fox-input>
                </fox-form-item>
                <fox-form-item
                  :show-message="false"
                  prop="summary">
                  <fox-input
                    shrink
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    :maxlength="255"
                    show-word-limit
                    v-model="entity.summary"
                    placeholder="摘要"
                    description="摘要内容"
                  ></fox-input>
                </fox-form-item>
              </el-col>
              <el-col :span="4">
                <fox-image-single
                  class="mt-2"
                  :alt-visible="false"
                  v-model="entity.coverImage"
                  :limit="1024"
                  file-folder="support"
                  :server-address="utility.uploadURL()"
                  :width="110">
                </fox-image-single>
              </el-col>
            </el-row>
            <fox-section heading="内容" class="mt-2">
              <el-form-item
                prop="content">
                <fox-editor
                  model-type="full"
                  v-model="entity.content"
                ></fox-editor>
              </el-form-item>
            </fox-section>
          </fox-form>
        </div>
      </el-col>
    </el-row>
    <fox-unsaved
      :unsaved.sync="unsaved"
      :loading="updateLoading"
      @confirmed="formValidation"
    >
    </fox-unsaved>
    <div class="fixed-action">
      <el-button
        plain
        type="primary"
        icon="el-icon-plus"
        round
        @click="addSupport"></el-button>
    </div>
  </fox-layout-main>
</template>

<script>
import {
  fetchSupportTree,
  fetchSupportDelete,
  fetchSupportReSort,
  fetchSupportDetail,
  fetchSupportUpdate
} from '@/plugins/api/core'
import extend from '@/plugins/page/unsaved'

export default {
  name: 'supportManagement',
  extends: extend,
  data () {
    return {
      treeLoading: false,
      detailLoading: false,
      addLoading: false,
      updateLoading: false,
      currentNodeKey: null,
      entity: {},
      supportTreeData: [],
      defaultProps: {
        children: 'subList',
        label: 'title'
      },
      formRules: {
        title: [
          {
            required: true,
            message: '请输入文章名称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    entity: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    },
    currentNodeKey (val) {
      val && this.getSupportDetail()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    /**
     * 节点点击
     */
    nodeClick (data) {
      this.currentNodeKey = data.id
    },
    /**
     * 节点是否可放置
     */
    nodeAllowDrop (draggingNode, dropNode, type) {
      let deep = 1;
      (function getDeep (data, level) {
        if (level !== deep) {
          deep += 1
        }
        if (data) {
          for (let item of data.values()) {
            getDeep(item.subList, level + 1)
          }
        }
      })(draggingNode.data.subList, deep)
      return !(
        (dropNode.level + deep > 3 && type === 'inner') ||
        (dropNode.level + deep > 4 && type !== 'inner')
      )
    },
    /**
     * 表单校验
     */
    formValidation () {
      this.formValidate('supportForm', (valid) => {
        if (valid) {
          this.updateSupport()
        }
      })
    },
    /**
     *  文章详情
     */
    getSupportDetail () {
      this.detailLoading = true
      this.entity = {}
      fetchSupportDetail({
        id: this.currentNodeKey
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .finally(() => (this.detailLoading = false))
    },
    /**
     * 获取文章树结构
     */
    getData () {
      this.treeLoading = true
      fetchSupportTree({})
        .then((result) => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.supportTreeData = result.data
              if (result.data.length && !this.currentNodeKey) {
                this.currentNodeKey = result.data[0].id
              }
            }
          })
        })
        .finally(() => (this.treeLoading = false))
    },
    /***
     * 添加文章
     */
    addSupport () {
      this.addLoading = true
      const currentDate = this.$moment().format('x')
      fetchSupportUpdate({
        attachments: 1,
        content: '',
        coverAlt: '',
        coverImage: '',
        createTime: currentDate,
        parentId: '0',
        state: 0,
        summary: '',
        title: '文章名称',
        updateTime: currentDate
      })
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'supportForm'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getData()
            }
          })
        })
        .finally(() => (this.addLoading = false))
    },
    /**
     * 更新文章
     */
    updateSupport () {
      this.updateLoading = true
      fetchSupportUpdate(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.update,
            formName: 'supportForm'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.supportTreeData.forEach((o, index) => {
                if (o.id === this.entity.id) {
                  this.supportTreeData[index].title = this.entity.title
                }
              })
            }
          })
        }).finally(() => (this.updateLoading = false))
    },
    /**
     * 删除文章
     */
    deleteSupport (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            fetchSupportDelete({
              id
            })
              .then(result => {
                result.options = {
                  action: this.actionType.delete,
                  formName: 'supportForm'
                }
                this.resultMessage(result, (success) => {
                  if (success) {
                    this.getData()
                    if (this.currentNodeKey === id) {
                      this.currentNodeKey = null
                    }
                  }
                })
                done()
              })
              .finally(() => (instance.confirmButtonLoading = false))
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      })
    },
    /***
     * 文章节点拖拽完成的回调
     * @param draggingNode
     * @param dropNode
     * @param dropType
     * @param ev
     */
    dropSupport (draggingNode, dropNode, dropType, ev) {
      let params = {}
      if (dropType === 'inner') {
        params = {
          parentId: dropNode.data.id,
          ids: dropNode.data.subList.map(({ id }) => id)
        }
      } else {
        params.parentId = dropNode.data.parentId
        if (params.parentId === '0') {
          params.ids = dropNode.parent.data.map(({ id }) => id)
        } else {
          params.ids = dropNode.parent.data.subList.map(({ id }) => id)
        }
      }
      fetchSupportReSort(params)
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.getData()
            }
          })
        })
    }
  }
}
</script>

<style lang="scss">
.support-page {
  position: relative;

  .support-tree {
    border-radius: 7px;
    border: 1px solid #EBEEF5;
    height: calc(100vh - 98px);
    padding: 10px;
    overflow-y: auto;
  }

  .support-content {
    border-radius: 7px;
    border: 1px solid #EBEEF5;
    height: calc(100vh - 98px);
    padding: 10px 15px;
    overflow-y: auto;
  }

  .el-tree-node__content {
    height: 26px;
  }

  .custom-tree-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    font-size: 14px;
    line-height: 26px;
    width: calc(100% - 24px);

    &.active {
      color: #409eff;
    }

    &:hover {
      .custom-tree-action {
        display: block;
      }
    }

    .custom-tree-label {
      flex: auto;
    }

    .custom-tree-action {
      flex: none;
      display: none;
    }
  }

  .el-form-item__label {
    padding-bottom: 5px;
  }

  .el-form-item {
    margin-bottom: 5px;
  }
}

.fixed-action {
  position: fixed;
  right: 10px;
  bottom: 10px;

  .el-button {
    padding: 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
}
</style>
