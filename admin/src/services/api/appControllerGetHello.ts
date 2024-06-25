// @ts-ignore
/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 GET / */
export async function appControllerGetHello(options?: { [key: string]: any }) {
  return request<any>('/', {
    method: 'GET',
    ...(options || {}),
  });
}
