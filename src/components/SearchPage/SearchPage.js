import React, { useState, useEffect, Fragment } from 'react';
import MainInfo from '../MainInfo';
import { RepositoriesService } from '../../services/repos-remote-service';
import { BoxLoading } from 'react-loadingg';
import ErrorBoundry from '../../hoc/PseudoErrorBoundry';
import ReactPaginate from 'react-paginate';
import './SearchPage.scss';
import { useHistory, useParams } from 'react-router-dom';

const SearchPage = () => {
  const repositoriesService = new RepositoriesService();
  const history = useHistory();
  let { q, page } = useParams();
  q = q || '';
  page = page || 1;
  const perPage = 30;
  let activePage = page - 1;
  const [query, setQuery] = useState(q);
  const [pagesCount, setPagesCount] = useState(0);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isResultsLimited, setIsResultsLimited] = useState(false);
  useEffect(() => {
    if (!Number.isInteger(activePage) || activePage < 0) {
      history.push(`/${query}/1`);
    }
    if (activePage > 33) {
      activePage = 33;
      history.push(`/${query}/34`);
    }
    sendRequest();
  }, []);
  const manageMaxPageCount = (res) => {
    if (Math.ceil(res.total_count / perPage) > 34) {
      setIsResultsLimited(true);
      return 34;
    } else {
      setIsResultsLimited(false);
      return Math.ceil(res.total_count / perPage);
    }
  };
  const sendRequest = () => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    repositoriesService
      .getRepositories(query, activePage + 1)
      .then((res) => {
        setRepos(res.items);
        const maxPageCount = manageMaxPageCount(res);
        setPagesCount(maxPageCount);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handlePageChange = async (data) => {
    activePage = data.selected;
    history.push(`/${query}/${activePage + 1}`);
    sendRequest();
  };
  return (
    <Fragment>
      {isResultsLimited && (
        <div className="alert valign-wrapper ">
          <p className="center-horizonraly">
            Due to github API limitations, only first 1000 results diplayed.
          </p>
        </div>
      )}
      <div className="search-page-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            history.push(`/${query}/1`);
            sendRequest();
          }}
          data-testid="form"
        >
          <input
            className="github_search_input"
            type="text"
            name="query"
            value={query}
            placeholder="Search Github Repositories"
            data-testid="query-input"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <input className="search-btn" data-testid="search-btn" type="submit" value="SUBMIT" />
        </form>

        {isLoading ? (
          <BoxLoading />
        ) : (
          <ErrorBoundry error={isError}>
            {repos && repos.length ? (
              <Fragment>
                {repos.map((repo) => {
                  return <MainInfo className="main-info" repo={repo} key={repo.id} />;
                })}
                <div className="flex">
                  <ReactPaginate
                    id="pagination"
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pagesCount}
                    forcePage={activePage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  />
                </div>
              </Fragment>
            ) : null}
          </ErrorBoundry>
        )}
      </div>
    </Fragment>
  );
};

export default SearchPage;
