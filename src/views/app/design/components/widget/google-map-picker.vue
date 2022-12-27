<template>
  <div>
    <h6>
      <a target="_blank" class="float-right text-warning el-icon-location-outline" href="https://www.google.com/maps">
        {{ $t('collectionPicker.edit') }}
      </a>
      Google Map
    </h6>
    <el-input
      size="small"
      v-model="mapURL"
      type="textarea"
      :rows="6"
      :placeholder="$t('mapPicker.placeholder')"
    ></el-input>
  </div>
</template>

<script>
import extend from '@/plugins/page/base'

export default {
  name: 'google-map-picker',
  extends: extend,
  data () {
    return {
      visible: false,
      menuVisible: true,
      dataset: [],
      mapURL: ''
    }
  },
  computed: {
    language: function () {
      return this.utility.getLanguage()
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  watch: {
    mapURL (val) {
      this.valueChange()
    },
    value () {
      this.mapURL = this.value
    }
  },
  created () {
    this.mapURL = this.value
  },
  methods: {
    /**
     * 值改变
     */
    valueChange () {
      if (this.mapURL.indexOf('iframe') > -1) {
        this.mapURL = this.utility.getHtmlAttribute(this.mapURL, 'src')
      } else if (this.mapURL.indexOf('www.google.com/maps') === -1) {
        this.mapURL = ''
      }
      this.$emit('input', this.mapURL)
    }
  }
}
</script>
