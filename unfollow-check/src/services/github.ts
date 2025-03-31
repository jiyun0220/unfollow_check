import { Octokit } from '@octokit/rest';
import { GitHubUser, FollowStatus } from '../types/github';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});

export const getFollowers = async (username: string): Promise<GitHubUser[]> => {
  const { data } = await octokit.users.listFollowersForUser({ username });
  return data;
};

export const getFollowing = async (username: string): Promise<GitHubUser[]> => {
  const { data } = await octokit.users.listFollowingForUser({ username });
  return data;
};

export const analyzeFollowStatus = async (username: string): Promise<FollowStatus[]> => {
  const [followers, following] = await Promise.all([
    getFollowers(username),
    getFollowing(username),
  ]);

  const followersSet = new Set(followers.map(f => f.login));
  const followingSet = new Set(following.map(f => f.login));

  const allUsers = [...new Set([...followers, ...following])];

  return allUsers.map(user => ({
    user,
    isFollowingYou: followersSet.has(user.login),
    youAreFollowing: followingSet.has(user.login),
  }));
};
