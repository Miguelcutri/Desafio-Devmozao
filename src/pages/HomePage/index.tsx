import { useState } from "react";
import { Button } from "../../components/Button/styles";
import { Input } from "../../components/Input/styles";
export default function HomePage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <h1>Search Devs</h1>
      <Input
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder="Type the username here..."
      />
      <Button isActive={isActive}>Buscar</Button>
    </>
  );
}
