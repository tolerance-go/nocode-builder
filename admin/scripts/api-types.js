import fs from 'fs';
import http from 'http';
import { exec } from 'child_process';

const swaggerUrl = 'http://localhost:3000/api-json';
const swaggerFile = 'src/api/swagger.json';
const outputFile = 'src/api/types.ts';

// 下载 Swagger JSON 文件
http.get(swaggerUrl, (res) => {
  const file = fs.createWriteStream(swaggerFile);
  res.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      console.log('Swagger JSON 文件下载完成');

      // 生成 TypeScript 类型定义
      exec(`npx openapi-typescript ${swaggerFile} --output ${outputFile}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`生成 TypeScript 类型定义时出错: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(stdout);

        // 删除下载的 Swagger JSON 文件
        fs.unlink(swaggerFile, (err) => {
          if (err) {
            console.error(`删除 Swagger JSON 文件时出错: ${err.message}`);
            return;
          }
          console.log('Swagger JSON 文件已删除');
        });
      });
    });
  });
}).on('error', (err) => {
  console.error(`下载 Swagger JSON 文件时出错: ${err.message}`);
});
