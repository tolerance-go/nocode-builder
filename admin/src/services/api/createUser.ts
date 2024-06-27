import request from '@/utils/request';

/** 此处后端没有提供注释 POST /users */
export async function createUser(body: API.UserCreateDto, options?: { [key: string]: unknown }) {
  return request<API.UserDto>('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
