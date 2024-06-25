/* eslint-disable */
import request from '@/utils/axiosInstance';

/** 此处后端没有提供注释 POST /projects */
export async function projectControllerCreateProject(options?: { [key: string]: any }) {
  return request<any>('/projects', {
    method: 'POST',
    ...(options || {}),
  });
}
