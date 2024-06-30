import fs from 'node:fs';
import path from 'node:path';
import { generateApi } from 'swagger-typescript-api';
import { format } from 'prettier';

/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
generateApi({
  name: 'api.ts',
  // set to `false` to prevent the tool from writing to disk
  url: 'http://localhost:3000/api-json',
  templates: path.resolve('./templates/api/used'),
  httpClientType: 'axios', // or "fetch"
  codeGenConstructs: () => ({
    Keyword: {
      Any: 'unknown',
    },
  }),
})
  .then(({ files }) => {
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
            parser: 'typescript',
          },
        ),
      );
    });
  })
  .catch((e) => console.error(e));
