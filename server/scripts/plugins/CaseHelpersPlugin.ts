import Handlebars from 'handlebars';
import { Plugin } from './Plugin';

// Helper 函数
const toCamelCase = (str: string) => {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toLowerCase());
};

const toPascalCase = (str: string) => {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toUpperCase());
};

const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
};

const toSnakeCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/-/g, '_')
    .toLowerCase();
};

export class CaseHelpersPlugin extends Plugin {
  constructor() {
    super('caseHelpersPlugin', true);
  }

  registerHelpers(handlebars: typeof Handlebars): void {
    // 注册 Handlebars 自定义 Helper
    handlebars.registerHelper('camelCase', toCamelCase);
    handlebars.registerHelper('pascalCase', toPascalCase);
    handlebars.registerHelper('kebabCase', toKebabCase);
    handlebars.registerHelper('snakeCase', toSnakeCase);
  }
}
