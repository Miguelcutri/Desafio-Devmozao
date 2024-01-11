import { ProfileController } from "./ProfileController";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("ProfileController", () => {
  it("should return a profile", async () => {
    const mockResponse = {
      data: {
        id: 58086003,
        name: "Miguel Cutri",
        login: "miguelcutri",
        avatar_url: "https://avatars.githubusercontent.com/u/58086003?v=4",
        bio: "👋 Olá, mundo! Sou Miguel Cutri, um entusiasta da programação sempre em busca de novos desafios. 🚀",
        company: "Grupo Boticário",
        location: "Campinas",
        blog: "https://www.google.com",
        followers: 40,
        following: 51,
      },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const controller = new ProfileController();
    const profile = await controller.getProfile("miguelcutri");

    expect(profile).toHaveProperty("login", "miguelcutri");
    expect(profile).toHaveProperty("name", "Miguel Cutri");
  });
});
