// copy-template.js
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';

// 创建命令行选项
const program = new Command();
program
  .option('--src <src>', '源文件夹路径')
  .option('--dest <dest>', '目标文件夹路径')
  .option('--vars <vars...>', '模板变量，以键值对形式传入，格式为 key=value');

program.parse(process.argv);

const options = program.opts();
const templateVariables = {};

if (options.vars) {
  options.vars.forEach((varStr) => {
    const [key, value] = varStr.split('=');
    templateVariables[key] = value;
  });
}

// 递归复制并处理模板文件和文件夹
async function copyAndProcessTemplate(srcDir, destDir, templateVariables) {
  await fs.ensureDir(destDir);
  const items = await fs.readdir(srcDir);

  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(
      destDir,
      Handlebars.compile(item)(templateVariables),
    );

    const stats = await fs.stat(srcPath);

    if (stats.isDirectory()) {
      await copyAndProcessTemplate(srcPath, destPath, templateVariables);
    } else if (stats.isFile()) {
      let content = await fs.readFile(srcPath, 'utf8');
      content = Handlebars.compile(content)(templateVariables);
      await fs.writeFile(destPath, content, 'utf8');
    }
  }
}

// 确保 src 和 dest 都已指定
if (!options.src || !options.dest) {
  console.error('请指定源文件夹路径和目标文件夹路径');
  process.exit(1);
}

// 渲染目标文件夹路径
const renderedDest = Handlebars.compile(options.dest)(templateVariables);

// 执行复制和处理模板的功能
copyAndProcessTemplate(options.src, renderedDest, templateVariables)
  .then(() => console.log('模板处理和复制完成'))
  .catch((err) => console.error('发生错误:', err));
