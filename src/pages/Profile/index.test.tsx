import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { GithubDataContext } from "../..";
import { GithubDataContextType } from "../../types";
import Profile from "../Profile";
import { formatDate } from "../Profile/FormatDate";

const testValues: GithubDataContextType = {
  dataDeveloper: undefined,
  dataRepository: undefined,
  isLoadingDeveloper: false,
  isLoadingRepository: false,
  refetchDeveloper: jest.fn(),
  refetchRepository: jest.fn(),
  setShouldFetch: jest.fn(),
  handleInputChange: jest.fn(),
  inputValue: undefined,
};
const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const renderComponent = () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <GithubDataContext.Provider value={testValues}>
          <Profile />
        </GithubDataContext.Provider>
      </MemoryRouter>
    </QueryClientProvider>
  );

  return {
    queryClient,
  };
};
describe("Profile", () => {
  it("should render Profile", async () => {
    renderComponent();

    expect(screen.getByText("@")).toBeInTheDocument();
  });
  it("should call navigate when click on button", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Voltar"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
  it("should sorted by star numbers", () => {
    const dataRepository = [
      { name: "Repo1", stargazers_count: 10 },
      { name: "Repo2", stargazers_count: 30 },
      { name: "Repo3", stargazers_count: 20 },
    ];

    const sortedStars = dataRepository.sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    expect(sortedStars[0].stargazers_count).toBe(30);
    expect(sortedStars[1].stargazers_count).toBe(20);
    expect(sortedStars[2].stargazers_count).toBe(10);
  });

  
});

it("should format date", () => {
  expect(formatDate("2021-07-16T12:45:58Z")).toBe("16 de julho de 2021");
});

