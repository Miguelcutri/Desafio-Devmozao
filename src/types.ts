import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Profile } from "./model/Profile";
import { Repository } from "./model/Repository";

export interface GithubUserDataTypes {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
export interface GithubReposDataTypes {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  stargazers_count: number;
  updated_at: string;
  description: string;
  html_url: string;
}

export interface GithubDataContextType {
  dataDeveloper: Profile | undefined;
  dataRepository: Repository[] | undefined;
  isLoadingDeveloper: boolean;
  isLoadingRepository: boolean;
  refetchDeveloper: () => void;
  refetchRepository: () => void;
  inputValue: string | undefined;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setShouldFetch: Dispatch<SetStateAction<boolean>>;
}
