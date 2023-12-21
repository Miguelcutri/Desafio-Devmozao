import { useQuery } from "react-query";
import axios from "axios";

import HomePage from "../pages/HomePage";
import { GithubUserDataTypes } from "./types";

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
    <>
      <HomePage data={data} refetch={refetch} searchDev={searchDev()} />
    </>
  );
}
