import request from '@/utils/request';

export async function queryVersion(): Promise<any> {
  return request('/dota/version');
}

export async function postVersion(version: string): Promise<any> {
  return request('/admin/dota/version', {
    method: 'post',
    requestType: 'form',
    data: { version: version },
  });
}

export async function queryHeros(): Promise<any> {
  return request('/dota/heroes');
}
