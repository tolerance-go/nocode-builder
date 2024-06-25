import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 GET /projects/${param0} */
export async function getProject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProjectParams,
  options?: { [key: string]: unknown },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ProjectDto>(`/projects/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
