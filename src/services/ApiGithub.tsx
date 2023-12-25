import { useQuery } from "react-query";
import axios from "axios";
import { createContext } from "react";
import HomePage from "../pages/HomePage";
import { GithubUserDataTypes, GithubDataContextType } from "./ApiGithub.types";
import Profile from "../pages/Profile";

export const GithubDataContext = createContext<GithubDataContextType>({
  data: undefined,
  isLoading: false,
  refetch: () => {},
});

export default function ApiGithub() {
  const searchDev = () => {
    return axios
      .get("http://api.github.com/users/miguelcutri")
      .then((response) => response.data);
  };

  const { data, isLoading, refetch } = useQuery<GithubUserDataTypes>(
    "user",
    searchDev,
    {
      enabled: false,
    }
  );

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <GithubDataContext.Provider value={{ data, isLoading, refetch }}>
      <HomePage />
      <Profile />
    </GithubDataContext.Provider>
  );
}
