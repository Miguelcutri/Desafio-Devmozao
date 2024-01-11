import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { GithubDataContext } from ".";
import App from "./index";
import { GithubDataContextType } from "./types";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

const mockNavigate = jest.fn();
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("axios");
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

mockedAxios.get.mockResolvedValueOnce({
  login: "Miguelcutri",
  id: 58086003,
  node_id: "MDQ6VXNlcjU4MDg2MDAz",
  avatar_url: "https://avatars.githubusercontent.com/u/58086003?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/Miguelcutri",
  html_url: "https://github.com/Miguelcutri",
  followers_url: "https://api.github.com/users/Miguelcutri/followers",
  following_url:
    "https://api.github.com/users/Miguelcutri/following{/other_user}",
  gists_url: "https://api.github.com/users/Miguelcutri/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/Miguelcutri/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/Miguelcutri/subscriptions",
  organizations_url: "https://api.github.com/users/Miguelcutri/orgs",
  repos_url: "https://api.github.com/users/Miguelcutri/repos",
  events_url: "https://api.github.com/users/Miguelcutri/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/Miguelcutri/received_events",
  type: "User",
  site_admin: false,
  name: "Vitor Miguel Cutri",
  company: "Grupo Boticário",
  blog: "https://www.google.com",
  location: "Campinas",
  email: null,
  hireable: null,
  bio: "👋 Olá, mundo! Sou Miguel Cutri, um entusiasta da programação sempre em busca de novos desafios. 🚀",
  twitter_username: null,
  public_repos: 62,
  public_gists: 0,
  followers: 40,
  following: 51,
  created_at: "2019-11-22T17:40:23Z",
  updated_at: "2024-01-03T14:54:32Z",
});

const testValues: GithubDataContextType = {
  dataDeveloper: undefined,
  dataRepository: undefined,
  isLoadingDeveloper: false,
  isLoadingRepository: false,
  refetchDeveloper: jest.fn().mockImplementation(() => Promise.resolve()),
  refetchRepository: jest.fn().mockImplementation(),
  setShouldFetch: jest.fn(),
  handleInputChange: jest.fn(),
  inputValue: undefined,
};

const renderComponent = () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <GithubDataContext.Provider value={testValues}>
          <App />
        </GithubDataContext.Provider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("App", () => {
  it("should update input value on change", async () => {
    renderComponent();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "miguelcutri" } });

    expect(input).toHaveValue("miguelcutri");
  });

  it('should call refetchDeveloper, refetchRepository, setShouldFetch and navigate to "/profile"', async () => {
    renderComponent();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "miguelcutri" } });

    fireEvent.click(screen.getByText("Buscar"));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/profile"));
  });
});
