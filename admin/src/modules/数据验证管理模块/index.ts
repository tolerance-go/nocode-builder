import { EngineBase, ModuleBase } from '@/base';
// 定义PostgreSQL非法字符
const illegalPostgresqlChars = [
  '\x00',
  '\x1A',
  '\x1B',
  '\x1C',
  '\x1D',
  '\x1E',
  '\x1F',
  "'",
  '"',
  '\\',
  '/',
  '<',
  '>',
  '|',
  '?',
  '*',
  ':',
];

export class 数据验证管理模块 extends ModuleBase {
  private static instance: 数据验证管理模块;

  public static getInstance(engine: EngineBase): 数据验证管理模块 {
    if (!数据验证管理模块.instance) {
      数据验证管理模块.instance = new 数据验证管理模块(engine);
    }

    return 数据验证管理模块.instance;
  }

  项目树节点标题是否有效(input: string): string | null {
    if (!input.trim()) {
      return '必须提供项目或者项目组名';
    }
    if (input.startsWith(' ') || input.endsWith(' ')) {
      return `名称 **${input}** 作为项目或者项目组名无效。请选择其他名称。`;
    }
    for (const char of illegalPostgresqlChars) {
      if (input.includes(char)) {
        return `名称 **${input}** 作为项目或者项目组名无效。请选择其他名称。`;
      }
    }
    return null;
  }
}
