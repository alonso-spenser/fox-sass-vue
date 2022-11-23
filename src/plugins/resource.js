import logoSVG from '../assets/image/logo.svg'

export default {
  logoSVG,
  env: {
    api: {
      development: 'http://127.0.0.1:9721',
      test: 'http://192.168.11.247:8300',
      production: 'https://api.fomille.site'
    },
    upload: {
      development: 'http://127.0.0.1:8300/common/api/oss/upload',
      test: 'http://192.168.11.247:8300/common/api/oss/upload',
      production: 'https://api.fomille.site/common/api/oss/upload'
    },
    excelAddress: {
      development: 'http://127.0.0.1:8300/stat/api/report/submit-report',
      test: 'http://192.168.11.247:8300/stat/api/report/submit-report',
      production: '/api/stat/api/report/submit-report'
    }
  }
}
