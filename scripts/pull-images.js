import {
  executeCommand,
  extractImages,
  getVersion,
  readComposeFile,
} from './utils.js';

// 拉取镜像
const pullImages = async (images) => {
  for (const image of images) {
    await executeCommand('docker', ['pull', image]);
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
  await pullImages(images);

  console.log('所有镜像拉取完毕');
} catch (error) {
  console.error('运行出错:', error);
  process.exit(1);
}
