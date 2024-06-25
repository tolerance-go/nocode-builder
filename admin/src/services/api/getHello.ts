import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 GET / */
export async function getHello(options?: { [key: string]: unknown }) {
  return request<unknown>('/', {
    method: 'GET',
    ...(options || {}),
  });
}
