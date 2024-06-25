import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 POST /project-groups */
export async function createProjectGroup(
  body: API.ProjectGroupCreateDto,
  options?: { [key: string]: unknown },
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
