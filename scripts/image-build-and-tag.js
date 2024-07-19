import { spawn } from 'child_process';
import { getVersion } from './utils.js';

// 执行命令行命令并实时打印输出
const executeCommand = async (command, args) => {
  console.log(`执行命令: ${command} ${args.join(' ')}`);
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`命令失败，退出码: ${code}`));
      } else {
        resolve();
      }
    });
  });
};

// 主函数
const main = async () => {
  try {
    // 获取版本号
    const version = await getVersion();
    console.log(`当前版本号: ${version}`);

    // 构建镜像
    await executeCommand('docker-compose', ['build']);
    console.log('镜像构建成功');

    // 定义镜像列表
    const images = [
      'nocode-builder-admin',
      'nocode-builder-server',
      'nocode-builder-postgres',
    ];

    // 为每个镜像添加版本号标签
    for (const image of images) {
      const tagCommand = `docker tag ${image}:latest ${image}:${version}`;
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
};

// 执行主函数
main();
