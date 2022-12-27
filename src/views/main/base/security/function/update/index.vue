<template>
  <main>
    <fo-page-loading
      :loading="pageLoading"
    >
      <div class="fo-page-header previous">
        <div class="fo-page-header-back">
          <p
            class="el-icon-arrow-left go-back"
            @click="previous">
            {{ $t('core.security.function.paging.title') }}
          </p>
          <h3> {{ appName }}</h3>
        </div>
        <div class="fo-page-header-item"></div>
      </div>
      <div v-if="modal.entry.length===0">{{ $t('base.notData') }}</div>
      <el-form
        :model="modal"
        ref="update"
        :rules="formRules">
        <div
          class="function-list"
          v-for="(item,index) in modal.entry"
          :key="index">
          <el-card shadow="hover">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  :prop="`entry.${index}.functionName`"
                  :rules="formRules.type">
                  <el-input
                    v-model="item.functionName"
                    size="small"
                    :placeholder="$t('core.security.function.update.form.functionName')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  :prop="`entry.${index}.functionCode`"
                  :rules="formRules.type">
                  <el-input
                    v-model="item.functionCode"
                    size="small"
                    :placeholder="$t('core.security.function.update.form.functionCode')"></el-input>
                </el-form-item>
              </el-col>
              <!--删除第一级-->
              <el-col :span="2">
                <el-button
                  icon="el-icon-delete"
                  type="text"
                  @click="deleteFunction(item,1,index)"></el-button>
              </el-col>
            </el-row>
            <template v-if=" item.subList && item.subList.length>0">
              <el-row
                v-for="(o,i) in item.subList"
                :key="i"
                :gutter="20">
                <el-col
                  :span="10"
                  :offset="2">
                  <el-form-item
                    :prop="`entry.${index}.subList.${i}.functionName`"
                    :rules="formRules.type">
                    <el-input
                      v-model="o.functionName"
                      size="small"
                      :placeholder="$t('core.security.function.update.form.functionName')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item
                    :prop="`entry.${index}.subList.${i}.functionCode`"
                    :rules="formRules.type">
                    <el-input
                      v-model="o.functionCode"
                      size="small"
                      :placeholder="$t('core.security.function.update.form.functionCode')"></el-input>
                  </el-form-item>
                </el-col>
                <!-- 删除第二级-->
                <el-col :span="1">
                  <el-button
                    icon="el-icon-delete"
                    type="text"
                    @click="deleteFunction(o,2,index,i)"></el-button>
                </el-col>
              </el-row>
            </template>
            <el-row
              :gutter="20"
              class="mt-2">
              <el-col
                :span="5"
                :offset="12">
                <el-button
                  size="small"
                  @click="addFunctionSubList(index)">{{ $t('base.addition.button') }}
                </el-button>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <p class="text-right">
          <el-button
            size="small"
            @click="addFunction()">
            {{ $t('core.security.function.update.add') }}
          </el-button>
        </p>
      </el-form>
      <!--保存按钮-->
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
import { fetchDeleteFunction, fetchUpdateFunctionBath, fetchAdminTree } from '@/plugins/api/core'

export default {
  name: 'index',
  extends: extend,
  data () {
    return {
      parentId: null,
      isFirst: false,
      appType: null,
      appName: '',
      modal: {
        entry: []
      },
      formRules: {
        type: [
          {
            required: true,
            message: this.$t('base.placeholder.input')
          }
        ]
      }
    }
  },
  computed: {
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('base.addition.button'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.addFunction()
          }
        }
      ]
    },
    /**
     * 面包屑下拉操作
     */
    crumbDropAction () {
      return []
    }
  },
  methods: {
    /**
     * 返回列表
     */
    previous () {
      this.$router.push('/main/base/security/function')
    },
    init () {
      this.pageLoading = true
      fetchAdminTree({ appType: this.appType }).then(res => {
        this.pageLoading = false
        if (res.data && res.data.length > 0) {
          this.modal.entry = res.data
          this.$nextTick(() => {
            this.unsaved = false
          })
        }
      })
    },
    /**
     * 添加第一级
     */
    addFunction () {
      this.modal.entry.push({
        functionName: '',
        functionCode: '',
        id: '',
        appType: this.appType,
        subList: []
      })
    },
    /**
     * 移除第一级
     */
    removeFunction (index, callback) {
      this.modal.entry.splice(index, 1)
    },
    /**
     * 添加第二级
     */
    addFunctionSubList (index) {
      if (!this.modal.entry[index].subList) {
        this.modal.entry[index].subList = []
      }
      this.modal.entry[index].subList.push({
        functionName: '',
        functionCode: '',
        id: '',
        appType: this.appType
      })
    },
    /**
     * 移除第二级
     */
    removeFunctionSubList (index, sIndex) {
      this.modal.entry[index].subList.splice(sIndex, 1)
    },
    /***
     * 删除 deleteType 1 为第一级 2 为第二级
     */
    deleteFunction (row, deleteType, parentId, childId) {
      if (!row.id) {
        if (deleteType === 1) {
          this.removeFunction(parentId)
        }
        if (deleteType === 2) {
          this.removeFunctionSubList(parentId, childId)
        }
        return
      }
      let msg = deleteType === 1 ? this.$t('core.security.function.delete.deleteParent') : this.$t('core.security.function.delete.deleteChild')
      this.$confirm(msg, {
        confirmButtonText: this.$t('base.operate.confirm'),
        cancelButtonText: this.$t('base.operate.cancel'),
        closeOnClickModal: false,
        type: 'error',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            fetchDeleteFunction({
              id: row.id
            })
              .then(result => {
                this.resultMessage(result, (success) => {
                  if (success) {
                    done()
                    instance.confirmButtonLoading = false
                    if (deleteType === 1) {
                      this.removeFunction(parentId)
                    }
                    if (deleteType === 2) {
                      this.removeFunctionSubList(parentId, childId)
                    }
                    this.$message.success(this.$t('base.delete.success'))
                    this.init()
                  } else {
                    this.$message.error(result.msg)
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
    },
    /**
     * 更新 && 添加
     */
    updateFunction (row) {
      fetchUpdateFunctionBath(this.modal.entry).then(result => {
        this.resultMessage(result, (success) => {
          if (success) {
            this.$message.success(this.$t('core.security.function.update.saveSuccess'))
            this.init()
          }
        })
      })
    },
    /**
     * 表单校验
     */
    formValidation () {
      let formName = 'update'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateFunction()
        }
      })
    }
  },
  created () {
    this.appType = this.$route.params.type
    let apps = this.$t('core.appTypeList')
    let s = apps.filter((o) => {
      return o.type === parseInt(this.appType)
    })
    if (s.length > 0) {
      this.appName = s[0].name
    }
    this.init(this.appType)
  },
  watch: {
    modal: {
      deep: true,
      handler () {
        this.unsaved = true
      }
    }
  }
}
</script>

<style
  scoped
  lang="scss">
.function-list {
  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
