<template>
  <main>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
      :percentage="70"
    >
      <fox-page-header></fox-page-header>
      <fox-section>
        <el-form
          :model="entity"
          :rules="formRules"
          ref="update"
          label-position="top"
        >
          <draggable
            class="tag-list"
            handle=".el-move"
            :list="entity.tagList">
            <div
              v-for="(o, index) in entity.tagList"
              :key="`tagList-${index}`"
              class="tag-list-item"
            >
              <el-select
                multiple
                class="w-100"
                v-model="o.siteTypeList"
                :placeholder="$t('theme.page.update.entity.pageType.placeholder')"
              >
                <el-option
                  v-for="item in siteType"
                  :key="item.pageType"
                  :label="item.label"
                  :value="item.id.toString()"
                ></el-option>
              </el-select>
              <el-form-item
                :prop="`tagList.${index}.tagName`"
                :rules="formRules.tagName">
                <el-input
                  :placeholder="$t('theme.sectionTag.entity.tagName.placeholder')"
                  v-model="o.tagName"
                >
                  <template slot="append">
                    <el-button
                      icon="el-icon-rank"
                      size="small"
                      class="el-move el-action"
                    ></el-button>
                    <el-button
                      class="el-action"
                      icon="el-icon-delete"
                      size="small"
                      @click="removeItem(index)"
                    ></el-button>
                  </template>
                </el-input>
              </el-form-item>
            </div>
            <div class="tag-list-item tag-list-add">
              <el-button
                @click="addItem()"
                icon="el-icon-plus"
              >
              </el-button>
            </div>
          </draggable>
        </el-form>
      </fox-section>
      <fox-unsaved
        :unsaved.sync="unsaved"
        @confirmed="formValidation"
      >
      </fox-unsaved>
    </fox-page-loading>
  </main>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchThemeSectionTagUpdate, fetchThemeSectionTagList, fetchThemeSectionTagDelete } from '@/plugins/api/theme'
import Draggable from 'vuedraggable'

export default {
  name: 'themeTag',
  extends: extend,
  components: {
    Draggable
  },
  data () {
    return {
      entity: {
        tagList: []
      },
      siteType: [],
      formRules: {
        tagName: [
          {
            required: true,
            message: this.$t('theme.sectionTag.entity.tagName.required'),
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
    this.siteType = this.$t('enumerate.siteType')
    this.getData()
  },
  methods: {
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          this.loading = true
          this.entity.tagList.forEach((o, index) => {
            this.entity.tagList[index].sortIndex = index
            let s = []
            o.siteTypeList.forEach((val) => {
              s.push(parseInt(val))
            })
            this.entity.tagList[index].siteType = s.join(',')
          })
          this.updateTag()
        } else {
          this.unverified(fields)
        }
      })
    },
    /**
     * 更新数据
     */
    updateTag () {
      fetchThemeSectionTagUpdate(this.entity.tagList)
        .then(result => {
          result.options = {
            formName: 'update',
            action: this.actionType.update
          }
          this.resultMessage(result, (success) => {
            if (success) {
              this.getData()
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * 分页
     */
    getData () {
      fetchThemeSectionTagList()
        .then(result => {
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.entity.tagList = result.data
              if (this.entity.tagList.length === 0) {
                this.addItem()
              }
              this.$nextTick(() => {
                this.unsaved = false
              })
            }
          })
        })
        .catch(error => {
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 添加一项
     */
    addItem () {
      this.entity.tagList.push({
        tagName: '',
        sortIndex: this.entity.tagList.length,
        siteType: '',
        siteTypeList: []
      })
    },
    /**
     * 删除一项
     * @param index
     */
    removeItem (index) {
      let id = this.entity.tagList[index].id
      if (id) {
        this.deleteTag([id])
      }
      this.entity.tagList.splice(index, 1)
      this.$nextTick(() => {
        this.unsaved = false
      })
    },
    /**
     * 删除
     */
    deleteTag (ids) {
      this.$confirm(this.$t('base.delete.multiple').toString().replace('{0}', ids.length.toString()),
        this.$t('base.delete.heading').toString(), {
          confirmButtonText: this.$t('base.operate.confirm'),
          cancelButtonText: this.$t('base.operate.cancel'),
          closeOnClickModal: false,
          type: 'error',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              fetchThemeSectionTagDelete({
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
                      this.getData(true)
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
        })
    }
  }
}
</script>
<style lang="scss">
.tag-list {
  .el-form-item {
    margin: 11px 0;
  }

  .tag-list-add {
    margin-top: 11px;
  }

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .tag-list-item {
    width: calc(50% - 22px);
    padding: 10px;
    margin: 10px;
    border-radius: 7px;

    &:not(:last-child) {
      border: 1px solid #EBEEF5;
    }
  }

  .el-move {
    border-right: 1px solid #DCDFE6 !important;
  }

  .el-action {
    border-radius: 0;

    & + .el-action {
      margin-left: 20px;
    }
  }
}
</style>
