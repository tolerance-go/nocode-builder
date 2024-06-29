import { Command } from 'commander';
import Handlebars from 'handlebars';

export abstract class Plugin {
  name: string;

  constructor(name: string) {
    this.name = name;
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
  processTemplateVariables(templateVariables: Record<string, any>): void {
    // 插件可以处理模板变量
  }
}
