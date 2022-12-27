<template>
  <el-dialog
    :title="appName"
    width="960px"
    :visible="visible"
    :close-on-click-modal="false"
    :before-close="closeDialog"
  >
    <el-form
      :model="formModel"
      :rules="formRules"
      ref="updateForm"
      label-width="120px"
      label-position="right"
      class="mt-3"
      v-loading="loading"
    >
      <el-form-item prop="roleName" :label="$t('core.security.role.update.entity.roleName.label')">
        <el-input
          v-model.trim="formModel.roleName"
          :maxlength="50"
          show-word-limit
          :readonly="true"
          autocomplete="off"
          :placeholder="$t('core.security.role.update.entity.roleName.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="roleRemark" :label="$t('core.security.role.update.entity.roleRemark.label')">
        <el-input
          v-model.trim="formModel.roleRemark"
          :maxlength="100"
          show-word-limit
          autocomplete="off"
          :placeholder="$t('core.security.role.update.entity.roleRemark.placeholder')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="keepValue" :label="$t('core.security.role.update.entity.keepValue.label')" v-if="appType === 2000">
        <el-input-number
          class="sort-input"
          v-model="formModel.keepValue"
          :min="1"
          :max="999"
          :controls="false"
          autocomplete="off"
          :placeholder="$t('core.security.role.update.entity.keepValue.placeholder')"
        ></el-input-number>
      </el-form-item>
      <el-form-item prop="functionList" :label="$t('core.security.role.update.entity.functionAuthority.label')">
        <el-table
          :data="formModel.functionList"
          :show-header="false"
          stripe
          border
        >
          <el-table-column width="160">
            <template slot-scope="scope">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="scope.row.selected"
                @change="checkChange($event, scope.$index)"
              >{{scope.row.functionName}}
              </el-checkbox>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-row :gutter="20">
                <el-col :span="6" v-for="(item, subIndex) in scope.row.subList" :key="item.id">
                  <el-checkbox
                    v-model="item.selected"
                    @change="checkChange($event, scope.$index, subIndex)"
                  >{{item.functionName}}
                  </el-checkbox>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">{{$t('base.operate.cancel')}}</el-button>
      <el-button type="primary" :loading="submitLoading" @click="formValidation">
        {{showForm?$t('base.operate.save'):$t('base.operate.confirm')}}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import extend from '@/plugins/page/unsaved'
import { fetchAdminRoleDetail, fetchAdminRoleUpdate } from '@/plugins/api/core'
export default {
  name: 'roleDialog',
  extends: extend,
  data () {
    return {
      appTypeList: [],
      showForm: false,
      loading: false,
      submitLoading: false,
      deleteLoading: false,
      isIndeterminate: false,
      formModel: {
        dataAccess: 2,
        keepValue: 100,
        roleName: '',
        functionList: []
      },
      formRules: {
        roleName: [
          {
            required: true,
            message: this.$t('core.security.role.update.entity.roleName.required'),
            trigger: 'blur'
          }
        ],
        keepValue: [
          {
            required: true,
            message: this.$t('core.security.role.update.entity.keepValue.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.getRoleDetail()
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    /**
     * 应用类型
     */
    appType: {
      type: Number,
      default: () => {
        return 1000
      }
    }
  },
  created () {
    this.appTypeList = this.$t('core.appTypeList')
    this.formModel.roleName = this.$t('core.security.role.update.roleName')
  },
  computed: {
    agentId () {
      return this.$store.state.agentModel.id
    },
    appName () {
      let s = this.appTypeList.filter((o) => {
        return o.type === this.appType
      })
      if (s.length > 0) {
        return s[0].name
      }
      return ''
    }
  },
  methods: {
    closeDialog (done) {
      this.$emit('closeDialog')
    },
    /**
     * 表单校验
     */
    formValidation () {
      this.$refs['updateForm'].validate(valid => {
        if (valid) {
          this.updateRole()
        }
      })
    },
    /**
     * 复选框选中状态
     * @param val
     * @param index
     * @param subIndex
     */
    checkChange (val, index, subIndex) {
      const functionList = JSON.parse(
        JSON.stringify(this.formModel.functionList[index].subList)
      )
      if (subIndex === undefined) {
        const list = []
        this.formModel.functionList[index].selected = val
        functionList.map(item => {
          list.push({
            ...item,
            selected: val
          })
        })
        this.formModel.functionList[index].subList = list
      } else {
        let selected = []
        let unSelected = []
        functionList.map(item => {
          if (item.selected) {
            selected.push(item)
          } else {
            unSelected.push(item)
          }
        })
        if (selected.length) {
          this.formModel.functionList[index].selected = true
        } else {
          this.formModel.functionList[index].selected = false
        }
      }
    },
    /***
     * 获取详情
     */
    getRoleDetail () {
      this.loading = true
      fetchAdminRoleDetail({ roleId: '', appType: this.appType })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.formModel = result.data
            }
          })
        }).finally(() => (this.loading = false))
    },
    /***
     * 添加 & 更新权限
     */
    updateRole () {
      this.submitLoading = true
      fetchAdminRoleUpdate({
        ...this.formModel,
        appType: this.appType
      })
        .then(result => {
          this.resultMessage(result, (success) => {
            if (success) {
              this.closeDialog()
              this.$emit('save')
            }
          })
        })
        .catch(error => console.log(error))
        .finally(() => (this.submitLoading = false))
    }
  }
}
</script>
