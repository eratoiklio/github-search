import React, { useState, useEffect } from 'react';
import { RepositoryService } from '../../services/repo-remote-service';
import { BoxLoading } from 'react-loadingg';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorBoundry from '../../hoc/PseudoErrorBoundry';
import { useParams } from 'react-router-dom';
import './Details.scss';

const Details = () => {
  const repositoryService = new RepositoryService();
  const { owner, repo: repoName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [repo, setRepo] = useState({ owner: {} });
  useEffect(() => {
    sendRequest();
  }, []);
  const sendRequest = () => {
    if (!owner || !repoName) {
      return;
    }
    setIsLoading(true);
    repositoryService
      .getRepository(owner, repoName)
      .then((res) => {
        setRepo(res);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return isLoading ? (
    <BoxLoading />
  ) : (
    <ErrorBoundry error={isError}>
      <div className="details-page-container">
        <div className="row">
          <div className="card col s12  m8 offset-m2">
            <div className="card-content">
              <a
                className="btn-floating right waves-effect waves-light green darken-3"
                onClick={sendRequest}
              >
                <i className="material-icons">refresh</i>
              </a>
              <span className="card-title" data-testid="repo-name">
                {repo.name}
              </span>
              <p className="valign-wrapper" data-testid="owner">
                <img id="avatar" src={repo.owner.avatar_url} alt="avatar" />
                {repo.owner.login}
              </p>
              <p data-testid="description">
                <b>description </b>
                {repo.description}
              </p>
              <p id="language" data-testid="language">
                <b>repository laguage: </b>
                {repo.language}
              </p>
              <p id="stargazers" data-testid="stars">
                {' '}
                <FontAwesomeIcon icon={faStar} /> {repo.stargazers_count}
              </p>
              <p data-testid="created-date">
                <b>created </b>
                {new Date(repo.created_at).toLocaleString()}
              </p>
              <p data-testid="updated-date">
                <b>updated </b>
                {new Date(repo.updated_at).toLocaleString()}
              </p>
              <a href={repo.html_url} target="_blank">
                open {repo.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundry>
  );
};
export default Details;
