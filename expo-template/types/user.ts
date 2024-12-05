export interface AppUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  createdAt: string;
}

// 第三方登录提供者类型
export type AuthProvider = 'github' | 'google';

// GitHub 用户信息类型（用于认证过程）
export interface GithubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  bio: string;
  location: string;
  company: string;
  followers: number;
  following: number;
}

export interface UserState {
  user: AppUser | null;
  isLoading: boolean;
  error: Error | null;
}
