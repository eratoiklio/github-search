import React from 'react';
import SearchPage from '../SearchPage';
import Details from '../../Details/Details';
import { correctResponse } from '../../../services/repos-testing-service';
import { repositoryCorrectResponse } from '../../../services/repo-testing-service';
import { RepositoriesService } from '../../../services/repos-remote-service';
import { RepositoryService } from '../../../services/repo-remote-service';
import { waitForElement, fireEvent, render, act } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Fetching data', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest
      .spyOn(RepositoryService.prototype, 'getRepository')
      .mockImplementation(() => Promise.resolve(repositoryCorrectResponse));
  });

  it('renders search page component', async () => {
    mockGetRepositoriesSuccess();
    const { getByText } = render(
      <MemoryRouter initialEntries={['/html/1']} initialIndex={0}>
        <Route exact path="/:q?/:page?" component={SearchPage} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText(/submit/i));
  });

  it('search pogodabot14 in repositories', async () => {
    mockGetRepositoriesSuccess();
    const mockInputEvent = { target: { value: 'pogoda' } };
    const mockedSubmitEvent = jest.fn(() => {
      return { target: { elements: { query: { value: 'pogoda' } } } };
    });
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/html/1']} initialIndex={0}>
        <Route exact path="/:q?/:page?" component={SearchPage} />
      </MemoryRouter>
    );
    let queryInput = await waitForElement(() => getByTestId('query-input'));
    act(() => {
      fireEvent.change(queryInput, mockInputEvent);
      fireEvent.submit(getByTestId('form'), mockedSubmitEvent);
    });
    await waitForElement(() => getByText(/pogodabot14/i));
  });

  it('show details when click at card', async () => {
    mockGetRepositoriesSuccess();
    const mockInputEvent = { target: { value: 'pogoda' } };
    const mockedSubmitEvent = jest.fn(() => {
      return { target: { elements: { query: { value: 'pogoda' } } } };
    });
    const { getByText, getByTestId, debug } = render(
      <MemoryRouter initialEntries={['/html/1']} initialIndex={0}>
        <Route exact path="/:q?/:page?" component={SearchPage} />
        <Route path="/details/:owner/:repo" component={Details} />
      </MemoryRouter>
    );
    let queryInput = await waitForElement(() => getByTestId('query-input'));
    act(() => {
      fireEvent.change(queryInput, mockInputEvent);
      fireEvent.submit(getByTestId('form'), mockedSubmitEvent);
    });

    await waitForElement(() => getByText(/pogodabot14/i));
    act(() => {
      fireEvent.click(getByText(/pogodabot14/i));
    });
    await waitForElement(() => getByText('2020-4-4 15:45:44'));
  });

  it('it fails when get repositories', async () => {
    mockGetRepositoriesFail();
    const mockInputEvent = { target: { value: 'pogoda' } };
    const mockedSubmitEvent = jest.fn(() => {
      return { target: { elements: { query: { value: 'pogoda' } } } };
    });
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/html/1']} initialIndex={0}>
        <Route exact path="/:q?/:page?" component={SearchPage} />
      </MemoryRouter>
    );
    let queryInput = await waitForElement(() => getByTestId('query-input'));
    act(() => {
      fireEvent.change(queryInput, mockInputEvent);
      fireEvent.submit(getByTestId('form'), mockedSubmitEvent);
    });
    await waitForElement(() => getByText(/something went wrong/i));
  });

  function mockGetRepositoriesSuccess() {
    jest
      .spyOn(RepositoriesService.prototype, 'getRepositories')
      .mockImplementation(() => Promise.resolve(correctResponse));
  }

  function mockGetRepositoriesFail() {
    jest
      .spyOn(RepositoriesService.prototype, 'getRepositories')
      .mockImplementation(() => Promise.reject(new Error('Something went wrong.')));
  }
});
