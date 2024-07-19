import { minimatch } from 'minimatch';
import { executeCommand, getVersion } from './utils.js';
import { remoteRegistry, namespace, localImagePattern } from './config.js';

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
