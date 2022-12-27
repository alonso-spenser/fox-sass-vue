<template>
  <div>
    <template v-if="sectionData.imagePercentage === 12 && sectionData.dataset.imageList.data.length > 0">
      <template v-for="(o, salt) in  sectionData.dataset.imageList.data ">
        <div :key="`salt-${salt}`" :class="`${o.marginTop ? ' design-margin-top': ''}${o.marginBottom ? ' design-margin-bottom': ''} ${ sectionData.sectionSalt } ${ sectionData.sectionSalt }-${ sectionData.articleId }-${ salt }`">
          <div :class="`container${sectionData.wideScreen ? '-fluid no-gutters' : ''}`">
            <div :class="`embed-responsive embed-responsive-${sectionData.imageScale} ${o.paddingTop ? ' design-padding-top': ''}${o.paddingBottom ? ' design-padding-bottom': ''}`">
              <img class="embed-responsive-item lazy" :src="o.url" :alt="o.alt" v-if="o.url">
              <div :class="`${ sectionData.sectionSalt }-content ${ o.contentPosition }`">
                <div class="container">
                  <div :class="`${ sectionData.sectionSalt }-area`">
                    <h3 class="text-headline" v-if="o.heading">{{ o.heading }}</h3>
                    <h5 class="text-subheading" v-if="o.subheading">{{ o.subheading }}</h5>
                    <ul :class="`text-list ${o.contentAlign === 'text-left' ? o.symbol : ''} ${o.contentAlign}`" v-if="o.contentList.length > 0">
                      <template v-for="(val, salt) in o.contentList">
                        <li :key="`c-${salt}`" v-if="utility.isNotEmpty(val)">
                          {{ val }}
                        </li>
                      </template>
                    </ul>
<!--                    <p class="text-description" v-if="o.description">{{ o.description }}</p>-->
                    <p class="text-button d-md-block d-none" v-if=" o.buttonStyle !== 'invisible' && o.buttonLabel">
                      <button :class="`btn ${ o.buttonStyle }`" v-if="!o.buttonLink && o.buttonStyle !== 'invisible' && o.buttonLabel">
                        {{ o.buttonLabel }}
                      </button>
                      <a :href="o.buttonLink" :class="`btn ${ o.buttonStyle }`" v-if="o.buttonLink && o.buttonStyle !== 'invisible' && o.buttonLabel">
                        {{ o.buttonLabel }}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-if="sectionData.imagePercentage < 12 && sectionData.dataset.imageList.data.length > 0">
      <template v-for="(o, salt) in  sectionData.dataset.imageList.data ">
        <div :key="`salt-${salt}`" :class="`${o.marginTop ? ' design-margin-top': ''}${o.marginBottom ? ' design-margin-bottom': ''} ${ sectionData.sectionSalt } ${ sectionData.sectionSalt }-${ sectionData.articleId }-${ salt }`">
          <div :class="`container${sectionData.wideScreen ? '-fluid no-gutters' : ''}`">
            <div :class="`row no-gutters ${ sectionData.sectionSalt }-row ${o.paddingTop ? ' design-padding-top': ''}${o.paddingBottom ? ' design-padding-bottom': ''}`">
              <div :class="`col-md-${ sectionData.imagePercentage } ${ sectionData.firstLayout === 'right' ? (salt % 2 === 0 ? 'order-2' : '') : (salt % 2 === 0 ? '' : 'order-2')}`">
                <div :class="`embed-responsive embed-responsive-${sectionData.imageScale}`">
                  <img class="embed-responsive-item lazy" :src="o.url" :alt="o.alt" v-if="o.url">
                </div>
              </div>
              <div :class="`col-md-${ 12 - sectionData.imagePercentage } ${ sectionData.sectionSalt }-area`">
                <div :class="`design-padding-all ${ o.textAlign }`">
                  <h3 class="text-heading" v-if="o.heading">{{ o.heading }}</h3>
                  <h5 class="text-subheading" v-if="o.subheading">{{ o.subheading }}</h5>
                  <ul :class="`text-list ${o.contentAlign === 'text-left' ? o.symbol : ''} ${o.contentAlign}`" v-if="o.contentList.length > 0">
                    <template v-for="(val, salt) in o.contentList">
                      <li :key="`c-${salt}`" v-if="utility.isNotEmpty(val)">
                        {{ val }}
                      </li>
                    </template>
                  </ul>
