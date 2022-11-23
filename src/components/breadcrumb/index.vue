 <template>
  <div class="breadcrumb-wrap" v-show="!hideCrumb">
    <el-row>
      <el-col :span="16">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
              v-for="({ title, path }, index) in breadcrumbList"
              :key="index"
              :to="breadcrumbList.length - 1 !== index && { path }"
          >{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="8">
            <slot></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  data () {
    return {
      breadcrumbList: []
    }
  },
  computed: {
    hideCrumb () {
      return this.$route.matched.some(item => item.meta.hideCrumb)
    }
  },
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler () {
        this.getBreadcrumb()
      }
    }
  },
  methods: {
    /**
     * 获取面包屑
     */
    getBreadcrumb () {
      const { matched } = this.$route
      const breadcrumbList = []
      const titles = []
      const params = this.$route.params
      matched.map(({ path, meta }) => {
        if (meta.crumbs) {
          meta.crumbs.forEach((o) => {
            if (o.path && o.title) {
              breadcrumbList.push({
                path: this.replaceParams(params, o.path),
                title: o.title
              })
              titles.push(o.title)
            }
          })
        }
        if (meta.title && path) {
          breadcrumbList.push({
            path,
            title: meta.title
          })
          titles.push(meta.title)
        }
      })
      this.breadcrumbList = breadcrumbList
      document.title = titles.join('-')
    },
    /**
     * URL参数替换
     * @param params
     * @param url
     */
    replaceParams (params, url) {
      for (const key in params) {
        url = url.replaceAll(`:${key}:`, params[key])
      }
      return url
    }
  }
}
</script>
