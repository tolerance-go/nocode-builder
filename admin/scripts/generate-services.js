import fs from "fs";
import path from "path";

// 读取并解析 swagger.json 文件
const swaggerPath = path.resolve("src", "api", "swagger.json");
const swaggerData = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

const outputDir = path.resolve("src", "api", "services");

// 创建服务目录
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 提取控制器名称和方法
const controllers = Object.keys(swaggerData.paths).reduce((acc, route) => {
  const methods = swaggerData.paths[route];
  Object.keys(methods).forEach((method) => {
    const operation = methods[method];
    const controllerName = operation.operationId.split("_")[0];
    if (!acc[controllerName]) {
      acc[controllerName] = [];
    }
    acc[controllerName].push({
      method,
      route,
      operationId: operation.operationId,
    });
  });
  return acc;
}, {});

// 生成服务文件
Object.keys(controllers).forEach((controllerName) => {
  const serviceFileContent = generateServiceFileContent(
    controllerName,
    controllers[controllerName],
  );
  const filePath = path.join(outputDir, `${controllerName}.service.ts`);
  fs.writeFileSync(filePath, serviceFileContent, "utf8");
  console.log(`Generated service file: ${filePath}`);
});

// 生成服务文件内容
function generateServiceFileContent(controllerName, methods) {
  const importStatements = `
import axiosInstance from '@/utils/axiosInstance';
import { paths } from '@/api/types';
`;

  const methodDefinitions = methods
    .map(({ method, route, operationId }) => {
      const functionName = operationId.split("_")[1];
      const paramsType = `paths["${route}"]["${method}"]["parameters"]`;
      const responseType = `paths["${route}"]["${method}"]["responses"][200]`;

      return `
export const ${functionName} = async (params: ${paramsType}) => {
  const response = await axiosInstance({
    url: \`${convertPathParams(route)}\`,
    method: '${method}',
    ...params && { ${getRequestData(method)} }
  });
  return response.data as ${responseType};
};
`;
    })
    .join("\n");

  return `${importStatements}\n${methodDefinitions}`;
}

// 转换路径参数
function convertPathParams(route) {
  return route.replace(/{([^}]+)}/g, "$${params.path.$1}");
}

// 根据请求方法获取请求数据
function getRequestData(method) {
  if (method === "get" || method === "delete") {
    return "params: params.query";
  }
  return "data: params.body";
}
