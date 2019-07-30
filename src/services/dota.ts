import request from '@/utils/request';
import * as querystring from 'querystring';

export async function queryVersion(): Promise<any> {
  return request('/dota/version');
}

export async function postVersion(version: string): Promise<any> {
  return request.post('/admin/dota/version', querystring.stringify({ version: version }));
}

export async function queryHeros(): Promise<any> {
  return request('/dota/heroes');
}
