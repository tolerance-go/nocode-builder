// @ts-ignore
/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 POST /users */
export async function userControllerCreateUser(options?: { [key: string]: any }) {
  return request<any>('/users', {
    method: 'POST',
    ...(options || {}),
  });
}
