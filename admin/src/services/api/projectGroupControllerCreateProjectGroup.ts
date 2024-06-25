// @ts-ignore
/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 POST /project-groups */
export async function projectGroupControllerCreateProjectGroup(
  body: API.ProjectGroupCreateDto,
  options?: { [key: string]: any },
) {
  return request<API.ProjectGroupDto>('/project-groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}