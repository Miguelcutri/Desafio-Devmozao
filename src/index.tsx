import { createContext } from "react";
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
});


function App() {
  const searchDev = () => {
    return axios
      .get("http://api.github.com/users/miguelcutri")
      .then((response) => response.data);
  };

  const { data, isLoading, refetch } = useQuery("user", searchDev, {
    enabled: false,
  });

  return (
    <GithubDataContext.Provider value={{ data, isLoading, refetch }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </GithubDataContext.Provider>
  );
}

export default App;
