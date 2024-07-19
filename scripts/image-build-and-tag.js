import { getVersion, executeCommand, extractImages } from './utils.js';

try {
  // 获取版本号
  const version = await getVersion();
  console.log(`当前版本号: ${version}`);

  // 构建镜像
  await executeCommand('docker-compose', ['build']);
  console.log('镜像构建成功');

  const images = await extractImages();

  // 定义镜像列表
  const localImages = images.map((image) =>
    image.split(':')[0].split('/').pop(),
  );

  // 为每个镜像添加版本号标签
  for (const image of localImages) {
    await executeCommand('docker', [
      'tag',
      `${image}:latest`,
      `${image}:${version}`,
    ]);
    console.log(`镜像 ${image}:latest 成功打标签为 ${image}:${version}`);
  }
} catch (error) {
  console.error('操作失败:', error);
}
