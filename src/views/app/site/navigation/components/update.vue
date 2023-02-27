<template>
  <el-drawer
    :visible.sync="drawerVisible"
    size="460px"
    ref="taskDrawer"
    :append-to-body="true"
    :before-close="drawerClose"
    class="fox-drawer">
    <div
      class="el-drawer-title"
      slot="title">
      <el-button
        icon="el-icon-plus"
        class="float-right mr-5"
        @click="openDialog"
        type="text">
        {{ $t('navigation.update.add') }}
      </el-button>
      {{ entity.title }}
    </div>
    <sort-tree
      @openDialog="openDialog"
      :isDialogShow.sync="isDialogShow"
      :subheading="entity.subheading"
      :heading="entity.title"
      :nav-type="entity.value"
      :limit="entity.limit">
    </sort-tree>
  </el-drawer>
</template>

<script>
import SortTree from '../components/sortTree'
import extend from '@/plugins/page/paging'

export default {
  name: 'navigationUpdate',
  extends: extend,
  components: {
    SortTree
  },
  data () {
    return {
      drawerVisible: false,
      headerDataset: [],
      footDataset: [],
      isDialogShow: false,
      menuTypeList: [],
      entity: {}
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    visible (value) {
      this.drawerVisible = value
      this.entity = this.value
    }
  },
  computed: {
    /**
     * 面包屑操作
     */
    crumbAction () {
      return [
        {
          label: this.$t('navigation.update.add'),
          icon: 'el-icon-plus',
          type: 'primary',
          visible: true,
          click: () => {
            this.openDialog()
          }
        }
      ]
    }
  },
  created () {
    this.entity = this.value
    this.pageValid()
    this.menuTypeList = this.$t('navigation.menuType')
  },
  methods: {
    /**
     * 关闭弹窗
     * @param done
     */
    drawerClose (done) {
      done()
      this.$emit('update')
      this.$emit('update:visible', false)
      this.$refs.taskDrawer.close()
    },
    /**
     * 打开弹窗
     */
    openDialog () {
      this.isDialogShow = true
    }
  }
}
</script>

<style lang="scss">
.el-tree-node__content {
  padding: 0;
  margin: 0;
  height: 32px;

  .custom-tree-node {
    padding: 0;
    margin: 0;
    height: 32px;
    width: 100%;
    line-height: 32px;
    font-size: 14px;
    border-bottom: 1px solid #e9ecef;

    .el-button {
      border: 0;
    }
  }
}
</style>
