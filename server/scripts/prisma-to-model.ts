import * as fs from 'fs';
import * as path from 'path';
import { getDMMF } from '@prisma/sdk';
import { format, resolveConfig } from 'prettier';

// 定义 Decorator 类
class Decorator {
  name: string;
  params: string[];

  constructor(name: string, params: string[] = []) {
    this.name = name;
    this.params = params;
  }

  print(): string {
    const paramsStr = this.params.length ? `(${this.params.join(', ')})` : '()';
    return `@${this.name}${paramsStr}`;
  }

  clone(): Decorator {
    return new Decorator(this.name, [...this.params]);
  }
}

// 定义 Field 类
class Field {
  name: string;
  type: string | Class | Enum;
  isRequired: boolean;
  isArray: boolean;
  isId: boolean;
  isUpdatedAt: boolean; // 是否为更新时间字段
  hasDefaultValue: boolean; // 是否有默认值
  decorators: Decorator[];

  constructor(
    name: string,
    type: string | Class | Enum,
    isRequired: boolean,
    isArray: boolean,
    isId: boolean,
    isUpdateAt: boolean = false,
    hasDefault: boolean = false,
    decorators: Decorator[] = [],
  ) {
    this.name = name;
    this.type = type;
    this.isRequired = isRequired;
    this.isArray = isArray;
    this.isId = isId;
    this.isUpdatedAt = isUpdateAt;
    this.hasDefaultValue = hasDefault;
    this.decorators = decorators;
  }

  print(): string {
    const type =
      typeof this.type === 'string'
        ? this.type
        : (this.type as Class | Enum).printName;
    const arrayStr = this.isArray ? '[]' : '';
    const decoratorsStr = this.decorators.map((dec) => dec.print()).join(' ');
    const nullableStr = this.isRequired ? '' : '?';
    return `${decoratorsStr} ${this.name}${nullableStr}: ${type}${arrayStr};`;
  }

  clone(): Field {
    return new Field(
      this.name,
      this.type,
      this.isRequired,
      this.isArray,
      this.isId,
      this.isUpdatedAt,
      this.hasDefaultValue,
      this.decorators.map((dec) => dec.clone()),
    );
  }
}

// 定义 Class 类
class Class {
  name: string;
  fields: Field[];
  dependsOnOtherClasses: boolean;
  printConstructorFlag: boolean;

  private _printName: string;

  get printName(): string {
    return this._printName;
  }

  set printName(name: string) {
    this._printName = name;
  }

  constructor(
    name: string,
    fields: Field[],
    printConstructorFlag: boolean = true,
  ) {
    this.name = name;
    this.fields = fields;
    this.dependsOnOtherClasses = false;
    this._printName = name;
    this.printConstructorFlag = printConstructorFlag;
  }

  printConstructor(): string {
    if (!this.printConstructorFlag) return '';

    const paramsStr = this.fields
      .map((field) => {
        return field.name;
      })
      .join(', ');

    const typeAnnotationsStr = this.fields
      .map((field) => {
        const type =
          typeof field.type === 'string'
            ? field.type
            : (field.type as Class | Enum).printName;
        const arrayStr = field.isArray ? '[]' : '';
        const nullableStr = field.isRequired ? '' : '?';
        return `${field.name}${nullableStr}: ${type}${arrayStr}`;
      })
      .join('; ');

    const assignmentsStr = this.fields
      .map((field) => `this.${field.name} = ${field.name};`)
      .join('\n    ');

    return `constructor({ ${paramsStr} }: { ${typeAnnotationsStr} }) {\n    ${assignmentsStr}\n  }`;
  }

  print(): string {
    const fieldsStr = this.fields.map((field) => field.print()).join('\n  ');
    const constructorStr = this.printConstructor();
    return `export class ${this.printName} {\n  ${fieldsStr}\n${constructorStr ? `\n  ${constructorStr}\n` : ''}}`;
  }

  clone(): Class {
    const clonedFields = this.fields.map((field) => field.clone());
    const clonedClass = new Class(
      this.name,
      clonedFields,
      this.printConstructorFlag,
    );
    clonedClass.printName = this.printName;
    clonedClass.dependsOnOtherClasses = this.dependsOnOtherClasses;
    return clonedClass;
  }
}

// 新增 Enum 类
class Enum {
  name: string;
  values: string[];

  private _printName: string;

  get printName(): string {
    return this._printName;
  }

  set printName(name: string) {
    this._printName = name;
  }

  constructor(name: string, values: string[]) {
    this.name = name;
    this.values = values;
    this._printName = name;
  }

  print(): string {
    const valuesStr = this.values
      .map((value) => `${value} = "${value}"`)
      .join(',\n  ');
    return `export enum ${this.printName} {\n  ${valuesStr}\n}`;
  }

  clone(): Enum {
    return new Enum(this.name, [...this.values]);
  }
}

// 修改 Import 类
class Import {
  params: string[];
  from: string;

  constructor(params: string[], from: string) {
    this.params = params;
    this.from = from;
  }

  print(): string {
    return `import { ${this.params.join(', ')} } from '${this.from}';`;
  }
}

// 定义 File 类
class File {
  classes: Class[];
  enums: Enum[];
  imports: Import[];

  constructor(classes: Class[], enums: Enum[] = [], imports: Import[] = []) {
    this.classes = classes;
    this.enums = enums;
    this.imports = imports;
  }

  sortClasses(): void {
    const classMap: { [name: string]: Class } = {};
    this.classes.forEach((cls) => (classMap[cls.name] = cls));

    const sorted: Class[] = [];
    const visited: { [name: string]: boolean } = {};

    const visit = (cls: Class) => {
      if (visited[cls.name]) return;
      visited[cls.name] = true;
      cls.fields.forEach((field) => {
        if (typeof field.type !== 'string' && field.type instanceof Class) {
          visit(field.type as Class);
        }
      });
      sorted.push(cls);
    };

    this.classes.forEach((cls) => visit(cls));
    this.classes = sorted.reverse(); // 逆序排列，使被依赖的类先输出
  }

