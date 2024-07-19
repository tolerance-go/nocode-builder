import { getVersion, executeCommand } from './utils.js';
const remoteRegistry = 'registry.cn-heyuan.aliyuncs.com';
const namespace = 'unocode';

// 获取版本号
const version = await getVersion();

// 设置环境变量并运行 docker-compose up -d
executeCommand('cross-env', [
  `APP_TAG=${version}`,
  `REGISTRY_PATH=${remoteRegistry}/${namespace}`,
  'docker-compose',
  'up',
  '-d',
]);
