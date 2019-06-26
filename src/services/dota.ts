import request from '@/utils/request';

export async function queryVersion(): Promise<any> {
  return request('/dota/version');
}
