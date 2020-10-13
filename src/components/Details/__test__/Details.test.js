import React from 'react';
import Details from '../Details';
import { repositoryCorrectResponse } from '../../../services/repo-testing-service';
import { RepositoryService } from '../../../services/repo-remote-service';
import { waitForElement, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Fetching data', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest
      .spyOn(RepositoryService.prototype, 'getRepository')
      .mockImplementation(() => Promise.resolve(repositoryCorrectResponse));
  });

  it('renders detail page component', async () => {
    mockGetRepositorySuccess();
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/details/owner/monika']} initialIndex={0}>
        <Route path="/details/:owner/:repo" component={Details} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText('2020-4-4 15:45:44'));
    expect(getByTestId('repo-name')).toHaveTextContent('pogodabot14');
    expect(getByTestId('owner')).toHaveTextContent('bapho4680');
    expect(getByTestId('created-date')).toHaveTextContent('created');
    expect(getByTestId('created-date')).toHaveTextContent('2020-4-4 15:45:44');
    expect(getByTestId('updated-date')).toHaveTextContent('updated 2020-4-4 23:30:28');
    expect(getByTestId('language')).toHaveTextContent('Python');
    expect(getByTestId('stars')).toHaveTextContent(0);
    expect(getByTestId('description')).toHaveTextContent('description');
  });

  it('it fails when get repository', async () => {
    mockGetRepositoryFail();
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/details/owner/monika']} initialIndex={0}>
        <Route path="/details/:owner/:repo" component={Details} />
      </MemoryRouter>
    );
    await waitForElement(() => getByText(/something went wrong/i));
  });

  function mockGetRepositorySuccess() {
    jest
      .spyOn(RepositoryService.prototype, 'getRepository')
      .mockImplementation(() => Promise.resolve(repositoryCorrectResponse));
  }

  function mockGetRepositoryFail() {
    jest
      .spyOn(RepositoryService.prototype, 'getRepository')
      .mockImplementation(() => Promise.reject(new Error('Something went wrong.')));
  }
});
