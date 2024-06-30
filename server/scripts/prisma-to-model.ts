import * as fs from 'fs';
import * as path from 'path';
import { getDMMF } from '@prisma/sdk';
import { format } from 'prettier';

const toCamelCase = (str: string): string => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|[-_]\w)/g, (match, index) => {
    if (index === 0) {
      return match.toLowerCase();
    }
    return match.replace(/[-_]/, '').toUpperCase();
  });
};

const classMap: { [name: string]: Class } = {};

// 定义 Decorator 类
class Decorator {
  name: string;
  params: string[];

  constructor(name: string, params: string[] = []) {
    this.name = name;
    this.params = params;
  }

  print(): string {
    const paramsStr = this.params.length ? `(${this.params.join(', ')})` : '';
    return `@${this.name}${paramsStr}`;
  }
}

// 定义 Field 类
class Field {
  name: string;
  type: string | Class;
  isRequired: boolean;
  isId: boolean;
  decorators: Decorator[];

  constructor(
    name: string,
    type: string | Class,
    isRequired: boolean,
    isId: boolean,
    decorators: Decorator[] = [],
  ) {
    this.name = name;
    this.type = type;
    this.isRequired = isRequired;
    this.isId = isId;
    this.decorators = decorators;
  }

  print(): string {
    const type =
      typeof this.type === 'string' ? this.type : this.type.printName;
    const decoratorsStr = this.decorators.map((dec) => dec.print()).join(' ');
    const nullableStr = this.isRequired ? '' : '?';
    return `${decoratorsStr} ${this.name}${nullableStr}: ${type};`;
  }
}

// 定义 Class 类
class Class {
  name: string;
  fields: Field[];
  dependsOnOtherClasses: boolean;

  private _printName: string;

  get printName(): string {
    return this._printName;
  }

  set printName(name: string) {
    this._printName = name;
  }

  constructor(name: string, fields: Field[]) {
    this.name = name;
    this.fields = fields;
    this.dependsOnOtherClasses = false;
    this._printName = name;
  }

  printConstructor(): string {
    const paramsStr = this.fields
      .map((field) => {
        return field.name;
      })
      .join(', ');

    const typeAnnotationsStr = this.fields
      .map((field) => {
        const type =
          typeof field.type === 'string' ? field.type : field.type.printName;
        const nullableStr = field.isRequired ? '' : '?';
        return `${field.name}${nullableStr}: ${type}`;
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
    return `export class ${this.printName} {\n  ${fieldsStr}\n\n  ${constructorStr}\n}`;
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
  imports: Import[];

  constructor(classes: Class[], imports: Import[] = []) {
    this.classes = classes;
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
        if (typeof field.type !== 'string') {
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
    const classesStr = this.classes.map((cls) => cls.print()).join('\n\n');

    return `${importsStr}\n\n${classesStr}`;
  }
}

// 新增 ModelsFile 类，继承自 File 类
class ModelsFile extends File {
  constructor(classes: Class[]) {
    super(classes);
  }

  print(): string {
    // 设置 class 的 printName
    this.classes.forEach((classItem) => {
      classItem.printName = `${classItem.name}Model`;
    });

    return super.print();
  }
}

// 新增 DBFile 类
class DBFile extends File {
  constructor(classes: Class[]) {
    const imports = [
      new Import(
        classes.map((classItem) => `${classItem.printName}`),
        '@/_gen/models',
      ),
      new Import(['Dexie', 'Table'], 'dexie'),
    ];
    super(classes, imports);
  }

  print(): string {
    const dynamicImports = this.classes
      .map((classItem) => `${classItem.printName}`)
      .join(', ');
    const tablesStr = this.classes
      .map(
        (classItem) =>
          `  ${toCamelCase(classItem.name)}s: Table<${classItem.printName}, number>;`,
      )
      .join('\n');

    const storesStr = this.classes
      .map((classItem) => {
        const sortedFields = classItem.fields.sort(
          (a, b) => (b.isId ? 1 : 0) - (a.isId ? 1 : 0),
        ); // 将 isId 的字段排在最前面
        const fieldsStr = sortedFields
          .map((field) => `${field.isId ? '++' : ''}${field.name}`)
          .join(', ');
        return `      ${toCamelCase(classItem.name)}s: '${fieldsStr}',`;
      })
      .join('\n');

    const tableInitStr = this.classes
      .map(
        (classItem) =>
          `    this.${toCamelCase(classItem.name)}s = this.table('${toCamelCase(classItem.name)}s');`,
      )
      .join('\n');

    return `import { ${dynamicImports} } from '@/_gen/models';
import Dexie, { Table } from 'dexie';

export class Database extends Dexie {
${tablesStr}

  constructor() {
    super('database');
    this.version(1).stores({
${storesStr}
    });

${tableInitStr}
  }
}

export const db = new Database();`;
  }
}

// 读取文件内容
const schemaFilePath = path.resolve('./prisma/schema.prisma');
const schemaContent = fs.readFileSync(schemaFilePath, 'utf-8');

// 使用 Prisma SDK 解析 schema
async function parseSchema(
  schema: string,
): Promise<{ modelsFile: ModelsFile; dbFile: DBFile }> {
  const dmmf = await getDMMF({ datamodel: schema });

  const typeMapping: { [key: string]: string } = {
    Int: 'number',
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'Date',
  };

  const classes: Class[] = dmmf.datamodel.models.map((model) => {
    const fields: Field[] = model.fields.map((field) => {
      const fieldType = typeMapping[field.type] || field.type;
      return new Field(field.name, fieldType, field.isRequired, field.isId);
    });
    const classObj = new Class(model.name, fields);
    classMap[model.name] = classObj;
    return classObj;
  });

  classes.forEach((classObj) => {
    classObj.fields.forEach((field) => {
      if (typeof field.type === 'string' && classMap[field.type]) {
        field.type = classMap[field.type];
        classObj.dependsOnOtherClasses = true;
      }
    });
  });

  const modelsFile = new ModelsFile(classes);
  const dbFile = new DBFile(classes);

  return { modelsFile, dbFile };
}

// 主函数
async function main() {
  try {
    const { modelsFile, dbFile } = await parseSchema(schemaContent);

    // 输出 ModelsFile 结果
    const formattedModelsOutput = await format(modelsFile.print(), {
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

    // 输出 DBFile 结果
    const formattedDbOutput = await format(dbFile.print(), {
      parser: 'typescript',
    });
    const dbOutputPath = path.resolve('../admin/src/_gen/db.ts');
    fs.writeFileSync(
      dbOutputPath,
      `/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

${formattedDbOutput}`,
    );

    console.log(
      'Prisma schema has been successfully parsed and saved to models.ts and db.ts',
    );
  } catch (error) {
    console.error('Error parsing schema:', error);
  }
}

main();
