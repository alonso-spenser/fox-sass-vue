<template>
  <el-dialog
    :title="title"
    width="640px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :before-close="handleClose"
    v-loading="saveLoading"
  >
    <el-form
      style="margin-top: 16px"
      :model="entity"
      :rules="formRules"
      ref="updateForm"
      label-width="100px"
      label-position="right"
    >
      <el-form-item prop="account" :label="$t('merchant.employee.update.entity.account.label')">
        <el-input
          @blur="accountBlur"
          v-model="entity.account"
          :disabled="utility.isNotEmpty(entity.id)"
          :placeholder="$t('merchant.employee.update.entity.account.placeholder')"
        ></el-input>
      </el-form-item>

      <el-form-item prop="roleId" :label="$t('merchant.employee.update.entity.role.label')">
        <el-select class="block" v-model="entity.roleId" filterable :placeholder="$t('merchant.employee.update.entity.role.placeholder')">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="firstName" :label="$t('merchant.employee.update.entity.firstName.label')">
        <el-input
          v-model="entity.firstName"
          :placeholder="$t('merchant.employee.update.entity.firstName.placeholder')"
        ></el-input>
      </el-form-item>

      <el-form-item prop="lastName" :label="$t('merchant.employee.update.entity.lastName.label')">
        <el-input
          v-model="entity.lastName"
          :placeholder="$t('merchant.employee.update.entity.lastName.placeholder')"
        ></el-input>
      </el-form-item>

      <el-form-item prop="mobile" :label="$t('merchant.employee.update.entity.mobile.label')">
        <el-input
          v-model="entity.mobile"
          :placeholder="$t('merchant.employee.update.entity.mobile.placeholder')"
        ></el-input>
      </el-form-item>

      <el-form-item prop="email" :label="$t('merchant.employee.update.entity.email.label')">
        <el-input
          v-model="entity.email"
          :placeholder="$t('merchant.employee.update.entity.email.placeholder')"
        ></el-input>
      </el-form-item>

      <el-form-item prop="phone" :label="$t('merchant.employee.update.entity.phone.label')">
        <el-input
          v-model="entity.phone"
          :placeholder="$t('merchant.employee.update.entity.phone.placeholder')"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password" :label="$t('merchant.employee.update.entity.password.label')">
        <el-input
          v-model="entity.password"
          :placeholder="$t('merchant.employee.update.entity.password.placeholder')"
        ></el-input>
      </el-form-item>

      <el-form-item prop="passAgain" :label="$t('merchant.employee.update.entity.passAgain.label')">
        <el-input type="password" v-model="entity.passAgain" :placeholder="$t('merchant.employee.update.entity.passAgain.placeholder')" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item prop="state" :label="$t('merchant.employee.update.entity.state.label')" v-if="entity.owner === 1">
        <el-switch
          v-model="entity.state"
          :active-value="0"
          :inactive-value="1"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>

      <el-form-item label=" ">
        <el-alert type="warning" :closable="false">
          <ul class="alert-description">
            <li v-for="(item,index) in $t('merchant.employee.update.tips')" :key="index">{{item.content}}</li>
          </ul>
        </el-alert>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer clearfix">
      <el-button @click="handleClose">{{$t('base.operate.cancel')}}</el-button>
      <el-button type="primary" :loading="saveLoading" @click="formValidation">{{$t('base.operate.confirm')}}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  fetchRoleList,
  fetchEmployeeDetail,
  fetchEmployeeUpdate
} from '@/plugins/api/merchant'
import extend from '@/plugins/page/base'
import {
  mapState
} from 'vuex'
export default {
  name: 'account-employee-dialog',
  extends: extend,
  data () {
    /**
     * 帐户是否可注册校验
     * @param rule
     * @param value
     * @param callback
     */
    let accountValidity = (rule, value, callback) => {
      if (this.utility.accountValidity(value)) {
        callback()
      } else {
        callback(new Error(this.$t('merchant.employee.update.entity.account.custom').toString()))
      }
    }
    /**
     * 密码验证
     * @param rule
     * @param value
     * @param callback
     */
    let validatePass = (rule, value, callback) => {
      if (value !== this.entity.password) {
        callback(new Error(this.$t('merchant.employee.update.entity.passAgain.custom').toString()))
      } else {
        callback()
      }
    }
    return {
      saveLoading: false,
      roleList: [],
      groupList: [],
      departmentList: [],
      entity: {
        departmentId: '',
        groupId: '',
        passAgain: '',
        account: '',
        email: '',
        firstName: '',
        lastName: '',
        mobile: '',
        password: '',
        phone: '',
        state: 0,
        roleId: ''
      },
      formRules: {
        account: [
          { required: true, message: this.$t('merchant.employee.update.entity.account.required'), trigger: 'blur' },
          {
            validator: accountValidity,
            trigger: 'blur'
          }
        ],
        firstName: [
          {
            required: true,
            message: this.$t('merchant.employee.update.entity.firstName.required'),
            trigger: 'blur'
          }
        ],
        lastName: [
          {
            required: true,
            message: this.$t('merchant.employee.update.entity.lastName.required'),
            trigger: 'blur'
          }
        ],
        roleId: [
          {
            required: true,
            message: this.$t('merchant.employee.update.entity.role.required'),
            trigger: 'blur'
          }
        ],
        passAgain: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    employeeId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['merchantModel']),
    title () {
      return this.employeeId ? this.$t('merchant.employee.update.updateTitle') : this.$t('merchant.employee.update.addTitle')
    },
    agentId () {
      return this.$store.state.agentModel.id
    }
  },
  watch: {
    visible (val) {
      if (val) {
        // this.resetForm('updateForm')
        this.getRole()
        if (this.employeeId) {
          this.getEmployeeDetail()
        }
      } else {
        this.entity = {
          departmentId: null,
          groupId: null
        }
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:visible', false)
    },
    /**
     * 数据保存
     */
    formValidation () {
      this.$refs['updateForm'].validate(valid => {
        if (valid) {
          let role = this.roleList.filter((o) => {
            return o.id === this.entity.roleId
          })
          if (role.length > 0) {
            this.entity.roleName = role[0].roleName
          }
          this.updateEmployee()
        }
      })
    },
    /**
     * 添加 & 修改工员
     */
    updateEmployee () {
      this.saveLoading = true
      fetchEmployeeUpdate(this.entity)
        .then(result => {
          this.saveLoading = false
          this.pageValid()
          this.resultMessage(result, (success) => {
            if (success) {
              this.$emit('update:visible', false)
              this.$emit('save')
            }
          })
        })
        .catch(error => {
          this.saveLoading = false
          this.pageInvalid()
          this.networkMistake(error)
        })
    },
    /**
     * 删除帐号中的空格
     */
    accountBlur () {
      this.entity.account = this.utility.removeAllSpace(this.entity.account)
    },
    /**
     * 角色数据
     */
    getRole () {
      fetchRoleList()
        .then(res => {
          if (res.success) {
            this.roleList = res.data
          }
        })
        .catch(error => console.log(error))
    },
    getEmployeeDetail () {
      this.saveLoading = true
      fetchEmployeeDetail({ id: this.employeeId })
        .then(res => {
          if (res.success) {
            this.entity = res.data
          }
        })
        .catch(error => console.log(error))
        .finally(() => (this.saveLoading = false))
    }
  }
}
</script>

<style lang="scss" scoped>
  .alert-description {
    line-height: initial;
    padding: 0;
    font-size: 14px;
  }

  .block {
    display: block;
    width: 100%;
  }
</style>
