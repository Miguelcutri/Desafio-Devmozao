import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./index";
import { GithubDataContext } from "../../index";

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

const testValues = {
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

const renderComponents = () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <GithubDataContext.Provider value={testValues}>
          <HomePage />
        </GithubDataContext.Provider>
      </MemoryRouter>
    </QueryClientProvider>
  );

  return queryClient;
};

describe("HomePage", () => {
  it("should render HomePage", async () => {
    renderComponents();

    expect(screen.getByText("Search Devs")).toBeInTheDocument();
  });

  it("should call refetchDeveloper, refetchRepository, setShouldFetch and navigate to /profile", async () => {
    renderComponents();

    fireEvent.click(screen.getByText("Buscar"));

    expect(testValues.refetchDeveloper).toHaveBeenCalled();
    expect(testValues.refetchRepository).toHaveBeenCalled();
    expect(testValues.setShouldFetch).toHaveBeenCalledWith(true);

    expect(mockNavigate).toHaveBeenCalledWith("/profile");
  });
});
