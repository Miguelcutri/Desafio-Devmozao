import { ChangeEvent, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import "./styles.css";
import { GithubDataContextType } from "./types";

export const GithubDataContext = createContext<GithubDataContextType>({
  dataRepository: undefined,
  dataDeveloper: undefined,
  isLoadingDeveloper: false,
  isLoadingRepository: false,
  refetchDeveloper: () => {},
  refetchRepository: () => {},
  inputValue: undefined,
  handleInputChange: () => {},
  setShouldFetch: () => {},
});

function App() {
  const [inputValue, setInputValue] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const searchDeveloper = () => {
    return axios
      .get(`http://api.github.com/users/${inputValue}`)
      .then((response) => response.data);
  };
  const searchRepositorys = () => {
    return axios
      .get(`https://api.github.com/users/${inputValue}/repos`)
      .then((response) => response.data);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const {
    data: dataDeveloper,
    isLoading: isLoadingDeveloper,
    refetch: refetchDeveloper,
  } = useQuery("user", searchDeveloper, {
    enabled: shouldFetch,
  });
  const {
    data: dataRepository,
    isLoading: isLoadingRepository,
    refetch: refetchRepository,
  } = useQuery("repos", searchRepositorys, {
    enabled: shouldFetch,
  });
  useEffect(() => {
    if (shouldFetch) {
      refetchDeveloper();
      refetchRepository();
      setShouldFetch(false);
    }
  }, [shouldFetch, refetchDeveloper, refetchRepository]);

  return (
    <GithubDataContext.Provider
      value={{
        dataDeveloper,
        dataRepository,
        isLoadingDeveloper,
        isLoadingRepository,
        refetchDeveloper,
        refetchRepository,
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
