const fs = require('fs')
const path = require('path')

module.exports = function loadOssCredentials (profile, filename = path.resolve(__dirname, '../oss.local.json')) {
  if (!fs.existsSync(filename)) {
    throw new Error('Missing oss.local.json. Copy oss.example.json and configure your OSS credentials.')
  }
  let settings
  try {
    settings = JSON.parse(fs.readFileSync(filename, 'utf8'))
  } catch (error) {
    throw new Error('Invalid oss.local.json. Check that it contains valid JSON.')
  }
  const credentials = settings && settings[profile]
  if (!credentials || ['accessKeyId', 'accessKeySecret'].some(key => (
    typeof credentials[key] !== 'string' || !credentials[key].trim() ||
    credentials[key] === 'REDACTED_CONFIGURE_LOCALLY'
  ))) {
    throw new Error(`Configure accessKeyId and accessKeySecret for "${profile}" in oss.local.json.`)
  }
  return {
    accessKeyId: credentials.accessKeyId.trim(),
    accessKeySecret: credentials.accessKeySecret.trim()
  }
}
