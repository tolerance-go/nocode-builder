import fs from 'node:fs';
import path from 'node:path';
import { generateApi } from 'swagger-typescript-api';
import { format, resolveConfig } from 'prettier';

const apiUrls = {};

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
  hooks: {
    onCreateRoute: (routeData) => {
      const { raw, request } = routeData;
      apiUrls[raw.operationId] = {
        method: raw.method,
        route: raw.route,
        path: request.path,
      };
    },
  },
})
  .then(async ({ files }) => {
    // 读取 prettier 配置
    const prettierConfig = await resolveConfig(path.resolve());
    const outputDir = path.resolve('src/_gen');

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
    const outputFilePath = path.resolve(outputDir, 'apiUrls.json');
    fs.writeFileSync(
      outputFilePath,
      await format(JSON.stringify(apiUrls), {
        ...prettierConfig,
        parser: 'json',
      }),
    );
  })
  .catch((e) => console.error(e));
