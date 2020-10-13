const { default: MainInfo } = require('../MainInfo');

import React from 'react';
import { waitForElement, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { repositoryCorrectResponse } from '../../../services/repo-testing-service';

it('renders main info page component', async () => {
  const { getByTestId, getByText } = render(
    <BrowserRouter>
      <MainInfo repo={repositoryCorrectResponse} />
    </BrowserRouter>
  );
  await waitForElement(() => getByTestId('owner'));
  expect(getByTestId('repo-name')).toHaveTextContent('pogodabot14');
  expect(getByTestId('owner')).toHaveTextContent('bapho4680');
  expect(getByTestId('language')).toHaveTextContent('Python');
  expect(getByTestId('stars')).toHaveTextContent(0);
});
