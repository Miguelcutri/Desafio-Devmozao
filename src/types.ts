import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface GithubUserDataTypes {
  login: string;
  id: number;
}

export interface GithubDataContextType {
  data: GithubUserDataTypes | undefined;
  isLoading: boolean;
  refetch: () => void;
  inputValue: string | undefined;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setShouldFetch: Dispatch<SetStateAction<boolean>>;
}
