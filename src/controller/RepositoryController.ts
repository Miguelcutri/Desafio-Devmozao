import axios from "axios";
import { Repository } from "../model/Repository";
import { GithubReposDataTypes } from "../types";

export class RepositoryController {
  constructor() {}

  getRepository = async (userName: string): Promise<Repository[]> => {
    const response = await axios
      .get<GithubReposDataTypes[]>(
        `https://api.github.com/users/${userName}/repos`
      )
      .then((response) => {
        return response;
      });

    const repositories = response.data.map((repository) => {
      return {
        id: repository.id,
        node_id: repository.node_id,
        name: repository.name,
        full_name: repository.full_name,
        private: repository.private,
        stargazers_count: repository.stargazers_count,
        updated_at: repository.updated_at,
        description: repository.description,
        html_url: repository.html_url,
      };
    });

    return repositories;
  };
}
