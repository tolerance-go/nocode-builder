import * as fs from 'fs';
import * as path from 'path';
import { getDMMF } from '@prisma/sdk';

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
  isNullable: boolean;
  decorators: Decorator[];

  constructor(
    name: string,
    type: string | Class,
    isNullable: boolean,
    decorators: Decorator[] = [],
  ) {
    this.name = name;
    this.type = type;
    this.isNullable = isNullable;
    this.decorators = decorators;
  }

  print(): string {
    const type = typeof this.type === 'string' ? this.type : this.type.name;
    const decoratorsStr = this.decorators.map((dec) => dec.print()).join(' ');
    return `${decoratorsStr} ${this.name}: ${type}${this.isNullable ? ' | null' : ''}`;
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

  print(): string {
    const fieldsStr = this.fields.map((field) => field.print()).join('\n  ');
    return `class ${this.name} {\n  ${fieldsStr}\n}`;
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
    this.classes = sorted;
  }

  print(): string {
    this.sortClasses();

    const importsStr = this.imports.map((imp) => imp.print()).join('\n');
    const classesStr = this.classes.map((cls) => cls.print()).join('\n\n');

    return `${importsStr}\n\n${classesStr}`;
  }
}

// 读取文件内容
const schemaFilePath = path.resolve('./prisma/schema.prisma');
const schemaContent = fs.readFileSync(schemaFilePath, 'utf-8');

// 使用 Prisma SDK 解析 schema
async function parseSchema(schema: string): Promise<File> {
  const dmmf = await getDMMF({ datamodel: schema });

  // 先解析所有的类，构建一个类名到 Class 对象的映射
  const classMap: { [name: string]: Class } = {};

  const classes: Class[] = dmmf.datamodel.models.map((model) => {
    const fields: Field[] = model.fields.map((field) => {
      return new Field(field.name, field.type, field.isNullable);
    });
    const classObj = new Class(model.name, fields);
    classMap[model.name] = classObj;
    return classObj;
  });

  // 处理 Field 的 type，检查是否是一个 Class 引用
  classes.forEach((classObj) => {
    classObj.fields.forEach((field) => {
      if (typeof field.type === 'string' && classMap[field.type]) {
        field.type = classMap[field.type];
        classObj.dependsOnOtherClasses = true; // 设置依赖属性
      }
    });
  });

  // 假设 imports 是空的，因为 Prisma schema 中没有 import 语句
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
    const outputPath = path.resolve(__dirname, 'models.ts');
    fs.writeFileSync(outputPath, prismaFile.print());

    console.log(
      'Prisma schema has been successfully parsed and saved to output.txt',
    );
  } catch (error) {
    console.error('Error parsing schema:', error);
  }
}

main();
