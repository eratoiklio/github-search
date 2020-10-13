import axios from 'axios';
const headers = {
  Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}`
};
export class RepositoriesService {
  getRepositories(query, page) {
    return axios
      .get(
        `https://api.github.com/search/repositories?q=${query}+in:name,description&page=${page}&per_page=30`,
        headers
      )
      .then((res) => {
        return res.data;
      });
  }
}
