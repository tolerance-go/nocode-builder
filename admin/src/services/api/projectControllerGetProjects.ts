// @ts-ignore
/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 GET /projects */
export async function projectControllerGetProjects(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProjectControllerGetProjectsParams,
  options?: { [key: string]: any },
) {
  return request<any>('/projects', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}