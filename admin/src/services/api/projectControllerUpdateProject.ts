// @ts-ignore
/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 PATCH /projects/${param0} */
export async function projectControllerUpdateProject(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ProjectControllerUpdateProjectParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/projects/${param0}`, {
    method: 'PATCH',
    params: { ...queryParams },
    ...(options || {}),
  });
}
