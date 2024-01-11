import { RepositoryController } from "./RepositoryController";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("RepositoryController", () => {
  it("should return a list of repositories", async () => {
    const mockResponse = {
      data: [
        {
          id: 385338002,
          node_id: "node_id",
          name: "MDEwOlJlcG9zaXRvcnkzODUzMzgwMDI=",
          full_name: "alurakut",
          private: false,
          stargazers_count: 0,
          updated_at: "2021-07-16T12:45:58Z",
        },
      ],
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const controller = new RepositoryController();
    const repositories = await controller.getRepository("miguelcutri");

    expect(repositories).toHaveLength(1);
    expect(repositories[0]).toHaveProperty("full_name", "alurakut");
  });
});
