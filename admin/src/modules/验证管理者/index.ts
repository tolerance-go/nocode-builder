import { ModuleBase } from '@/base';
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

export class 验证管理者 extends ModuleBase {
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
