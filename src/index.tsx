import { ChangeEvent, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import "./styles.css";
import { GithubDataContextType } from "./types";

export const GithubDataContext = createContext<GithubDataContextType>({
  data: undefined,
  isLoading: false,
  refetch: () => {},
  inputValue: undefined,
  handleInputChange: () => {},
  setShouldFetch: () => {},
});

function App() {
  const [inputValue, setInputValue] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const searchDev = () => {
    return axios
      .get(`http://api.github.com/users/${inputValue}`)
      .then((response) => response.data);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const { data, isLoading, refetch } = useQuery("user", searchDev, {
    enabled: shouldFetch,
  });
  useEffect(() => {
    if (shouldFetch) {
      refetch();
      setShouldFetch(false);
    }
  }, [shouldFetch, refetch]);

  return (
    <GithubDataContext.Provider
      value={{
        data,
        isLoading,
        refetch,
        setShouldFetch,
        handleInputChange,
        inputValue,
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </GithubDataContext.Provider>
  );
}

export default App;
