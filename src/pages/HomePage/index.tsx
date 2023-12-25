import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GithubDataContext } from "../../index"; // Ajuste o caminho conforme necessário
import { Button } from "../../components/Button/styles";
import { Input } from "../../components/Input/styles";

export default function HomePage() {
  const [isActive, setIsActive] = useState(false);
  const { refetch } = useContext(GithubDataContext);
  const navigate = useNavigate();

  return (
    <>
      <h1>Search Devs</h1>
      <Input
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder="Type the username here..."
      />
      <Button
        isActive={isActive}
        onClick={() => {
          refetch();
          navigate("/profile");
        }}
      >
        Buscar
      </Button>
    </>
  );
}
