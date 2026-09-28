# Mall

86 Planet mall

## 本地 OSS 配置

OSS 密钥只在 Node 构建进程中读取，不使用 `VUE_APP_*` 变量，避免进入前端代码。

1. 将根目录 `oss.example.json` 复制为 `oss.local.json`。
2. 在对应环境下填写 `accessKeyId`、`accessKeySecret`。
3. 使用原有命令，如 `npm run build:fox` 或 `npm run build:fomille`。构建根据 `VUE_APP_SUPER` 读取对应配置。

`oss.local.json` 已被 Git 忽略，不要提交。CI 构建也需先在项目根目录生成此文件。
已配置的本地文件可在机器之间单独安全传递。文件缺失或当前环境密钥为空时，需要 OSS 上传的构建会给出配置提示。

开发启动不需要 OSS 密钥。生产构建仍按原来的逻辑自动上传 OSS（fox、junen、fomille）；huazhe、seacat 的上传行为保持不变。
区域、Bucket 等非密钥配置继续放在对应 `.env.*` 文件。

验证本地配置读取：`node --test tests/oss-config.test.cjs`（使用测试数据，不上传文件）。
