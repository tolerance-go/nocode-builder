import { Command } from 'commander';
import Handlebars from 'handlebars';

export abstract class Plugin {
  name: string;
  autoLoad: boolean;

  constructor(name: string, autoLoad: boolean = false) {
    this.name = name;
    this.autoLoad = autoLoad;
  }

  // 定义插件需要实现的方法
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerHelpers(handlebars: typeof Handlebars): void {
    // 插件可以注册 Handlebars Helper
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOptions(program: Command): void {
    // 插件可以扩展命令行选项
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async processTemplateVariables(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    templateVariables: Record<string, any>,
  ): Promise<void> {
    // 插件可以处理模板变量
  }

  // 新增一个方法来处理命令行选项
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async processCommandLineOptions(options: Record<string, any>): Promise<void> {
    // 插件可以处理命令行传递的选项
  }
}
