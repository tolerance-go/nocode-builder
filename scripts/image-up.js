import { getVersion, executeCommand } from './utils.js';
import { config } from '../config.js';

const {
  docker: { remoteRegistry, namespace },
} = config;
// 获取版本号
const version = await getVersion();

// 设置环境变量并运行 docker-compose up -d
await executeCommand('cross-env', [
  `VERSION=${version}`,
  `REGISTRY=${remoteRegistry}/${namespace}/`,
  'docker-compose',
  '-f',
  'docker-compose.yml',
  '-f',
  'docker-compose.prod.yml',
  'up',
  '-d',
  '--remove-orphans',
]);
