import { API_PATHS } from '../api/apiPath';
import axiosIntance from '../api/axiosIntance';

const setUpUserInfo = async (data: any) => {
  const res = await axiosIntance.post(API_PATHS.AUTH.UPDATE_USER_INFO, data);
  return res;
};
export const userServices = {
  setUpUserInfo,
};
