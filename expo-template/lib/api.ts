import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 创建 axios 实例
const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
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

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期或无效，清除本地存储并重定向到登录页
      AsyncStorage.removeItem('userToken');
      // 在这里可以添加重定向到登录页的逻辑
    }
    return Promise.reject(error);
  }
);

// API 接口
export const githubApi = {
  // 获取用户信息
  getUserInfo: () => api.get('/user'),
  
  // 获取用户仓库列表
  getUserRepos: (page = 1, perPage = 10) => 
    api.get(`/user/repos?page=${page}&per_page=${perPage}`),
    
  // 获取用户组织
  getUserOrgs: () => api.get('/user/orgs'),
};

export default api;
