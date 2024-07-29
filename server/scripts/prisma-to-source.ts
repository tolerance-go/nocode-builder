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
  relationFromFields?: string[];
  relationToFields?: any[];
  relationOnDelete?: string;
  relationName?: string;
  decorators: Decorator[];

  constructor({
    name,
    type,
    isRequired,
    isArray,
    isId,
    isUpdatedAt = false,
    hasDefaultValue = false,
    relationFromFields,
    relationToFields,
    relationOnDelete,
    relationName,
    decorators = [],
  }: {
    name: string;
    type: string | Class | Enum;
    isRequired: boolean;
    isArray: boolean;
    isId: boolean;
    isUpdatedAt?: boolean;
    hasDefaultValue?: boolean;
    relationFromFields?: string[];
    relationToFields?: any[];
    relationOnDelete?: string;
    relationName?: string;
    decorators?: Decorator[];
  }) {
    this.name = name;
    this.type = type;
    this.isRequired = isRequired;
    this.isArray = isArray;
    this.isId = isId;
    this.isUpdatedAt = isUpdatedAt;
    this.hasDefaultValue = hasDefaultValue;
    this.relationFromFields = relationFromFields;
    this.relationToFields = relationToFields;
    this.relationOnDelete = relationOnDelete;
    this.relationName = relationName;
    this.decorators = decorators;
  }

  print(): string {
    const type =
      typeof this.type === 'string'
        ? this.type
        : (this.type as Class | Enum).printName;
    const arrayStr = this.isArray ? '[]' : '';
    const decoratorsStr = this.decorators
      .map((dec) => dec.print())
      .join('\n  ');
    const nullableStr = this.isRequired ? '' : '?';
    return `${decoratorsStr}\n  ${this.name}${nullableStr}: ${type}${arrayStr};`;
  }

  clone(): Field {
    return new Field({
      name: this.name,
      type: this.type,
      isRequired: this.isRequired,
      isArray: this.isArray,
      isId: this.isId,
      isUpdatedAt: this.isUpdatedAt,
      hasDefaultValue: this.hasDefaultValue,
      relationFromFields: this.relationFromFields,
      relationToFields: this.relationToFields,
      relationOnDelete: this.relationOnDelete,
      relationName: this.relationName,
      decorators: this.decorators.map((dec) => dec.clone()),
    });
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
    const fieldsStr = this.fields.map((field) => field.print()).join('\n\n  ');
    const constructorStr = this.printConstructor();
    return `export class ${this.printName} {\n  ${fieldsStr}\n${
      constructorStr ? `\n  ${constructorStr}\n` : ''
    }}`;
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
  static prevHandleClasses(classes: Class[]) {
    // 先改名字，此时 fields 中 type
    classes.forEach((cls) => {
      cls.printName = `${cls.name}OperationRecordDto`;
      cls.printConstructorFlag = false;
    });
  }

  splitMode: boolean;

  constructor(classes: Class[], enums: Enum[] = [], splitMode: boolean = true) {
    super(classes, enums);
    this.splitMode = splitMode;
  }

  print(): string {
    const dtoImports = [new Import(['ApiProperty'], '@nestjs/swagger')];

    const usedValidators = new Set<string>();

    // 动态获取所有的枚举类型，用于生成导入语句
    const enumImports = new Set<string>();

    let usedType = false;

    const refsImports = new Map<string, Import>();

    this.classes.forEach((cls) => {
      cls.fields.forEach((field) => {
        const apiPropertyParams: string[] = [];

        if (!field.isRequired) {
          apiPropertyParams.push('required: false');
        }
        if (field.type instanceof Class) {
          if (this.detectCircularDependency(cls)) {
            apiPropertyParams.push(`type: () => ${field.type.printName}`);
          } else {
            apiPropertyParams.push(`type: ${field.type.printName}`);
          }

          usedValidators.add('ValidateNested');

          usedType = true;

          if (this.splitMode) {
            if (field.type.printName !== cls.printName) {
              const refPath = `./${field.type.printName}`;
              if (!refsImports.has(refPath)) {
                const importObj = new Import([field.type.printName], refPath);
                dtoImports.push(importObj);
                refsImports.set(refPath, importObj);
              }
            }
          }
        } else if (field.type instanceof Enum) {
          const enumName = field.type.name;
          apiPropertyParams.push(`enum: ${enumName}`);
          enumImports.add(enumName);
        }

        const decorators: Decorator[] = [
          new Decorator('ApiProperty', [`{ ${apiPropertyParams.join(', ')} }`]),
        ];

        if (field.type instanceof Class) {
          if (field.isArray) {
            decorators.push(
              new Decorator('ValidateNested', [`{ each: true }`]),
              new Decorator('Type', [`() => ${field.type.printName}`]),
            );
          } else {
            decorators.push(
              new Decorator('ValidateNested', []),
              new Decorator('Type', [`() => ${field.type.printName}`]),
            );
          }

          usedValidators.add('ValidateNested');
        }

        if (field.type instanceof Enum) {
          decorators.push(new Decorator('IsEnum', [field.type.name]));
          usedValidators.add('IsEnum');
        }
        if (!field.isRequired) {
          decorators.push(new Decorator('IsOptional', []));
          usedValidators.add('IsOptional');
        }

        if (field.type === 'Date') {
          field.type = 'string';
          decorators.push(new Decorator('IsDateString', []));
          usedValidators.add('IsDateString');
        } else {
          switch (field.type) {
            case 'number':
              decorators.push(new Decorator('IsInt', []));
              usedValidators.add('IsInt');
              break;
            case 'string':
              decorators.push(new Decorator('IsString', []));
              usedValidators.add('IsString');
              break;
            default:
              break;
          }
        }
        field.decorators = decorators;
      });
    });

    if (usedType) {
      dtoImports.push(new Import(['Type'], 'class-transformer'));
    }

    if (usedValidators.size > 0) {
      dtoImports.push(
        new Import(Array.from(usedValidators), 'class-validator'),
      );
    }

    if (enumImports.size > 0) {
      dtoImports.push(new Import(Array.from(enumImports), '@prisma/client'));
    }

    const classesStr = this.classes.map((cls) => cls.print()).join('\n\n');
    const importsStr = dtoImports.map((imp) => imp.print()).join('\n');

    return `${importsStr}\n\n${classesStr}`;
  }

  private detectCircularDependency = (
    cls: Class,
    visited: Set<Class> = new Set(),
  ): boolean => {
    if (visited.has(cls)) return true;
    visited.add(cls);

    return cls.fields.some((field) => {
      if (field.type instanceof Class) {
        return this.detectCircularDependency(field.type, visited);
      }
      return false;
    });
  };
}

