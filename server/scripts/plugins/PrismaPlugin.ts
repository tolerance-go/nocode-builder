import { Plugin } from './Plugin';
import { Command } from 'commander';
import Handlebars from 'handlebars';
import { getDMMF } from '@prisma/sdk';
import type { DMMF } from '@prisma/generator-helper';
import * as fs from 'fs-extra';
import * as path from 'path';

export class PrismaPlugin extends Plugin {
  dmmf: DMMF.Document;

  constructor() {
    super('prismaPlugin');
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
            const apiPropertyOptions = [];

            if (field.documentation) {
              apiPropertyOptions.push(`description: '${field.documentation}'`);
            }

            if (field.isRequired) {
              apiPropertyOptions.push(`required: true`);
            } else {
              apiPropertyOptions.push(`required: false, nullable: true`);
            }

            decorators.unshift(
              `@ApiProperty({ ${apiPropertyOptions.join(', ')} })`,
            );

            if (!field.isRequired) {
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

    handlebars.registerHelper('createDtoFields', (modelName: string) => {
      const dmmf: DMMF.Document = this.dmmf;
      const model = dmmf.datamodel.models.find(
        (model) => model.name === modelName,
      );
      if (!model) {
        throw new Error(`Model ${modelName} not found in Prisma schema`);
      }

      // const userTypeFiled = this.getUserTypeField(model);

      return new handlebars.SafeString(
        model.fields

          .map((field) => {
            // 过滤掉 id 字段
            if (field.isId) {
              return '';
            }

            // if (
            //   userTypeFiled &&
            //   this.isInUserRelationFrom(field, userTypeFiled)
            // ) {
            //   return '';
            // }

            if (this.isExternalObject(field.type)) return '';

            // 过滤掉 User 类型的外部对象字段
            if (field.type === 'User') {
              return '';
            }

            const decorators = [];
            const apiPropertyOptions = [];

            if (field.documentation) {
              apiPropertyOptions.push(`description: '${field.documentation}'`);
            }

            if (field.default || field.isUpdatedAt) {
              apiPropertyOptions.push(`required: false, nullable: true`);
              decorators.push(`@IsOptional()`);
            } else if (field.isRequired) {
              apiPropertyOptions.push(`required: true`);
            } else {
              apiPropertyOptions.push(`required: false, nullable: true`);
              decorators.push(`@IsOptional()`);
            }

            decorators.unshift(
              `@ApiProperty({ ${apiPropertyOptions.join(', ')} })`,
            );

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

            // if (this.isExternalObject(field.type)) {
            //   tsType = field.isList ? 'number[]' : 'number';
            //   return `${this.createApiPropertyDecorator(['required: false'])}\n${field.name}Connect?: ${tsType};`;
            // }

            return `${decorators.join('\n')}\n${field.name}${field.default || field.isUpdatedAt || !field.isRequired ? '?' : ''}: ${tsType};`;
          })
          .filter(Boolean) // 过滤掉空字符串
          .join('\n\n'),
      );
    });

    handlebars.registerHelper('dtoFile', (modelName: string) => {
      const dmmf: DMMF.Document = this.dmmf;
      const model = dmmf.datamodel.models.find(
        (model) => model.name === modelName,
      );
      if (!model) {
        throw new Error(`Model ${modelName} not found in Prisma schema`);
      }

      const dtoFields = handlebars.helpers.dtoFields(modelName).toString();

      // 动态生成依赖项
      const dependencies = new Set<string>();
      if (dtoFields.includes('@ApiProperty')) {
        dependencies.add("import { ApiProperty } from '@nestjs/swagger';");
      }
      if (dtoFields.includes('@IsDateString')) {
        dependencies.add('IsDateString');
      }
      if (dtoFields.includes('@IsInt')) {
        dependencies.add('IsInt');
      }
      if (dtoFields.includes('@IsOptional')) {
        dependencies.add('IsOptional');
      }
      if (dtoFields.includes('@IsString')) {
        dependencies.add('IsString');
      }

      const classValidatorImports =
        dependencies.size > 1
          ? `import { ${Array.from(dependencies).slice(1).join(', ')} } from 'class-validator';`
          : '';

      return new handlebars.SafeString(
        `import { ApiProperty } from '@nestjs/swagger';
  ${classValidatorImports}
  
  export class ${handlebars.helpers.pascalCase(modelName)}Dto {
    ${dtoFields}
  }`,
      );
    });

    handlebars.registerHelper('createDtoFile', (modelName: string) => {
      const dmmf: DMMF.Document = this.dmmf;
      const model = dmmf.datamodel.models.find(
        (model) => model.name === modelName,
      );
      if (!model) {
        throw new Error(`Model ${modelName} not found in Prisma schema`);
      }

      const createDtoFields = handlebars.helpers
        .createDtoFields(modelName)
        .toString();

      // 动态生成依赖项
      const dependencies = new Set<string>();
      if (createDtoFields.includes('@ApiProperty')) {
        dependencies.add("import { ApiProperty } from '@nestjs/swagger';");
      }
      if (createDtoFields.includes('@IsDateString')) {
        dependencies.add('IsDateString');
      }
      if (createDtoFields.includes('@IsInt')) {
        dependencies.add('IsInt');
      }
      if (createDtoFields.includes('@IsOptional')) {
        dependencies.add('IsOptional');
      }
      if (createDtoFields.includes('@IsString')) {
        dependencies.add('IsString');
      }

      const classValidatorImports =
        dependencies.size > 1
          ? `import { ${Array.from(dependencies).slice(1).join(', ')} } from 'class-validator';`
          : '';

      return new handlebars.SafeString(
        `import { ApiProperty } from '@nestjs/swagger';
  ${classValidatorImports}
  
  export class ${handlebars.helpers.pascalCase(modelName)}CreateDto {
    ${createDtoFields}
  }`,
      );
    });

    handlebars.registerHelper('updateDtoFields', (modelName: string) => {
      const dmmf: DMMF.Document = this.dmmf;
      const model = dmmf.datamodel.models.find(
        (model) => model.name === modelName,
      );
      if (!model) {
        throw new Error(`Model ${modelName} not found in Prisma schema`);
      }

      const userTypeFiled = this.getUserTypeField(model);

      return new handlebars.SafeString(
        model.fields
          .map((field) => {
            // 过滤掉 id 字段和外部对象字段
            if (field.isId) {
              return '';
            }

            if (
              userTypeFiled &&
              this.isInUserRelationFrom(field, userTypeFiled)
            ) {
              return '';
            }

            const isExternalObject = dmmf.datamodel.models.some(
              (model) => model.name === field.type,
            );
            if (isExternalObject) {
              return '';
            }

            const decorators = [];
            const apiPropertyOptions = [];

            if (field.documentation) {
              apiPropertyOptions.push(`description: '${field.documentation}'`);
            }

            apiPropertyOptions.push(`required: false, nullable: true`);
            decorators.push(`@IsOptional()`);

            decorators.unshift(
              `@ApiProperty({ ${apiPropertyOptions.join(', ')} })`,
            );

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

            return `${decorators.join('\n')}\n${field.name}?: ${tsType};`;
          })
          .filter(Boolean) // 过滤掉空字符串
          .join('\n\n'),
      );
    });

    handlebars.registerHelper('updateDtoFile', (modelName: string) => {
      const dmmf: DMMF.Document = this.dmmf;
      const model = dmmf.datamodel.models.find(
        (model) => model.name === modelName,
      );
      if (!model) {
        throw new Error(`Model ${modelName} not found in Prisma schema`);
      }

      const updateDtoFields = handlebars.helpers
        .updateDtoFields(modelName)
        .toString();

      // 动态生成依赖项
      const dependencies = new Set<string>();
      if (updateDtoFields.includes('@ApiProperty')) {
        dependencies.add("import { ApiProperty } from '@nestjs/swagger';");
      }
      if (updateDtoFields.includes('@IsDateString')) {
        dependencies.add('IsDateString');
      }
      if (updateDtoFields.includes('@IsInt')) {
        dependencies.add('IsInt');
      }
      if (updateDtoFields.includes('@IsOptional')) {
        dependencies.add('IsOptional');
      }
      if (updateDtoFields.includes('@IsString')) {
        dependencies.add('IsString');
      }

      const classValidatorImports =
        dependencies.size > 1
          ? `import { ${Array.from(dependencies).slice(1).join(', ')} } from 'class-validator';`
          : '';

      return new handlebars.SafeString(
        `import { ApiProperty } from '@nestjs/swagger';
  ${classValidatorImports}
  
  export class ${handlebars.helpers.pascalCase(modelName)}UpdateDto {
    ${updateDtoFields}
  }`,
      );
    });

    handlebars.registerHelper('entityToDtoFields', (modelName: string) => {
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
            if (this.isExternalObject(field.type)) {
              return '';
            }
            const fieldType = this.mapType(field.type);
            const isOptional = !field.isRequired;
            const fieldName = field.name;
            let fieldAssignment = '';

            if (fieldType === 'string' && field.type === 'DateTime') {
              fieldAssignment = `${fieldName}: ${handlebars.helpers.camelCase(modelName)}.${fieldName}.toISOString()`;
            } else {
              fieldAssignment = isOptional
                ? `${fieldName}: ${handlebars.helpers.camelCase(modelName)}.${fieldName} ?? undefined`
                : `${fieldName}: ${handlebars.helpers.camelCase(modelName)}.${fieldName}`;
            }

            return fieldAssignment;
          })
          .filter(Boolean)
          .join(',\n'),
      );
    });
  }

  getUserTypeField(model: DMMF.Model) {
    const userFiled = model.fields.find((item) => item.type === 'User');
    return userFiled;
  }

  isInUserRelationFrom(field: DMMF.Field, userTypeFiled: DMMF.Field) {
    return (
      userTypeFiled && userTypeFiled.relationFromFields?.includes(field.name)
    );
  }

  isExternalObject(fieldType: string): boolean {
    return this.dmmf.datamodel.models.some((model) => model.name === fieldType);
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

  createApiPropertyDecorator(apiPropertyOptions: string[]): string {
    return `@ApiProperty({ ${apiPropertyOptions.join(', ')} })`;
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