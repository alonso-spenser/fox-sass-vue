<template>
  <main>
    <fox-page-header
      :previous="true"
      :actions="crumbAction"></fox-page-header>
    <fox-page-loading
      :loading="pageLoading"
      :invalid="pageIsValid"
    >
      <sort-tree
        @openDialog="openDialog"
        :isDialogShow.sync="isDialogShow"
        :subheading="menuTypeData.subheading"
        :heading="menuTypeData.title"
        :nav-type="menuType"
        :limit="menuTypeData.limit">
      </sort-tree>
    </fox-page-loading>
  </main>
</template>

<script>
import SortTree from '../components/sortTree'
import extend from '@/plugins/page/paging'

export default {
  name: 'siteNavigation',
  extends: extend,
  components: {
    SortTree
  },
  data () {
    return {
      headerDataset: [],
      footDataset: [],
      menuType: 1,
      menuTypeData: {},
      isDialogShow: false,
      menuTypeList: []
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
    this.pageValid()
    this.menuTypeList = this.$t('navigation.menuType')
    this.menuType = parseInt(this.$route.params.menuType || '1')
    this.menuTypeList.forEach((o) => {
      if (o.value === this.menuType) {
        this.menuTypeData = o
      }
    })
  },
  methods: {
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
