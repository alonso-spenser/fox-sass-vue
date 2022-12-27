<template>
  <main>
    <fo-page-header
      :previous="true"
    ></fo-page-header>
    <fo-page-loading
      :page-loading="pageLoading"
      :page-is-valid="pageIsValid"
    >
      <el-form
        :model="entity"
        :rules="formRules"
        ref="update"
        label-width="100px"
        label-position="top"
      >
        <fo-page-section>
          <el-row :gutter="20">
            <el-col :span="18">
              <div class="files-upload">
                <div class="el-form-item__label">
                  {{ $t("site.down.fileUpload.label") }}
                  <small
                    class="text-primary"
                    v-if="limit > 1">
                    {{ entity.fileList.length }} / {{ limit }}
                  </small>
                </div>
                <fo-attachment-upload
                  v-model="entity.fileList"
                  :oss-bucket="resource.ossBucket"
                  :server-address="resource.serviceAddress"
                  :file-folder="siteId"
                  :down-pass="true"
                  :inactive-value="1"
                  :active-value="0"
                  :max-size="30"
                  :full-mode="true"
                  :file-limit="limit"
                  :resource-type="resource.resourceType.download"
                  :size-limit="60"
                  class="files"
                >
                </fo-attachment-upload>
              </div>
            </el-col>
            <el-col :span="6">
              <collection-select
                :info-type="resource.infoType.download"
                v-model="entity.collectionList"
              ></collection-select>
            </el-col>
          </el-row>
        </fo-page-section>
      </el-form>
      <fo-fixed-unsaved
        :unsaved.sync="unsaved"
        @confirmed="formValidation"
      >
      </fo-fixed-unsaved>
    </fo-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchResource } from '@/plugins/api/core'
import collectionSelect from '@/components/article/collection-select'

export default {
  name: 'siteResourceUpdate',
  extends: extend,
  components: {
    collectionSelect
  },
  data () {
    return {
      entity: {
        siteId: '',
        fileList: [],
        collectionList: [],
        region: ''
      },
      formRules: {
        title: [
          {
            required: true,
            message: this.$t('site.resource.update.entity.title.required'),
            trigger: 'blur'
          }
        ]
      },
      limit: 10
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
    this.pageValid()
  },
  methods: {
    /**
     * 上一步
     */
    previous () {
      this.$router.push(`/site/${this.siteId}/download`)
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addResource()
        }
      })
    },
    /**
     * 添加数据
     */
    addResource () {
      this.entity.siteId = this.siteId
      this.entity.region = this.regionCode
      this.entity.fileList.forEach((o) => {
        o.region = this.regionCode
      })
      fetchResource(this.entity)
        .then(result => {
          result.options = {
            action: this.actionType.addition,
            formName: 'update'
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.previous()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    }
  }
}
</script>
<style lang="scss">
.files-upload {
  line-height: 40px;
}

.files {
  .el-form-item {
    margin-bottom: 10px;

    .el-form-item__label {
      padding-bottom: 10px;
    }
  }
}
</style>
