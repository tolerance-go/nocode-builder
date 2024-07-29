import * as fs from 'fs';
import * as path from 'path';

const srcDir = path.resolve('src');
const targetDir = path.resolve('../admin/src/_gen');

// 递归读取目录中的所有文件
function readDirRecursive(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(readDirRecursive(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

// 复制文件并修改文件名
function copyAndRenameFile(src: string, dest: string): void {
  const data = fs.readFileSync(src, 'utf-8');
  fs.writeFileSync(dest, data, 'utf-8');
}

// 主函数
function main() {
  const files = readDirRecursive(srcDir);
  files.forEach((file) => {
    if (file.endsWith('.client-sync.ts')) {
      const relativePath = path.relative(srcDir, file);
      const destRelativePath = relativePath.replace('.client-sync.ts', '.ts');
      const destPath = path.join(targetDir, destRelativePath);
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      copyAndRenameFile(file, destPath);
      console.log(`Processed file: ${file} -> ${destPath}`);
    }
  });
}

main();