<!--                  <p class="text-description" v-if="o.description">{{ o.description }}</p>-->
                  <p class="text-button d-md-block d-none" v-if=" o.buttonStyle !== 'invisible' && o.buttonLabel">
                    <button :class="`btn ${ o.buttonStyle }`" v-if="!o.buttonLink && o.buttonStyle !== 'invisible' && o.buttonLabel">
                      {{ o.buttonLabel }}
                    </button>
                    <a :href="o.buttonLink" :class="`btn ${ o.buttonStyle }`" v-if="o.buttonLink && o.buttonStyle !== 'invisible' && o.buttonLabel">
                      {{ o.buttonLabel }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<style lang='scss' src="./FvyQV3.scss"></style>
<script>
import schemeData from '../js/design'
export default {
  name: 'design-design-preview',
  data () {
    return {
      sectionData: {
        'sectionAlias': '设计详情',
        'imagePercentage': '6',
        'wideScreen': true,
        'sectionSalt': 'FvyQV3',
        'firstLayout': 'left',
        'imageScale': '21by9',
        'dataset': {
          'imageList': {
            'data': [],
            'type': 'normal'
          }
        }
      },
      contentList: []
    }
  },
  props: {
    /**
     * 值
     */
    dataset: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    dataset: {
      handler () {
        this.customStyle()
      },
      immediate: true,
      deep: true
    }
  },
  created () {
    this.initStyle()
  },
  methods: {
    initStyle () {
      let o = document.querySelector('#foStyle')
      if (o === null) {
        o = document.createElement('link')
        o.setAttribute('rel', 'stylesheet')
        o.setAttribute('href', 'https://theme.fomille.site/21/base.css')
        document.querySelector('head').appendChild(o)
      }
    },
    customStyle () {
      let o = document.querySelector('#customStyle')
      let css = []
      if (o === null) {
        o = document.createElement('style')
        o.setAttribute('id', 'customStyle')
        document.querySelector('head').appendChild(o)
      }
      if (this.dataset.dataset === undefined) {
        this.sectionData = JSON.parse(JSON.stringify(schemeData.designSection.default))
        this.sectionData.dataset.imageList.data = []
      } else {
        this.sectionData = JSON.parse(JSON.stringify(this.dataset))
      }
      this.sectionData.dataset.imageList.data.forEach((o, index) => {
        if (this.sectionData.imagePercentage < 12 && this.utility.isNotEmpty(o.maskColor)) {
          css.push(`.${this.sectionData.sectionSalt}-${this.sectionData.articleId}-${index} .${this.sectionData.sectionSalt}-area {background-color: ${o.maskColor};}`)
        }
        if (this.sectionData.imagePercentage === 12 && this.utility.isNotEmpty(o.maskColor)) {
          css.push(`.${this.sectionData.sectionSalt}-${this.sectionData.articleId}-${index} .${this.sectionData.sectionSalt}-content:before {background-color: ${o.maskColor};}`)
        }
        if (this.utility.isNotEmpty(o.textColor)) {
          css.push(`.${this.sectionData.sectionSalt}-${this.sectionData.articleId}-${index} [class*="text-"] {color: ${o.textColor};}`)
        }
        if (this.utility.isNotEmpty(o.backgroundColor) || this.utility.isNotEmpty(o.backgroundImage)) {
          css.push(`.${this.sectionData.sectionSalt}-${this.sectionData.articleId}-${index} .${this.sectionData.sectionSalt}-row{background: ${o.backgroundColor || ''}${this.utility.isNotEmpty(o.backgroundImage) ? ' url("' + o.backgroundImage + '")' : ''} ${o.backgroundRepeat || ''};${this.utility.isNotEmpty(o.backgroundSize) ? ' background-size:' + o.backgroundSize : ''}}`)
        }
        if (this.utility.isNotEmpty(o.description)) {
          o.contentList = o.description.split('\n')
        } else {
          o.contentList = []
        }
      })
      o.innerHTML = css.join('')
    }
  }
}
</script>
<style lang="scss">
.design-margin {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.design-margin-top {
  margin-top: 1rem;
}

.design-margin-bottom {
  margin-bottom: 1rem;
}

.design-margin-all {
  margin: 1rem;
}

.design-padding {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.design-padding-top {
  padding-top: 1rem;
}

.design-padding-bottom {
  padding-bottom: 1rem;
}

.design-padding-all {
  padding: 1rem;
}
</style>
