import { ChangeEvent, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import {} from "./styles.css";
import { GithubDataContextType } from "./types";
import { ProfileController } from "./controller/ProfileController";
import { RepositoryController } from "./controller/RepositoryController";

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

const profileController = new ProfileController();
const repositoryController = new RepositoryController();

function App() {
  const [inputValue, setInputValue] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const searchDeveloper = async () => {
    return await profileController.getProfile(inputValue);
  };
  const searchRepositories = async () => {
    return await repositoryController.getRepository(inputValue);
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
  } = useQuery("repos", searchRepositories, {
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
    <div id="particles-js">
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
    </div>
  );
}

export default App;
