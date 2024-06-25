// @ts-ignore
/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 POST /users */
export async function userControllerCreateUser(
  body: API.UserCreateDto,
  options?: { [key: string]: any },
) {
  return request<API.UserDto>('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
