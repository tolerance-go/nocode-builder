
import axiosInstance from '@/utils/axiosInstance';
import { paths } from '@/api/types';


export const getHello = async (params: paths["/"]["get"]["parameters"]) => {
  const response = await axiosInstance({
    url: `/`,
    method: 'get',
    ...params && { params: params.query }
  });
  return response.data as paths["/"]["get"]["responses"][200];
};
