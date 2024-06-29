import { Plugin } from './Plugin';
import { Command } from 'commander';
import Handlebars from 'handlebars';
import { getDMMF } from '@prisma/sdk';
import type { DMMF } from '@prisma/generator-helper';
import * as fs from 'fs-extra';
import * as path from 'path';

export class PrismaDtoPlugin extends Plugin {
  dmmf: DMMF.Document;

  constructor() {
    super('prismaDtoPlugin');
  }

  async readPrismaConfig(filePath: string): Promise<DMMF.Document> {
    try {
      const schemaPath = path.resolve(filePath);
      const schemaData = await fs.readFile(schemaPath, 'utf-8');
      const dmmf = await getDMMF({ datamodel: schemaData });
      return dmmf;
    } catch (error) {
      console.error('Error reading Prisma config:', error);
      throw error;
    }
  }

  registerHelpers(handlebars: typeof Handlebars): void {
    handlebars.registerHelper('dtoFields', (modelName: string) => {
      const dmmf: DMMF.Document = this.dmmf;
      const model = dmmf.datamodel.models.find(
        (model) => model.name === modelName,
      );
      if (!model) {
        throw new Error(`Model ${modelName} not found in Prisma schema`);
      }

      return new handlebars.SafeString(
        model.fields
          .map((field) => {
            // 如果字段类型是模型中的另一个对象，则跳过该字段
            const isExternalObject = dmmf.datamodel.models.some(
              (model) => model.name === field.type,
            );
            if (isExternalObject) {
              return '';
            }

            const decorators = [];

            if (field.isRequired && !field.isId) {
              const apiPropertyOptions = [];
              if (field.documentation) {
                apiPropertyOptions.push(`description: '${field.documentation}'`);
              }
              decorators.push(
                `@ApiProperty({ ${apiPropertyOptions.join(', ')} })`,
              );
            } else {
              const apiPropertyOptions = ['required: false', 'nullable: true'];
              if (field.documentation) {
                apiPropertyOptions.push(`description: '${field.documentation}'`);
              }
              decorators.push(
                `@ApiProperty({ ${apiPropertyOptions.join(', ')} })`,
              );
              decorators.push(`@IsOptional()`);
            }

            switch (field.type) {
              case 'String':
                decorators.push(`@IsString()`);
                break;
              case 'Int':
                decorators.push(`@IsInt()`);
                break;
              case 'DateTime':
                decorators.push(`@IsDateString()`);
                break;
              // Add more cases for other types as needed
              default:
                break;
            }

            const tsType = this.mapType(field.type);

            return `${decorators.join('\n')}\n${field.name}${field.isRequired ? '' : '?'}: ${tsType};`;
          })
          .filter(Boolean) // 过滤掉空字符串
          .join('\n\n'),
      );
    });
  }

  mapType(prismaType: string): string {
    const typeMap: Record<string, string> = {
      String: 'string',
      Int: 'number',
      DateTime: 'string', // 将 DateTime 映射为 string
      Boolean: 'boolean',
      Float: 'number',
      // Add more type mappings as needed
    };

    // 如果类型未在映射表中定义，则返回 'any'
    return typeMap[prismaType] || 'any';
  }

  registerOptions(program: Command): void {
    program.option('--prisma-schema <path>', 'Path to Prisma schema file');
  }

  // 实现处理命令行选项的方法
  async processCommandLineOptions(options: Record<string, any>) {
    if (options.prismaSchema) {
      this.dmmf = await this.readPrismaConfig(options.prismaSchema);
    }
  }
}
