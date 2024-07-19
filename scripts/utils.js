import { readFile } from 'fs/promises';
// 获取 package.json 中的版本号
export const getVersion = async () => {
  const packageJson = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url)),
  );
  return packageJson.version;
};
