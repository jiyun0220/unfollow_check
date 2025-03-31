export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface FollowStatus {
  user: GitHubUser;
  isFollowingYou: boolean;
  youAreFollowing: boolean;
}
