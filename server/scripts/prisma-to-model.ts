import * as fs from 'fs';
import * as path from 'path';
import { getDMMF } from '@prisma/sdk';

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
  decorators: Decorator[];

  constructor(
    name: string,
    type: string | Class,
    isRequired: boolean,
    decorators: Decorator[] = [],
  ) {
    this.name = name;
    this.type = type;
    this.isRequired = isRequired;
    this.decorators = decorators;
  }

  print(): string {
    const type = typeof this.type === 'string' ? this.type : this.type.printName();
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

  constructor(name: string, fields: Field[]) {
    this.name = name;
    this.fields = fields;
    this.dependsOnOtherClasses = false;
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
          typeof field.type === 'string' ? field.type : field.type.printName();
        const nullableStr = field.isRequired ? '' : '?';
        return `${field.name}${nullableStr}: ${type}`;
      })
      .join('; ');

    const assignmentsStr = this.fields
      .map((field) => `this.${field.name} = ${field.name};`)
      .join('\n    ');

    return `constructor({ ${paramsStr} }: { ${typeAnnotationsStr} }) {\n    ${assignmentsStr}\n  }`;
  }

  printName(): string {
    return `${this.name}Model`;
  }

  print(): string {
    const fieldsStr = this.fields.map((field) => field.print()).join('\n  ');
    const constructorStr = this.printConstructor();
    return `export class ${this.printName()} {\n  ${fieldsStr}\n\n  ${constructorStr}\n}`;
  }
}

// 定义 Import 类
class Import {
  name: string;
  from: string;

  constructor(name: string, from: string) {
    this.name = name;
    this.from = from;
  }

  print(): string {
    return `import { ${this.name} } from '${this.from}';`;
  }
}

// 定义 File 类
class File {
  classes: Class[];
  imports: Import[];

  constructor(classes: Class[], imports: Import[]) {
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

    return `${importsStr}${classesStr}`;
  }
}

// 读取文件内容
const schemaFilePath = path.resolve('./prisma/schema.prisma');
const schemaContent = fs.readFileSync(schemaFilePath, 'utf-8');

// 使用 Prisma SDK 解析 schema
async function parseSchema(schema: string): Promise<File> {
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
      return new Field(field.name, fieldType, field.isRequired);
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

  const imports: Import[] = [];

  return new File(classes, imports);
}

// 主函数
async function main() {
  try {
    const prismaFile = await parseSchema(schemaContent);

    // 输出结果
    console.log(prismaFile.print());

    // 将结果保存到文件
    const outputPath = path.resolve('../admin/src/models.ts');
    fs.writeFileSync(
      outputPath,
      `/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

${prismaFile.print()}`,
    );

    console.log(
      'Prisma schema has been successfully parsed and saved to models.ts',
    );
  } catch (error) {
    console.error('Error parsing schema:', error);
  }
}

main();