// 读取文件内容
const schemaFilePath = path.resolve('./prisma/schema.prisma');
const schemaContent = fs.readFileSync(schemaFilePath, 'utf-8');

const deepCloneDtoClasses = (classes: Class[], enums: Enum[]) => {
  // 深拷贝 classes 以确保不影响 modelsFile
  const dtoClasses = classes.map((cls) => cls.clone());
  const dtoEnums = enums.map((enumItem) => enumItem.clone());

  // 填充 dtoClassMap
  const dtoClassMap: { [name: string]: Class } = {};
  dtoClasses.forEach((cls) => {
    dtoClassMap[cls.name] = cls;
  });

  const dtoEnumsMap: { [name: string]: Enum } = {};
  dtoEnums.forEach((cls) => {
    dtoEnumsMap[cls.name] = cls;
  });

  // 替换所有字段的类型为 DTO 版本
  dtoClasses.forEach((classObj) => {
    classObj.fields.forEach((field) => {
      if (field.type instanceof Class && dtoClassMap[field.type.name]) {
        field.type = dtoClassMap[field.type.name];
      }
      if (field.type instanceof Enum && dtoEnumsMap[field.type.name]) {
        field.type = dtoEnumsMap[field.type.name];
      }
    });
  });

  return {
    dtoClasses,
    dtoEnums,
  };
};

// 使用 Prisma SDK 解析 schema
async function parseSchema(
  schema: string,
): Promise<{ modelsFile: ModelsFile; dtoFiles: DTOFile[] }> {
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
      return new Field({
        name: field.name,
        type: fieldType,
        isRequired: field.isRequired,
        isArray: field.isList,
        isId: field.isId,
        isUpdatedAt: field.isUpdatedAt,
        hasDefaultValue: field.hasDefaultValue,
        relationFromFields: field.relationFromFields,
        relationToFields: field.relationToFields,
        relationOnDelete: field.relationOnDelete,
        relationName: field.relationName,
      });
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

  const { dtoClasses, dtoEnums } = deepCloneDtoClasses(classes, enums);

  DTOFile.prevHandleClasses(dtoClasses);

  const dtoFiles: DTOFile[] = dtoClasses.map(
    (cls) => new DTOFile([cls], dtoEnums),
  );

  return { modelsFile, dtoFiles };
}

// 主函数
async function main() {
  try {
    const { modelsFile, dtoFiles } = await parseSchema(schemaContent);
    const prettierConfig = await resolveConfig(path.resolve());

    const adminPath = path.resolve('../admin');

    // 如果 admin 目录不存在，就不执行输出
    if (fs.existsSync(adminPath)) {
      // 输出 ModelsFile 结果
      const formattedModelsOutput = await format(
        `/*
* ---------------------------------------------------------------
* ## THIS FILE WAS GENERATED        ##
* ---------------------------------------------------------------
*/

${modelsFile.print()}`,
        {
          ...prettierConfig,
          parser: 'typescript',
        },
      );
      const modelsOutputPath = path.resolve(adminPath, 'src/_gen/models.ts');
      fs.writeFileSync(modelsOutputPath, formattedModelsOutput);
    }

    const dtoOutput = path.resolve('./src/_gen/dtos/operation-records');

    fs.mkdirSync(dtoOutput, {
      recursive: true,
    });

    await Promise.all(
      dtoFiles.map(async (dtoFile) => {
        // 输出 DTOFile 结果
        const formattedDtoOutput = await format(
          `/*
* ---------------------------------------------------------------
* ## THIS FILE WAS GENERATED        ##
* ---------------------------------------------------------------
*/

${dtoFile.print()}`,
          {
            ...prettierConfig,
            parser: 'typescript',
          },
        );
        const dtoOutputPath = path.resolve(
          dtoOutput,
          `${dtoFile.classes[0].printName}.ts`,
        );
        fs.writeFileSync(dtoOutputPath, formattedDtoOutput);
      }),
    );

    console.log(
      'Prisma schema has been successfully parsed and saved to models.ts and dto.ts',
    );
  } catch (error) {
    console.error('Error parsing schema:', error);
  }
}

main();
