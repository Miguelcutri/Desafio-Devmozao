import { useState } from "react";
import { Button } from "../../components/Button/styles";
import { Input } from "../../components/Input/styles";
import { ApiGithubTypes } from "./types";

export default function HomePage({ data, refetch }: ApiGithubTypes) {
  const [isActive, setIsActive] = useState(false);
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
