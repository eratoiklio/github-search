import React from 'react';
import { withRouter } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MainInfo.scss';
const MainInfo = (props) => {
  const { repo, history } = props;
  const showDetails = () => {
    history.push(`/details/${repo.owner.login}/${repo.name}`);
  };
  return (
    <div className="row">
      <div className="card col s12 m8 offset-m2">
        <div className="card-content">
          <div className="main-repo-info" data-testid="main-info" onClick={showDetails}>
            <p id="name" data-testid="repo-name">
              <b>repository name: </b>
              {repo.name}
            </p>
            <p id="owner" data-testid="owner">
              <b>repository owner: </b>
              {repo.owner.login}
            </p>
            <p id="language" data-testid="language">
              <b>repository laguage: </b>
              {repo.language}
            </p>
            <p id="stargazers" data-testid="stars">
              {' '}
              <FontAwesomeIcon icon={faStar} /> {repo.stargazers_count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(MainInfo);
