export class Plugin {
  constructor(name) {
    this.name = name;
  }

  // 定义插件需要实现的方法
  registerHelpers(handlebars) {
    // 插件可以注册 Handlebars Helper
  }

  registerOptions(program) {
    // 插件可以扩展命令行选项
  }

  processTemplateVariables(templateVariables) {
    // 插件可以处理模板变量
  }
}
