import { minimatch } from 'minimatch';
import { getVersion, executeCommand } from './utils.js';
import { remoteRegistry, namespace, localImagePattern } from '../config.js';

/**
 * 为本地镜像设置别名并推送到远程仓库
 * @param {string} localImageId - 本地镜像 ID
 * @param {string} repositoryName - 仓库名称
 * @param {string} version - 镜像版本号
 * @returns {Promise<void>}
 */
const tagAndPushImage = async (localImageId, repositoryName, version) => {
  const vpcRegistryPath = `${remoteRegistry}/${namespace}/${repositoryName}`;
  await executeCommand('docker', [
    'tag',
    localImageId,
    `${vpcRegistryPath}:${version}`,
  ]);
  await executeCommand('docker', ['push', `${vpcRegistryPath}:${version}`]);
};

/**
 * 获取本地所有 Docker 镜像
 * @returns {Promise<string[]>}
 */
const getLocalImages = async () => {
  const output = await executeCommand(
    'docker',
    ['images', '--format', '{{.Repository}}:{{.Tag}}'],
    'pipe',
  );
  return output.split('\n').filter(Boolean);
};

try {
  const version = await getVersion();
  const localImages = await getLocalImages();
  const matchedImages = localImages.filter((image) => {
    const [name, tag] = image.split(':');
    return minimatch(name, localImagePattern) && tag === version;
  });

  console.log('匹配的本地镜像:', matchedImages);

  if (matchedImages.length === 0) {
    console.log(
      `没有匹配的本地镜像: ${localImagePattern} 和版本号: ${version}`,
    );
    process.exit(1);
  }

  for (const localImageId of matchedImages) {
    const [name] = localImageId.split(':');
    await tagAndPushImage(localImageId, name, version);
    console.log(
      `镜像 ${localImageId} 成功推送到 ${remoteRegistry}/${namespace}/${name}:${version}`,
    );
  }
} catch (error) {
  console.error('操作失败:', error);
}
