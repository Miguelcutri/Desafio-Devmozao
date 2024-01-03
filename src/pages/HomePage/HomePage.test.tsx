import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./index";
import { GithubDataContext } from "../../index";

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
test("renders HomePage", async () => {
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

  expect(screen.getByText("Search Devs")).toBeInTheDocument();
});
