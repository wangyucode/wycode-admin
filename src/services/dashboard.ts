import request from '@/utils/request';

export async function queryVisitors(): Promise<any> {
  return request('/dashboard/visitors');
}

export async function queryAppUse(): Promise<any> {
  return request('/dashboard/appUse');
}

export async function queryErrorPath(): Promise<any> {
  return request('/dashboard/errorPath');
}

export async function queryGeos(): Promise<any> {
  return request('/dashboard/geo');
}
