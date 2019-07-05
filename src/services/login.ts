import { FromDataType } from '@/pages/user/Login';
import request from '@/utils/request';

export async function login(params: FromDataType) {
  return request('/admin/user/login', { params });
}
