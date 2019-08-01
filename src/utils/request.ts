/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { notification } from 'antd';
import Axios from 'axios';
import { getToken } from '@/utils/token';
import router from 'umi/router';

const NEED_TOKEN = ['/admin/dota/version'];
/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  if (error.response) {
    const { status } = error.response;
    const path = error.config.url.substring(error.config.baseURL.length);
    notification.error({
      message: `请求错误 ${status}: ${path}`,
      description: error.response.data.message,
    });
  }
};

/**
 * 配置request请求时的默认参数
 */
const axiosInstance = Axios.create({
  baseURL: SERVICE_URL,
});

axiosInstance.interceptors.request.use(config => {
  if (config.url) {
    if (NEED_TOKEN.includes(config.url)) {
      const token = getToken();
      if (token) {
        config.headers = { ...config.headers, 'X-Auth-Token': token };
      } else {
        const redirect = location.href;
        router.push(`/user/login?redirect=${redirect}`);
        return Promise.reject(config);
      }
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    errorHandler(error);
  },
);

export default axiosInstance;
