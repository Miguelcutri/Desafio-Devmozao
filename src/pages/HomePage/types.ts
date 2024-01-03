import { UseQueryResult } from "react-query";
import { GithubUserDataTypes } from "../../types";

export interface ApiGithubTypes {
  data: GithubUserDataTypes | undefined;
  refetch: () => Promise<UseQueryResult<GithubUserDataTypes, unknown>>;
  searchDev: Promise<string>;
}
