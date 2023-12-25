export interface GithubUserDataTypes {
  login: string;
  id: number;
}

export interface GithubDataContextType {
  data: GithubUserDataTypes | undefined;
  isLoading: boolean;
  refetch: () => void;
}
