import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GithubDataContext } from "../../index";
import { Button } from "../../components/Button/styles";
import { Input } from "../../components/Input/styles";

export default function HomePage() {
  const {
    refetchDeveloper,
    refetchRepository,
    handleInputChange,
    setShouldFetch,
  } = useContext(GithubDataContext);
  const navigate = useNavigate();

  return (
    <>
      <h1>Search Devs</h1>
      <Input
        placeholder="Type the username here..."
        onChange={handleInputChange}
      />
      <Button
        onClick={() => {
          refetchDeveloper();
          refetchRepository();
          setShouldFetch(true);
          navigate("/profile");
        }}
      >
        Buscar
      </Button>
    </>
  );
}
