import axios from 'axios';

// GitHub API 客户端
const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// GitHub API 接口
export const githubApi = {
  // 获取用户信息
  getUserInfo: async (token: string) => {
    console.log('Getting user info with token:', token);
    const response = await githubClient.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
