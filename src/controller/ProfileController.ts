import axios from "axios";
import { Profile } from "../model/Profile";
import { GithubUserDataTypes } from "../types";

export class ProfileController {
  constructor() {}

  getProfile = async (userName: string): Promise<Profile> => {
    const response = await axios
      .get<GithubUserDataTypes>(`http://api.github.com/users/${userName}`)
      .then((response) => {
        return response;
      });

    const profile: Profile = {
      id: response.data.id,
      name: response.data.name,
      login: response.data.login,
      avatar: response.data.avatar_url,
      bio: response.data.bio,
      company: response.data.company,
      location: response.data.location,
      blog: response.data.blog,
      followers: response.data.followers,
      following: response.data.following,
    };

    return profile;
  };
}
