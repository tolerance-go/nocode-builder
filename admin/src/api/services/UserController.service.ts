
import axiosInstance from '@/utils/axiosInstance';
import { paths } from '@/api/types';


export const getUser = async (params?: paths["/users/{id}"]["get"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/users/${params.path.id}`,
    method: 'get',
    ...params && { params: params.query }
  });
  return response.data as paths["/users/{id}"]["get"]["responses"][200];
};


export const updateUser = async (params?: paths["/users/{id}"]["patch"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/users/${params.path.id}`,
    method: 'patch',
    ...params && { data: params.body }
  });
  return response.data as paths["/users/{id}"]["patch"]["responses"][200];
};


export const deleteUser = async (params?: paths["/users/{id}"]["delete"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/users/${params.path.id}`,
    method: 'delete',
    ...params && { params: params.query }
  });
  return response.data as paths["/users/{id}"]["delete"]["responses"][200];
};


export const getUsers = async (params?: paths["/users"]["get"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/users`,
    method: 'get',
    ...params && { params: params.query }
  });
  return response.data as paths["/users"]["get"]["responses"][200];
};


export const createUser = async (params?: paths["/users"]["post"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/users`,
    method: 'post',
    ...params && { data: params.body }
  });
  return response.data as paths["/users"]["post"]["responses"][200];
};
