import fs from 'node:fs';
import path from 'node:path';
import { generateApi } from 'swagger-typescript-api';
import { format, resolveConfig } from 'prettier';

/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
generateApi({
  name: 'api.ts',
  // set to `false` to prevent the tool from writing to disk
  url: 'http://localhost:3000/api-json',
  templates: path.resolve('./templates/api/used'),
  httpClientType: 'axios', // or "fetch"
  unwrapResponseData: true,
  codeGenConstructs: () => ({
    Keyword: {
      Any: 'unknown',
    },
  }),
})
  .then(async ({ files }) => {
    // 读取 prettier 配置
    const prettierConfig = await resolveConfig(path.resolve());

    files.forEach(async ({ fileName, fileContent, fileExtension }) => {
      fs.writeFileSync(
        path.resolve('src/_gen', `${fileName}${fileExtension}`),
        await format(
          `/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED        ##
 * ---------------------------------------------------------------
 */

${fileContent}
`,
          {
            ...prettierConfig,
            parser: 'typescript',
          },
        ),
      );
    });
  })
  .catch((e) => console.error(e));
