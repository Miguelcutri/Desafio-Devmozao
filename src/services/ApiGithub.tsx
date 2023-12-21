import { useQuery } from "react-query";
import axios from "axios";

import { useState } from "react";
import { Button } from "../components/Button/styles";
import { Input } from "../components/Input/styles";

export default function ApiGithub() {
  const searchDev = async () => {
    return axios
      .get("http://api.github.com/users/miguelcutri")
      .then((response) => response.data);
  };
  const [isActive, setIsActive] = useState(false);

  const { data, isLoading, refetch } = useQuery("user", searchDev, {
    enabled: false,
  });

  if (isLoading) {
    return <p>Carregando...</p>;
  }
  return (
    <>
      <h1>Search Devs</h1>
      <Input
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder="Type the username here..."
      />
      <Button isActive={isActive} onClick={() => refetch()}>
        Buscar
      </Button>
      {data && <h1>{data.login}</h1>}
    </>
  );
}
