import { UseQueryResult } from "react-query";
import { Profile } from "../../model/Profile";

export interface ApiGithubTypes {
  data: Profile | undefined;
  refetch: () => Promise<UseQueryResult<Profile, unknown>>;
  searchDev: Promise<string>;
}
