
import axiosInstance from '@/utils/axiosInstance';
import { paths } from '@/api/types';


export const getProject = async (params: paths["/projects/{id}"]["get"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/projects/${params.path.id}`,
    method: 'get',
    ...params && { params: params.query }
  });
  return response.data as paths["/projects/{id}"]["get"]["responses"][200];
};


export const updateProject = async (params: paths["/projects/{id}"]["patch"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/projects/${params.path.id}`,
    method: 'patch',
    ...params && { data: params.body }
  });
  return response.data as paths["/projects/{id}"]["patch"]["responses"][200];
};


export const deleteProject = async (params: paths["/projects/{id}"]["delete"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/projects/${params.path.id}`,
    method: 'delete',
    ...params && { params: params.query }
  });
  return response.data as paths["/projects/{id}"]["delete"]["responses"][200];
};


export const getProjects = async (params: paths["/projects"]["get"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/projects`,
    method: 'get',
    ...params && { params: params.query }
  });
  return response.data as paths["/projects"]["get"]["responses"][200];
};


export const createProject = async (params: paths["/projects"]["post"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/projects`,
    method: 'post',
    ...params && { data: params.body }
  });
  return response.data as paths["/projects"]["post"]["responses"][200];
};
