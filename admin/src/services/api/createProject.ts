import request from '@/utils/request';

/** 此处后端没有提供注释 POST /projects */
export async function createProject(
  body: API.ProjectCreateDto,
  options?: { [key: string]: unknown },
) {
  return request<API.ProjectDto>('/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
