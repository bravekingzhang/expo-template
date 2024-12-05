import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { githubApi } from './github';

// 应用后端 API 客户端
const apiClient = axios.create({
  // TODO: 配置你的应用后端 API 地址
  baseURL: 'https://api.yourapp.com',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 应用 API 接口
export const api = {
  user: {
    // 获取用户信息
    getProfile: async () => {
      const response = await apiClient.get('/user/profile');
      return response.data;
    },
    
    // 更新用户信息
    updateProfile: async (data: any) => {
      const response = await apiClient.put('/user/profile', data);
      return response.data;
    },
  },
  
  auth: {
    // GitHub 登录
    loginWithGithub: async (code: string) => {
      const response = await apiClient.post('/auth/github', { code });
      return response.data;
    },
  },
};

export { githubApi };
