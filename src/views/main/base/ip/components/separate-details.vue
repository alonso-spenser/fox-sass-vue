<template>
  <el-dialog
    title="详情"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
  </el-dialog>
</template>

<script>
import { separateDetails } from '@/plugins/api/main/address'

export default {
  data () {
    return {
      dialogVisible: false,
      ids: ''
    }
  },
  methods: {
    // 详情
    separateDetails () {
      separateDetails({ id: this.ids }).then(result => {
        this.ruleForm = result.data
        // console.log(this.ruleForm)
      })
        .catch(error => {
          this.networkMistake(error)
        })
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style>

</style>
