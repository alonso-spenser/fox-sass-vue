<template>
  <div>
    <el-dialog
      :show-close="false"
      :visible="visible"
      width="800px"
    >
      <template slot="title">
        <el-button
          @click="getSections"
          size="small"
          class="float-right"
        >添加模块
        </el-button>
        <span class="el-dialog__title">
          {{ entity.title }}
        </span>
      </template>
      <el-form :model="pageSection" :rules="formRules" ref="update" label-position="top">
        <el-row :gutter="20" style="margin-bottom: 10px">
          <el-col :span="18">
            模块
          </el-col>
          <el-col :span="3">
            排序
          </el-col>
        </el-row>
        <template v-for="(o,index) in pageSection.dataset">
          <el-row
            :key="`section-${index}`"
            :gutter="20">
            <el-col :span="18">
              {{ o.sectionType }} - {{ o.sectionName }}
            </el-col>
            <el-col :span="4">
              <el-form-item
                style="margin: 0"
                :prop="`dataset.${index}.sortIndex`"
                :rules="formRules.sortIndex"
              >
                <el-input
                  size="small"
                  v-model="o.sortIndex"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="text-right">
              <el-button
                round
                size="small"
                @click="removeSection(index)"
                icon="el-icon-delete"></el-button>
            </el-col>
          </el-row>

        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogClose">{{ $t("base.operate.cancel") }}</el-button>
        <el-button size="small" type="primary" @click="updatePageSection">{{ $t("base.operate.save") }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :showClose="false"
      :visible.sync="sectionVisible"
      width="800px"
      :before-close="addSection">
      <el-radio-group @change="changeSection" class="el-radio-block" v-model="sectionId">
        <template v-for="(item, index) in sectionsList">
          <el-radio
            v-if="!hasSection(item.sectionType, item.siteTypeList) && item.siteType.indexOf(siteType) > -1"
            :label="item.id"
            :key="index">
            {{ item.sectionType }} - {{ item.sectionName }}
          </el-radio>
        </template>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="sectionVisible = false">{{ $t('base.operate.cancel') }}</el-button>
        <el-button size="small" @click="addSection">{{ $t('base.operate.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style
  scoped
  lang="scss">
.el-radio-block {
  overflow: hidden;

  .el-radio {
    display: inline-block;
    width: 50%;
    margin: 0;
    float: left;

    & + .el-radio {
      margin: 0;
    }
  }
}
</style>

<script>
import extend from '@/plugins/page/unsaved'
import * as http from '@/plugins/api/theme'

export default {
  name: 'themeUpdate',
  extends: extend,
  data () {
    return {
      pageSection: {
        dataset: []
      },
      entity: {},
      formRules: {
        sort: [
          {
            pattern: this.utility.expression.IntZeroPositive,
            message: this.$t('theme.pageSection.update.entity.sortIndex.required'),
            trigger: 'blur'
          }
        ]
      },
      sectionsList: [],
      sectionId: '',
      sectionVisible: false
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    pageId: {
      type: String,
      default: ''
    },
    siteType: {
      type: Number,
      default: 2
    },
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    title () {
      return this.themeId ? '编辑模板' : '新建模板'
    }
  },
  watch: {
    value: {
      deep: true,
      handler () {
        this.entity = this.value
      }
    },
    /**
     * 监控窗口显示状态
     */
    visible (val) {
      if (val) {
        this.getPageSection()
      }
    }
  },
  created () {
    this.entity = this.value
  },
  methods: {
    hasSection (sectionType, siteTypeList) {
      let m = siteTypeList.filter((id) => {
        return this.entity.siteTypeList.indexOf(id) > 0
      })
      let s = this.pageSection.dataset.filter((o) => {
        return o.sectionType === sectionType
      })
      return s.length > 0 && m.length > 0
    },
    /**
     * 选择某个section
     * @param value
     */
    changeSection (value) {
      this.sectionId = value
    },
    /**
     * 移除页面SECTION
     * @param index
     */
    removeSection (index) {
      this.pageSection.dataset.splice(index, 1)
    },
    /**
     * 关闭
     */
    dialogClose () {
      this.$emit('update:visible', false)
    },
    /**
     * sections
     */
    getPageSection () {
      http.themePageSection({
        pageId: this.entity.id,
        siteType: this.siteType
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.pageSection.dataset = result.data
            }
          })
        })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    /**
     * sections
     */
    getSections () {
      if (this.sectionsList.length === 0) {
        http.themeSectionPaging({
          current: 1,
          size: 100,
          params: {
            sectionGroup: 1000
          }
        })
          .then(result => {
            this.resultMessage(result, (success) => {
              if (success) {
                this.sectionsList = result.data['records']
              }
            })
          })
          .catch(error => {
            this.networkMistake(error)
          })
      }
      this.sectionVisible = true
    },
    /**
     * 添加集合
     */
    addSection () {
      this.sectionVisible = false
      let sections = this.sectionsList.filter((o) => {
        return o.id === this.sectionId
      })
      if (sections.length > 0) {
        // let has = this.pageSection.dataset.filter((o) => {
        //   return o.sectionType === sections[0].sectionType
        // })
        // if (has.length === 0) {
        //   this.pageSection.dataset.push({
        //     sectionType: sections[0].sectionType,
        //     pageId: this.entity.id,
        //     pageType: this.entity.pageType,
        //     sectionName: sections[0].sectionName,
        //     sectionData: sections[0].sectionData,
        //     sortIndex: this.pageSection.dataset.length + 1,
        //     visible: 0
        //   })
        // }
        this.pageSection.dataset = []
        this.pageSection.dataset = [{
          sectionType: sections[0].sectionType,
          pageId: this.entity.id,
          pageType: this.entity.pageType,
          sectionName: sections[0].sectionName,
          sectionData: sections[0].sectionData,
          sectionId: sections[0].id,
          sortIndex: this.pageSection.dataset.length + 1,
          visible: 0
        }]
        this.sectionId = ''
      }
    },
    /**
     * 绑定组件
     */
    updatePageSection () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http.themePageSectionUpdate({
            pageId: this.entity.id,
            pageType: this.entity.pageType,
            siteType: this.siteType,
            sectionList: this.pageSection.dataset.reduce((r, v) => {
              r.push(v.sectionId)
              return r
            }, [])
          })
            .then(result => {
              result.options = {
                formName: 'update',
                action: this.actionType.update
              }
              this.resultMessage(result, (success) => {
                if (success) {
                  this.pageSection.dataset = []
                  this.dialogClose()
                }
              })
            })
            .catch(error => {
              this.networkMistake(error)
            })
        }
      })
    }
  }
}
</script>
