// @ts-ignore
/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 GET /project-groups */
export async function getProjectGroups(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProjectGroupsParams,
  options?: { [key: string]: any },
) {
  return request<API.ProjectGroupDto[]>('/project-groups', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
