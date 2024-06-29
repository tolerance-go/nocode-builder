import type { DMMF } from '@prisma/generator-helper';
import { getDMMF } from '@prisma/sdk';
import * as fs from 'fs-extra';
import * as path from 'path';

export async function readPrismaConfig(
  filePath: string,
): Promise<DMMF.Document> {
  try {
    const schemaPath = path.resolve(filePath);
    const schemaData = await fs.readFile(schemaPath, 'utf-8');

    // 使用 getDMMF 解析 schema 数据
    const dmmf = await getDMMF({ datamodel: schemaData });

    return dmmf;
  } catch (error) {
    console.error('Error reading Prisma config:', error);
    throw error;
  }
}
