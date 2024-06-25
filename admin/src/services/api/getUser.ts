import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 GET /users/${param0} */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserParams,
  options?: { [key: string]: unknown },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UserDto>(`/users/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
