import axios, { AxiosRequestConfig } from "axios";
import { notification } from "antd";
import store from "store2";

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:3000" : "/api", // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 比如可以在这里添加认证 token
    const token = store.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data;
  },
  (error) => {
    // 对响应错误做些什么
    // 可以统一处理错误信息，比如显示通知
    notification.error({
      message: "请求错误",
      description: error.response?.data?.message || error.message || "未知问题",
    });
    return Promise.reject(error);
  },
);

// 包装 request 方法
const request = async <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await axiosInstance(url, config);
  return response as T;
};

export default request;
