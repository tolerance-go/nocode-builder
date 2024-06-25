
import axiosInstance from '@/utils/axiosInstance';
import { paths } from '@/api/types';


export const getHello = async (params?: paths["/"]["get"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/`,
    method: 'get',
    ...params && { params: params.query }
  });
  return response.data as paths["/"]["get"]["responses"][200];
};


export const getApp = async (params?: paths["/apps/{id}"]["get"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/apps/${params.path.id}`,
    method: 'get',
    ...params && { params: params.query }
  });
  return response.data as paths["/apps/{id}"]["get"]["responses"][200];
};


export const updateApp = async (params?: paths["/apps/{id}"]["patch"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/apps/${params.path.id}`,
    method: 'patch',
    ...params && { data: params.body }
  });
  return response.data as paths["/apps/{id}"]["patch"]["responses"][200];
};


export const deleteApp = async (params?: paths["/apps/{id}"]["delete"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/apps/${params.path.id}`,
    method: 'delete',
    ...params && { params: params.query }
  });
  return response.data as paths["/apps/{id}"]["delete"]["responses"][200];
};


export const getApps = async (params?: paths["/apps"]["get"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/apps`,
    method: 'get',
    ...params && { params: params.query }
  });
  return response.data as paths["/apps"]["get"]["responses"][200];
};


export const createApp = async (params?: paths["/apps"]["post"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/apps`,
    method: 'post',
    ...params && { data: params.body }
  });
  return response.data as paths["/apps"]["post"]["responses"][200];
};
