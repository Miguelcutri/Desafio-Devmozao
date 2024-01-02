import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GithubDataContext } from "../../index";
import { Button } from "../../components/Button/styles";
import { Input } from "../../components/Input/styles";

export default function HomePage() {
  const [isActive, setIsActive] = useState(false);
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
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder="Type the username here..."
        onChange={handleInputChange}
      />
      <Button
        isActive={isActive}
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
