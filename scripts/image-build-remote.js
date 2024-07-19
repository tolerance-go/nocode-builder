import { spawn } from 'child_process';
import readline from 'readline';
import { minimatch } from 'minimatch';
import { getVersion } from './utils.js';

const username = '13956233265';
const remoteRegistry = 'registry.cn-heyuan.aliyuncs.com';
const namespace = 'unocode';

/**
 * 执行命令行命令并实时打印输出
 * @param {string} command - 要执行的命令
 * @param {string[]} args - 命令参数
 * @returns {Promise<string>}
 */
const executeCommand = async (command, args) => {
  console.log(`执行命令: ${command} ${args.join(' ')}`);
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'pipe' });

    let output = '';
    child.stdout.on('data', (data) => {
      console.log(data.toString());
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      console.error(data.toString());
      output += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`命令失败，退出码: ${code}`));
      } else {
        resolve(output);
      }
    });
  });
};

/**
 * 登录到阿里云 Docker Registry
 * @returns {Promise<void>}
 */
const loginToRegistry = async () => {
  const password = await promptPassword('请输入 Docker 密码: ');
  const loginCommand = [
    'login',
    `--username=${username}`,
    '--password-stdin',
    remoteRegistry,
  ];
  const child = spawn('docker', loginCommand, { stdio: 'pipe' });

  return new Promise((resolve, reject) => {
    child.stdin.write(password + '\n');
    child.stdin.end();

    child.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    child.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`命令失败，退出码: ${code}`));
      } else {
        resolve();
      }
    });
  });
};

/**
 * 提示用户输入密码
 * @param {string} query - 提示信息
 * @returns {Promise<string>}
 */
const promptPassword = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  return new Promise((resolve) => {
    rl.question(query, (password) => {
      rl.close();
      resolve(password);
    });
  });
};

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
  const output = await executeCommand('docker', [
    'images',
    '--format',
    '{{.Repository}}:{{.Tag}}',
  ]);
  return output.split('\n').filter(Boolean);
};

// 传递本地镜像 ID 的通配符模式
const localImagePattern = 'nocode-builder-*'; // 替换为你的本地镜像 ID 通配符模式

try {
  const version = await getVersion();
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
      `镜像 ${localImageId} 成功推送到 ${remoteRegistry}/${namespace}/${name}:${version}`,
    );
  }
} catch (error) {
  console.error('操作失败:', error);
}
