import request from '@/utils/request';

export async function queryVisitors(): Promise<any> {
  return request('/dashboard/visitors');
}