  print(): string {
    this.sortClasses();

    const importsStr = this.imports.map((imp) => imp.print()).join('\n');
    const enumsStr = this.enums.map((enm) => enm.print()).join('\n\n');
    const classesStr = this.classes.map((cls) => cls.print()).join('\n\n');

    return `${importsStr}\n\n${enumsStr}\n\n${classesStr}`;
  }
}

// 新增 ModelsFile 类，继承自 File 类
class ModelsFile extends File {
  constructor(classes: Class[], enums: Enum[] = []) {
    super(classes, enums);
  }

  print(): string {
    // 设置 class 和 enum 的 printName
    this.classes.forEach((classItem) => {
      classItem.printName = `${classItem.name}Model`;
      classItem.printConstructorFlag = true;
    });
    this.enums.forEach((enumItem) => {
      enumItem.printName = `${enumItem.name}Enum`;
    });

    return super.print();
  }
}

// 新增 DTOFile 类，继承自 File 类
class DTOFile extends File {
  constructor(classes: Class[], enums: Enum[] = []) {
    super(classes, enums);
  }

  print(): string {
    const dtoImports = [
      new Import(['ApiProperty'], '@nestjs/swagger'),
      new Import(
        [
          'IsInt',
          'IsNotEmpty',
          'IsOptional',
          'IsString',
          'IsDateString',
          'IsEnum',
        ],
        'class-validator',
      ),
    ];

    this.classes.forEach((cls) => {
      cls.printName = `${cls.name}Dto`;
      cls.printConstructorFlag = false;
    });

    const classesStr = this.classes.map((cls) => cls.print()).join('\n\n');
    const enumsStr = this.enums.map((enm) => enm.print()).join('\n\n');
    const importsStr = dtoImports.map((imp) => imp.print()).join('\n');

    return `${importsStr}\n\n${enumsStr}\n\n${classesStr}`;
  }
}

// 读取文件内容
const schemaFilePath = path.resolve('./prisma/schema.prisma');
const schemaContent = fs.readFileSync(schemaFilePath, 'utf-8');

// 使用 Prisma SDK 解析 schema
async function parseSchema(
  schema: string,
): Promise<{ modelsFile: ModelsFile; dtoFile: DTOFile }> {
  const dmmf = await getDMMF({ datamodel: schema });

  const typeMapping: { [key: string]: string } = {
    Int: 'number',
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'Date',
  };

  const modelClassMap: { [name: string]: Class } = {};

  const enums: Enum[] = dmmf.datamodel.enums.map((enm) => {
    const values = enm.values.map((val) => val.name);
    return new Enum(enm.name, values);
  });

  const classes: Class[] = dmmf.datamodel.models.map((model) => {
    const fields: Field[] = model.fields.map((field) => {
      const fieldType = typeMapping[field.type] || field.type;
      return new Field(
        field.name,
        fieldType,
        field.isRequired,
        field.isList,
        field.isId,
        field.isUpdatedAt,
        field.hasDefaultValue,
      );
    });
    const classObj = new Class(model.name, fields);
    modelClassMap[model.name] = classObj;
    return classObj;
  });

  classes.forEach((classObj) => {
    classObj.fields.forEach((field) => {
      if (typeof field.type === 'string' && modelClassMap[field.type]) {
        field.type = modelClassMap[field.type];
        classObj.dependsOnOtherClasses = true;
      } else if (
        typeof field.type === 'string' &&
        enums.find((enm) => enm.name === field.type)
      ) {
        field.type = enums.find((enm) => enm.name === field.type)!;
      }
    });
  });

  const modelsFile = new ModelsFile(classes, enums);

  // 深拷贝 classes 以确保不影响 modelsFile
  const dtoClasses = classes.map((cls) => cls.clone());

  // 填充 dtoClassMap
  const dtoClassMap: { [name: string]: Class } = {};
  dtoClasses.forEach((cls) => {
    dtoClassMap[cls.name] = cls;
  });

  // 替换所有字段的类型为 DTO 版本
  dtoClasses.forEach((classObj) => {
    classObj.fields.forEach((field) => {
      if (field.type instanceof Class && dtoClassMap[field.type.name]) {
        field.type = dtoClassMap[field.type.name];
      }
    });
  });

  const dtoFile = new DTOFile(dtoClasses, enums);

  return { modelsFile, dtoFile };
}

// 主函数
async function main() {
  try {
    const { modelsFile, dtoFile } = await parseSchema(schemaContent);

    const prettierConfig = await resolveConfig(path.resolve());
    // 输出 ModelsFile 结果
    const formattedModelsOutput = await format(modelsFile.print(), {
      ...prettierConfig,
      parser: 'typescript',
    });
    const modelsOutputPath = path.resolve('../admin/src/_gen/models.ts');
    fs.writeFileSync(
      modelsOutputPath,
      `/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

${formattedModelsOutput}`,
    );

    // 输出 DTOFile 结果
    const formattedDtoOutput = await format(dtoFile.print(), {
      ...prettierConfig,
      parser: 'typescript',
    });
    const dtoOutputPath = path.resolve('./src/_gen/dto.ts');
    fs.writeFileSync(
      dtoOutputPath,
      `/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

${formattedDtoOutput}`,
    );

    console.log(
      'Prisma schema has been successfully parsed and saved to models.ts and dto.ts',
    );
  } catch (error) {
    console.error('Error parsing schema:', error);
  }
}

main();
