<template>
  <el-dialog
    :visible.sync="visible"
    :show-close="false"
    :before-close="dialogClose"
    :close-on-click-modal="false"
    top="100px"
    width="500px">
    <div class="unpaid">
      <p class="text-center">
        <i class="fo-lock"></i>
      </p>
      <h3>
        {{$t('settings.unpaid.heading')}}
      </h3>
      <h5>
        {{$t('settings.unpaid.subheading')}}
      </h5>
      <p>
        {{$t('settings.unpaid.content')}} {{agentModel.mobile}}
      </p>
      <p class="mt-6">
        <el-button
          @click="dialogClose(false)"
        >{{$t('settings.unpaid.cancel')}}</el-button>
        <el-button
          v-if="payment"
          @click="dialogClose(true)"
          type="danger"
        >{{$t('settings.unpaid.payment')}}</el-button>
      </p>
    </div>
  </el-dialog>
</template>
<style lang='scss' scoped>
  .unpaid {
    i {
      font-size: 100px;
    }

    padding-bottom: 60px;
    text-align: center;

    h3 {
      margin: 0 0 15px 0;
      font-size: 30px;
    }

    h5 {
      margin: 0 0 15px 0;
      font-size: 16px;
    }
  }
</style>
<script>
import extend from '@/plugins/page/base'

export default {
  name: 'unpaid',
  extends: extend,
  data () {
    return {
      payURL: '',
      entity: {
        totalAmount: 0
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    payment: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
       * 窗口关闭
       */
    dialogClose (isOk) {
      this.$emit('update:visible', false)
    }
  }
}
</script>
