import axios from 'axios';
const headers = {
  Authorization: `token ${process.env.REACT_APP_ACCESS_TOKEN}`
};

export class RepositoryService {
  getRepository(owner, repo) {
    return axios.get(`https://api.github.com/repos/${owner}/${repo}`, headers).then((res) => {
      return res.data;
    });
  }
}
