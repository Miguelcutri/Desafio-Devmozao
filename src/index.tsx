import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import ApiGithub from "./services/ApiGithub";
import { Route, Routes } from "react-router-dom";
import "./styles.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ApiGithub />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
