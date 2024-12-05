export interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface UserState {
  user: GithubUser | null;
  isLoading: boolean;
  error: Error | null;
}
