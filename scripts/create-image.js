import { exec } from 'child_process';
import util from 'util';
import minimatch from 'minimatch';

const execPromise = util.promisify(exec);

const username = '13956233265';
const remoteRegistry = 'registry.cn-heyuan.aliyuncs.com';

/**
 * 执行命令行命令
 * @param {string} command - 要执行的命令
 * @returns {Promise<string>}
 */
const executeCommand = async (command) => {
  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      console.error(`标准错误输出: ${stderr}`);
    }
    return stdout;
  } catch (error) {
    console.error(`执行命令出错: ${error.message}`);
    throw error;
  }
};

/**
 * 登录到阿里云 Docker Registry
 * @returns {Promise<void>}
 */
const loginToRegistry = async () => {
  const loginCommand = `docker login --username=${username} ${remoteRegistry}`;
  await executeCommand(loginCommand);
};

/**
 * 为本地镜像设置别名并推送到远程仓库
 * @param {string} localImageId - 本地镜像 ID
 * @param {string} repositoryName - 仓库名称
 * @param {string} version - 镜像版本号
 * @returns {Promise<void>}
 */
const tagAndPushImage = async (localImageId, repositoryName, version) => {
  const vpcRegistryPath = `registry-vpc.cn-heyuan.aliyuncs.com/unocode/${repositoryName}`;
  const tagCommand = `docker tag ${localImageId} ${vpcRegistryPath}:${version}`;
  await executeCommand(tagCommand);

  const pushCommand = `docker push ${vpcRegistryPath}:${version}`;
  await executeCommand(pushCommand);
};

/**
 * 获取本地所有 Docker 镜像
 * @returns {Promise<string[]>}
 */
const getLocalImages = async () => {
  const imagesCommand = `docker images --format "{{.Repository}}:{{.Tag}}"`;
  const output = await executeCommand(imagesCommand);
  return output.split('\n').filter(Boolean);
};

/**
 * 主函数
 * @param {string} localImagePattern - 本地镜像 ID 的通配符模式
 * @param {string} version - 要推送的镜像版本号
 */
const main = async (localImagePattern, version) => {
  try {
    await loginToRegistry();
    const localImages = await getLocalImages();
    const matchedImages = localImages.filter((image) => {
      const [name, tag] = image.split(':');
      return minimatch(name, localImagePattern) && tag === version;
    });

    if (matchedImages.length === 0) {
      console.log(
        `没有匹配的本地镜像: ${localImagePattern} 和版本号: ${version}`,
      );
      return;
    }

    for (const localImageId of matchedImages) {
      const [name] = localImageId.split(':');
      await tagAndPushImage(localImageId, name, version);
      console.log(
        `镜像 ${localImageId} 成功推送到 registry-vpc.cn-heyuan.aliyuncs.com/unocode/${name}:${version}`,
      );
    }
  } catch (error) {
    console.error('操作失败:', error);
  }
};

// 从命令行参数中获取版本号
const args = process.argv.slice(2);
const versionIndex = args.indexOf('--version');
if (versionIndex === -1 || versionIndex + 1 >= args.length) {
  console.error('请使用 --version 传递版本号');
  process.exit(1);
}

const version = args[versionIndex + 1];

// 传递本地镜像 ID 的通配符模式
const localImagePattern = 'nocode-builder-*'; // 替换为你的本地镜像 ID 通配符模式

main(localImagePattern, version);
