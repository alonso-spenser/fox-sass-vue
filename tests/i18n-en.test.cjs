const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { test } = require('node:test')

const root = path.resolve(__dirname, '../src/plugins/i18n')
const han = /[\u3400-\u9fff]/

function load (file, domain = 'example.test') {
  let source = fs.readFileSync(file, 'utf8')
  source = source.replace(/import (\w+) from '([^']+)'/g, (_, name, relative) => {
    return `const ${name} = ${JSON.stringify(load(path.resolve(path.dirname(file), relative + '.js'), domain))}`
  })
  return vm.runInNewContext(source.replace('export default', 'result ='), {
    process: { env: { VUE_APP_DESIGN_DOMAIN: domain } }
  })
}

function filesIn (directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name)
    return entry.isDirectory() ? filesIn(file) : file.endsWith('.js') ? [file] : []
  })
}

function visit (value, callback, key = '') {
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([name, child]) => visit(child, callback, key ? `${key}.${name}` : name))
  } else callback(value, key)
}

function placeholders (value) {
  return (value.match(/\{[\w]+\}/g) || []).sort()
}

const chineseFiles = [path.join(root, 'zh-CN.js'), ...filesIn(path.join(root, 'zh-CN'))]

test('English covers every Chinese key and preserves types, array shapes and placeholders', () => {
  let strings = 0
  function compare (chinese, english, key) {
    assert.equal(typeof english, typeof chinese, key)
    if (Array.isArray(chinese)) {
      assert.ok(Array.isArray(english), key)
      assert.equal(english.length, chinese.length, key)
    }
    if (chinese && typeof chinese === 'object') {
      for (const name of Object.keys(chinese)) {
        assert.ok(Object.prototype.hasOwnProperty.call(english, name), `${key}.${name}`)
        compare(chinese[name], english[name], `${key}.${name}`)
      }
    } else if (typeof chinese === 'string') {
      strings++
      if (chinese.trim()) assert.ok(english.trim(), key)
      assert.deepEqual(placeholders(english), placeholders(chinese), key)
      if (!han.test(chinese) && /\.(value|field|code|path|url|icon|type)$/.test(key)) {
        assert.equal(english, chinese, `Business identifier changed: ${key}`)
      }
      const links = value => value.match(/(?:href|src)="[^"]*"/g) || []
      assert.deepEqual(links(english), links(chinese), `HTML links changed: ${key}`)
    } else assert.equal(english, chinese, key)
  }
  for (const file of chineseFiles) {
    compare(load(file), load(file.replace('zh-CN', 'en')), path.relative(root, file))
  }
  assert.ok(strings > 4000)
})

test('English contains no untranslated Chinese, including compatibility keys', () => {
  for (const file of [path.join(root, 'en.js'), ...filesIn(path.join(root, 'en'))]) {
    visit(load(file), (value, key) => {
      if (typeof value === 'string') assert.ok(!han.test(value), `${file}: ${key}: ${value}`)
    })
  }
})

test('Domain examples remain dynamic', () => {
  const values = []
  visit(load(path.join(root, 'en/settings.js'), 'custom-domain.test'), value => values.push(value))
  assert.ok(values.includes('For example, www.custom-domain.test'))
})

test('Chinese and English main-site modules are registered separately', () => {
  const source = fs.readFileSync(path.join(root, 'base.js'), 'utf8')
  assert.match(source, /import cnMainSite from '.\/zh-CN\/main\/site'/)
  assert.match(source, /'zh-CN':[\s\S]*main: \{\s*\.\.\.cnMainSite/)
  assert.match(source, /en: \{[\s\S]*main: \{\s*\.\.\.enMainSite/)
})

test('Vue I18n renders translated named and positional placeholders', () => {
  const Vue = require('vue')
  const VueI18n = require('vue-i18n')
  Vue.use(VueI18n)
  const english = load(path.join(root, 'en.js'))
  const i18n = new VueI18n({ locale: 'en', messages: { en: english } })
  assert.equal(i18n.t('base.file.size', { size: 10 }), 'File size must not exceed 10 MB')
  assert.equal(i18n.t('base.select.multiple', [3]), '3 selected')
  assert.equal(i18n.t('base.operate.startUse'), 'Enable')
})


test('Success, failure and first-name prompts match their field semantics', () => {
  const errors = load(path.join(root, 'en/errorCode.js'))
  assert.equal(errors.errorCode.default.failed, 'Operation failed')
  assert.equal(errors.errorCode.default.success, 'Operation succeeded')
  const prompts = []
  visit(load(path.join(root, 'en/passport.js')), (value, key) => {
    if (key.endsWith('firstName.required')) prompts.push(value)
  })
  assert.ok(prompts.length)
  assert.ok(prompts.every(value => value === 'Enter your first name'))
})
