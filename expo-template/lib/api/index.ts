import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { githubApi } from './github';
import type { AppUser, AuthProvider } from '@/types/user';

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

// Mock 数据生成函数
const createMockUser = (thirdPartyUser: any): AppUser => ({
  id: `user_${Date.now()}`,
  name: thirdPartyUser.name || thirdPartyUser.login,
  email: thirdPartyUser.email,
  avatar: thirdPartyUser.avatar_url,
  bio: thirdPartyUser.bio,
  location: thirdPartyUser.location,
  company: thirdPartyUser.company,
  followersCount: thirdPartyUser.followers || 0,
  followingCount: thirdPartyUser.following || 0,
  postsCount: 0,
  createdAt: new Date().toISOString(),
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
  auth: {
    // 第三方登录
    loginWithProvider: async (provider: AuthProvider, accessToken: string) => {
      // Mock: 直接返回转换后的用户数据
      if (provider === 'github') {
        const githubUser = await githubApi.getUserInfo(accessToken);
        return createMockUser(githubUser);
      }
      throw new Error(`Unsupported provider: ${provider}`);
    },
  },

  user: {
    // 获取当前用户信息
    getProfile: async (): Promise<AppUser> => {
      // Mock: 从 localStorage 获取用户信息
      const userJson = await AsyncStorage.getItem('currentUser');
      if (!userJson) {
        throw new Error('User not found');
      }
      return JSON.parse(userJson);
    },

    // 更新用户信息
    updateProfile: async (data: Partial<AppUser>): Promise<AppUser> => {
      // Mock: 更新 localStorage 中的用户信息
      const userJson = await AsyncStorage.getItem('currentUser');
      if (!userJson) {
        throw new Error('User not found');
      }
      const currentUser = JSON.parse(userJson);
      const updatedUser = { ...currentUser, ...data };
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return updatedUser;
    },
  },
};

// 仅用于认证过程
export { githubApi };
