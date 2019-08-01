import request from '@/utils/request';
import { FromDataType } from '@/components/LoginForm';

export async function login(params: FromDataType) {
  return request('/admin/user/login', { params });
}
