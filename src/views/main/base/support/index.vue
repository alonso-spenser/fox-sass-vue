<template>
  <main>
    <el-row
      :gutter="20"
      class="article-page">
      <el-col :span="5">
        <div class="article-tree">
          <el-tree
            :data="articleTreeData"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            draggable
            v-loading="treeLoading"
            :allow-drop="allowDrop"
            @node-drop="handleDropArticle"
          >
              <span
                class="custom-tree-node"
                :class="{ active: data.id === currentNodeKey }"
                slot-scope="{ node, data }"
              >
                <span
                  class="custom-tree-label ellipsis"
                  @click.stop.prevent="handleNodeClick(data)"
                >{{ node.label }}</span
                >
                <span class="custom-tree-action">
                  <i
                    class="el-icon-delete"
                    @click.stop.prevent="deleteArticle(data.id)"
                  ></i>
                </span>
              </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="19">
        <div
          v-loading="detailLoading"
          v-if="articleTreeData.length"
          class="article-content"
        >
          <el-form
            :model="entity"
            :rules="formRules"
            label-position="top"
            ref="articleForm"
          >
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item
                  label="文章名称"
                  prop="title">
                  <el-input
                    :maxlength="64"
                    show-word-limit
                    v-model="entity.title"
                    placeholder="文章名称"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="摘要"
                  prop="summary">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    :maxlength="255"
                    show-word-limit
                    v-model="entity.summary"
                    placeholder="摘要内容"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item
                  label="封面图"
                  prop="coverImage">
                  <fox-image-single
                    :alt-visible="false"
                    v-model="entity.coverImage"
                    :limit="1024"
                    file-folder="support"
                    :server-address="utility.uploadURL()"
                    :width="125">
                  </fox-image-single>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              label="内容"
              prop="content">
              <fox-editor
                model-type="full"
                v-model="entity.content"
              ></fox-editor>
            </el-form-item>
          </el-form>
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
        @click="addArticle"></el-button>
    </div>
  </main>
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
      articleTreeData: [],
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
      val && this.getArticleDetail()
    }
  },
  created () {
    this.getArticleTree()
  },
  methods: {
    handleNodeClick (data) {
      this.currentNodeKey = data.id
    },
    /**
     * 节点是否可放置
     */
    allowDrop (draggingNode, dropNode, type) {
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
      this.$refs['articleForm'].validate(valid => {
        if (valid) {
          this.updateArticle()
        }
      })
    },
    /**
     *  文章详情
     */
    getArticleDetail () {
      this.detailLoading = true
      this.entity = {}
      fetchSupportDetail({
        id: this.currentNodeKey
      })
        .then(res => {
          if (res.success) {
            this.entity = res.data
            this.$nextTick(() => {
              this.unsaved = false
            })
          }
        })
        .catch(error => console.log(error))
        .finally(() => (this.detailLoading = false))
    },
    /**
     * 获取文章树结构
     */
    getArticleTree () {
      this.treeLoading = true
      fetchSupportTree({})
        .then(res => {
          if (res.success) {
            this.articleTreeData = res.data
            if (res.data.length && !this.currentNodeKey) {
              this.currentNodeKey = res.data[0].id
            }
          }
        })
        .catch(error => console.log(error))
        .finally(() => (this.treeLoading = false))
    },
    /***
     * 添加文章
     */
    addArticle () {
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
            formName: 'articleForm'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getArticleTree()
            }
          })
        })
        .catch(error => console.log(error))
        .finally(() => (this.addLoading = false))
    },
    /**
     * 更新文章
     */
    updateArticle () {
      this.updateLoading = true
      fetchSupportUpdate(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.update,
            formName: 'articleForm'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getArticleTree()
            }
          })
        })
        .catch(error => console.log(error))
        .finally(() => (this.updateLoading = false))
    },
    /**
     * 删除文章
     */
    deleteArticle (id) {
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
                  formName: 'articleForm'
                }
                this.resultMessage(result, (success) => {
                  if (success) {
                    this.getArticleTree()
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
    handleDropArticle (draggingNode, dropNode, dropType, ev) {
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
        .then(res => {
          if (res.success) {
            this.getArticleTree()
          }
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss">
.article-page {
  margin-top: 15px;
  position: relative;

  .article-tree {
    border-radius: 7px;
    border: 1px solid #EBEEF5;
    height: calc(100vh - 98px);
    padding: 10px;
    overflow-y: auto;
  }

  .article-content {
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
  right: 16px;
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
