import { readFile } from 'fs/promises';
import { execa } from 'execa';

// 获取 package.json 中的版本号
export const getVersion = async () => {
  const packageJson = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url)),
  );
  return packageJson.version;
};

// 执行命令行命令并实时打印输出
export const executeCommand = async (command, args) => {
  console.log(`执行命令: ${command} ${args.join(' ')}`);
  try {
    const { stdout } = await execa(command, args, { stdio: 'inherit' });
    console.log(stdout);
  } catch (error) {
    console.error(`命令执行失败: ${error.message}`);
    process.exit(1);
  }
};
