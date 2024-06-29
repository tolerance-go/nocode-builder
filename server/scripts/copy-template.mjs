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
  .option(
    '--vars <vars...>',
    '模板变量，以键值对形式传入，格式为 key=value，其中 value 可以是中划线、小驼峰、大驼峰或下划线格式。' +
      '可使用的命名转换 Helper 包括: ' +
      '{{camelCase key}} (小驼峰), {{pascalCase key}} (大驼峰), {{kebabCase key}} (中划线), {{snakeCase key}} (下划线)',
  );

program.parse(process.argv);

const options = program.opts();
const templateVariables = {};

if (options.vars) {
  options.vars.forEach((varStr) => {
    const [key, value] = varStr.split('=');
    templateVariables[key] = value;
  });
}

// Helper 函数
const toCamelCase = (str) => {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toLowerCase());
};

const toPascalCase = (str) => {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toUpperCase());
};

const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
};

const toSnakeCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/-/g, '_')
    .toLowerCase();
};

// 注册 Handlebars 自定义 Helper
Handlebars.registerHelper('camelCase', toCamelCase);
Handlebars.registerHelper('pascalCase', toPascalCase);
Handlebars.registerHelper('kebabCase', toKebabCase);
Handlebars.registerHelper('snakeCase', toSnakeCase);

// 递归复制并处理模板文件和文件夹
async function copyAndProcessTemplate(srcDir, destDir, templateVariables) {
  await fs.ensureDir(destDir);
  const items = await fs.readdir(srcDir);

  for (const item of items) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(
      destDir,
      Handlebars.compile(item.replace(/\.(hbs|handlebars)$/, ''))(
        templateVariables,
      ),
    );

    const stats = await fs.stat(srcPath);

    if (stats.isDirectory()) {
      await copyAndProcessTemplate(srcPath, destPath, templateVariables);
    } else if (stats.isFile()) {
      let content = await fs.readFile(srcPath, 'utf8');

      // 只对 .hbs 或 .handlebars 文件进行模板处理
      if (item.endsWith('.hbs') || item.endsWith('.handlebars')) {
        content = Handlebars.compile(content)(templateVariables);
        await fs.writeFile(destPath, content, 'utf8');
      } else {
        await fs.copyFile(srcPath, destPath); // 直接复制非模板文件
      }
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
