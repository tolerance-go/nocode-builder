// @ts-ignore
/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 DELETE /project-groups/${param0} */
export async function projectGroupControllerDeleteProjectGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProjectGroupControllerDeleteProjectGroupParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ProjectGroupDto>(`/project-groups/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
