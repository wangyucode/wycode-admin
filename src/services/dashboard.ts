import request from '@/utils/request';

export async function queryVisitors(day: number): Promise<any> {
  return request('/admin/dashboard/visitors', { params: { day } });
}

export async function queryAppUse(day: number): Promise<any> {
  return request('/admin/dashboard/appUse', { params: { day } });
}

export async function queryErrorPath(params: { day: number; code: number }): Promise<any> {
  return request('/admin/dashboard/errorPath', { params });
}

export async function queryGeos(): Promise<any> {
  return request('/admin/dashboard/geo');
}

export async function queryBlogAccess(day: number): Promise<any> {
  return request('/admin/dashboard/blogAccess', { params: { day } });
}
