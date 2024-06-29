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
            const decorators = [];

            if (field.isRequired && !field.isId) {
              decorators.push(
                `@ApiProperty({ description: '${field.documentation || field.name}', example: 1 })`,
              );
            } else {
              decorators.push(
                `@ApiProperty({ description: '${field.documentation || field.name}', required: false, nullable: true, example: 1 })`,
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

            return `${decorators.join('\n')}\n${field.name}${field.isRequired ? '' : '?'}: ${field.type.toLowerCase()};`;
          })
          .join('\n\n'),
      );
    });
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
