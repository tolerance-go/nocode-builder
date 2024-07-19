import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { resolve } from 'path';
import { getVersion, executeCommand } from './utils.js';
import { minimatch } from 'minimatch';

const remoteRegistry = 'registry.cn-heyuan.aliyuncs.com';
const namespace = 'unocode';
const localImagePattern = 'nocode-builder-*'; // 替换为你的本地镜像 ID 通配符模式

// 读取并解析 docker-compose.yml 文件
const readComposeFile = async () => {
  const filePath = resolve('docker-compose.yml');
  const fileContent = await readFile(filePath, 'utf8');
  return load(fileContent);
};

// 从 docker-compose 配置中提取镜像信息
const extractImages = (composeConfig, version) => {
  const services = composeConfig.services;
  const images = [];

  for (const serviceName in services) {
    const service = services[serviceName];
    if (service.image) {
      const image = service.image.replace('${APP_TAG}', version);
      images.push(image);
    }
  }

  return images;
};

// 拉取镜像
const pullImages = async (images) => {
  for (const image of images) {
    const imageName = `${remoteRegistry}/${namespace}/${image}`;

    await executeCommand('docker', ['pull', imageName]);
  }
};

try {
  // 获取版本号
  const version = await getVersion(); // 这里你可以替换为动态获取版本号的逻辑

  // 读取并解析 docker-compose 文件
  const composeConfig = await readComposeFile();

  // 提取镜像信息
  const images = extractImages(composeConfig, version);

  // 拉取镜像
  await pullImages(
    images.filter((image) => minimatch(image, localImagePattern)),
  );

  console.log('所有镜像拉取完毕');
} catch (error) {
  console.error('运行出错:', error);
  process.exit(1);
}
