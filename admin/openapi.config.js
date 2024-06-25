import { generateService } from "@umijs/openapi";

generateService({
  schemaPath: "http://localhost:3000/api-json",
  serversPath: "./src/services",
  requestLibPath: '@/utils/axiosInstance',
});
