import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';

// 导入插件基础类和示例插件
import { ExamplePlugin } from './plugins/ExamplePlugin';

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
  )
  .option('--plugins <plugins...>', '启用的插件列表');

// 内部维护的插件列表
const availablePlugins = {
  examplePlugin: new ExamplePlugin(),
};

// 加载并注册插件
function loadPlugins(pluginNames) {
  const loadedPlugins = [];

  pluginNames.forEach((name) => {
    if (availablePlugins[name]) {
      const plugin = availablePlugins[name];
      plugin.registerHelpers(Handlebars);
      plugin.registerOptions(program);
      loadedPlugins.push(plugin);
    } else {
      console.warn(`插件 ${name} 不存在`);
    }
  });

  return loadedPlugins;
}

// 解析命令行参数
program.parse(process.argv);

const options = program.opts();
const templateVariables = {};

if (options.vars) {
  options.vars.forEach((varStr) => {
    const [key, value] = varStr.split('=');
    templateVariables[key] = value;
  });
}

// 加载插件
const plugins = options.plugins ? loadPlugins(options.plugins) : [];

// 调用插件处理模板变量的方法
plugins.forEach((plugin) => plugin.processTemplateVariables(templateVariables));

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
