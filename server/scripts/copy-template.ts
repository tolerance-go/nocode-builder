import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';

// 导入插件基础类和示例插件
import { ExamplePlugin } from './plugins/ExamplePlugin';
import { PrismaDtoPlugin } from './plugins/PrismaDtoPlugin';
import { Plugin } from './plugins/Plugin';

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

// 初始化插件实例
const examplePlugin = new ExamplePlugin();
const prismaDtoPlugin = new PrismaDtoPlugin();

// 内部维护的插件列表，使用插件实例的 name 作为键
const availablePlugins: Record<string, Plugin> = {
  [examplePlugin.name]: examplePlugin,
  [prismaDtoPlugin.name]: prismaDtoPlugin,
};

// 加载并注册插件
function loadPlugins(pluginNames: string[]): Plugin[] {
  const loadedPlugins: Plugin[] = [];

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

// 读取配置文件中的插件列表
async function readConfigFile(configPath: string): Promise<string[]> {
  try {
    const config = await fs.readJson(configPath);
    return config.plugins || [];
  } catch (error) {
    console.error('读取配置文件时发生错误:', error);
    return [];
  }
}

// 主函数
(async () => {
  // 读取配置文件中的插件列表
  const configPath = path.resolve('copy-template.json');
  const pluginNames = await readConfigFile(configPath);

  // 加载插件
  const plugins = loadPlugins(pluginNames);

  // 解析命令行参数
  program.parse(process.argv);

  const options = program.opts();
  const templateVariables: Record<string, any> = {};

  if (options.vars) {
    options.vars.forEach((varStr: string) => {
      const [key, value] = varStr.split('=');
      templateVariables[key] = value;
    });
  }

  // 调用插件异步处理命令行选项的方法
  async function processPluginsOptions() {
    for (const plugin of plugins) {
      await plugin.processCommandLineOptions(options);
    }
  }

  // 调用插件处理模板变量的方法
  async function processPluginsTemplateVariables() {
    for (const plugin of plugins) {
      await plugin.processTemplateVariables(templateVariables);
    }
  }

  // 递归复制并处理模板文件和文件夹
  async function copyAndProcessTemplate(
    srcDir: string,
    destDir: string,
    templateVariables: Record<string, any>,
  ) {
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

  // 执行插件处理选项和模板变量，并复制处理模板
  try {
    await processPluginsOptions();
    await processPluginsTemplateVariables();
    await copyAndProcessTemplate(options.src, renderedDest, templateVariables);
    console.log('模板处理和复制完成');
  } catch (err) {
    console.error('发生错误:', err);
  }
})();
