import axios from 'axios';
export default (config: any) => {
  const service: any = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_REQUESTURL as string,
    timeout: 50000
  });
  // 请求拦截器
  service.interceptors.request.use(
    (config: any) => {
      // 设置token
      config.headers['Authorization'] = sessionStorage.getItem('token') || '';

      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';

      if (config.type == 'file') {
        config.headers['content-type'] = 'application/multipart/form-data';
      } else if (config.type == 'form') {
        config.headers['Content-type'] = 'application/x-www-form-urlencoded';
      }
      if (config.method && config.method.toLowerCase() === 'get') {
        config.data = true;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
  // 响应拦截器
  service.interceptors.response.use(
    (response: any) => {
      const code = response.data.code;
      // 自己配置后端返回code格式
      if (code === 401) {
      } else if (code === 200) {
        return response.data;
        // return Promise.reject('error')
      } else {
        return response.data;
      }
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
  return service(config);
};
