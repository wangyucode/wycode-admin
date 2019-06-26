import request from '@/utils/request';

export async function queryVersion(): Promise<any> {
  return request('/dota/version');
}

export async function queryHeros(): Promise<any> {
  return request('/dota/heroes');
}
