import { readFile } from 'fs/promises';
import { execa } from 'execa';
import { config } from '../config.js';
import { resolve } from 'path';
import { load } from 'js-yaml';

const {
  docker: { remoteRegistry, namespace },
} = config;

// 获取 package.json 中的版本号
export const getVersion = async () => {
  const packageJson = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url)),
  );
  return packageJson.version;
};

// 执行命令行命令并实时打印输出
export const executeCommand = async (command, args, stdio = 'inherit') => {
  console.log(`执行命令: ${command} ${args.join(' ')}`);
  try {
    const { stdout } = await execa(command, args, { stdio });
    if (stdio === 'pipe') {
      console.log(stdout); // 实时打印输出
      return stdout;
    }
  } catch (error) {
    console.error(`命令执行失败: ${error.message}`);
    process.exit(1);
  }
};

export const readComposeFile = async () => {
  const filePath = resolve('docker-compose.deploy.yml');
  const fileContent = await readFile(filePath, 'utf8');
  return load(fileContent);
};

// 从 docker-compose 配置中提取镜像信息
export const extractImages = (composeConfig, version) => {
  const services = composeConfig.services;
  const images = [];

  for (const serviceName in services) {
    const service = services[serviceName];
    if (service.image) {
      const image = service.image
        .replace('${REGISTRY}', `${remoteRegistry}/${namespace}/`)
        .replace('${VERSION}', version);
      images.push(image);
    }
  }

  return images;
};
