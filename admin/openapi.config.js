import { generateService } from "@umijs/openapi";

generateService({
  schemaPath: "http://localhost:3000/api-json",
  serversPath: "./src/services",
  requestLibPath: "@/utils/axiosInstance",
  hook: {
    /** 自定义函数名称 */
    customFunctionName: (data) => {
      return data.operationId.split('_')[1];
    },
    customFileNames: (operationObject, apiPath) => {
      const operationId = operationObject.operationId;
      if (!operationId) {
        console.warn("[Warning] no operationId", apiPath);
        return;
      }
      const res = operationId.split("_");
      if (res.length > 1) {
        res.shift();
        if (res.length > 2) {
          console.warn("[Warning]  operationId has more than 2 part", apiPath);
        }
        return [res.join("_")];
      } else {
        const controllerName = (res || [])[0];
        if (controllerName) {
          return [controllerName];
        }
        return;
      }
    },
  },
});
