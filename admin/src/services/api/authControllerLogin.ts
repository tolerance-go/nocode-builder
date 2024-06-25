/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 POST /auth/login */
export async function authControllerLogin(body: API.LoginDto, options?: { [key: string]: any }) {
  return request<API.LoginResponseDto>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
