import { getVersion, executeCommand } from './utils.js';

// 获取版本号
const version = await getVersion();

// 设置环境变量并运行 docker-compose up -d
executeCommand('cross-env', [
  `APP_TAG=${version}`,
  'docker-compose',
  'up',
  '-d',
]);
