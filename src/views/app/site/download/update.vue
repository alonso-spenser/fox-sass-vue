<template>
  <main>
    <fox-page-loading
      :page-loading="pageLoading"
      :page-is-valid="pageIsValid"
    >
      <fox-page-header
        :previous="true"
      ></fox-page-header>
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top"
      >
        <fox-section>
          <el-row :gutter="20">
            <el-col :span="18">
              <el-form-item
                prop="title"
                :label="$t('site.resource.update.entity.title.label')">
                <el-input
                  type="textarea"
                  autosize
                  show-word-limit
                  maxlength="200"
                  v-model="entity.title"
                  :placeholder="$t('site.resource.update.entity.title.placeholder')"
                ></el-input>
              </el-form-item>
              <el-form-item
                prop="description"
                :label="$t('site.resource.update.entity.description.label')">
                <el-input
                  show-word-limit
                  type="textarea"
                  v-model="entity.description"
                  maxlength="500"
                  :rows="6"
                  :placeholder="$t('site.resource.update.entity.description.placeholder')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <fox-section
                :heading="$t('site.resource.update.entity.coverImage.label')"
              >
                <el-form-item>
                  <fox-image-single
                    v-model="entity.coverImage"
                    :alt-visible="false"
                    :alt="entity.coverAlt"
                    :size-limit="10"
                    :oss-bucket="resource.ossBucket"
                    :server-address="utility.uploadURL()"
                    :file-folder="siteId"
                  ></fox-image-single>
                </el-form-item>
              </fox-section>
              <collection-select
                :info-type="resource.infoType.download"
                v-model="entity.collectionList"
              ></collection-select>
            </el-col>
          </el-row>
        </fox-section>
      </el-form>
      <fox-unsaved
        :unsaved.sync="unsaved"
        :loading="loading"
        @confirmed="formValidation"
      >
      </fox-unsaved>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { resourceDetail, resourceUpdate } from '@/plugins/api/resource'
import collectionSelect from '@/components/article/collection-select'

export default {
  name: 'siteResourceUpdate',
  extends: extend,
  components: {
    collectionSelect
  },
  data () {
    return {
      /**
       * 集合搜索结果
       */
      collectionsResult: [],
      /**
       * 添加集合时，标签下拉框状态
       */
      collectionsDisabled: false,
      entity: {
        collectionList: []
      },
      formRules: {
        title: [
          {
            required: true,
            message: this.$t('site.resource.update.entity.title.required'),
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
    }
  },
  created () {
    if (this.id) {
      this.getDetail()
    } else {
      this.pageValid()
    }
  },
  methods: {
    /**
     * 上一步
     */
    previous () {
      this.$router.push(`/site/${this.siteId}/down`)
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.addResource()
        }
      })
    },
    /**
     * 添加数据
     */
    addResource () {
      resourceUpdate(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, (success) => {
            if (success) {
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 获取详情
     */
    getDetail () {
      resourceDetail({
        id: this.id,
        siteId: this.siteId
      })
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity = result.data
              this.collectionsResult = this.entity.collections
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.pageInvalid(error)
        })
    }
  }
}
</script>
<style lang='scss'>
.files-upload {
  .disabled {
    .el-upload {
      .el-upload-dragger {
        background-color: hsla(220, 4%, 58%, .1);
        border-color: hsla(220, 4%, 58%, .2);
        color: #909399;

        .el-upload__text, .el-upload__text em {
          transition: all 0.3s;
          color: #909399;
        }
      }
    }
  }

  .el-upload {
    width: 100%;

    .el-upload-dragger {
      background-color: #fff;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      height: 90px;
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;

      .el-icon-upload {
        font-size: 40px;
        color: #C0C4CC;
        margin: 0;
        transition: all 0.3s;
      }
    }
  }

  .files-upload-active {
    .el-upload-dragger {
      &:hover {
        border-color: rgba(64, 158, 255, .2);
        background-color: rgba(64, 158, 255, .1);

        .el-icon-upload,
        .el-upload__text, .el-upload__text em {
          color: #46a0fc;
        }
      }
    }
  }

  .files-upload-item {
    &:not(:last-child) {
      margin-bottom: 30px;
    }

    .files-upload-icon {
      display: inline-block;
      border: 1px solid #DCDFE6;
      width: 20px;
      height: 20px;
      overflow: hidden;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
      transition: 0.25s all;
      line-height: 18px;

      i {
        font-size: 10px;
        transition: 0.25s all;
        color: #909399;
      }

      &:hover {
        background-color: #46a0fc;
        border: 1px solid #46a0fc;

        i {
          color: #fff;
        }
      }

      &:not(:first-child) {
        margin-left: 5px;
      }
    }

    .el-switch,
    .files-upload-icon {
      margin-top: 6px;
    }
  }
}
</style>
